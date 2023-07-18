import { createServerSupabaseClient, getSubscriptionAll } from '@/app/supabase-server';
import Botconfig from "./botconfig";
import { redirect } from 'next/navigation';

export default async function ChatbotConfigPage({searchParams}: any) {
    const supabase = createServerSupabaseClient();
    // const { data: { user } } = await supabase.auth.getUser();
    const [subscription, { data: { user } }] = await Promise.all([
        getSubscriptionAll(),
        supabase.auth.getUser()
    ]);

    let validSub: any;
    subscription?.map((sub: any) => {
        if(sub.prices.products.name != "API Access") {
            validSub = sub;
        }
    });

    if(!user) return redirect('/signin');
    
    return <Botconfig botId={searchParams?.id} subscription={validSub}/>
}