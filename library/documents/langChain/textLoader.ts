import { TextLoader } from "langchain/document_loaders/fs/text";

export default async function textLoader(path: string) {
    const loader = new TextLoader(path); //"src/document_loaders/example_data/example.txt"

    const docs = await loader.load(); 

    let charCount = 0;
    docs.map((doc => charCount+=doc.pageContent.length))

    return { docs, charCount };  
}
