import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
// import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { Configuration, OpenAIApi } from 'openai-edge'

export const runtime = 'edge';

const askQuery = async (chatHist: any, pages: any, query: string) => {
    // const llm = new OpenAI({ modelName: "gpt-3.5-turbo", temperature: 0, streaming: true });
    // const hm = new HumanChatMessage(query);
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(config)
    
    let hist = ""; 
    let context = "";

    chatHist.map((chat: any) => {
        hist += `${chat.role}: ${chat.message}\n`
    });

    pages?.map((page: any) => {
        context += `{text:${page.content}, score:${page.similarity*100}}`;
    });

    const qaTemplate1 = 
`Answer the question based on the context below. You should follow ALL the following rules when generating an answer:
- There will be a CONVERSATION LOG, CONTEXT, and a QUESTION.
- The CONVERSATION LOG is past conversation between user and you the "ai".
- Do not mention the CONTEXT or the CONVERSATION LOG in the answer, but use them to generate the answer.
- The final answer must always be styled using markdown.
- Your main goal is to point the user to provide the right information based on the CONTEXT you are given.
- Your secondary goal is to provide the user with an answer that is relevant to the question.
- Provide the user with a code example that is relevant to the question, if the context contains relevant code examples. Do not make up any code examples on your own.
- Take into account the entire conversation so far, marked as CONVERSATION LOG, but prioritize the CONTEXT.
- The CONTEXT is a set of JSON objects, each includes the field "text" where the content is stored, and "score" where the similarity is stored.
- ALWAYS prefer the result with the highest "score" value.
- Do not make up any answers if the CONTEXT does not have relevant information.
- Use bullet points, lists, paragraphs and text styling to present the answer in markdown.
- ALWAYS prefer the result with the highest "score" value.
- The answer should only be based on the CONTEXT. Do not use any external sources. Do not generate the response based on the question without clear reference to the context.
- Summarize the CONTEXT to make it easier to read, but don't omit any information.

CONVERSATION LOG: {hist}

CONTEXT: {context}

QUESTION: {query}

Final Answer:`;

const qaTemplate = 
`You are a helpful ai assistant providing the user the required information based on the CONTEXT, a CONVERSATION LOG, and a QUESTION. The CONVERSATION LOG is the past conversation between you and user.
Use CONTEXT to provide answer to QUESTION. Do not mention CONTEXT in your conversation. 
If the answer to QUESTION is not present in CONTEXT then simply ask the user to contact admin at admin@gmail.com.

CONVERSATION LOG: ${hist}

CONTEXT: ${context}

QUESTION: ${query}

Final Answer:`;

    // console.log("-=--=-=-=-");  
    // const inquiryChain = new LLMChain({
    //     llm,
    //     prompt: new PromptTemplate({
    //         template: qaTemplate,
    //         inputVariables: ["hist", "context", "query"],
    //     }),
    // });
    // //const hist = JSON.stringify(chatHist);
    // console.log("-=--=-=-=-",context);
    // const inquirerChainResult = await inquiryChain.call({
    //     query,
    //     hist,
    //     context
    // }, [
    //     {
    //         handleLLMNewToken(token: string) {
    //             process.stdout.write(token);
    //         },
    //     },
    // ]);
    const resq = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        temperature: 0.0,
        messages: [{role: "system", content: qaTemplate}],
    });
    return resq;
    // console.log("-=--=-=-=-",inquirerChainResult);
    // return inquirerChainResult;
}

export default askQuery;