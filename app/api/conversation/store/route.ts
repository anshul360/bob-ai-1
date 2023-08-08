import { saveUserConversation } from "@/app/supabase-server";
import { NextRequest, NextResponse } from "next/server";

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
    upchatinst.geo = request.geo;
    const ressuv = await saveUserConversation(upchatinst);
    if(ressuv.success) {
        return NextResponse.json({ success: true, data:[...ressuv.data] }, { status: 200 });
    }
    return NextResponse.json({ success: false }, { status: 500 });
}