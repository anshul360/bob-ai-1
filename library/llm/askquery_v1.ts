import { Configuration, OpenAIApi } from 'openai-edge'

const askQuery = async (chatHist: any, pages: any, query: string, basep: string, temp: number, stream: boolean) => {
    // const llm = new OpenAI({ modelName: "gpt-3.5-turbo", temperature: 0, streaming: true });
    // const hm = new HumanChatMessage(query);
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(config);

    let hist = ""; 
    let context = "";

    chatHist.map((chat: any, i: number) => {
        if(i < chatHist.length-1) hist += `"${chat.role}": "${chat.content}"\n`
    });

    // pages?.map((page: any) => {
    //     context += `{"text":"${page.content}", "score":"${page.similarity*100}"}`;
    // });
    pages?.map((page: any) => {
        if(page.similarity*100 > 70)
            context += `${page.content} \n`;
    });


    const qaTemplate4 = 
`${basep}`;   

    const messages: any[] = [];

    messages.push({"role": "system", "content": qaTemplate4 + `\n\nInfo:\n\n ${context?context:"no info available"}`});
    // messages.push({"role": "system", "content": });
    messages.push(...chatHist);
    messages.push({"content":query, "role":"user"});

    console.log("*************");
    console.log(messages);

    const resq = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo-0613',
        stream: stream,
        temperature: temp,
        messages: messages,
    });
    return resq;
}

export default askQuery;
