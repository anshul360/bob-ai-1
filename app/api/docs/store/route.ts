import { NextResponse, NextRequest, NextMiddleware } from 'next/server'
// import { writeFile, unlink } from 'fs/promises'
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
import rateLimit from '@/utils/ratelimit'

const auth = new GoogleAuth({credentials:JSON.parse(process.env.GCP_JSON!)});

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    // uniqueTokenPerInterval: 5000, // Max 5000 users per second
});

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

    const supabase = createRouteHandlerClient<Database>({cookies});
    const {
        data: { user }
    } = await supabase.auth.getUser();

    // const apikey = request.headers.get("Authorization");
    // console.log("===="+apikey);
    // console.log("-=-=-user-=-=",user);
    if(!user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        await limiter.check(5, user.id);
    } catch(e) {
        console.log("-=-=429-=-=-", e);
        return NextResponse.json({ success: false, error: 'Rate limit exceeded', reason: 'bot_settings' },{status: 429});
    }
    // return NextResponse.json({ success: false, error: 'Rate limit exceeded' },{status: 400});
    const data = await request.formData();

    const botid = data.get("botid") as string;

    if(!botid) {
        return NextResponse.json({ success: false, error: "Invalid request" }, { status: 500 });
    }

    if(data.get("type") === "pdf" || data.get("type") === "docx" || data.get("type") === "txt") {

        const file = data.get("file") as Blob | null;
        if (!file) {
            return NextResponse.json(
                { success: false, error: "Upload a file" },
                { status: 500 }
            );
        }

        // const path = `./${file.name}`;

        try {
            // const buffer = Buffer.from(await file.arrayBuffer());
            // await writeFile(path, buffer);

            let docsinfo: any = {};
            if(data.get("type") === "pdf") {
                docsinfo = await pdfLoaderBlob(file, false);
            } else if(data.get("type") === "docx") {
                docsinfo = await docxLoaderBlob(file)
            } else if(data.get("type") === "txt") {
                docsinfo = await textLoaderBlob(file)
            }

            docsinfo.docs = await textSplitter(docsinfo.docs, 300, 20)
                // data.get("type") === "pdf"?
                // await textSplitter(.docs, 300, 20):
                // (
                //     data.get("type") === "docx"?
                //     await textSplitter(await docxLoader(path), 300, 20):
                //     await textSplitter(await textLoader(path), 300, 20)
                // );
            
            console.log(docsinfo.charCount);

            await storeEmbeddings(docsinfo, file.name, user, botid);
        } catch(exc) {
            console.log(exc);
            return NextResponse.json({ success: false, error: exc }, { status: 500 });
        }
        
        // await unlink(path);
    } else if(data.get("type") === "Q_A" || data.get("type") === "Q_A_R") {
        const source = data.get("type") === "Q_A"?"Q & A":"Q & A_R";
        try {
            const content = data.get("content") as string;
            const qajson = JSON.parse(content);
            const docs: Document[] = [];
            let charCount = 0;
            qajson.map((qapair: any) => {
                const pageContent = `Q:"${qapair.q_value}" A:"${qapair.a_value}"`;
                charCount += pageContent.length - 9;
                docs.push(new Document({ pageContent , metadata: {source: "User Q&A"} }));
            });
            // const doc = new Document({ pageContent, metadata: {source: "User Q&A"} });
            // const docsinfo = await textSplitter([ doc ], 300, 20); /**accommodate QA in this */
            const docsinfo = { docs, charCount }

            // console.log(docs);

            await storeEmbeddings(docsinfo, source, user, botid, qajson);
        } catch(exc) {
            console.log(exc);
            return NextResponse.json({ success: false, error: exc }, { status: 500 });
        }
    } 
    // else if(data.get("type") === "Q_A_R") {

    //     try {
    //         const content = data.get("content") as string;
    //         const qajson = JSON.parse(content);
    //         const docs: Document[] = [];
    //         let charCount = 0;
    //         qajson.map((qapair: any) => {
    //             const pageContent = `Q:"${qapair.q_value}" A:"${qapair.a_value}"`;
    //             charCount += pageContent.length - 9;
    //             docs.push(new Document({ pageContent , metadata: {source: "User Q&A"} }));
    //         });
            
    //         const docsinfo = { docs, charCount }

    //         await storeEmbeddings(docsinfo, "Q & A_R", user, botid, qajson);
    //     } catch(exc) {
    //         console.log(exc);
    //         return NextResponse.json({ success: false, error: exc }, { status: 500 });
    //     }
    // } 
    else if(data.get("type") === "web") {
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
                            const pageContent = datares?.data?.data;
                            const docs = await textSplitter([new Document( { pageContent, metadata:{sorce: path} }) ], 300, 20);
                            const docsinfo = { docs, charCount: pageContent.length };
                            await storeEmbeddings(docsinfo, path, user, botid);
                        } else {
                            parseErrors.push(path);
                        }
                    }
                )
            );
        }
        return NextResponse.json({ success: true, error: parseErrors }, { status: 200 });
    } else {
        return NextResponse.json({ success: false, error: "Invalid request" }, { status: 500 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
}