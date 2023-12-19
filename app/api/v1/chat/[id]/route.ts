import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // console.log(request);
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
    const path = request.nextUrl.pathname.split("/");

    return NextResponse.json({ success: true, path: path[path.length - 1], current_user: request.headers.get("x-current-user") }, { status: 200 });
}