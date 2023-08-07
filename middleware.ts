import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types_db'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  // console.log("==bef--",req.headers.get("cookie"));
  // const uuid = req.cookies.get("visuuid");
  const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  // console.log("=-=-=-=-=",auth.data.session)
  // console.log("==aft--",res.headers);
  // if(uuid) {
  //   // if(!res.headers.get("cookie")?.includes("visuuid")) {
  //     // res.headers.append('set-cookie',`${uuid.name}=${uuid.value}`);
  //     res.headers.append('cookie',`${uuid.name}=${uuid.value}`);
  //   // }
  // }
  // res.cookies = req.cookies;
  // console.log("==aft--",res.headers);
  // if(!auth.data.session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }
  return res
}