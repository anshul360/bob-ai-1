import { NextResponse, NextRequest, NextMiddleware } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import pdfLoader from '@/library/documents/langChain/pdfLoader'
import textSplitter from '@/library/documents/langChain/textSplitter'
import storeEmbeddings from '@/library/vector_store/store/storeEmbeddings'
import docxLoader from '@/library/documents/langChain/docxLoader'
import textLoader from '@/library/documents/langChain/textLoader'
import { Document } from "langchain/document";
// import { getSession } from '@/app/supabase-server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types_db'
import { cookies } from 'next/headers'
import webLoader from '@/library/documents/langChain/webLoader'


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

// const auth = new GoogleAuth({credentials:{
//         "client_id": process.env.client_id,
//         "client_email": process.env.client_email,
//         "project_id": process.env.project_id || "",
//         "private_key": process.env.private_key
//     }
// })

async function gcfDataRequest(path: string, crawl: boolean) {
    if(path.trim().length) {
        //Cloud Functions uses your function's url as the `targetAudience` value
        const targetAudience = crawl?"":'https://us-central1-bobai-391803.cloudfunctions.net/function-1';
        // For Cloud Functions, endpoint (`url`) and `targetAudience` should be equal
        // const url = targetAudience;
        // console.info(`---==-=-=- request ${url} with target audience ${targetAudience}`);
        // const client1 = auth.fromJSON(JSON.parse(process.env.GCP_JSON!));
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

    //TODO: implement auth
    // const session = await getSession();

    const supabase = createRouteHandlerClient<Database>({cookies});
    const {
        data: { user }
    } = await supabase.auth.getUser();

    // const apikey = request.headers.get("Authorization");
    // console.log("===="+apikey);
    // console.log("-=-=-user-=-=",user);
    if(!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.formData()
    console.log(data.get("file"))

    const botid = data.get("botid") as string;

    if(!botid) {
        return NextResponse.json({ error: "Invalid request" }, { status: 500 });
    }

    if(data.get("type") === "pdf" || data.get("type") === "docx" || data.get("type") === "txt") {

        const file = data.get("file") as Blob | null;
        if (!file) {
            return NextResponse.json(
                { error: "Upload a file" },
                { status: 500 }
            );
        }

        const path = `./${file.name}`;

        try {
            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(path, buffer);

            let docsinfo: any;
            if(data.get("type") === "pdf") {
                docsinfo = await pdfLoader(path, false);
            } else if(data.get("type") === "docx") {
                docsinfo = await docxLoader(path)
            } else if(data.get("type") === "txt") {
                docsinfo = await textLoader(path)
            }

            docsinfo.docs = await textSplitter(docsinfo.docs, 300, 20)
                // data.get("type") === "pdf"?
                // await textSplitter(.docs, 300, 20):
                // (
                //     data.get("type") === "docx"?
                //     await textSplitter(await docxLoader(path), 300, 20):
                //     await textSplitter(await textLoader(path), 300, 20)
                // );
            
            // console.log(docs);

            storeEmbeddings(docsinfo, file.name, user, botid);
        } catch(exc) {
            console.log(exc);
            return NextResponse.json({ success: false }, { status: 500 });
        }
        
        await unlink(path);
    } else if(data.get("type") === "text") {

        try {
            const pageContent = data.get("content") as string;
            const doc = new Document({ pageContent, metadata: {source: "User Q&A"} });
            const docsinfo = await textSplitter([ doc ], 300, 20);

            // console.log(docs);

            storeEmbeddings(docsinfo, "Q_A", user, botid);
        } catch(exc) {
            console.log(exc);
            return NextResponse.json({ success: false }, { status: 500 });
        }
    } else if(data.get("type") === "web") {
        // docsinfo = await webLoader(path)
        // console.log("-=-=-=-insideWeb-=-=-=-");
        // let crawl = false;
        const paths: string = data.get("paths") as string;
        const pathsarr: string[] = paths?.split(',');
        const parseErrors: string[] = [];

        // if(data.get("op") === "crawl") crawl = true;

        // if(crawl) {
        // //TODO: crawl
        //     const crawlres: any = await gcfDataRequest(" ", crawl).catch(err => {
        //         console.error(err.message);
        //         process.exitCode = 1;
        //     });
        // //TODO: pass urls 1by1
        //     if(crawlres?.data?.success) {
        //         urls.push(crawlres?.data?.data!);
        //     }
        // }
        if(pathsarr.length) {
            await Promise.all( 
                pathsarr.map(
                    async (path: string) => {
                        const datares: any = await gcfDataRequest(path, false).catch(err => {
                            console.error(err.message);
                            // process.exitCode = 1;
                        });
                        if(datares?.data?.success) {
                            const docsinfo = textSplitter([new Document( {pageContent: datares?.data?.data!, metadata:{sorce: path} }) ], 300, 20);
                            storeEmbeddings(docsinfo, "URL", user, botid);
                        } else {
                            parseErrors.push(path);
                        }
                    }
                )
            );
        }
        return NextResponse.json({ success: true, parseErrors }, { status: 200 });
    } else {
        return NextResponse.json({ error: "Invalid request" }, { status: 500 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
}