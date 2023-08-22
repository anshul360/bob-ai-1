import { createServerSupabaseClient, getBotConfig, getSession, getSubscriptionAll, getUserDetails } from "@/app/supabase-server";
import { redirect } from "next/navigation";
import Chatbots from "./chatbots";
import ChatbotView from "./chatbotview";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default async function ConversationsPage({searchParams}: any) {
    const supabase = createServerSupabaseClient();
    const [session, { data: { user } }, userd, subscriptions] = await Promise.all([
        getSession(),
        supabase.auth.getUser(),
        getUserDetails(),
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

    if(!userd?.sub_active) return <>
        <div className=" flex w-full justify-center min-w-[1024px] bg-black ">
            <div className=" flex max-w-[90%] w-full h-full gap-4 flex-col relative ">
                <section className=" bg-zinc-900 w-full border-0 rounded-md border-[#00ffff] ">
                    <div className=" px-4 py-2 sm:px-6 lg:px-8 ">
                        <div className="sm:align-center flex flex-col gap-1 justify-end items-center ">
                            <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                                Subscription Expired
                            </h1>
                            <p className=" text-white text-2xl mt-8">Visit <Link href="/pricing" className=" underline hover:text-[#00ffff]">Pricing tab</Link> to start a subscription.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </>
    
    return <div className=" flex w-full justify-center min-w-[1024px] bg-black ">
        <ToastContainer />
        {searchParams?.id?
        <ChatbotView chatbot={chatbot} subscription={subscription} user={user} userd={userd} />:
        <Chatbots user={user} botcountl={(userd.sub_chatbots ?? 0) + (userd.addon_chatbots ?? 0)} />}
    </div>
}