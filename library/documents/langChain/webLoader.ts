import { Browser, Page, PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";

export default async function webLoader (path: string) {
    const loader = new PuppeteerWebBaseLoader("https://scouthangout.com", {
        launchOptions: {
            headless: "new",
        },
        gotoOptions: {
            waitUntil: "domcontentloaded",
            timeout: 60000,
        },
        /** Pass custom evaluate, in this case you get page and browser instances */
        async evaluate(page: Page, browser: Browser) {
            // console.log("-=-=-=-=async started");
            await page.goto("https://scouthangout.com", {timeout: 60000, waitUntil: "domcontentloaded"});
            // console.log("-=-=-=-=page loaded");

            const result = await page.$eval('*', (el: any) => el.innerText)//await page.evaluate(() => document.body.innerHTML);
            // console.log("-=-=-=-=got result-=-=", result);
            return result;
        },
    });

    const docs = await loader.load();

    let charCount = 0;
    docs.map((doc => charCount+=doc.pageContent.length))

    return { docs, charCount };
}
