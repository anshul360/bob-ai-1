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
    const [ bname, setbname ] = useState("I want you to act as a document that I am having a conversation with. Your name is \"AI Assistant\". You will provide me with answers from the given info. If the answer is not included, say exactly \"Hmm, I am not sure.\" and stop after that. Refuse to answer any question not about the info. Never break character.");
    const [ supportmsg, setsupportmsg ] = useState("");
    const [ reqpm, setreqpm ] = useState(1);
    const [ saving, setsaving ] = useState(false);
    const [ savedbotrec, setbotrec ] = useState();
    const [ lcollect, setlcollect ] = useState(false);
    const [ lname, setlname ] = useState(false);
    const [ lemail, setlemail ] = useState(false);
    const [ lphone, setlphone ] = useState(false);
    const [ lorg, setlorg ] = useState(false);
    const [ lmsg, setlmsg ] = useState("");
    const [ visibility, setvisibility ] = useState("");

    const setBotconfig = useCallback((botrec: any, reset: boolean = false) => {
        // setbasep(botrec.base_prompt); 
        settemp(botrec.temperature); setsupportmsg(botrec.support_message);
        setbname(botrec.base_prompt); setreqpm(botrec.req_per_min); setvisibility(botrec.visibility || "private");
        setlcollect(botrec.leads_config.collect); setlemail(botrec.leads_config.email); setlmsg(botrec.leads_config.message); 
        setlname(botrec.leads_config.name); setlorg(botrec.leads_config.org); setlphone(botrec.leads_config.phone);
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
        // const builtprompt = `I want you to act as a document that I am having a conversation with. Your name is "${bname}". You will provide me with answers from the given info in CONTEXT. If the answer is not included, say exactly "${supportmsg}" and stop after that. Refuse to answer any question not part of CONTEXT. Never break character.`;
        //const builtprompt = `You are a friendly ai assistant providing the user the required information based on the CONTEXT, a CONVERSATION LOG, and a QUESTION. Your name is "${bname}". The CONVERSATION LOG is the past conversation between you and user. The CONTEXT is collection of JSON with "text" as the content and "score" as the relevancy of the content to user query. Use CONTEXT to provide answer to QUESTION. Do not mention CONTEXT in your conversation. If the answer to QUESTION is not present in CONTEXT then respond exactly "${supportmsg}".`;
        
        if(botId) {
            const leadsconfig = {
                collect: lcollect, name: lname, email: lemail,
                phone: lphone, org: lorg, message: lmsg
            }
            const res = await saveBotBaseConfig(botId, { "basep": bname, temp, supportmsg, reqpm, leadsconfig, visibility});
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

    const switchclass = `mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 
    before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full 
    after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] 
    after:content-[''] checked:bg-cyan-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 
    checked:after:rounded-full checked:after:border-none checked:after:bg-cyan-500 
    checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] 
    checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 
    focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
    focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] 
    checked:focus:border-primary checked:focus:bg-cyan-500 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 
    checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 
    dark:checked:bg-cyan-500 dark:checked:after:bg-cyan-500`;
    
    return<>
        <div className=" flex w-full gap-4 flex-col md:flex-row ">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-[#00ffff] ">
                <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                            Settings
                        </h1>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col relative gap-4 ">
                        <div className=" flex flex-col gap-2 w-full">{/**assistant name */}
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Assistant Prompt</p>
                                <p className=" text-base text-slate-500 ">
                                    This is the prompt that will give chatbot a personality
                                </p>
                            </div>
                            <textarea rows={3} onChange={(e) => setbname(e.currentTarget.value)} value={bname} 
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-sm " placeholder="Enter Chatbot Name"/>
                        </div>
                        {/* <div className=" flex flex-col gap-2 w-full">{/**support messages 
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Support Message</p> 
                                <p className=" text-base text-slate-500 ">
                                    This message will be displayed if chatbot does not have enough information to respond.
                                </p>
                            </div> 
                            <textarea rows={3} onChange={(e) => setsupportmsg(e.currentTarget.value)} value={supportmsg} 
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-sm " placeholder="Enter initial messages"/>
                        </div> */}
                        
                        <div className=" flex flex-col gap-2 w-full relative group">{/**Creativity */}
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Creativity</p>
                                <p className=" text-base text-slate-500 ">
                                    Modify the creativity of the chatbot. Use with caution as more creativity sometimes result in inaccurate responses.
                                </p>
                            </div>
                            <div className=" flex  w-fit rounded-sm gap-4 ">
                                <div className={` flex p-2 px-4 hover:bg-zinc-600 cursor-pointer ${temp==0?" text-[#00ffff] border-2 border-[#00ffff] font-bold ":" text-white border-b border-white "} `}
                                onClick={() => settemp(0)}>Precise</div>
                                <div className={` flex p-2 px-4 hover:bg-zinc-600 cursor-pointer ${temp==1?" text-[#00ffff] border-2 border-[#00ffff] font-bold ":" text-white border-b border-white "}`}
                                onClick={() => settemp(1)}>Normal</div>
                                <div className={` flex p-2 px-4 hover:bg-zinc-600 cursor-pointer ${temp==2?" text-[#00ffff] border-2 border-[#00ffff] font-bold ":" text-white border-b border-white "} `}
                                onClick={() => settemp(2)}>Creative</div>
                            </div>
                        </div>
                        
                        <div className=" flex flex-col gap-2 w-full">{/**bot visibility */}
                            <p className=" text-lg font-semibold ">Visibility</p>
                            <p className=" text-base text-slate-500 ">
                                Private: Will be available only for you from <b>Test Chatbot</b> tab<br/>
                                Public: You can embed this chatbot on your website
                            </p>
                            <select onChange={(e) => setvisibility(e.currentTarget.value)} value={visibility} 
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-md " placeholder="Enter Chatbot Name">
                                <option value="private">Private</option>
                                <option value="public">Public</option>
                            </select>
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

                        <div className=" flex flex-col gap-2 w-full">{/**collect leads */}
                            <div className=" flex flex-col ">
                                <p className=" text-lg font-semibold ">Collect Customer Contact Information</p> 
                                <p className=" text-base text-slate-500 ">
                                    The service agent will collect customer information at the start of conversation. Collected information will be present under Leads tab
                                </p>
                            </div> 
                            <div className="flex items-center gap-2">
                                <label className="inline-block hover:cursor-pointer font-semibold" htmlFor="flexSwitchCheckDefault">No</label>
                                <input className={switchclass} type="checkbox" role="switch" id="flexSwitchCheckDefault" autoComplete=""
                                onChange={(e) => {
                                    setlcollect(e.currentTarget.checked);
                                    if(!e.currentTarget.checked) {
                                        setlname(false); setlemail(false); setlphone(false); setlorg(false);
                                    }
                                }} checked={lcollect}/>
                                <label className="inline-block hover:cursor-pointer font-semibold" htmlFor="flexSwitchCheckDefault">Yes</label>
                            </div>
                            {lcollect && <><div className=" flex flex-col ">
                                <p className=" text-base text-slate-500 ">
                                    Select the information to collect from customers
                                </p>
                            </div>
                            <div className=" flex gap-4 "> 
                                <div className="flex items-center gap-2">
                                    <label className="inline-block hover:cursor-pointer font-semibold" htmlFor="flexSwitchCheckDefault">Email</label>
                                    <input className={switchclass} type="checkbox" role="switch" id="flexSwitchCheckDefault" autoComplete=""
                                    onChange={(e) => {
                                        setlemail(e.currentTarget.checked)
                                        if(e.currentTarget.checked && !lcollect) setlcollect(true);
                                    }} checked={lemail}/>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="inline-block hover:cursor-pointer font-semibold" htmlFor="flexSwitchCheckDefault">Name</label>
                                    <input className={switchclass} type="checkbox" role="switch" id="flexSwitchCheckDefault" autoComplete=""
                                    onChange={(e) => {
                                        setlname(e.currentTarget.checked);
                                        if(e.currentTarget.checked && !lcollect) setlcollect(true);
                                    }} checked={lname}/>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="inline-block hover:cursor-pointer font-semibold" htmlFor="flexSwitchCheckDefault">Phone</label>
                                    <input className={switchclass} type="checkbox" role="switch" id="flexSwitchCheckDefault" autoComplete=""
                                    onChange={(e) => {
                                        setlphone(e.currentTarget.checked)
                                        if(e.currentTarget.checked && !lcollect) setlcollect(true);
                                    }} checked={lphone}/>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="inline-block hover:cursor-pointer font-semibold" htmlFor="flexSwitchCheckDefault">Organization</label>
                                    <input className={switchclass} type="checkbox" role="switch" id="flexSwitchCheckDefault" autoComplete=""
                                    onChange={(e) => {
                                        setlorg(e.currentTarget.checked)
                                        if(e.currentTarget.checked && !lcollect) setlcollect(true);
                                    }} checked={lorg}/>
                                </div>
                            </div>
                            <div className=" flex flex-col ">
                                <p className=" text-base text-slate-500 ">
                                    Enter the message to show to your customer while collecting information
                                </p>
                            </div>
                            <input type="text" onChange={(e) => setlmsg(e.currentTarget.value)} value={lmsg}
                            className=" flex p-2 font-semibold text-slate-500 outline-none rounded-sm invalid:bg-red-300 peer " placeholder="Enter message to show to customer"/>
                            </>}
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
