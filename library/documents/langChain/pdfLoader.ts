'use server'
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export default async function pdfLoaderPath(path: string, splitPages: boolean = true) {
    const loader = new PDFLoader(
        path, //"src/document_loaders/example_data/example.pdf"
        { splitPages }
        // file
    );

    const docs = await loader.load();

    let charCount = 0;
    docs.map((doc => charCount+=doc.pageContent.length))

    return { docs, charCount };
}

export async function pdfLoaderBlob(fblob: Blob, splitPages: boolean = true) {
    const loader = new PDFLoader(
        fblob, //"src/document_loaders/example_data/example.pdf"
        { splitPages }
        // file
    );

    const docs = await loader.load();

    let charCount = 0;
    docs.map((doc => charCount+=doc.pageContent.length))

    return { docs, charCount };
}