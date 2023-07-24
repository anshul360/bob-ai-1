// import fetchDocumentsViaHyde from '@/lib/pinecone/retrieveEmbeddings';
import askQuery from '@/library/llm/askquery';
import createQuery from '@/library/llm/createquery';
import retrieveEmbeddings from '@/library/vector_store/retrieve/retrieveEmbeddings';
import { NextResponse, NextRequest, NextMiddleware } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { getMsgCFromUser, getUserIdFromBot, saveMsgCToUser } from '@/utils/supabase-admin';

// export async function GET(request: NextRequest, response: NextResponse) {

// }

export async function POST(request: NextRequest) {
    const { ...bjson } = await request.json();
    let inqres, chathist, pages;
    
    try {
        getUserIdFromBot(bjson.botId).then((resui) => {
            if(resui.success) {
                getMsgCFromUser(resui.data).then((resml) => {
                    saveMsgCToUser(resui.data, resml.data[0].consumed_messages + 1).catch();
                }).catch();
            }
        }).catch();
    } catch(ex) {
        console.log("--==countsaveissue==--", ex);
    }
    //get chat history
    chathist=bjson.chathist || []
        // [
        //     {"role":"user","message":"Where do you live?"},
        //     {"role":"assistant","message":"In USA"}
        // ];
    try {

        //recreate question
        // if(chathist) {
            inqres = await createQuery(chathist, bjson.query );
        // } else throw "No chatinst sent";

        //retrieve
        if(inqres?.content) {
                pages = await retrieveEmbeddings( bjson.botId, inqres.content );
        } else throw "Unable to build inquiry";

        //summarize(optional)

        //QA
            const resq = await askQuery( chathist, pages, inqres.content, bjson.basep, bjson.temp );

        const stream = OpenAIStream(resq);
        return new StreamingTextResponse(stream);
    } catch(error) {
        console.log("-=-=-docs.query.route.error-=-=-",error);
        return NextResponse.json({ success: false },{ status: 500 });
    }   
    
    return NextResponse.json({ success: true, data: inqres?.text },{ status: 200 });
}
