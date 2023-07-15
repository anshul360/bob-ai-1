import { NextResponse, NextRequest, NextMiddleware } from 'next/server'
import { pdfLoaderBlob } from '@/library/documents/langChain/pdfLoader'
import textSplitter from '@/library/documents/langChain/textSplitter'
import storeEmbeddings from '@/library/vector_store/store/storeEmbeddings'
import { docxLoaderBlob } from '@/library/documents/langChain/docxLoader'
import { textLoaderBlob } from '@/library/documents/langChain/textLoader'
import { Document } from "langchain/document";
// import { getSession } from '@/app/supabase-server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types_db'
import { cookies } from 'next/headers'


type GcfResponse = {
    config: any,
    data: {
        sucess: boolean,
        data?: string
    },
    headers: any,
    status: number,
    request: any
}


import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth({credentials:JSON.parse(process.env.GCP_JSON!)});

async function gcfDataRequest(path: string, crawl: boolean) {
    if(path.trim().length) {
        const targetAudience = crawl?"":'https://us-central1-bobai-391803.cloudfunctions.net/count-characters';
        const client = await auth.getIdTokenClient(targetAudience);
        // console.log("-=-=--client-=-=-=--",JSON.stringify(client));
        const res = await client.request({
            url: targetAudience,
            method: "POST",
            data: { url: path }
        });
        // console.info("-=-=-=-=---", res);
        return res;
    }
}

export async function POST(request: NextRequest) {

    let docsinfo: any = {charCount: 0};
    const supabase = createRouteHandlerClient<Database>({cookies});
    const { data: { user } } = await supabase.auth.getUser();

    if(!user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.formData()

    const botid = data.get("botid") as string;

    if(!botid) {
        return NextResponse.json({ success: false, error: "Invalid request" }, { status: 500 });
    }

    if(data.get("type") === "pdf" || data.get("type") === "docx" || data.get("type") === "txt") {           /**File Upload */

        const file = data.get("file") as Blob | null;
        if (!file) {
            return NextResponse.json(
                { success: false, error: "Upload a file" },
                { status: 500 }
            );
        }

        try {
            if(data.get("type") === "pdf") {
                docsinfo = await pdfLoaderBlob(file, false);
            } else if(data.get("type") === "docx") {
                docsinfo = await docxLoaderBlob(file)
            } else if(data.get("type") === "txt") {
                docsinfo = await textLoaderBlob(file)
            }

            docsinfo.docs = await textSplitter(docsinfo.docs, 300, 20);
        } catch(exc) {
            console.log(exc);
            return NextResponse.json({ success: false, error: exc }, { status: 500 });
        }
    } 
    // else if(data.get("type") === "Q_A") {                                                    /**Q & A upload */

    //     try {
    //         const pageContent = data.get("content") as string;
    //         const doc = new Document({ pageContent, metadata: {source: "User Q&A"} });
    //         docsinfo = await textSplitter([ doc ], 300, 20);

    //         storeEmbeddings(docsinfo, "Q_A", user, botid);
    //     } catch(exc) {
    //         console.log(exc);
    //         return NextResponse.json({ success: false, error: exc }, { status: 500 });
    //     }
    // } 
    else if(data.get("type") === "web") {                                                     /**URL upload */
        const paths: string = data.get("paths") as string;
        const pathsarr: string[] = paths?.split(',');
        const parseErrors: string[] = [];
        let charcount = 0;

        if(pathsarr.length) {
            await Promise.all( 
                pathsarr.map(
                    async (path: string) => {
                        const datares: any = await gcfDataRequest(path, false).catch(err => {
                            console.error(err.message);
                        });
                        if(datares?.data?.success) {
                            // docsinfo = textSplitter([new Document( {pageContent: datares?.data?.data!, metadata:{sorce: path} }) ], 300, 20);
                            console.log("-=-=-goog=-=-",datares?.data);
                            charcount += datares?.data?.charCount;
                        } else {
                            parseErrors.push(path);
                        }
                    }
                )
            );
        }
        return NextResponse.json({ success: true, error: parseErrors,  charcount }, { status: 200 });
    } else {
        return NextResponse.json({ success: false, error: "Invalid request" }, { status: 500 });
    }
    console.log("-=-=docsinfo-=-", docsinfo.charCount);
    return NextResponse.json({ success: true, charcount: docsinfo.charCount }, { status: 200 });
}