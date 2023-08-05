'use client'
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { toast } from 'react-toastify';
import { getBotConfig, getQAdoc, saveBotCharcount } from "../supabase-server";

export default function ConversationView({conversation, userid}: any) {
    const [ parsedconv, setparsedconv ]: any[] = useState([]);
    const [ revq, setrevq ] = useState("");
    const [ revres, setrevres ] = useState("");
    const [ revise, setrevise ] = useState(false);
    const [ uploading, setuploading ] = useState(false);
    const [ charcount, setcharcount ] = useState(0);
    const { push } = useRouter();
    
    const message = (msg: string, user: boolean, key: number, prmsg: string) => {
        
        return(
            <div className={` flex w-full h-auto ${user?" items-end ":" items-start "} text-white flex-col`} key={key}>
                <div className=" flex text-sm ">{user?"User":"Chatbot"}</div>
                <div className={` flex ${user? " bg-slate-500 ":" bg-zinc-700 "} w-auto max-w-[90%] rounded-xl p-4 py-2 text-start flex-col `} key={key}>
                    <ReactMarkdown remarkPlugins={[remarkMath, rehypeKatex, remarkGfm]} className=" flex flex-col " key={key}>
                        {msg}
                    </ReactMarkdown>
                    {!user && <div className=" flex text-sm cursor-pointer text-pink-500 mt-2 " 
                    onClick={() => {setrevise(true);setrevres(msg); setrevq(prmsg); setcharcount(msg.length+prmsg.length)}}>Revise Response</div>}
                </div>
            </div>
        );
    }

    useEffect(() => {
        let tempconv: any[] = [];
        conversation.chat_data.map((conv: any, i: number) => {
            const isuser = (conv.role === "user");
            const prmsg = isuser?"":conversation.chat_data[i-1].message;
            tempconv.push(message(conv.message, isuser, i, prmsg));
        });
        setparsedconv(tempconv);
    }, [conversation]);

    useEffect(() => {
        const resc = revres?revres.length:0;
        const qc = revq?revq.length:0;
        setcharcount(qc+resc);
    }, [revres, revq]);

    async function saveQA() {
        setuploading(true);
        
        const botId = conversation.bots.id;
        try {
            const body = new FormData();
            body.append("botid", botId);
            body.append("type", "Q_A_R");
            let temparr:any = [];
            if(revres && revq) 
                temparr.push({
                    "a_value":revres,
                    "q_value":revq
                });
            else throw "Invalid Q | A";
            body.append("content", JSON.stringify(temparr));
        
            const response = await fetch("/api/docs/store", {
                method: "POST",
                body
            });
            if (!response.ok || !response.body) {
                if(response.status == 429) {
                    toast.info('Please wait for 1 minute before uploading another data source', {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                        theme: "dark",
                    });
                } else throw response.statusText;
            }
            response.json().then(async (data) => { 
                if(data.success) {
                    const resbc = await getBotConfig(botId, userid);

                    const rescc = await saveBotCharcount(botId, resbc.data[0].char_count+charcount);
                    if(!rescc.success) throw "error storing charcount"
                    
                    setcharcount(0);
                    toast.success('Q & A revised successfully!', {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                        theme: "dark",
                    });
                    
                } else throw "unable to save embeddings"
            });
        } catch(e) {
            console.log(e);
            toast.error('Error: Unable to save revised Q & A. Please contact admin.', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });
        }
        setrevise(false);
        setuploading(false);
    }

    return<>
        <style>{`
            #cbody a {
                text-decoration: underline;
                font-weight: bold;
            }

            ul, ol { 
                display: block;
                list-style: disc outside none;
                margin: 1em 0;
                padding: 0 0 0 40px;
            }
            ol { 
                list-style-type: decimal;
            }
            li { 
                display: list-item;
            }
            ul ul, ol ul {
                list-style-type: circle;
                margin-left: 15px; 
            }
            ol ol, ul ol { 
                list-style-type: lower-latin;
                margin-left: 15px; 
            }
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
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-pink-500 ">
                <div className=" spx-4 py-8 sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex mb-4 gap-4 justify-start ">
                        <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                            Conversation #{conversation?.id}
                        </h1>
                    </div>
                    <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-[50%] text-xl " onClick={() => push(`/chatbots?id=${conversation?.bots?.id}`)}>
                            <label className=" font-semibold text-slate-500 flex gap-4 items-end ">Associated Chatbot
                                <p className=" text-white cursor-pointer underline hover:text-pink-500 ">{conversation?.bots?.name}</p>
                            </label>
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex mb-4 w-full ">
                        <div className=" flex w-[50%] text-xl ">
                            <label className=" font-semibold text-slate-500 flex gap-4 items-end ">Updated Date
                                <p className=" text-white">{new Date(conversation?.updated_at).toLocaleDateString()}</p>
                            </label>
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-full text-xl ">
                            <label className=" font-semibold text-slate-500 flex gap-4 items-end ">Location
                                <p className=" text-white">{conversation?.geo?.country || "-"}</p>
                            </label>
                        </div>
                    </div>
                    {/* <div className="sm:align-center sm:flex w-full mb-4 ">
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
                    </div> */}
                    
                    <div className="sm:align-center sm:flex w-full mb-4 border-t border-zinc-700 ">
                        <div className=" flex w-full text-xl ">
                            <label className=" font-semibold text-slate-500 flex gap-4 items-start w-full ">Conversation
                                <div id="cbody" className=" flex max-h-[400px] w-full flex-col p-2 overflow-y-auto border-0 border-pink-500 rounded-sm font-normal ">
                                        {parsedconv}
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        {revise && 
            <div className=" flex w-full h-full px-4 py-8 sm:px-6 sm:pt-8 lg:px-8 absolute z-40 bg-black bg-opacity-75 justify-center " onClick={() => { setrevres(""); setrevise(false); }}>
                <div className=" flex flex-col max-w-6xl w-full p-4 h-min bg-zinc-900 rounded-md border border-pink-500 gap-4 items-center relative " onClick={(e) => e.stopPropagation()}>
                    <p className="max-w-2xl mt-5 text-xl text-white sm:text-center sm:text-2xl ">
                        Add Q&A to Data source
                    </p>
                    <label className=" flex flex-col w-full p-2 text-slate-500 outline-none ">Query
                        <input type="text" onChange={(e) => setrevq(e.currentTarget.value)} value={revq} 
                            className=" flex w-full p-2 text-slate-500 outline-none " placeholder="Enter Chatbot Name"/>
                    </label>
                    <label className=" flex flex-col w-full p-2 text-slate-500 outline-none ">Response
                        <textarea onChange={(e) => setrevres(e.currentTarget.value)} value={revres} 
                            className=" flex w-full p-2 text-slate-500 outline-none " placeholder="Enter Chatbot Name"/>
                    </label>
                    <div className=" flex flex-col w-full ">
                        <p className=" text-base text-teal-500 flex-nowrap flex pt-1 font-semibold ">Number of characters: {charcount}</p>
                        <Button variant="slim" type="button" disabled={revres.trim().length==0} loading={uploading}
                        onClick={() => saveQA()} className="block w-full text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Upload
                        </Button>
                    </div>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg" className=" absolute top-3 right-3 cursor-pointer " onClick={() => { setrevres(""); setrevise(false); }}>
                        <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 
                        2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 
                        4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 
                        16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path>
                    </svg>
                </div>
            </div>
        } 
    </>
}