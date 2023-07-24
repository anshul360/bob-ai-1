import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
// import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { Configuration, OpenAIApi } from 'openai-edge'

export const runtime = 'edge';

const askQuery = async (chatHist: any, pages: any, query: string, basep: string, temp: number) => {
    // const llm = new OpenAI({ modelName: "gpt-3.5-turbo", temperature: 0, streaming: true });
    // const hm = new HumanChatMessage(query);
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(config);

    let hist = ""; 
    let context = "";

    chatHist.map((chat: any, i: number) => {
        if(i < chatHist.length-1) hist += `"${chat.role}": "${chat.message}"\n`
    });

    pages?.map((page: any) => {
        context += `{"text":"${page.content}", "score":"${page.similarity*100}"}`;
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
`${basep}

CONVERSATION LOG: ${hist}

CONTEXT: ${context}

QUESTION: ${query}

Final Answer:`;

    const qaTemplate2 = 
`${basep}

CONTEXT: ${context}`;

    const qaTemplate3 = 
`Your name is "Dhondu" and you are a helpful ai assistant providing the user the required information based on the CONTEXT provided below.
CONTEXT is in collections of JSON with "text" as the content and "score" as the relevancy of the content to user query. Use CONTEXT for responding. Do not mention CONTEXT in your conversation.
If the answer is not present in CONTEXT then simply ask the user to contact admin at admin@gmail.com.

CONTEXT: ${context}`;

    const messages: any[] = [];

    messages.push({"role": "system", "content": qaTemplate});
    // chatHist.map((chat: any) => {
    //     const role = chat.role=="user"?"user":"assistant";
    //     messages.push({"role":role,"content":chat.message});
    // });
    // messages.pop();
    // messages.push({"role":"user","content":query});

    console.log("*************");
    console.log(messages);

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
        temperature: temp,
        messages: messages,
    });
    return resq;
    // console.log("-=--=-=-=-",inquirerChainResult);
    // return inquirerChainResult;
}

export default askQuery;
