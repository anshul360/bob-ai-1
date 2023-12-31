"use server"

import askQuery from "@/library/llm/askquery_v1";
import retrieveEmbeddings from "@/library/vector_store/retrieve/retrieveEmbeddings_v1";
import rateLimit from "@/utils/ratelimit";
import { checkIfChatbotExists, getMsgCFromUser, saveConversationApi, saveMsgCToUser } from "@/utils/supabase-admin";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import * as OpenAI from 'openai';
import { headers } from 'next/headers'

// export const runtime = 'edge';

type ChatMessage = {
    content: string,
    role: "assistant" | "user"
}

type ChatAPIRequest = {
    messages: ChatMessage[]
    stream: boolean
    creativity?: number
    conversation_id?: string
}

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
});
export async function OPTIONS(request: NextRequest) {
    // const res = NextResponse.next()
    const origin = request.headers.get("origin");
    // res.headers.append('Access-Control-Allow-Origin', origin!);
    // res.headers.append('Access-Control-Allow-Credentials', "true")
    // res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    // res.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length')
    const res_headers = {
        'Access-Control-Allow-Origin': origin!,
        'Access-Control-Allow-Credentials': "true",
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
        "Access-Control-Max-Age": "86400"
    }
    return new Response(null, {
        status: 200,
        headers: res_headers,
    })
}

export async function POST(request: NextRequest) {
    // const res = NextResponse.next()
    const origin = request.headers.get("origin");
    // res.headers.append('Access-Control-Allow-Origin', origin!);
    // res.headers.append('Access-Control-Allow-Credentials', "true")
    // res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    // res.headers.append(
    //     'Access-Control-Allow-Headers',
    //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    // )
    const res_headers = {
        'Access-Control-Allow-Origin': origin!,
        'Access-Control-Allow-Credentials': "true",
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
        "Access-Control-Max-Age": "86400"
    }

    try {
        const bjson: ChatAPIRequest = await request.json();
        // const headersList = headers()
        // console.log("-=-=",bjson);
        const path = request.nextUrl.pathname.split("/");
        const bot_uuid = path[path.length - 1];
        let userid = request.headers.get("x-current-user")!
        if(!userid) {
            userid = headers().get("x-current-user")!;
        }

        // console.log("+_+_+_", request.headers.has("x-curRent-UsEr"), headers().has("x-curRent-UsEr"));
        // console.log("+_+_+_", request.headers.has("x-curRent-UsEr"));
        // request.headers.forEach((val, key) => {
        //     console.log(val, "____", key);
        // })
        // console.log("_-_-_-_-_");

        const check_chatbot = await checkIfChatbotExists(userid, bot_uuid);
        console.log(check_chatbot);

        if(check_chatbot && check_chatbot.data?.length > 0) {
            let chathist, pages;
            const ipaddr = request.ip || request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for');
            
            const geo = {
                ip: ipaddr, 
                city: request.headers.get("x-vercel-ip-city"),
                country: request.headers.get("x-vercel-ip-country"),
                region: request.headers.get("x-vercel-ip-country-region"),
                latitude: request.headers.get("x-vercel-ip-latitude"),
                longitude: request.headers.get("x-vercel-ip-longitude")
            }
            // console.log("-=-=geo-=-",request.geo,headerregion);
            console.log("-=-=geo-=-",ipaddr);
            try {
                await limiter.check(check_chatbot.data[0].req_per_min, ipaddr+"-"+bot_uuid);
            } catch(e) {
                console.log("-=-=429-=-=-", e);
                return NextResponse.json({ message: 'rate limit exceeded' },{status: 429, headers: res_headers});
            }

            //message count 
            const resml = await getMsgCFromUser(userid);

            const msglim = resml.data[0].sub_messages + resml.data[0].addon_messages;
            saveMsgCToUser(userid, resml.data[0].consumed_messages + 1).catch();
            if(msglim <= resml.data[0].consumed_messages) {
                return NextResponse.json({ message: 'message limit exceeded' },{status: 429, headers: res_headers});
            }

            //chat
            chathist = bjson.messages.slice(-7) || []

            const queryarr = chathist.splice(chathist.length - 1, 1)
            console.log("+_+_+_+", queryarr, chathist)

            try {
                // inqres = await createQuery(chathist, bjson.query );
                
                //retrieve
                if(chathist.length > 0 && queryarr.length > 0) {
                        pages = await retrieveEmbeddings( check_chatbot.data[0].id, queryarr[0].content );
                } else throw "Unable to build inquiry";
        
                //summarize(optional)
        
                //QA
                const resq = await askQuery( chathist, pages, queryarr[0].content, check_chatbot.data[0].base_prompt, bjson.creativity || 0, bjson.stream );
        
                if(resq.status == 429)
                    return NextResponse.json({ message: 'rate limit exceeded' },{status: 429, headers: res_headers});
        
                if(bjson.stream) {
                    console.log("+_+_+streaming");
                    const stream = OpenAIStream(resq, {
                          
                        //save to server
                        onCompletion: async (completion: string) => {
                            if(bjson.conversation_id) await saveCompletionToDatabase(completion, check_chatbot.data[0].id, bjson, userid, geo);
                        }
                    });
                    return new StreamingTextResponse(stream, {headers: res_headers});
                } else {
                    console.log("+_+_+full text");
                    const openai_res = await resq.json();
                    const cyan_res = openai_res.choices[0].message
                    //save to server
                    if(bjson.conversation_id) await saveCompletionToDatabase(cyan_res.content, check_chatbot.data[0].id, bjson, userid, geo);
                    return NextResponse.json({...cyan_res },{status: 200, headers: res_headers});
                }
            } catch(error) {
                console.log("-=-=-docs.query.route.error-=-=-",error);
                if (error instanceof OpenAI.APIError) {
                    const { name, status, headers, message } = error;
                    return NextResponse.json({ name, status, headers, message }, { status, headers: res_headers });
                } else {
                    return NextResponse.json({ message: "internal server error" },{ status: 500, headers: res_headers });
                }
            }   

        } else {
            return NextResponse.json({ message: "invalid chatbot id" }, { status: 400, headers: res_headers });
        }
    
        // return NextResponse.json({ success: true, data1: check_chatbot.data, check: true }, { status: 200 });
    } catch (exp) {
        console.log(exp)
        return NextResponse.json({ message: "internal server error" }, { status: 500, headers: res_headers });
    }
}

async function saveCompletionToDatabase(completion: string, botid: string, req: ChatAPIRequest, userid: string, geo: any) {
    const chat = []
    req.messages.map((val) => {
        chat.push({role: val.role, message: val.content})
    }) 
    chat.push({role: "assistant", message: completion})
    const res = await saveConversationApi(req.conversation_id!, chat, botid, userid, geo);
    console.log("+_+saveCompletionToDatabase_+_",res);
}