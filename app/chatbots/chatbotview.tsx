'use client'

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Datasource from "./datasource";
import Config from "./config";
import Botbody from "./botbody";
import Baseconfig from "./baseconfig";
import Usage from "./usage";
import Apikeygen from "../account/apikeygen";
import Embed from "./embed";

export default function ChatbotView({chatbot, subscription, user, userd}: any) {
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
            <section className=" bg-zinc-900 w-full border-0 rounded-md border-[#00ffff] ">
                <div className=" px-4 py-2 sm:px-6 lg:px-8 ">
                    <div className="sm:align-center flex flex-col gap-1 justify-end items-center ">
                        <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                            {`${chatbot?.name}`}
                        </h1>
                        <p className=" text-slate-500 mt-1">{`ID: ${chatbot?.uuid}`}</p>
                    </div>
                </div>
                <div className="align-center flex mb-1 justify-center text-lg font-semibold gap-6 ">
                    {/* <div className={` flex p-2 h-fit font-semibold text-2xl cursor-pointer justify-end rounded-sm ${activetab=="detail"? "border border-[#00ffff] text-[#00ffff] ": " text-white "} `} onClick={() => setactivetab("detail")}>
                        Detail
                    </div> */}
                    <div className={` flex p-2 h-fit cursor-pointer justify-end rounded-sm ${activetab=="appearance"? "border border-[#00ffff] text-[#00ffff] ": " text-white "} `} onClick={() => setactivetab("appearance")}>
                        Appearance
                    </div>
                    <div className={` flex p-2 h-fit cursor-pointer justify-end rounded-sm ${activetab=="base"? "border border-[#00ffff] text-[#00ffff] ": " text-white "} `} onClick={() => setactivetab("base")}>
                        Settings
                    </div>
                    <div className={` flex p-2 h-fit cursor-pointer justify-end rounded-sm ${activetab=="source"? "border border-[#00ffff] text-[#00ffff] ": " text-white "} `} onClick={() => setactivetab("source")}>
                        Data Source
                    </div>
                    <div className={` flex p-2 h-fit cursor-pointer justify-end rounded-sm ${activetab=="test"? "border border-[#00ffff] text-[#00ffff] ": " text-white "} `} onClick={() => setactivetab("test")}>
                        Test Chatbot
                    </div>
                    <div className={` flex p-2 h-fit cursor-pointer justify-end rounded-sm ${activetab=="embed"? "border border-[#00ffff] text-[#00ffff] ": " text-white "} `} onClick={() => setactivetab("embed")}>
                        Embed
                    </div>
                    <div className={` flex p-2 h-fit cursor-pointer justify-end rounded-sm ${activetab=="usage"? "border border-[#00ffff] text-[#00ffff] ": " text-white "} `} onClick={() => setactivetab("usage")}>
                        Usage
                    </div>
                    {/* <div className={` flex p-2 h-fit cursor-pointer justify-end rounded-sm ${activetab=="api"? "border border-[#00ffff] text-[#00ffff] ": " text-white "} `} onClick={() => setactivetab("api")}>
                        API Keys
                    </div> */}
                </div>
            </section>
            <section className=" flex mb-12 w-full h-full border-0 rounded-md border-[#00ffff] gap-4 ">
                {activetab=="appearance"?<Config botId={chatbot.id} userId={user.id} />:<></>}
                {activetab=="base"?<Baseconfig botId={chatbot.id} user={user} />:<></>}
                {activetab=="source"?
                    <div className=" flex w-full flex-col">
                        <Datasource botId={chatbot.id} subscription={subscription} userId={user.id} user={userd} />
                    </div>:
                    <></>
                }
                {activetab=="test"?<Botbody botId={chatbot.id} user={user} />:<></>}
                {activetab=="embed"?<Embed botId={chatbot.uuid} visible={chatbot.visibility=="public"} user={user} />:<></>}
                {activetab=="usage"?<Usage botId={chatbot.id} sub={subscription} userId={user.id} userd={userd} />:<></>}
                {/* {activetab=="api"?<Apikeygen userId={user.id}/>:<></>} */}
            </section>
        </div>
    </>;
}