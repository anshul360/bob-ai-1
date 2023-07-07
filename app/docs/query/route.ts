// import fetchDocumentsViaHyde from '@/lib/pinecone/retrieveEmbeddings';
import { NextResponse, NextRequest, NextMiddleware } from 'next/server'

// export async function GET(request: NextRequest, response: NextResponse) {

// }

export async function POST(request: NextRequest) {
    const json  = await request.json();

    const results = ""//await fetchDocumentsViaHyde(json.query, 5);

    console.log(results);
    
    return NextResponse.json({ success: true, results },{ status: 200 })
}