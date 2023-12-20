"use server"

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types_db'
// import {headers} from "next/headers"

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    // console.log("==bef--",req.headers.get("cookie"));
    // const uuid = req.cookies.get("visuuid");
    const supabase = createMiddlewareClient<Database>({ req, res })
    await supabase.auth.getSession();

    if (req.nextUrl.pathname.startsWith('/api/v1')) {
        console.log("inside api v1");
        const origin = req.headers.get("origin");
        res.headers.append('Access-Control-Allow-Origin', origin!);
        res.headers.append('Access-Control-Allow-Credentials', "true")
        res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
        res.headers.append(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )

        const btoken = req.headers.get("Authorization");
        if (btoken) {
            try {
                const apikey = btoken.split(" ")[1];
                const { data: resuid, error: emsg } =
                    await supabase.from('api_keys').select("user_id").eq('key', apikey);
                if (emsg) return NextResponse.json({ message: " internal server error " }, { status: 500 });
                // console.log(apikey, resuid)
                if (resuid.length > 0) res.headers.append("X-Current-User", resuid[0]?.user_id);
                else return NextResponse.json({ message: "invalid api key" }, { status: 401 });
            } catch (e) {
                console.log(e);
                return NextResponse.json({ message: "internal server error" }, { status: 500 });
            }
        } else {
            return NextResponse.json({ message: "invalid api key" }, { status: 401 });
        }

    }
    // if(req.nextUrl.pathname.startsWith('/supportagent')) {
    //   const path = req.nextUrl.pathname.split("/");

    //   const { data: resuid} = await supabase.from('bots')
    //     .select("id, name, allowed_domains, users(id,email,full_name)").eq("uuid",path[path.length - 1]).throwOnError();
    //     console.log("=-=-OrRef=-=-=",req.headers.get("Origin"), req.headers.get('Referer'))

    //   console.log("-+_+_+_",resuid);
    //   // console.log("-=-=",req.nextUrl.searchParams.get("agentid"),path[path.length - 1]);
    // }

    // [
    //   {
    //     "key": "4Mo56HjEY8RjtmAih9jySODcbD62bh1uK2O6Arw7L8k",
    //     "name": "New Key",
    //     "created_at": "Tue, 25 Jul 2023 11:46:08 GMT"
    //   },
    //   {
    //     "key": "EqIS9vJEtuP7Luawu9FNduJo_CvQWk7_L3Qca084Ods",
    //     "name": "Salesforce Integration",
    //     "created_at": "Tue, 25 Jul 2023 12:08:14 GMT"
    //   },
    //   {
    //     "key": "oII25unZi-zpGhW99LiBmUQdcbelxpND4e2WncmbpMg",
    //     "name": "Zapier integration",
    //     "created_at": "Tue, 25 Jul 2023 12:12:45 GMT"
    //   }
    // ]

    return res
}