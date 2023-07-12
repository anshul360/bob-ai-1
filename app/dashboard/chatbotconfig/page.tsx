import { createServerSupabaseClient } from '@/app/supabase-server';
import Botconfig from "./botconfig";
import { redirect } from 'next/navigation';

export default async function ChatbotConfigPage() {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if(!user) return redirect('/signin');
    
    return <Botconfig />
}