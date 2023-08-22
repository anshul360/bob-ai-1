'use client'

import Button from "@/components/ui/Button"
import Pageload from "./loading";
import { useEffect, useState } from "react";
import { createBot, getUserBots, getUserLimits } from "../supabase-server";
import { useRouter } from "next/navigation";

export default function Chatbots({user, botcountl}: any) {
    const [ loadingpage, setloadingpage ] = useState(false);
    const [ createbot, setcreatebot ] = useState(false);
    const [ chatbots, setchatbots ]: any[] = useState([]);
    const [ botname, setbotname ] = useState("");
    const [ execip, setexecip ] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        setloadingpage(true);
        let tempchatbots: any[] = [];
        getUserBots(user?.id!)
        .then((res) => {
            res?.map((bot, i) => {
                tempchatbots.push(
                    <div className=" flex w-full text-xl border-b " key={i}>
                        <div className=" flex w-[40%] p-2 items-center justify-start underline cursor-pointer hover:text-[#00ffff] overflow-hidden " key={i+"a"} onClick={() => push(`/chatbots?id=${bot.id}`)}><p className=" truncate ">{bot.name}</p></div>
                        <div className=" flex w-[20%] p-2 items-center justify-start overflow-hidden " key={i+"b"}><p className=" truncate ">{bot.char_count}</p></div>
                        {/* <div className=" flex w-[20%] p-2 items-center justify-center overflow-hidden " key={i+"c"}>{JSON.stringify(bot.conversations)}</div> */}
                        <div className=" flex w-[40%] p-2 items-center justify-start overflow-hidden " key={i+"c"}><p className=" truncate ">{String(bot.uuid)}</p></div>
                    </div>
                );
                setchatbots(tempchatbots);
            });
        })
        .catch(() => console.log)
        .finally(() => setloadingpage(false));
    }, []);

    async function createChatbot() {
        setexecip(true);
        // const resul = await getUserLimits(user.id);
        // console.log(resul);
        // let chatbotLimit = resul.data[0].users.sub_chatbots + resul.data[0].users.addon_chatbots;
        if(chatbots.length >= botcountl) {
            alert(`You are allowed to create maximum ${botcountl} chatbots currently.`);
            setexecip(false);
            return;
        }
        const res = await createBot(botname, user.id);
        if(res.success) {
            push(`/chatbots?id=${res.data[0].id}`);
        } else {
            console.log(res.message);
        }
        setexecip(false);
    }

    return<>
        <div className=" flex max-w-[90%] w-full gap-4 flex-row relative ">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-[#00ffff] ">
                <div className=" spx-4 py-8 px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center flex mb-4 gap-4 justify-center items-end ">
                        <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                            Chatbots
                        </h1>
                        <Button variant="slim" type="button"  disabled={!user} onClick={() => {
                            if(chatbots.length >= botcountl) {
                                alert(`You are allowed to create maximum ${botcountl} chatbots currently.`);
                                // setexecip(false);
                                return;
                            }
                            setcreatebot(true);
                        }}
                        className="block py-2 text-sm !mb-1 font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Create New Chatbot
                        </Button>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        
                        <div className=" flex w-full text-[#00ffff] text-xl border-b ">
                            <div className=" flex w-[40%] p-2 items-center justify-start  ">Name</div>
                            <div className=" flex w-[20%] p-2 items-center justify-start  ">Character Count</div>
                            {/* <div className=" flex w-[20%] p-2 items-center justify-center  ">Coversations Count</div> */}
                            <div className=" flex w-[40%] p-2 items-center justify-start  ">Unique Id</div>
                            {/* <div className=" flex w-[10%] p-2 items-center justify-center  ">Score (AI)</div> */}
                        </div>
                        {chatbots.length>0?
                        <>{chatbots}</>:
                        <div className=" flex flex-col gap-2 w-full items-center mt-4">
                            {/* <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M32 32v432a16 16 0 0016 16h432"></path>
                                <rect width="80" height="192" x="96" y="224" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect>
                                <rect width="80" height="240" x="240" y="176" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect>
                                <rect width="80" height="304" x="383.64" y="112" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect>
                            </svg> */}
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.999 0c-2.25 0-4.5.06-6.6.21a5.57 5.57 0 00-5.19 5.1c-.24 3.21-.27 6.39-.06 9.6a5.644 5.644 0 005.7 5.19h3.15v-3.9h-3.15c-.93.03-1.74-.63-1.83-1.56-.18-3-.15-6 
                                .06-9 .06-.84.72-1.47 1.56-1.53 2.04-.15 4.2-.21 6.36-.21s4.32.09 6.36.18c.81.06 1.5.69 1.56 1.53.24 3 .24 6 .06 9-.12.93-.9 1.62-1.83 1.59h-3.15l-6 
                                3.9V24l6-3.9h3.15c2.97.03 5.46-2.25 5.7-5.19.21-3.18.18-6.39-.03-9.57a5.57 5.57 0 00-5.19-5.1c-2.13-.18-4.38-.24-6.63-.24zm-5.04 8.76c-.36 0-.66.3-.66.66v2.34c0 
                                .33.18.63.48.78 1.62.78 3.42 1.2 5.22 1.26 1.8-.06 3.6-.48 5.22-1.26.3-.15.48-.45.48-.78V9.42c0-.09-.03-.15-.09-.21a.648.648 0 00-.87-.36c-1.5.66-3.12 1.02-4.77 
                                1.05-1.65-.03-3.27-.42-4.77-1.08a.566.566 0 00-.24-.06z"></path>
                            </svg>
                            No Chatbots Created
                        </div>}
                    </div>
                </div>
            </section>{loadingpage?<Pageload />:<></>}
        </div>  
        {createbot && 
            <div className=" flex w-full h-full px-4 py-8 sm:px-6 sm:pt-8 lg:px-8 absolute z-40 bg-black bg-opacity-75 justify-center " onClick={() => { setcreatebot(false); setbotname(""); setexecip(false); }}>
                <div className=" flex flex-col max-w-6xl w-full p-4 h-min bg-zinc-900 rounded-md border border-[#00ffff] gap-4 items-center relative " onClick={(e) => e.stopPropagation()}>
                    <p className="max-w-2xl mt-5 text-xl text-white sm:text-center sm:text-2xl ">
                        Enter a name for Chatbot
                    </p>
                    <input type="text" onChange={(e) => setbotname(e.currentTarget.value)} value={botname} 
                        className=" flex w-full p-2 text-slate-500 outline-none " placeholder="Enter Chatbot Name"/>
                    <Button
                        variant="slim"
                        type="button"
                        disabled={botname.trim().length==0}
                        loading={execip}
                        onClick={() => createChatbot()}
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                    >
                        Continue
                    </Button>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg" className=" absolute top-3 right-3 cursor-pointer " onClick={() => { setcreatebot(false); setbotname(""); setexecip(false); }}>
                        <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 
                        2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 
                        4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 
                        16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path>
                    </svg>
                </div>
            </div>
        } 
    </>;
}