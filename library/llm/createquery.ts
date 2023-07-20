import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
// import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

const createQuery = async (chatHist: any, query: string) => {
    const llm = new OpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });
    // const hm = new HumanChatMessage(query);
    let hist = "";

    chatHist.map((chat: any) => {
        hist += `${chat.role}: ${chat.message}\n`
    });

    const prompt1 = 
`Given the following user prompt and conversation log, formulate a question that would be the most relevant to provide the user with an answer from a knowledge base.
You should follow the following rules when generating and answer:
- Always prioritize the user prompt over the conversation log.
- Ignore any conversation log that is not directly related to the user prompt.
- Only attempt to answer if a question was posed.
- The question should be a single sentence.
- You should remove any punctuation from the question.
- You should remove any words that are not relevant to the question.
- If you are unable to formulate a question, respond with the same USER PROMPT you got.

USER PROMPT: {query}

CONVERSATION LOG: {hist}

Final answer:`;

    const prompt2 = 
`You are a helpful ai assistant. The CONVERSATION LOG is the past conversation between you and user.
Based on the CONVERSATION LOG below, reframe the PROMPT from user so that it can be used to retrieve data from a knowledge base.
Ignore any conversation log that is not directly related to the PROMPT.
If there is no query in the PROMPT simply respond back the exact PROMPT.

PROMPT: {query}

CONVERSATION LOG: {hist}

Final answer:`;

    console.log("-=--=-=-=-");  
    const inquiryChain = new LLMChain({
        llm,
        prompt: new PromptTemplate({
            template: prompt2,
            inputVariables: ["query", "hist"],
        }),
    });
    //const hist = JSON.stringify(chatHist);
    console.log("-=--=-=-=-",hist);
    const inquirerChainResult = await inquiryChain.call({
        query,
        hist,
    });

    console.log("-=--=-=-=-",inquirerChainResult);
    return inquirerChainResult;
}

export default createQuery;