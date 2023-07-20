'use server'

import { createClient } from "@supabase/supabase-js";
import embeddings from "@/library/llm/embeddings";
// import { Document } from "langchain/document";
// import { saveEmbeddings, saveMainDocument } from "@/app/supabase-server";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const privateKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);


const retrieveEmbeddings = async ( botid: string, query: string ) => {
    const client = createClient(url, privateKey);
    const v_embeddings = await embeddings.embedQuery(query);

    const { error: matchError, data: pageSections } = await client.rpc(
        'match_documents',
        {
            query_embedding: v_embeddings,
            botid,
            match_count: 5,
        }
    )
    console.log("-=-pages-=-", pageSections);
    console.log("-=-error-=-", matchError);
    return pageSections;
}

export default retrieveEmbeddings;