import { DocxLoader } from "langchain/document_loaders/fs/docx";

export default async function docxLoader(path: string) {
    const loader = new DocxLoader(
      path //"src/document_loaders/tests/example_data/attention.docx"
    );
      
    const docs = await loader.load();

    let charCount = 0;
    docs.map((doc => charCount+=doc.pageContent.length))

    return { docs, charCount };
}

export async function docxLoaderBlob(fblob: Blob) {
  const loader = new DocxLoader(
    fblob //"src/document_loaders/tests/example_data/attention.docx"
  );
    
  const docs = await loader.load();

  let charCount = 0;
  docs.map((doc => charCount+=doc.pageContent.length))

  return { docs, charCount };
}
