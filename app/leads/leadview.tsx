'use client'
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export default function LeadView({lead}: any) {
    const [ parsedconv, setparsedconv ]: any[] = useState([]);
    const message = useCallback((msg: string, user: boolean, key: number) => {
        const tc = user?"white":"white";
        return(
            <div className={` flex w-full h-auto ${user?" items-end ":" items-start "} text-white flex-col`} key={key}>
                <div className=" flex text-sm ">{user?"User":"Chatbot"}</div>
                <div className={` flex ${user? " bg-slate-500 ":" bg-zinc-700 "} w-auto max-w-[90%] rounded-xl p-4 py-2 text-start flex-col prose `} style={{color: tc}} key={key}>
                    <ReactMarkdown remarkPlugins={[remarkMath, rehypeKatex, remarkGfm]} className=" flex flex-col prose-invert " key={key}>
                        {msg}
                    </ReactMarkdown>
                </div>
            </div>
        );
    }, []);

    useEffect(() => {
        let tempconv: any[] = [];
        if(lead?.conversations) {
            lead.conversations.chat_data.map((conv: any, i: number) => {
                const isuser = (conv.role === "user");
                console.log(isuser);
                tempconv.push(message(conv.message, isuser, i));
            });
            setparsedconv(tempconv);
        }
    }, []);

    return<>
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
        <div className=" flex max-w-[90%] w-full gap-4 flex-row relative ">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-[#00ffff] ">
                <div className=" spx-4 py-8 sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex mb-4 gap-4 justify-start ">
                        <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                            {`${lead?.name}`}
                        </h1>
                    </div>
                    <div className="sm:align-center sm:flex mb-4 w-full ">
                        <div className=" flex w-[50%] text-xl ">
                            <label className=" font-semibold text-slate-500 flex gap-4 items-end ">Email
                                <p className=" text-white">{lead?.email}</p>
                            </label>
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-full text-xl ">
                            <label className=" font-semibold text-slate-500 flex gap-4 items-end ">Phone
                                <p className=" text-white">{lead?.phone}</p>
                            </label>
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-[50%] text-xl ">
                            <label className=" font-semibold text-slate-500 flex gap-4 items-end ">Organisation
                                <p className=" text-white">{lead?.org}</p>
                            </label>
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-[50%] text-xl ">
                            <label className=" font-semibold text-slate-500 flex gap-4 items-end ">Place
                                <p className=" text-white">{lead?.conversations?.geo?.country || "--"}</p>
                            </label>
                        </div>
                    </div>
                    {/* <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-full text-xl border-b ">
                            <label className=" font-semibold text-white flex gap-4 items-end ">Interests (AI)
                                <p className=" text-slate-300">{lead?.interests}</p>
                            </label>
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-full text-xl border-b ">
                            <label className=" font-semibold text-white flex gap-4 items-end ">Score (AI)
                                <p className=" text-slate-300">{lead?.score}</p>
                            </label>
                        </div>
                    </div> */}
                    
                    <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-full text-xl ">
                            <label className=" font-semibold text-slate-500 flex gap-4 items-start w-full ">Conversation
                                <div id="cbody" className=" flex max-h-[400px] w-full flex-col p-2 overflow-y-auto border-0 border-[#00ffff] rounded-sm font-normal ">
                                        {parsedconv}
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}