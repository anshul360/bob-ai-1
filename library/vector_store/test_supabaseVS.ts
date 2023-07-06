'use server'

import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";


// First, follow set-up instructions at
// https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/supabase
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const privateKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);


export const run = async () => {
    const client = createClient(url, privateKey);

    const vectorStore = await SupabaseVectorStore.fromTexts(
        ["Hello world", "Bye bye", "What's this?"],
        [{ id: 2 }, { id: 1 }, { id: 3 }],
        new OpenAIEmbeddings({ openAIApiKey: "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" }),
        {
            client,
            tableName: "documents",
            queryName: "match_documents",
        }
    );

    const resultOne = await vectorStore.similaritySearch("wassup world", 1);

    console.log(resultOne);
};