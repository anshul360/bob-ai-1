import { saveUserConversation } from "@/app/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    // const supabase = createRouteHandlerClient<Database>({cookies});
    // const {
    //     data: { user }
    // } = await supabase.auth.getUser();

    // if(!user) {
    //     return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    // }
    const { ...upchatinst } = await request.json();
    console.log(upchatinst);
    const ipaddr = request.ip || request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for');
    upchatinst.geo = request.geo;
    upchatinst.geo.ip = ipaddr;
    console.log("--from store geo--", request.geo);
    console.log("--from store geo ip--", ipaddr);
    const ressuv = await saveUserConversation(upchatinst);
    if(ressuv.success) {
        return NextResponse.json({ success: true, data:[...ressuv.data] }, { status: 200 });
    }
    return NextResponse.json({ success: false }, { status: 500 });
}