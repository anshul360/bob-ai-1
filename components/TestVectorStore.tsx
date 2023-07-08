'use client'

import Button from '@/components/ui/Button';
import { useState } from 'react';
import { run } from "@/library/vector_store/test_supabaseVS"
import { Session } from '@supabase/supabase-js';

export default function SBVS({session}: {session: Session | null}) {
    const [ loading, setLoading ] = useState(false);
    
    async function sbvs() {
        setLoading(true);
        await run();
        setLoading(false);
    }
    
    return(
        <div className=" flex w-full ">
          <Button
            variant="slim"
            type="button"
            disabled={!session}
            loading={loading}
            onClick={() => sbvs()}
            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
          >
            Call Supabase VS
          </Button>
        </div>
    );
}