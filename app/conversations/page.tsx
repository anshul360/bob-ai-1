import { createServerSupabaseClient, getSession } from "@/app/supabase-server";
import { redirect } from "next/navigation";

export default async function ConversationsPage({searchParams}: any) {
    const supabase = createServerSupabaseClient();
    const [session, { data: { user } }] = await Promise.all([
        getSession(),
        supabase.auth.getUser()
    ]);
    
    if (!session) return redirect('/signin');
    
    return <div className=" flex w-full justify-center ">
        I am Conversations
    </div>
}