import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const embeddings = new OpenAIEmbeddings({
    maxConcurrency: 10,
    maxRetries: 10,
});

export default embeddings;