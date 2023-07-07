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

export async function POST(request: NextRequest) {

    //TODO: implement auth
    // const session = await getSession();

    const supabase = createRouteHandlerClient<Database>({cookies});
    const {
        data: { user }
    } = await supabase.auth.getUser();

    // const apikey = request.headers.get("Authorization");
    // console.log("===="+apikey);
    
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
            } else if(data.get("type") === "web") {
                // docsinfo = await webLoader(path)
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
    } else {
        return NextResponse.json({ error: "Invalid request" }, { status: 500 });
    }
    return NextResponse.json({ success: true }, { status: 200 })
}