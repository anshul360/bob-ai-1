import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
// import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { Configuration, OpenAIApi } from 'openai-edge'

const createQuery = async (chatHist: any, query: string) => {
    const llm = new OpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });
    // const hm = new HumanChatMessage(query);
    let hist = "";
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(config);

    chatHist.map((chat: any, i: number) => {
        if(i < chatHist.length-1) hist += `${chat.role}: ${chat.message}\n`
    });

    const prompt1 = 
`Given the following user prompt and conversation log, formulate a question that would be the most relevant to provide the user with an answer from a knowledge base.
You should follow the following rules when generating and answer:
- Always prioritize the USER PROMPT over the CONVERSATION LOG.
- Ignore any conversation log that is not directly related to the user prompt.
- Only attempt to answer if a question was posed.
- The question should be a single sentence.
- You should remove any punctuation from the question.
- You should remove any words that are not relevant to the question.
- If you are unable to formulate a question, respond with the same USER PROMPT you got.

USER PROMPT: ${query}

CONVERSATION LOG: ${hist}

Final answer:`;

    const prompt2 = 
`Formulate a new query based on the PROMPT so that it can be used to retrieve data from a knowledge base.
Consider CONVERSATION LOG to set the context for the formulated query, 
Ignore any conversation in CONVERSATION LOG unrelated to PROMPT.
If there is no query in the PROMPT or PROMPT doesn't make sense then simply respond back the exact PROMPT as Final answer.

CONVERSATION LOG: ${hist}

PROMPT: ${query}

Final answer:`;

    const prompt3 = 
`AS an assistant formulate a query that is meaningful on its own based on past conversation (if any).
- Respond back in JSON format with "type" and "content". 
- "type" can have 2 values: "greeting", "question" based on the latest PROMPT. "content" will depend on the "type".
- If the latest PROMPT's type=question then "content"=<formulated query>. Else if type=greeting then "content"=<PROMPT>.
- You should remove any words that are not relevant to the query.`;

// PROMPT: ${query}`;
// Your response should either be the formulated question by you OR the user prompt. If there is no question then respond back the prompt. If there is nothing to reframe then simply respond back the same user prompt.
    const prompt4 = 
`You are a helpful ai assistant and the conversation is the past conversation between you and user.
Based on the conversation, formulate a question from the user prompt so that it can be used to retrieve data from a knowledge base.
Ignore any unrelated conversation.
If there is no query in the user prompt or user prompt doesn't make sense then simply respond back the exact user prompt as answer.

Final answer:`;
    const messages: any[] = [];

    messages.push({"role": "system", "content": prompt2});
    // chatHist.map((chat: any) => {
    //     const role = chat.role=="user"?"user":"assistant";
    //     messages.push({"role":role,"content":chat.message});
    // });
    // messages.push({"role":"user","content":query});

    // console.log("-=--=-=-=-");  
    // const inquiryChain = new LLMChain({
    //     llm,
    //     prompt: new PromptTemplate({
    //         template: prompt2,
    //         inputVariables: ["query", "hist"],
    //     }),
    // });
    // //const hist = JSON.stringify(chatHist);
    // console.log("-=--=-=-=-",hist);
    // const inquirerChainResult = await inquiryChain.call({
    //     query,
    //     hist,
    // });
    // console.log(messages);
    const resq = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: false,
        temperature: 0.0,
        messages: messages,
    });
    // return resq;
    const respj = await resq.json()

    console.log("-=--=-=-=-",respj.choices[0].message);
    return respj.choices[0].message;
}

export default createQuery;
