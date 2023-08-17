import { createServerSupabaseClient, getBotConfig, getSession, getSubscriptionAll } from "@/app/supabase-server";
import { redirect } from "next/navigation";
import Chatbots from "./chatbots";
import ChatbotView from "./chatbotview";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function ConversationsPage({searchParams}: any) {
    const supabase = createServerSupabaseClient();
    const [session, { data: { user } }, subscriptions] = await Promise.all([
        getSession(),
        supabase.auth.getUser(),
        getSubscriptionAll()
    ]);
    
    if (!session) return redirect('/signin');

    let chatbot: any;
    if(searchParams?.id) {
        const res = await getBotConfig(searchParams.id, user?.id!);
        chatbot = res.data[0];
    }

    let subscription: any;
    subscriptions?.map((sub: any) => {
        if(sub.prices.products.name != "API Access") {
            subscription = sub;
        }
    });
    
    return <div className=" flex w-full justify-center min-w-[1024px] bg-black ">
        <ToastContainer />
        {searchParams?.id?
        <ChatbotView chatbot={chatbot} subscription={subscription} user={user} />:
        <Chatbots user={user} />}
    </div>
}