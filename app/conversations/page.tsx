import { createServerSupabaseClient, getSession, getUserConversation } from "@/app/supabase-server";
import { notFound, redirect } from "next/navigation";
import Conversations from "./conversations";
import ConversationView from "./conversationview";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function ConversationsPage({searchParams}: any) {
    const supabase = createServerSupabaseClient();
    const [session, { data: { user } }] = await Promise.all([
        getSession(),
        supabase.auth.getUser()
    ]);
    
    if (!session) return redirect('/signin');
    let convo;
    if(searchParams?.id) {
        const resc = await getUserConversation(searchParams.id, user?.id!);
        // console.log("-=-=-=-=",resl);
        if(!resc || resc.length == 0) notFound();
        convo = resc[0];
    }

    return <div className=" flex w-full justify-center min-w-[1024px] ">
        <ToastContainer />
        {searchParams?.id?
        <ConversationView conversation={convo} userid={user?.id}/>:
        <Conversations user={user}/>}
    </div>
}