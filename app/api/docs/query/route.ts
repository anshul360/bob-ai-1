// import fetchDocumentsViaHyde from '@/lib/pinecone/retrieveEmbeddings';
import askQuery from '@/library/llm/askquery';
import createQuery from '@/library/llm/createquery';
import retrieveEmbeddings from '@/library/vector_store/retrieve/retrieveEmbeddings';
import { NextResponse, NextRequest, NextMiddleware } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai'

// export async function GET(request: NextRequest, response: NextResponse) {

// }

export async function POST(request: NextRequest) {
    const { ...bjson } = await request.json();
    let inqres, chathist, pages;
    
    //get chat history
    chathist=bjson.chathist || []
        // [
        //     {"role":"user","message":"Where do you live?"},
        //     {"role":"assistant","message":"In USA"}
        // ];
    try {

        //recreate question
        if(chathist) {
            inqres = await createQuery(chathist, bjson.query );
        } else throw "No chatinst sent";

        //retrieve
        if(inqres?.text) {
            pages = await retrieveEmbeddings( bjson.botId, inqres.text );
        } else throw "Unable to build inquiry";

        //summarize(optional)

        //QA
        // if(pages && pages.length > 0) {
            const resq = await askQuery( chathist, pages, inqres?.text );
        // } else throw "";
        const stream = OpenAIStream(resq);
        return new StreamingTextResponse(stream);
    } catch(error) {
        console.log("-=-=-docs.query.route.error-=-=-",error);
        return NextResponse.json({ success: false },{ status: 500 });
    }   
    
    return NextResponse.json({ success: true, data: inqres?.text },{ status: 200 });
}