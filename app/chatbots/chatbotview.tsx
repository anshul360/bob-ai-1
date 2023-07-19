'use client'

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Datasource from "./datasource";
import Config from "./config";
import Botbody from "./botbody";

export default function ChatbotView({chatbot, subscription}: any) {
    const { push } = useRouter();
    const [ activetab, setactivetab ] = useState("appearance");

    return <>
        <style>{`
            /* width */
            ::-webkit-scrollbar {
                width: 7px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
                box-shadow: inset 0 0 5px grey; 
                border-radius: 2.5px;
            }
            
            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: gray; 
                border-radius: 2.5px;
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: #555555; 
            }`}
        </style>
        <div className=" flex max-w-[90%] w-full h-full gap-4 flex-col relative ">
            <section className=" bg-zinc-900 w-full border-0 rounded-md border-pink-500 ">
                <div className=" px-4 py-4 sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex gap-4 justify-center items-end ">
                        <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                            {`${chatbot?.name}`}
                        </h1>
                    </div>
                </div>
            {/* </section>
            <div className=" flex w-full h-full gap-4 flex-col ">
                <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-pink-500 "> */}
                    <div className="sm:align-center sm:flex mb-1 justify-center text-lg font-semibold gap-6 ">
                        {/* <div className={` flex p-2 h-fit font-semibold text-2xl cursor-pointer justify-end rounded-sm ${activetab=="detail"? "border border-pink-500 text-pink-500 ": " text-white "} `} onClick={() => setactivetab("detail")}>
                            Detail
                        </div> */}
                        <div className={` flex p-2 h-fit cursor-pointer justify-end rounded-sm ${activetab=="appearance"? "border border-pink-500 text-pink-500 ": " text-white "} `} onClick={() => setactivetab("appearance")}>
                            Appearance
                        </div>
                        <div className={` flex p-2 h-fit cursor-pointer justify-end rounded-sm ${activetab=="source"? "border border-pink-500 text-pink-500 ": " text-white "} `} onClick={() => setactivetab("source")}>
                            Data Source
                        </div>
                        <div className={` flex p-2 h-fit cursor-pointer justify-end rounded-sm ${activetab=="test"? "border border-pink-500 text-pink-500 ": " text-white "} `} onClick={() => setactivetab("test")}>
                            Test Chatbot
                        </div>
                        <div className={` flex p-2 h-fit cursor-pointer justify-end rounded-sm ${activetab=="usage"? "border border-pink-500 text-pink-500 ": " text-white "} `} onClick={() => setactivetab("usage")}>
                            Usage
                        </div>
                        <div className={` flex p-2 h-fit cursor-pointer justify-end rounded-sm ${activetab=="api"? "border border-pink-500 text-pink-500 ": " text-white "} `} onClick={() => setactivetab("api")}>
                            API Keys
                        </div>
                    </div>
                </section>
                <section className=" flex mb-12 w-full h-full border-0 rounded-md border-pink-500 gap-4 ">
                    {activetab=="appearance"?<Config botId={chatbot.id} />:<></>}
                    {activetab=="source"?
                        <div className=" flex w-full flex-col">
                            <Datasource botId={chatbot.id} subscription={subscription} />
                        </div>:
                        <></>
                    }
                    {activetab=="test"?<Botbody botId={chatbot.id} />:<></>}
                    {activetab=="usage"?<div></div>:<></>}
                    {activetab=="api"?<div></div>:<></>}
                </section>
            </div>
            {/* <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-pink-500 ">
                <div className=" spx-4 py-8 sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex mb-4 gap-4 justify-start items-end ">
                        <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                            {`${chatbot?.name}`}
                        </h1>
                        <Button variant="slim" type="button" disabled={!chatbot} onClick={() => push(`/chatbots/chatbotconfig?id=${chatbot.id}`)}
                        className="block py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            View Config
                        </Button>
                        <Button variant="slim" type="button" disabled={!chatbot} onClick={() => push(`/chatbots/chatbotconfig?id=${chatbot.id}`)}
                        className="block py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Test Chatbot
                        </Button>
                    </div>
                    <div className="sm:align-center sm:flex mb-4 w-full ">
                        <div className=" flex w-[50%] text-xl border-b ">
                            <label className=" font-semibold text-white flex gap-4 items-end ">Unique Id
                                <p className=" text-slate-300">{chatbot?.uuid}</p>
                            </label>
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex mb-4 w-full ">
                        <div className=" flex w-[100%] text-xl border-b ">
                            <label className=" font-semibold text-white flex gap-4 items-end ">Base Prompt
                                <p className=" text-slate-300">{chatbot?.prompt}</p>
                            </label>
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-full text-xl border-b ">
                            <label className=" font-semibold text-white flex gap-4 items-end ">Creativity
                                <p className=" text-slate-300">{chatbot?.creativity}</p>
                            </label>
                        </div>
                    </div>
                    
                    <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-full text-xl border-b ">
                            <label className=" font-semibold text-white flex gap-4 items-end w-full ">Conversation
                                <div id="cbody" className=" flex max-h-[400px] w-full max-w-2xl flex-col p-2 overflow-y-auto border border-pink-500 rounded-sm ">
                                        
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </section> */}
        {/* </div> */}
    </>;
}