// import fetchDocumentsViaHyde from '@/lib/pinecone/retrieveEmbeddings';
import askQuery from '@/library/llm/askquery';
import createQuery from '@/library/llm/createquery';
import retrieveEmbeddings from '@/library/vector_store/retrieve/retrieveEmbeddings';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { getMsgCFromUser, getUserIdFromBot, saveMsgCToUser } from '@/utils/supabase-admin';
import rateLimit from '@/utils/ratelimit';

// export async function GET(request: NextRequest, response: NextResponse) {

// }
const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    // uniqueTokenPerInterval: 5000, // Max 5000 users per second
});

export async function POST(request: NextRequest) {
    const { ...bjson } = await request.json();
    let inqres, chathist, pages;
    const ipaddr = request.ip || request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for');
    console.log("-=-=geo-=-",request.geo);
    console.log("-=-=geo-=-",ipaddr);
    try {
        await limiter.check(bjson.reqpm, ipaddr+"-"+bjson.botId);
    } catch(e) {
        console.log("-=-=429-=-=-", e);
        return NextResponse.json({ success: false, error: 'Rate limit exceeded', reason: 'bot_settings' },{status: 429});
    }
    // return NextResponse.json({ success: false, error: 'Rate limit exceeded' },{status: 400});
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
    
    try {
        inqres = await createQuery(chathist, bjson.query );

        //retrieve
        if(inqres?.content) {
                pages = await retrieveEmbeddings( bjson.botId, inqres.content );
        } else throw "Unable to build inquiry";

        //summarize(optional)

        //QA
        const resq = await askQuery( chathist, pages, inqres.content, bjson.basep, bjson.temp );

        if(resq.status == 429)
            return NextResponse.json({ success: false, error: 'Rate limit exceeded', reason: 'openai' },{status: 429});

        const stream = OpenAIStream(resq);
        return new StreamingTextResponse(stream);
    } catch(error) {
        console.log("-=-=-docs.query.route.error-=-=-",error);
        return NextResponse.json({ success: false },{ status: 500 });
    }   
    
    // return NextResponse.json({ success: true, data: inqres?.text },{ status: 200 });
}
