import { useEffect, useState } from "react";
import Pageload from "./loading";
import { getBotConfig, getMsgLeadsFromUser } from "../supabase-server";

export default function Usage({sub, userId, botId} : any) {
    const [ loadingpage, setloadingpage ] = useState(true);   
    const [ charsused, setcharsused ] = useState(0);
    const [ messagesused, setmessagesused ] = useState(0);
    const [ leadsused, setleadsused ] = useState(0);

    useEffect(() => {
        Promise.all([getMsgLeadsFromUser(userId), getBotConfig(botId, userId)])
        .then(([resu, resb]) => {
            if(resu.success) {
                setmessagesused(resu.data[0].consumed_messages);
                setleadsused(resu.data[0].consumed_leadsr);
            }
            if(resb.success) setcharsused(resb.data[0].char_count); 
        })
        .finally(() => setloadingpage(false));
    }, [sub, userId]);
    
    return <>
        <div className=" flex w-full gap-4 flex-col md:flex-row ">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-[#00ffff] ">
                <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                            Usage Information
                        </h1>
                        {/* <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
                            Below are the configurations that you can set for your chatbot
                        </p> */}
                    </div>
                    
                    <div className=" flex w-full flex-col items-center justify-center text-xl mt-8 ">
                        <div className=" flex w-full items-center justify-center ">
                            <div className=" flex w-[25%]"></div>
                            <div className=" flex w-[25%] font-bold text-[#00ffff]  items-center justify-center py-1">Total</div>
                            <div className=" flex w-[25%] font-bold text-[#00ffff]  items-center justify-center py-1">Consumed</div>
                            <div className=" flex w-[25%] font-bold text-[#00ffff]  items-center justify-center py-1">Remaining</div>
                        </div>
                        <div className=" flex w-full ">
                            <div className=" flex w-[25%] font-bold text-[#00ffff]  items-center justify-center py-1 whitespace-nowrap">Characters / Chatbot</div>
                            <div className=" flex w-[25%] items-center justify-center py-1">{(sub?.prices?.products?.metadata?.char_per_bot || 0)}</div>
                            <div className=" flex w-[25%] items-center justify-center py-1">{charsused}</div>
                            <div className=" flex w-[25%] items-center justify-center py-1">{(sub?.prices?.products?.metadata?.char_per_bot || 0) - charsused}</div>
                        </div>
                        <div className=" flex w-full ">
                            <div className=" flex w-[25%] font-bold text-[#00ffff]  items-center justify-center py-1 whitespace-nowrap">Messages / Month</div>
                            <div className=" flex w-[25%] items-center justify-center py-1">{(sub?.prices?.products?.metadata?.messages || 0)}</div>
                            <div className=" flex w-[25%] items-center justify-center py-1">{messagesused}</div>
                            <div className=" flex w-[25%] items-center justify-center py-1">{(sub?.prices?.products?.metadata?.messages || 0) - messagesused}</div>
                        </div>
                        {/* <div className=" flex w-full ">
                            <div className=" flex w-[25%] font-bold text-[#00ffff]  items-center justify-center py-1 whitespace-nowrap">Lead Scoring Requests / Month</div>
                            <div className=" flex w-[25%] items-center justify-center py-1">{sub?.prices?.products?.metadata?.leads}</div>
                            <div className=" flex w-[25%] items-center justify-center py-1">{leadsused}</div>
                            <div className=" flex w-[25%] items-center justify-center py-1">{sub?.prices?.products?.metadata?.leads - leadsused}</div>
                        </div> */}
                    </div>

                    {/* <div className="sm:align-center sm:flex sm:flex-col relative gap-4 ">
                        <div className=" flex flex-col gap-2 w-full">
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Characters</p>
                            </div>
                            <div className=" flex gap-4">
                                <div className=" flex flex-col ">
                                    <p className=" text-lg font-semibold ">Total</p>
                                    <p className=" flex w-full p-2 font-semibold text-slate-500 "></p>
                                </div>
                                <div className=" flex flex-col ">
                                    <p className=" text-lg font-semibold ">Consumed</p>
                                    <p className=" flex w-full p-2 font-semibold text-slate-500 "></p>
                                </div>
                                <div className=" flex flex-col ">
                                    <p className=" text-lg font-semibold ">Remaining</p>
                                    <p className=" flex w-full p-2 font-semibold text-slate-500 "></p>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-2 w-full">
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Messages</p>
                            </div>
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Total</p>
                                <p className=" flex w-full p-2 font-semibold text-slate-500 "></p>
                            </div>
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Consumed</p>
                                <p className=" flex w-full p-2 font-semibold text-slate-500 "></p>
                            </div>
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Remaining</p>
                                <p className=" flex w-full p-2 font-semibold text-slate-500 "></p>
                            </div>
                        </div>
                        
                        <div className=" flex flex-col gap-2 w-full relative group">
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Characters</p>
                            </div>
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Total</p>
                                <p className=" flex w-full p-2 font-semibold text-slate-500 "></p>
                            </div>
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Consumed</p>
                                <p className=" flex w-full p-2 font-semibold text-slate-500 "></p>
                            </div>
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Remaining</p>
                                <p className=" flex w-full p-2 font-semibold text-slate-500 "></p>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                            Visibility
                        </h1>
                    </div> */}
                    {/* <div className="sm:align-center flex flex-col w-full h-full gap-4 ">
                        
                    </div> */}
                </div>
            </section>
            {loadingpage?<Pageload />:<></>}
        </div>

    </>;
}