import { Browser, Page, PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import chromium from 'chrome-aws-lambda';
import { Document } from "langchain/document";

export default async function webLoader (path: string) {
    const loader = new PuppeteerWebBaseLoader("https://scouthangout.com", {
        launchOptions: {
            headless: "new",
            executablePath: await chromium.executablePath
        },
        gotoOptions: {
            waitUntil: "domcontentloaded",
            timeout: 60000,
        },
        
        /** Pass custom evaluate, in this case you get page and browser instances */
        async evaluate(page: Page, browser: Browser) {
            // let browser1 = await chromium.puppeteer.launch({
            //     args: chromium.args,
            //     defaultViewport: chromium.defaultViewport,
            //     executablePath: await chromium.executablePath,
            //     headless: true,
            //     ignoreHTTPSErrors: true,
            // });
        
            // let page1 = await browser1.newPage();
            // console.log("-=-=-=-=async started");
            await page.goto("https://scouthangout.com", {timeout: 60000, waitUntil: "domcontentloaded"});
            // console.log("-=-=-=-=page loaded");

            const result = await page.$eval('*', (el: any) => el.innerText)//await page.evaluate(() => document.body.innerHTML);
            // console.log("-=-=-=-=got result-=-=", result);
            return result;
        },
    });

    // let browser1 = await chromium.puppeteer.launch({
    //     args: chromium.args,
    //     defaultViewport: chromium.defaultViewport,
    //     executablePath: await chromium.executablePath,
    //     headless: true,
    //     ignoreHTTPSErrors: true,
    // });

    // let page1 = await browser1.newPage();
    // // console.log("-=-=-=-=async started");
    // await page1.goto("https://scouthangout.com", {timeout: 60000, waitUntil: "domcontentloaded"});
    // // console.log("-=-=-=-=page loaded");

    // const result = await page1.$eval('*', (el: any) => el.innerText)

    const docs = await loader.load();
    // const docs = [new Document({pageContent: result, metadata: {source: path}})];

    let charCount = 0;
    docs.map((doc => charCount+=doc.pageContent.length))

    return { docs, charCount };
}
