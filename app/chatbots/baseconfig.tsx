// import Botbody from "@/app/chatbot/botbody";
import Button from "@/components/ui/Button"
import { useCallback, useEffect, useState } from "react";
// import { HexColorPicker } from "react-colorful";
import { getBotConfig, saveBotBaseConfig } from "@/app/supabase-server"
import Pageload from "./loading";
import { toast } from 'react-toastify';
// import * as s from "react-colorful/dist/index.css";

export default function Baseconfig({botId, user}: any) {
    const [ loadingpage, setloadingpage ] = useState(false);
    // const [ basep, setbasep ] = useState('I want you to act as a document that I am having a conversation with. Your name is "AI Assistant". You will provide me with answers from the given info in CONTEXT. If the answer is not included, say exactly "Hmm, I am not sure. Please contact admin" and stop after that. Refuse to answer any question not about the info. Never break character.');
    const [ temp, settemp ] = useState(0);
    const [ bname, setbname ] = useState("");
    const [ supportmsg, setsupportmsg ] = useState("");
    const [ reqpm, setreqpm ] = useState(1);
    const [ saving, setsaving ] = useState(false);
    const [ savedbotrec, setbotrec ] = useState();

    const setBotconfig = useCallback((botrec: any, reset: boolean = false) => {
        // setbasep(botrec.base_prompt); 
        settemp(botrec.temperature); setsupportmsg(botrec.support_message);
        setbname(botrec.base_prompt.split("name")[1].split('"')[1]); setreqpm(botrec.req_per_min);
        if(!reset) setbotrec(botrec);
    }, []);
    
    
    useEffect(() => {
        setloadingpage(true);
        if(botId) 
            getBotConfig(botId, user.id)
            .then((res: any) => {
                if(res.success) {
                    let botrec = res.data[0];
                    // console.log(res.data);
                    setBotconfig(botrec);
                }
            }).catch((error) => console.log(error))
            .finally(() => setloadingpage(false));
    }, [botId]);

    function reset() {
        setBotconfig(savedbotrec, true);
    }

    async function saveConfig() {
        setsaving(true);
        const builtprompt = `I want you to act as a document that I am having a conversation with. Your name is "${bname}". You will provide me with answers from the given info in CONTEXT. If the answer is not included, say exactly "${supportmsg}" and stop after that. Refuse to answer any question not part of CONTEXT. Never break character.`;
        //const builtprompt = `You are a friendly ai assistant providing the user the required information based on the CONTEXT, a CONVERSATION LOG, and a QUESTION. Your name is "${bname}". The CONVERSATION LOG is the past conversation between you and user. The CONTEXT is collection of JSON with "text" as the content and "score" as the relevancy of the content to user query. Use CONTEXT to provide answer to QUESTION. Do not mention CONTEXT in your conversation. If the answer to QUESTION is not present in CONTEXT then respond exactly "${supportmsg}".`;
        
        if(botId) {
            const res = await saveBotBaseConfig(botId, { "basep": builtprompt, temp, supportmsg, reqpm });
            console.log(res);
            if(res.success) 
                toast.success('Config saved successfully!', {
                    position: "top-right", autoClose: 3000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                    theme: "dark",
                });
            else
                toast.error('Error: Unable to save config', {
                    position: "top-right", autoClose: 3000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                    theme: "dark",
                });
        }
        setsaving(false);
    }
    
    return<>
        <div className=" flex w-full gap-4 flex-col md:flex-row ">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-pink-500 ">
                <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                            Prompt Settings
                        </h1>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col relative gap-4 ">
                        <div className=" flex flex-col gap-2 w-full">{/**assistant name */}
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Assistant Name</p>
                                <p className=" text-base text-slate-500 ">
                                    This is the name chatbot will use in responses.
                                </p>
                            </div>
                            <input type="text" onChange={(e) => setbname(e.currentTarget.value)} value={bname} 
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-sm " placeholder="Enter Chatbot Name"/>
                        </div>
                        <div className=" flex flex-col gap-2 w-full">{/**support messages */}
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Support Message</p> 
                                <p className=" text-base text-slate-500 ">
                                    This message will be displayed if chatbot does not have enough information to respond.
                                </p>
                            </div> 
                            <textarea rows={3} onChange={(e) => setsupportmsg(e.currentTarget.value)} value={supportmsg} 
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-sm " placeholder="Enter initial messages"/>
                        </div>
                        
                        <div className=" flex flex-col gap-2 w-full relative group">{/**Creativity */}
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Creativity</p>
                                <p className=" text-base text-slate-500 ">
                                    Modify the creativity of the chatbot.
                                </p>
                            </div>
                            <div className=" flex  w-fit rounded-sm gap-4 ">
                                <div className={` flex p-2 px-4 hover:bg-zinc-600 cursor-pointer ${temp==0?" text-pink-500 border-2 border-pink-500 font-bold ":" text-white border-b border-white "} `}
                                onClick={() => settemp(0)}>Precise</div>
                                <div className={` flex p-2 px-4 hover:bg-zinc-600 cursor-pointer ${temp==0.5?" text-pink-500 border-2 border-pink-500 font-bold ":" text-white border-b border-white "}`}
                                onClick={() => settemp(0.5)}>Normal</div>
                                <div className={` flex p-2 px-4 hover:bg-zinc-600 cursor-pointer ${temp==1?" text-pink-500 border-2 border-pink-500 font-bold ":" text-white border-b border-white "} `}
                                onClick={() => settemp(1)}>Creative</div>
                            </div>
                        </div>

                        <div className=" flex flex-col gap-2 w-full">{/**rate limit */}
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Rate Limit</p> 
                                <p className=" text-base text-slate-500 ">
                                    Limit the number of messages sent per minute from one useer on the chat widget. 
                                </p>
                                <p className=" text-base text-slate-500 ">
                                    This is to stop users from abusing your chatbot service (Set value between 1-100 messages/min. Default value is 50 messages/min)
                                </p>
                            </div> 
                            <input type="number" step={1} min={1} max={100} onChange={(e) => setreqpm(Number(e.currentTarget.value))} value={reqpm}
                            className=" flex p-2 font-semibold text-slate-500 outline-none rounded-sm invalid:bg-red-300 peer " placeholder="Enter number of messages"/>
                            <span className=" peer peer-invalid:visible invisible text-red-300 font-semibold ">Enter value between 1 and 100</span>
                        </div>
                    </div>
                    {/* <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                            Visibility
                        </h1>
                    </div> */}
                    <div className="sm:align-center flex flex-col w-full h-full gap-4 ">
                        
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-row gap-4 ">
                        <Button variant="slim" type="button" disabled={saving || reqpm>100 || reqpm<1} onClick={() => saveConfig()} loading={saving}
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Save
                        </Button>
                        <Button variant="slim" type="button" disabled={false} onClick={() => reset()}
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Reset
                        </Button>
                    </div>
                </div>
            </section>
            {loadingpage?<Pageload />:<></>}
        </div>
    </>
}
