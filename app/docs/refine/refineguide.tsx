'use client'

import Image from "next/image";
import { useRef } from "react";
import ReactPlayer from "react-player/lazy";

export default function RefineGuide() {
  const promptref = useRef<HTMLDivElement>(null);
  const creativityref = useRef<HTMLDivElement>(null);
  const qaref = useRef<HTMLDivElement>(null);

  return  <section className="mb-12 bg-black">
        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4  sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0">
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                <h1 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    This guide will walk you through the steps to optimize your chatbot.
                </h1>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl ">
                <p className=" p-2 ">While chatbots offer immense value in automating customer interactions, it's important to understand that they operate within the inherent limitations of current AI technology. Occasionally, chatbots may produce responses that are inaccurate or outside of the scope of the provided documents. There are settings by which you can finetune your chatbot's responses and mitigate these limitations:</p>
                <ul className=" list-decimal list-inside p-2 ">
                    <li onClick={() => promptref.current?.scrollIntoView({behavior: "auto", block: "start"})} className=" cursor-pointer underline decoration-cyan-600 decoration-2 hover:decoration-4">Adjust base prompt</li>
                    <li onClick={() => creativityref.current?.scrollIntoView({behavior: "auto", block: "start"})} className=" cursor-pointer underline decoration-cyan-600 decoration-2 hover:decoration-4">Modify creativity</li>
                    <li onClick={() => qaref.current?.scrollIntoView({behavior: "auto", block: "start"})} className=" cursor-pointer underline decoration-cyan-600 decoration-2 hover:decoration-4">Add accurate information</li>
                </ul>
            </div>
        </div>

        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-12 sm:py-[60px] sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0"ref={promptref}>
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                <h2 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Adjust assistant prompt
                </h2>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl" suppressHydrationWarning={true} >
                <h3 className=" p-2 sm:text-3xl text-xl ">The prompt shapes your chatbot's behavior and responses</h3>
                <p className=" px-2 pb-2 ">The <i>Assistant Prompt</i> is available under <i>Settings</i> tab of the chatbot.</p>
                <img src="/lib/image/docs/prompt.png" width="100%" height="auto" className=" border border-[#00ffff]" />
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">The default peompt is:</h4>
                <p className=" px-2 pb-2 ">You are a helpful support agent. Your name is "AI Assistant". You will provide answers from the given info. If a URL/website address is present in the given info then always make it part of your response. If the answer is not included in info then say exactly "Hmm, I am not sure." and stop after that. Do not answer any question which is not present in the given info. Do not mention the source of the answer. NEVER BREAK CHARACTER.</p>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">You can modify the Personality or Name of the chatbot e.g.:</h4>
                <p className=" px-2 pb-2 ">You are a funny and engaging assistant. Your name is "Donna".</p>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">You can change the message when answer is not present in the provided info</h4>
                <p className=" px-2 pb-2 ">If the answer is not included in info then say exactly "Hmm, that I am not aware of. Please contact us at abc@xyz.com for more info." and stop after that.</p>
                <p className=" px-2 pb-2 "><i>You can play around with the assistant prompt and see which one suites your needs.</i></p>
            </div>
        </div>

        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-12 sm:py-[60px] sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0" ref={creativityref}>
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                <h2 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Modify creativity
                </h2>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl" suppressHydrationWarning={true} >
                <h3 className=" p-2 sm:text-3xl text-xl font-bold text-cyan-600 ">You can adjust the creativity of the responses of your chatbot. </h3>
                <p className=" px-2 pb-2 ">Precise: The responses will be to the point.<br/>Normal: Chatbot will add some creativity to the responses.<br/>Creative: Chatbot will comeup with the most creative responses based on the given info. </p>
                <img src="/lib/image/docs/creativity.png" width="100%" height="auto" className=" border border-[#00ffff]" />
            </div>
        </div>

        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-12 sm:py-[60px] sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0" ref={qaref}>
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                <h2 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Add accurate information
                </h2>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl" suppressHydrationWarning={true} >
                <h3 className=" p-2 sm:text-3xl text-xl font-bold text-cyan-600 ">Ensure Readability of Uploaded Data Sources</h3>
                <p className=" px-2 pb-2 ">The quality of your chatbot's responses largely depends on the quality of the data sources you provide. Ensure that the websites or documents you upload contain readable text. Images, videos, or non-textual elements in documents/websites are not processed. You can work-around this by copy and pasting information as text into the Q & A data source section, or uploading it as text documents instead.</p>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl" suppressHydrationWarning={true} >
                <h3 className=" p-2 sm:text-3xl text-xl font-bold text-cyan-600 ">"Revise Response" feature</h3>
                <p className=" px-2 pb-2 ">The "Revise Response" feature is accessible from the Conversations detail page. It is a tool for refining your chatbot's responses.</p>
                <img src="/lib/image/docs/conversation.png" width="100%" height="auto" className=" border border-[#00ffff]"/>
                <img src="/lib/image/docs/revise.png" width="100%" height="auto" className=" border border-[#00ffff] mt-2" />
            </div>
        </div>
      
    </section>
  ;
}
