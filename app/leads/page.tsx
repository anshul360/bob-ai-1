import { createServerSupabaseClient, getLeadWithConversation, getSession, getUserLeads } from "@/app/supabase-server";
import Leads from "./leads";
import { redirect } from "next/navigation";
import LeadView from "./leadview";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export default async function LeadsPage({searchParams}: any) {
    const supabase = createServerSupabaseClient();
    const [session, { data: { user } }] = await Promise.all([
        getSession(),
        supabase.auth.getUser()
    ]);
    // const { data: { user } } = await supabase.auth.getUser();
    if (!session) return redirect('/signin');
    let lead;
    if(searchParams?.id) {
        const resl = await getLeadWithConversation(searchParams.id, user?.id!);
        // console.log("-=-=-=-=",resl);
        lead = resl.data[0];
    }
    
    return <div className=" flex w-full justify-center min-w-[1024px] ">
        <ToastContainer />
        {searchParams?.id?
        <LeadView lead={lead}/>:
        <Leads user={user} />}
    </div>
}