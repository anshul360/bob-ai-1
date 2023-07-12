import Pricing from '@/components/Pricing';
import {
  getSession,
  getSubscriptionAll,
  getUserLeads,
  createServerSupabaseClient,
  getUserBots
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import SelectBot from './selectBot';

export default async function DashboardPage() {
    const supabase = createServerSupabaseClient();
    const [session, subscription, { data: { user } }] = await Promise.all([
        getSession(),
        getSubscriptionAll(),
        supabase.auth.getUser()
    ]);
    // console.log("=--=",user);
    const userLeads = await getUserLeads(user?.id!);
    const userBots = await getUserBots(user?.id!);

    if (!session) {
        return redirect('/signin');
    }
    
    // const {
    //     data: { user }
    // } = ;

    return (
        <>
            <div className=" flex w-full justify-center flex-col md:flex-row gap-4 ">
                <SelectBot user={user} subscription={subscription} userLeads={userLeads} userBots={userBots}/>
            </div>
        </>
    );
}
