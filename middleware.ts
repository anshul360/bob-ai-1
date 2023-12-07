import { createMiddlewareClient  } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types_db'
// import {headers} from "next/headers"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  // console.log("==bef--",req.headers.get("cookie"));
  // const uuid = req.cookies.get("visuuid");
  const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  // if(req.nextUrl.pathname.startsWith('/supportagent')) {
  //   const path = req.nextUrl.pathname.split("/");

  //   const { data: resuid} = await supabase.from('bots')
  //     .select("id, name, allowed_domains, users(id,email,full_name)").eq("uuid",path[path.length - 1]).throwOnError();
  //     console.log("=-=-OrRef=-=-=",req.headers.get("Origin"), req.headers.get('Referer'))

  //   console.log("-+_+_+_",resuid);
  //   // console.log("-=-=",req.nextUrl.searchParams.get("agentid"),path[path.length - 1]);
  // }
  
  return res
}