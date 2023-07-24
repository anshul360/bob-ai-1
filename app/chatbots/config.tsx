import Botbody from "@/app/chatbot/botbody";
import Button from "@/components/ui/Button"
import { useCallback, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { getBotConfig, saveBotConfig } from "@/app/supabase-server"
import Pageload from "./loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import * as s from "react-colorful/dist/index.css";

export default function Config({botId}: any) {
    const [ loadingpage, setloadingpage ] = useState(false);
    const [ bicon, setbicon ] = useState("/bobchat_avatar.svg");
    const [ bname, setbname ] = useState("BobAi");
    const [ bmbgcolor, setbmbgcolor ] = useState("#552299");
    const [ bmtxtcolor, setbmtxtcolor ] = useState("#ffffff");
    const [ binimsg, setbinimsg ]: any[] = useState(["👋 Hi! I am BobAI, ask me anything about BobAI!","By the way, you can create a chatbot like me for your website! 😮"]);
    const [ tbinimsg, settbinimsg ]: any[] = useState("");
    const [ bdefaultq, setbdefaultq ]: any[] = useState(["What is BobAI?","How BobAI can help me getting more attention?"]);
    const [ tbdefaultq, settbdefaultq ]: any[] = useState("");
    const [ bdomains, setbdomains ] = useState("");
    const [ bvisibility, setbvisibility ] = useState("");
    const [ bfont, setbfont ] = useState("font-sans");
    const [ darkmode , setDarkmode ] = useState(true);
    const [ saving, setsaving ] = useState(false);
    const [ savedbotrec, setbotrec ] = useState();

    const setBotconfig = useCallback((botrec: any, reset: boolean = false) => {
        setbname(botrec.name); setbmbgcolor(botrec.bg_color || "#552299"); setbmtxtcolor(botrec.text_color || "#ffffff");
        settbinimsg(botrec.initial_msgs); settbdefaultq(botrec.default_questions); setbvisibility(botrec.visibility || "private");
        setbdomains(botrec.allowed_domains);
        if(!reset) setbotrec(botrec);
        if(botrec.initial_msgs) updateBinimsg(botrec.initial_msgs);
        if(botrec.default_questions) updateBdefaultq(botrec.default_questions);
    }, []);
    // const [ ucolor, setucolor ] = useState("#552299");
    
    // useEffect(() => {
    //     settbinimsg(binimsg.join("\n"));
    // }, [ binimsg ]);
    // useEffect(() => {
    //     settbdefaultq(bdefaultq.join("\n"));
    // }, [ bdefaultq ]);
    useEffect(() => {
        setloadingpage(true);
        if(botId) 
            getBotConfig(botId)
            .then((res: any) => {
                if(res.success) {
                    let botrec = res.data[0];
                    // console.log(res.data);
                    setBotconfig(botrec);
                }
            }).catch((error) => console.log(error))
            .finally(() => setloadingpage(false));
    }, [botId]);

    function updateBinimsg(val: string) {
        settbinimsg(val);
        setbinimsg(val.split("\n"));
    }
    function updateBdefaultq(val: string) {
        settbdefaultq(val);
        setbdefaultq(val.split("\n"));
    }
    function setbiconfile(file: File) {
        if(file) {
            setbicon(URL.createObjectURL(file));
        }
    }
    function reset() {
        setBotconfig(savedbotrec, true);
    }

    async function saveConfig() {
        setsaving(true);
        if(botId) {
            const res = await saveBotConfig(botId, {name: bname, questions: tbdefaultq, initialmsg: tbinimsg, 
                bgcolor: bmbgcolor, textcolor: bmtxtcolor, visibility: bvisibility, domains: bdomains
            });
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
            console.log(res);
        }
        setsaving(false);
    }
    
    return<><ToastContainer />
        <div className=" flex w-full gap-4 flex-col md:flex-row ">
            <section className="mb-12 bg-zinc-900 md:w-[50%] w-full border-0 rounded-md border-pink-500 ">
                <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                            Appearance
                        </h1>
                        {/* <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
                            Below are the configurations that you can set for your chatbot
                        </p> */}
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col relative gap-4 ">
                        <div className=" flex flex-col gap-2 w-full">{/**bot name */}
                            <p className=" text-lg font-semibold ">Name</p>
                            <input type="text" onChange={(e) => setbname(e.currentTarget.value)} value={bname} 
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-md " placeholder="Enter Chatbot Name"/>
                        </div>
                        <div className=" flex flex-col gap-2 w-full">{/**bot ini messages */}
                            <p className=" text-lg font-semibold ">Initial Messages (You can enter multiple messages in a new line)</p>
                            <textarea rows={3} onChange={(e) => updateBinimsg(e.currentTarget.value)} value={tbinimsg} 
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-md " placeholder="Enter initial messages"/>
                        </div>
                        <div className=" flex flex-col gap-2 w-full">{/**bot default questions */}
                            <p className=" text-lg font-semibold ">Frequent Queries (You can enter multiple queries in a new line)</p>
                            <textarea rows={3} onChange={(e) => updateBdefaultq(e.currentTarget.value)} value={tbdefaultq} 
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-md " placeholder="Enter default questions for user"/>
                        </div>
                        <div className=" flex flex-col gap-2 w-full">{/**bot icon */}
                            <p className=" text-lg font-semibold ">Change icon (recommended 150px x 150px)</p>
                            <input type="file" onChange={(e) => setbiconfile(e.currentTarget.files![0])}
                            className=" relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary "/>
                        </div>
                        <div className=" flex justify-between gap-8 w-full">
                            <div className=" flex flex-col gap-2 w-full">{/**bot color picker */}
                                <p className=" text-lg font-semibold ">Message background color</p>
                                <HexColorPicker color={bmbgcolor} onChange={setbmbgcolor} style={{width: "auto"}} />
                            </div>
                            <div className=" flex flex-col gap-2 w-full">{/**bot name */}
                                <p className=" text-lg font-semibold ">Message text color</p>
                                <HexColorPicker color={bmtxtcolor} onChange={setbmtxtcolor} style={{width: "auto"}} />
                            </div>
                        </div>
                        <div className=" flex flex-col gap-2 w-full">{/**bot visibility */}
                            <p className=" text-lg font-semibold ">Visibility</p>
                            <select onChange={(e) => setbvisibility(e.currentTarget.value)} value={bvisibility} 
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-md " placeholder="Enter Chatbot Name">
                                <option value="private">Private</option>
                                <option value="public">Public</option>
                            </select>
                            <p className=" text-base ">
                                Private: Chatbot not available for website domains<br/>
                                Public: Chatbot available for website domains
                            </p>
                        </div>
                        <div className=" flex flex-col gap-2 w-full relative group">{/**Allowed Domains */}
                            <p className=" text-lg font-semibold ">Allowed Domains</p>
                            <textarea rows={2} onChange={(e) => setbdomains(e.currentTarget.value)} value={bdomains} 
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-md " placeholder="Enter you domain names"/>
                            <p className=" text-base ">
                                Add the domain names which you wish to embed the chatbot on.
                                You can add multiple domains separating by comma. Format <i>&lt;your_domain&gt;.com</i>
                            </p>
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
                        <Button variant="slim" type="button" disabled={saving} onClick={() => saveConfig()} loading={saving}
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
            <section className="mb-12 bg-zinc-900  md:w-[50%] w-full border-0 rounded-md border-pink-500 min-h-[800px] ">
                <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-8 lg:px-8 h-full flex flex-col items-center ">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                            Preview
                        </h1>
                        {/* <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl mb-4 ">
                            Below is a preview of your chatbot
                        </p> */}
                    </div>
                    <div className="sm:align-center flex flex-col max-w-xl w-full h-full ">
                        {/* <iframe src={`/chatbot?id=${botId}`} className=" h-full w-full rounded-md " /> */}
                        <Botbody darkmode={darkmode} setDarkmode={setDarkmode} bfont={bfont} bicon={bicon} bname={bname} binimsg={binimsg} bdefaultq={bdefaultq} bmbgcolor={bmbgcolor} bmtxtcolor={bmtxtcolor} />
                    </div>
                </div>
            </section>
            {loadingpage?<Pageload />:<></>}
        </div>
    </>
}