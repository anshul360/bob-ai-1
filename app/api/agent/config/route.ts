import { getBotConfigJS } from "@/app/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const botid = searchParams.get("botid");
    
    if(botid) {
        const res = await getBotConfigJS(botid);
        // console.log(res);
        const subactive = res.data[0].users?.sub_active ?? false;
        const data = res.data[0].visibility == "public" && subactive?{
            theme: res.data[0].theme,
            initial_msgs: res.data[0].initial_msgs,
            activate_after: res.data[0].activate_after,
            icon_pos: res.data[0].icon_pos,
            bubble_msg: res.data[0].bubble_msg,
        }:
        {load:0};
        if(res.success && res.data.length > 0) {
            return NextResponse.json({ success: true, data },{ status: 200 });
        }
    }
    return NextResponse.json({ success: false },{ status: 500 });
}