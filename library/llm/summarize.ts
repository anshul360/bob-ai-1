import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import * as fs from "fs";

const summarize = async (chathist: any) => {
    const model = new OpenAI({ modelName: "gpt3.5", temperature: 0 });

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const docs = await textSplitter.createDocuments([chathist]);

    // This convenience function creates a document chain prompted to summarize a set of documents.
    const chain = loadSummarizationChain(model, { type: "map_reduce" });
    const res = await chain.call({
        input_documents: docs,
    });

    console.log(JSON.stringify(res));
}

export default summarize;