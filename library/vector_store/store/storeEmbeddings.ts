'use server'

// import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { User, createClient } from "@supabase/supabase-js";
import embeddings from "@/library/llm/embeddings";
import { Document } from "langchain/document";
import { deleteEQAMainDocAndEmbeddings, deleteMainDocAndEmbeddings, getQAdoc, saveEmbeddings, saveMainDocument, updateMainDocument } from "@/app/supabase-server";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const privateKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);


const storeEmbeddings = async (docsinfo: any, source: string, user: User, botid: string, content: any = {}) => {
    const client = createClient(url, privateKey);

    //TODO: get user uuid
    const userid = user.id;
    let resmd;
    // try {
        //map of doc and doc content
        let pages: string[] = [];
        
        docsinfo.docs.map((doc: Document) => pages.push(doc.pageContent));

        //create embeddings
        const v_embeddings = await embeddings.embedDocuments(pages);

        //conditional checks for QA and revised QA
        if(source == "Q & A") {
            const res = await deleteEQAMainDocAndEmbeddings(botid);
        } else if(source == "Q & A_R") {
            const res = await getQAdoc(botid);
            console.log("-=-=-="+JSON.stringify(res), botid);
            
            const prevqa = res.data.length > 0?[...res.data[0].data]:[];
            prevqa.push({
                "a_value":content[0].a_value,
                "q_value":content[0].q_value
            });
            const contenttemp = [...prevqa];
            const charCounttemp = docsinfo.charCount + (res.data.length > 0?res.data[0].char_count:0);
            
            //update main doc
            if(res.data.length > 0)  resmd = await updateMainDocument(res.data[0].id, charCounttemp, contenttemp);
            else resmd = await saveMainDocument("Q & A", userid, Number(botid), charCounttemp, contenttemp);
        }

        //save main doc
        if(source != "Q & A_R") {
            resmd = await saveMainDocument(source, userid, Number(botid), docsinfo.charCount, content);
        }

        //save embeddings
        if(resmd.success) {
            for(let i = 0; i < docsinfo.docs.length; i++) {
                await saveEmbeddings(docsinfo.docs[i].pageContent, docsinfo.docs[i].metadata, v_embeddings[i], userid, Number(botid), resmd.data[0]?.id);
            }
        } else {
            throw "unable to create document: "+resmd.msg;
        }
    // } catch(e) {
    //     console.log("==-st=-=-",e);
    // }
};

export default storeEmbeddings;