// import fetchDocumentsViaHyde from '@/lib/pinecone/retrieveEmbeddings';
import createQuery from '@/library/llm/createquery';
import { NextResponse, NextRequest, NextMiddleware } from 'next/server'

// export async function GET(request: NextRequest, response: NextResponse) {

// }

export async function POST(request: NextRequest) {
    // const json  = await request.json();
    
    //get chat history
    const chatHist = [
        {"role":"user","message":"Where do you live?"},
        {"role":"assistant","message":"In USA"}
    ];
    

    //recreate question
    if(chatHist) {
        createQuery(chatHist, "which city?");
    }

    //retrieve

    //summarize(optional)

    //QA

    const results = ""//await fetchDocumentsViaHyde(json.query, 5);

    // console.log(results);
    
    return NextResponse.json({ success: true, results },{ status: 200 })
}