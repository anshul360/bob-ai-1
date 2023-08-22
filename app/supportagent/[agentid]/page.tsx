// import { useEffect } from "react";
import { getBotConfigUuid } from "@/app/supabase-server";
import Botbody from "./botbody";
import { notFound } from 'next/navigation';

export default async function SupportAgent({ params, searchParams }: { params: { agentid: string }, searchParams: any}) {
    // const supabase = createServerSupabaseClient();
    // const [session, { data: { user } }] = await Promise.all([
    //     getSession(),
    //     supabase.auth.getUser()
    // ]);
    // // const { data: { user } } = await supabase.auth.getUser();
    // if (!session) return redirect('/signin');
    // let lead;
    // if(searchParams?.i) {
    //     const resl = await getLeadWithConversation(searchParams.id);
    //     // console.log("-=-=-=-=",resl);
    //     lead = resl.data[0];
    // }
    
    console.log(params.agentid);
    if(!params.agentid) {
        notFound();
    }
    const bot = await getBotConfigUuid(params.agentid);
    if(bot.success) {
        if(bot.data.length > 0) {
            const subactive = bot.data[0].users?.sub_active ?? false;
            if(!subactive) notFound();
        }
        if( bot.data.length==0 || bot.data[0].visibility=="private" ) {
            notFound();
        }
    } else {
        notFound();
    }
    
    return <div className=" flex w-full h-[100dvh] justify-center ">
        {params.agentid?
        <Botbody botuid={params.agentid} botrecord={bot.data[0]} closeb={searchParams?.i}/>:
        <></>}
    </div>
}