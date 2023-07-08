'use server'

// import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import webLoader from "../documents/langChain/webLoader";


// First, follow set-up instructions at
// https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/supabase
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const privateKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);


export const run = async () => {
    const client = createClient(url, privateKey);
    const docs: any = await webLoader("");

    console.log("--=-=-=-=-=-=-",docs.docs);
    console.log("--=-=-=-=-=-=-",docs.docs[0]);
    console.log("--=-=-=-=-=-=-",docs.charCount);
    // const vectorStore = await SupabaseVectorStore.fromTexts(
    //     ["Hello world", "Bye bye", "What's this?"],
    //     [{ id: 2 }, { id: 1 }, { id: 3 }],
    //     new OpenAIEmbeddings(),
    //     {
    //         client,
    //         tableName: "documents",
    //         queryName: "match_documents",
    //     }
    // );

    // const resultOne = await vectorStore.similaritySearch("wassup world", 1);

    // console.log(resultOne);

    // const v_embeddings = await new OpenAIEmbeddings().embedQuery("wassup world");
    // const v_embeddings = await new OpenAIEmbeddings().embedDocuments(["wassup" , "world"]);

    // console.log("-=-=q emb-=-", v_embeddings);
    // console.log("-=-=q emb-=-", v_embeddings[0]);
    // console.log("-=-=q emb-=-", v_embeddings[1]);

    // const { error: matchError, data: pageSections } = await client.rpc(
    //     'match_documents',
    //     {
    //         query_embedding: v_embeddings,
    //         match_count: 1,
    //     }
    // )
    // console.log("---==-=---===--", pageSections);
    // console.log("---==-=---===--", matchError);
};