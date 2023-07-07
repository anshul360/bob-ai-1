'use server'

// import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { User, createClient } from "@supabase/supabase-js";
import embeddings from "@/library/llm/embeddings";
import { Document } from "langchain/document";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const privateKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);


const storeEmbeddings = async (docsinfo: any, source: string, user: User, botid: string) => {
    const client = createClient(url, privateKey);

    //TODO: get user uuid
    const userid = user.id;

    //map of doc and doc content
    let pages: string[] = [];
    
    docsinfo.docs.map((doc: Document) => pages.push(doc.pageContent));

    //create embeddings
    const v_embeddings = await embeddings.embedDocuments(pages);
    console.log(v_embeddings);
    // const vectorStore = await SupabaseVectorStore.fromTexts(
    //     ["Hello world", "Bye bye", "What's this?"],
    //     [{ id: 2 }, { id: 1 }, { id: 3 }],
    //     embeddings,
    //     {
    //         client,
    //         tableName: "documents",
    //         queryName: "match_documents",
    //     }
    // );

    // const resultOne = await vectorStore.similaritySearch("wassup world", 1);

    // console.log(resultOne);

    const { error: matchError, data: pageSections } = await client.rpc(
        'match_documents',
        {
            query_embedding: v_embeddings,
            match_count: 10,
        }
    )
    console.log("---==-=---===--", pageSections);
    if(matchError) {
        console.log("---==-=---===--", matchError);
        throw `store embeddings failed: ${matchError}`;
    }
};

export default storeEmbeddings;