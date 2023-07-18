import { createServerSupabaseClient, getBotWithLeads, getSession } from "@/app/supabase-server";
import { redirect } from "next/navigation";
import Chatbots from "./chatbots";
import ChatbotView from "./chatbotview";

export default async function ConversationsPage({searchParams}: any) {
    const supabase = createServerSupabaseClient();
    const [session, { data: { user } }] = await Promise.all([
        getSession(),
        supabase.auth.getUser()
    ]);
    
    if (!session) return redirect('/signin');

    let chatbot: any;
    if(searchParams?.id) {
        const res = await getBotWithLeads(searchParams.id);
        chatbot = res.data[0];
    }
    
    return <div className=" flex w-full justify-center ">
        {searchParams?.id?
        <ChatbotView chatbot={chatbot} />:
        <Chatbots user={user} />}
    </div>
}