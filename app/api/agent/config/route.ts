import { getBotConfigJS } from "@/app/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const botid = searchParams.get("botid");
    
    if(botid) {
        const res = await getBotConfigJS(botid);
        console.log(res);
        if(res.success && res.data.length > 0) {
            return NextResponse.json({ success: true, data: res.data[0] },{ status: 200 });
        }
    }
    return NextResponse.json({ success: false },{ status: 500 });
}