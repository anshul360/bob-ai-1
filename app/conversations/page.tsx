import { createServerSupabaseClient, getSession, getUserConversation, getUserDetailsId } from "@/app/supabase-server";
import { notFound, redirect } from "next/navigation";
import Conversations from "./conversations";
import ConversationView from "./conversationview";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

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

    const userd = await getUserDetailsId(session?.user.id!);
    if(!userd?.sub_active) return <>
        <div className=" flex w-full justify-center min-w-[1024px] bg-black ">
            <div className=" flex max-w-[90%] w-full h-full gap-4 flex-col relative ">
                <section className=" bg-zinc-900 w-full border-0 rounded-md border-[#00ffff] ">
                    <div className=" px-4 py-2 sm:px-6 lg:px-8 ">
                        <div className="sm:align-center flex flex-col gap-1 justify-end items-center ">
                            <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                                Subscription Inactive
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
        <ConversationView conversation={convo} userid={user?.id}/>:
        <Conversations user={user}/>}
    </div>
}