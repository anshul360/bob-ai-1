import { getBotConfigJS } from "@/app/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const botid = searchParams.get("botid");
    
    if(botid) {
        const res = await getBotConfigJS(botid);
        console.log(res);
        const data = {
            theme: res.data[0].theme,
            initial_msgs: res.data[0].initial_msgs,
            activate_after: res.data[0].activate_after,
            icon_pos: res.data[0].icon_pos
        };
        if(res.success && res.data.length > 0) {
            return NextResponse.json({ success: true, data },{ status: 200 });
        }
    }
    return NextResponse.json({ success: false },{ status: 500 });
}