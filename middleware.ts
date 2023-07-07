import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types_db'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  // console.log("=-=-=-=-=",auth.data.session)
  // console.log(req.cookies);
  // if(!auth.data.session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }
  return res
}