import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export default async function textSplitter (doc: Document[], chunk_size: number, chunk_overlap: number) {
    // const text = `Hi.\n\nI'm Harrison.\n\nHow? Are? You?\nOkay then f f f f.
    // This is a weird text to write, but gotta test the splittingggg some how.\n\n
    // Bye!\n\n-H.`;
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: chunk_size,//300,
        chunkOverlap: chunk_overlap//20,
    });

    const docOutput = await splitter.splitDocuments(doc);

    return docOutput;
}
