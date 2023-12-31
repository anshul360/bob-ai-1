import Link from "next/link";
import Image from "next/image";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { BsSendFill } from "react-icons/bs";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { RiLoader3Fill } from "react-icons/ri";
import { getBotConfig, getUserConversations, saveUserConversation } from "../supabase-server";
import LoadingDots from "@/components/ui/LoadingDots/LoadingDots";

export default function Botbody({botId, user}: any) {

    const [ basep, setbasep ] = useState('I want you to act as a document that I am having a conversation with. Your name is "AI Assistant". You will provide me with answers from the given info in CONTEXT. If the answer is not included, say exactly "Hmm, I am not sure. Please contact admin" and stop after that. Refuse to answer any question not about the info. Never break character.');
    const [ temp, settemp ] = useState(0);
    const [ builtinimsg, setbuiltinimsg ]: any[] = useState([]);
    const [ builtdefq, setbuiltdefq ]: any[] = useState([])
    const [ query, setQuery ] = useState("");
    const [ loadingResponse, setloadingResponse ] = useState(false);
    const [ loadingconvo, setloadingconvo ] = useState(false);

    const [ bicon, setbicon ] = useState("/bobchat_avatar.svg");
    const [ bname, setbname ] = useState();
    const [ bmbgcolor, setbmbgcolor ] = useState("#552299");
    const [ bmtxtcolor, setbmtxtcolor ] = useState("#ffffff");
    const [ binimsg, setbinimsg ]: any[] = useState([]);//"👋 Hi! I am BobAI, ask me anything about BobAI!","By the way, you can create a chatbot like me for your website! 😮"
    const [ bdefaultq, setbdefaultq ]: any[] = useState([]);//"What is BobAI?","How BobAI can help me getting more attention?"
    const [ convo, setconvo ]: any[] = useState([]);
    const [ reqpm, setreqpm ] = useState(0);
    const [ darkmode , setDarkmode ] = useState(true);
    const keepFocusRef = useRef<null | HTMLDivElement>(null);
    const [ chatinst, setchatinst ]: any = useState();
    const [ tmr, settmr ] = useState(false);

    const setBotconfig = (botrec: any, reset: boolean = false) => {
        setbname(botrec.name); setbasep(botrec.base_prompt); settemp(botrec.temperature); setbicon(botrec.icon_url); setreqpm(botrec.req_per_min);
        setbmbgcolor(botrec.bg_color || "#3c91b2"); setbmtxtcolor(botrec.text_color || "#ffffff"); setconvo(botrec.conversation); setDarkmode(botrec.theme=="dark");
        if(botrec.initial_msgs) updateBinimsg(botrec.initial_msgs);
        if(botrec.default_questions) updateBdefaultq(botrec.default_questions);
        getUserConversations(user.id, botId)
        .then((res: any) => {
            console.log("-=--=convo-=-",res);
            if(res.length>0) {
                let tempmsg: any[] = [];
                setchatinst(res[0]);
                // setchatdata(res[0].chat_data);
                res[0].chat_data.map((msg: any, i: number) => {
                    tempmsg.push(message(msg.message, msg.role=="user",100+i, botrec.bg_color, botrec.text_color));
                });
                setconvo(tempmsg);
            }
        }).catch((error) => console.log(error)).finally(() => setloadingconvo(false));
    };

    const message = useCallback((msg: string, user: boolean, key: number, ubgcolor: string, utxtcolor: string) => {
        const bgc =  user?ubgcolor:"";
        const tc = user?getContrastingTextColor(ubgcolor):"rgb(51 65 85)";
        // console.log(bgc,tc);
        return(
            <div className={` flex w-full h-auto ${user?" justify-end ":" justify-start "} font-semibold`} key={key}>
                <div className={` flex ${user? " rounded-br-s rounded-t-3xl rounded-bl-3xl ":"  bg-[#e2e8f0] rounded-bl-s rounded-t-3xl rounded-br-3xl "} w-auto max-w-[90%] px-4 text-start prose `}
                style={{backgroundColor: bgc, color: tc}} key={key}>
                    <ReactMarkdown linkTarget="_blank" remarkPlugins={[remarkMath, rehypeKatex, remarkGfm]} className={` flex flex-col `} key={key}>
                        {msg}
                    </ReactMarkdown>
                </div>
            </div>
        );
    }, [bmbgcolor,bmtxtcolor,darkmode]);

    const buildDefaultQuestions = (question: string, index: number) => {
        return(
            <button className=" flex rounded-md px-4 p-1 cursor-pointer hover:bg-gray-300 bg-gray-200 text-slate-700" 
            key={index} onClick={(e) => fetchInformation(e.currentTarget.innerText)} disabled={loadingResponse}>
                {question}
            </button>
        );
    }

    useEffect(() => {
        // setloadingpage(true);
        if(botId && user && !bname) { 
            setloadingconvo(true);
            getBotConfig(botId, user.id)
            .then((res: any) => {
                if(res.success) {
                    let botrec = res.data[0];
                    // console.log(res.data);
                    setBotconfig(botrec);
                }
            }).catch((error) => console.log(error));
        }
            // .finally(() => setloadingpage(false));
    }, [botId, user]);

    useEffect(() => {
        let tempsysmsg: any[] = [];
        binimsg.map((msg: string, index: number) => {
            if(msg.trim()) tempsysmsg.push(message(msg, false, index, "", ""))
        });
        setbuiltinimsg(tempsysmsg);
    }, [ binimsg ]);

    useEffect(() => {
        let tempiniq: any[] = [];
        bdefaultq.map((msg: string, index: number) => {
            if(msg.trim()) tempiniq.push(buildDefaultQuestions(msg, index))
        });
        setbuiltdefq(tempiniq);
    }, [ bdefaultq,chatinst,loadingResponse ]);

    useEffect(() => {
        keepFocusRef.current?.scrollIntoView({behavior: "auto", block: "nearest"});
    }, [loadingResponse, convo]);

    const fetchInformation = async (defquery: string = "") => {
        try {
            setloadingResponse(true);
            const q = defquery.length>0?defquery:query;
            const upchatinst: any = {};
            upchatinst.id = chatinst?.id;
            let tempchathist = chatinst?.chat_data || [];
            tempchathist.push({"role":"user","message":q});
            setconvo((messages: any[]) => {
                if(messages) return [...messages, message(q, true, 100+messages.length, bmbgcolor, bmtxtcolor)];
                else return [message(q, true, 100, bmbgcolor, bmtxtcolor)];
            });
            
            setQuery("");
            
            let chathist: any[] = chatinst?.chat_data?chatinst.chat_data.slice(-11):[];
            const response = await fetch("/api/docs/query", {
                method: "POST",
                body: JSON.stringify({ reqpm, query: q, chathist, botId, basep, temp })
            })
            if (!response.ok || !response.body) {
                if(response.status == 429) {
                    settmr(true);
                    setTimeout(() => {
                        settmr(false);
                    }, 5000);
                }
                throw response.statusText;
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            setconvo((messages: any[]) => [...messages, message("", false, messages.length+1, "", "")]);
            let streameddata = "";
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    tempchathist.push({"role":"ai","message":streameddata});
                
                    upchatinst.chat_data = tempchathist;
                    upchatinst.visitor_id = user?user.id:null;
                    upchatinst.bot_id = botId;
                    console.log("-=-=up--",upchatinst);
                    const ressuv = await saveUserConversation(upchatinst);
                    // console.log(ressuv.data[0]);
                    const newd = ressuv.data[0];
                    // console.log(newd);
                    //if(ressuv.success) {
                        setchatinst(newd);
                        localStorage.setItem("visuid", newd.visitor_id);
                    //}
                    setloadingResponse(false);
                    break;
                }

                const decodedChunk = decoder.decode(value, { stream: true });
                streameddata += decodedChunk;
            
                setconvo((messages1: any[]) => {
                    let tempmsgs: any[] = [];
            
                    tempmsgs.push(...messages1);
            
                    tempmsgs.pop();
            
                    tempmsgs.push(message(streameddata, false, messages1.length+1, "", ""));
            
                    return tempmsgs;
                });
            }
        } catch(ex) {
            setloadingResponse(false);
        }
    }
    function updateBinimsg(val: string) {
        // settbinimsg(val);
        setbinimsg(val.split("\n"));
    }
    function updateBdefaultq(val: string) {
        // settbdefaultq(val);
        setbdefaultq(val.split("\n"));
    }
    function getContrastingTextColor(bgColor: string) {
        // Ensure the input is in the format #RRGGBB
        if (bgColor.charAt(0) === '#') {
        bgColor = bgColor.substr(1);
        }

        // Convert the input color to RGB
        const r = parseInt(bgColor.substr(0, 2), 16);
        const g = parseInt(bgColor.substr(2, 2), 16);
        const b = parseInt(bgColor.substr(4, 2), 16);

        // Calculate the luminance value using the WCAG formula
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Return the appropriate text color based on the luminance value
        return luminance > 0.5 ? 'black' : 'white';
    }

    const hcf = () => {
        let hc = ((parseInt(bmbgcolor.replace(/^#/, ''), 16) & 0xfefefe) >> 1).toString(16);
        let pad = ""
        if(hc.length < 6) {
            for(let i=hc.length; i<6; i++) {
                pad += "0"
            }
        }
        return "#"+pad+hc;
    }

    return(
        <>
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
            <main className={` relative flex w-full h-full flex-col items-center border border-[#00ffff] ${darkmode?" dark ":""} bg-white rounded-md overflow-hidden`}>
                <div id="cheader" className=" flex w-full p-2 justify-start items-center gap-4 border-b dark:antialiased dark:border-slate-700 transition-colors duration-200 " 
                style={{color: getContrastingTextColor(bmbgcolor), backgroundColor: bmbgcolor,  
                    backgroundImage: `linear-gradient(to right,${bmbgcolor}, ${hcf()})`}} >
                    <div className=" flex gap-4 justify-start items-center ">
                        {/* <div id="cicon" className=" w-9 h-9 rounded-full overflow-hidden ">
                            <Image src={bicon} alt={""} width={100} height={100} />
                        </div> */}
                        <div id="cname" className=" flex font-bold text-xl flex-1 " style={{color: getContrastingTextColor(bmbgcolor)}}>
                            {bname}
                        </div>
                    </div>
                    <div className="flex flex-1"></div>
                    {/* <div id="cmode" className=" flex ">
                        {
                            darkmode?
                            <HiOutlineSun className=" text-white text-2xl cursor-pointer " title="light" onClick={() => setDarkmode(false)} />:
                            <HiOutlineMoon className=" text-black text-2xl cursor-pointer " title="dark" onClick={() => setDarkmode(true)} />
                        }
                    </div> */}
                </div>
                {/* <Suspense fallback={<p>Loading...</p>}> */}
                <div id="cbody" className=" flex h-[500px] w-full flex-col p-2 overflow-y-auto bg-[#fafafa] gap-4 dark:bg-[#353c49] dark:antialiased transition-colors duration-200 ">
                        {builtinimsg}
                        
                        {convo}{loadingconvo && <LoadingDots />}
                        {loadingResponse && <LoadingDots />}
                        <div id="ctypingi" className=" flex w-full justify-center mb-4 " ref={keepFocusRef}>
                            {/* {loadingResponse?<SlSettings className=" text-2xl animate-spin dark:text-white "/>:<></>} */}
                        </div>
                </div>
                {/* </Suspense> */}
                <div id="cfooter" className=" flex pt-2 flex-col border-t px-2 w-full bg-[#fafafa] dark:bg-[#353c49] dark:antialiased dark:border-slate-700 transition-colors duration-200 ">
                    <div id="cdefaultq" className=" flex gap-1 font-semibold text-sm flex-wrap ">
                        {builtdefq}
                    </div>
                    <div id="cinput" className=" flex py-1 gap-2 ">
                        <input type="text" className=" flex flex-1 p-2 bg-gray-200 rounded-md outline-none focus:ring-1 focus:ring-gray-400 text-slate-700"  value={query} 
                        onChange={(e) => setQuery(e.currentTarget.value)} onKeyUp={(e) => {
                            if(e.currentTarget.value.trim().length > 0 &&  e.key === "Enter") {
                                fetchInformation();
                            }
                        }} placeholder="Type your query here..."
                        />
                        <button className=" flex border rounded-md p-2 font-bold items-center dark:border-slate-700 disabled:cursor-not-allowed " style={{backgroundColor: bmbgcolor, color: getContrastingTextColor(bmbgcolor)}}
                        disabled={query.trim().length==0 || loadingResponse} onClick={() => fetchInformation()}
                        >
                            {loadingResponse?
                            <RiLoader3Fill className=" text-2xl animate-spin "/>:
                            <BsSendFill className=" text-2xl "/>
                            }
                        </button>
                    </div>
                </div>
                {/* <Link target="blank" href={process.env.NEXT_PUBLIC_BASE_URL || ""} className=" flex text-black text-sm pb-1 w-full justify-center dark:bg-zinc-900 dark:antialiased dark:text-white transition-colors duration-200 ">
                    <p>
                        Powered by&nbsp;<span className=" font-semibold ">CyanArrow</span>
                    </p>
                </Link> */}
                {tmr && <div className=" flx absolute bottom-28 p-4 bg-white text-slate-700 border rounded-sm font-bold">
                    <p>Chatbot is taking a break. Please try after sometime.</p>
                </div>}
            </main>
        </>
    );
}