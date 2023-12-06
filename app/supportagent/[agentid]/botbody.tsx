'use client'

import Link from "next/link";
import Image from "next/image";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { BsChevronDoubleDown, BsSendFill } from "react-icons/bs";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { RiLoader3Fill } from "react-icons/ri";
import { getBotConfigUuid, getUserConversationsCookie, saveUserConversation } from "../../supabase-server";
import LoadingDots from "@/components/ui/LoadingDots/LoadingDots";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import { saveLeadInfo } from "@/utils/supabase-admin";

export default function Botbody({botuid, botrecord, closeb}: any) {

    const [ botId, setbotId ] = useState("");
    const [ basep, setbasep ] = useState('I want you to act as a document that I am having a conversation with. Your name is "AI Assistant". You will provide me with answers from the given info in CONTEXT. If the answer is not included, say exactly "Hmm, I am not sure. Please contact admin" and stop after that. Refuse to answer any question not about the info. Never break character.');
    const [ temp, settemp ] = useState(0);
    const [ builtinimsg, setbuiltinimsg ]: any[] = useState([]);
    const [ builtdefq, setbuiltdefq ]: any[] = useState([]);
    const [ visibility, setvisibility ] = useState("private");
    const [ query, setQuery ] = useState("");
    const [ loadingResponse, setloadingResponse ] = useState(false);
    const [ loadingconvo, setloadingconvo ] = useState(true);

    const [ bicon, setbicon ] = useState("/bobchat_avatar.svg");
    const [ bname, setbname ] = useState();
    const [ bmbgcolor, setbmbgcolor ] = useState("#000000");
    const [ bmtxtcolor, setbmtxtcolor ] = useState("#ffffff");
    const [ binimsg, setbinimsg ]: any[] = useState([]);//"👋 Hi! I am BobAI, ask me anything about BobAI!","By the way, you can create a chatbot like me for your website! 😮"
    const [ bdefaultq, setbdefaultq ]: any[] = useState([]);//"What is BobAI?","How BobAI can help me getting more attention?"
    const [ convo, setconvo ]: any[] = useState([]);
    const [ tmr, settmr ] = useState(false);

    const [ darkmode , setDarkmode ] = useState(false);
    const keepFocusRef = useRef<null | HTMLDivElement>(null);
    const scrollRef = useRef<null | HTMLDivElement>(null);
    const [ chatinst, setchatinst ]: any = useState();
    const [ grscrore, setgrscore ] = useState();
    const [ reqpm, setreqpm] = useState(50);
    const [ lconfig, setlconfig ]: any = useState({});
    const [ lcontainer, setlcontainer ] = useState(<></>);
    const [ lsubmitted, setlsubmitted ] = useState(false);
    const [ wl, setwl ] = useState(true);
    
    // try {
    //     console.log("=====",window.self);
    //     console.log("-----",window.top);
    //     console.log("+++++",document.domain);
    //     console.log("_____",window.parent.location);
    //     console.log("_____",window.location);
    //     console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    // } catch (e) {
    //     console.log("-=-==-=-",e);
    // }

    const setBotconfig = (botrec: any, reset: boolean = false) => {
        setbotId(botrec.id); setbname(botrec.name); setbasep(botrec.base_prompt); settemp(botrec.temperature); setbicon(botrec.icon_url); setreqpm(botrec.req_per_min);
        setbmtxtcolor(botrec.text_color || "#ffffff"); setconvo(botrec.conversation); setbmbgcolor(botrec.bg_color || "#552299"); setlconfig(botrec.leads_config); setDarkmode(botrec.theme=="dark");
        setvisibility(botrec.visibility); setwl(botrec.users?.white_labeled ?? false);
        if(botrec.initial_msgs) updateBinimsg(botrec.initial_msgs);
        if(botrec.default_questions) updateBdefaultq(botrec.default_questions);
        const visuid = localStorage.getItem("visuid");
        getUserConversationsCookie(botrec.id, visuid?visuid:"")
        .then((res: any) => {
            // console.log("-=--=convo-=-",res);
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

    const message = (msg: string, user: boolean, key: number, ubgcolor: string, utxtcolor: string) => {
        const bgc =  user?ubgcolor:"";
        const tc = user?getContrastingTextColor(ubgcolor):"rgb(51 65 85)";
        // console.log(bgc,tc);
        return(
            <div className={` flex w-full h-auto ${user?" justify-end ":" justify-start "} text-slate-700 font-semibold`} key={key}>
                <div className={` flex ${user? " rounded-br-s rounded-t-3xl rounded-bl-3xl ":" bg-[#e2e8f0] rounded-bl-s rounded-t-3xl rounded-br-3xl "} w-auto max-w-[90%] px-4 text-start prose `}
                style={{backgroundColor: bgc, color: tc}} key={key}>
                    <ReactMarkdown linkTarget="_blank" remarkPlugins={[remarkMath, rehypeKatex, remarkGfm]} className={` flex flex-col `} key={key}>
                        {msg}
                    </ReactMarkdown>
                </div>
            </div>
        );
    };

    const buildDefaultQuestions = (question: string, index: number) => {
        return(
            <button className=" flex rounded-md px-4 p-1 cursor-pointer hover:bg-gray-300 bg-gray-200 text-slate-700 "
            key={index} onClick={() => fetchInformation(question)} disabled={loadingResponse}>{/* */}
                {question}
            </button>
        );
    }

    useEffect(() => {
        if(botrecord && !bname) { 
            setloadingconvo(true);
            // getBotConfigUuid(botuid)
            // .then((res: any) => {
            //     if(res.success) {
            //         let botrec = res.data[0];
            //         setBotconfig(botrec);
            //     } else {
            //         notFound();
            //     }
            // }).catch((error) => console.log(error));
            setBotconfig(botrecord);
        }
    }, [botrecord]);

    useEffect(() => {
        let tempsysmsg: any[] = [];
        binimsg.map((msg: string, index: number) => {
            if(msg.trim()) tempsysmsg.push(message(msg, false, index, "", ""))
        });
        setbuiltinimsg(tempsysmsg);
    }, [ binimsg ]);

    useEffect(() => {
        console.log(lcontainer.key);
    },[lcontainer]);

    useEffect(() => {
        let tempiniq: any[] = [];
        bdefaultq.map((msg: string, index: number) => {
            if(msg.trim()) tempiniq.push(buildDefaultQuestions(msg, index))
        });
        setbuiltdefq(tempiniq);
    }, [ bdefaultq,chatinst,loadingResponse ]);

    useEffect(() => {
        keepFocusRef.current?.scrollIntoView({behavior: "auto", block: "nearest"});
    }, [loadingResponse, convo, loadingconvo]);
    /**DO NOT DELETE CODE BELOW */
    // useEffect(() => {
    //     try { 
    //         grecaptcha.enterprise.ready(async () => {
    //             const token = await grecaptcha.enterprise.execute('6Ldhw1knAAAAALTeoCS6KE3uiamWFWoJLwJajscG', {action: 'supportagent'});
                
    //             const resgre = await fetch("http://localhost:3000/api/recaptcha?code="+token);
    //             const dataj = await resgre.json();
    //             console.log(dataj.data.riskAnalysis.score);
    //             setgrscore(dataj.data.riskAnalysis.score);
    //         });
    //     } catch(e) {
    //         console.log(e);
    //     }
    // }, []);

    // function createLeadContainer() {
    //     return <div className={` flex max-w-lg h-auto justify-start text-white flex-col`}>
    //         <div className={` flex  dark:bg-zinc-700 bg-zinc-900 max-w-[90%] rounded-xl p-4 text-start flex-col gap-2 `}>
    //             <div className=" flex justify-between items-center w-full ">
    //                 <p className=" font-bold text-lg flex justify-between items-center ">
    //                     {lconfig.message}
    //                 </p>
    //                 <div className=" flex cursor-pointer " onClick={() => ignorelcollect()}>
    //                     <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
    //                         <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 
    //                         0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path>
    //                         <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 
    //                         372 372-166.6 372-372 372z"></path>
    //                     </svg>
    //                 </div>
    //             </div>
    //             {lconfig.name && <>
    //                 <label className=" flex font-semibold gap-2 justify-center flex-col "> Name
    //                     <input type="text" onChange={(e) => setlname(e.currentTarget.value)} 
    //                     className=" flex flex-1 p-2 font-semibold text-slate-500 outline-none rounded-sm invalid:bg-red-300 peer " placeholder="Enter your name"/>
    //                 </label>
    //             </>}
    //             {lconfig.email && <>
    //                 <label className=" flex font-semibold gap-2 justify-center flex-col "> Email
    //                     <input type="text" onChange={(e) => setlemail(e.currentTarget.value)} 
    //                     className=" flex flex-1 p-2 font-semibold text-slate-500 outline-none rounded-sm invalid:bg-red-300 peer " placeholder="Enter your email"/>
    //                 </label>
    //             </>}
    //             {lconfig.phone && <>
    //                 <label className=" flex font-semibold gap-2 justify-center flex-col "> Phone
    //                     <input type="text" onChange={(e) => setlphone(e.currentTarget.value)} 
    //                     className=" flex flex-1 p-2 font-semibold text-slate-500 outline-none rounded-sm invalid:bg-red-300 peer " placeholder="Enter your phone number"/>
    //                 </label>
    //             </>}
    //             {lconfig.org && <>
    //                 <label className=" flex font-semibold gap-2 justify-center flex-col "> Orgnization
    //                     <input type="text" onChange={(e) => setlorg(e.currentTarget.value)} 
    //                     className=" flex flex-1 p-2 font-semibold text-slate-500 outline-none rounded-sm invalid:bg-red-300 peer " placeholder="Enter your organization name"/>
    //                 </label>
    //             </>}  
    //             <Button variant="slim" type="button" onClick={() => saveLead()}
    //             className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
    //                 Submit
    //             </Button>
    //         </div>
    //     </div>
    // }

    const fetchInformation = async (defquery: string = "") => {
        try {
            // console.log(defquery);
            setloadingResponse(true);
            const q = defquery.length>0?defquery:query;
            // console.log(q);
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
                body: JSON.stringify({ query: q, chathist, botId, basep, temp, reqpm })
            });
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
                    upchatinst.bot_id = botId;
                    // console.log("-=-=up--",upchatinst);
                    const ressuvraw = await fetch("/api/conversation/store", {
                        method: "POST",
                        body: JSON.stringify( upchatinst )
                    });//saveUserConversation(upchatinst);
                    const ressuv = await ressuvraw.json();
                    // console.log(ressuv);
                    if(!ressuv.success) throw "unable to save conversation";
                    const newd = ressuv.data[0];
                    setchatinst(newd);
                    localStorage.setItem("visuid", newd.visitor_id);
                    setloadingResponse(false);
                    
                    const lclose = sessionStorage.getItem("lclose");
                    // console.log('-=-=sess', lclose);
                    if(lclose != "i" && lclose != "s") {
                        // console.log('-=-=inside sess');
                        setlcontainer(<LeadContainer key={50} lconfig={lconfig} setlcontainer={setlcontainer} chatinstid={newd.id} botid={botId} setlsubmitted={setlsubmitted}/>);
                    }
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
        setbinimsg(val.split("\n"));
    }
    function updateBdefaultq(val: string) {
        setbdefaultq(val.split("\n"));
    }
    function startgreptcha(e: any) {
        console.log(e);
    }
    // if(visibility=="private") return notFound();
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

    // useEffect(() => {   
    //     window.addEventListener("scroll", () => listenToScroll());
    //     return () => 
    //         window.removeEventListener("scroll", () => listenToScroll()); 
    // }, []);

    const listenToScroll = function() {
        if(scrollRef.current?.style) {
            console.log("triggered--");
            scrollRef.current.style.display = "flex";
        }
    }

    return(
        <>
            <style>{`
                .grecaptcha-badge { visibility: hidden; }
                
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
            <main className={` flex w-full max-h-[100vh] h-full flex-col justify-center items-center border-0 border-[#00ffff] ${darkmode?" dark ":""} overflow-hidden `}>
                <div id="cheader" className=" flex w-full h-44 p-2 justify-start items-center gap-4 border-b dark:antialiased dark:border-slate-700 transition-colors duration-200 " 
                style={{color: getContrastingTextColor(bmbgcolor), backgroundColor: bmbgcolor, 
                    backgroundImage: `linear-gradient(to right,${bmbgcolor}, ${((parseInt(bmbgcolor.replace(/^#/, ''), 16) & 0xfefefe) >> 1).toString(16).length<6?
                    "#0"+((parseInt(bmbgcolor.replace(/^#/, ''), 16) & 0xfefefe) >> 1).toString(16):
                    "#"+((parseInt(bmbgcolor.replace(/^#/, ''), 16) & 0xfefefe) >> 1).toString(16)})`}} >
                    {/* <Link href="/" className=" flex gap-4 justify-start items-center "> */}
                        {/* <div id="cicon" className=" w-9 h-9 rounded-full overflow-hidden ">
                            <Image src={bicon} alt={""} width={100} height={100} />
                        </div> */}
                        {/* <div id="cname" className=" flex font-bold text-xl flex-1 " style={{color: getContrastingTextColor(bmbgcolor)}}>
                            {bname}
                        </div>
                    <div className="flex flex-1"></div> */}
                    <div className=" flex flex-1 flex-col gap-2 justify-start items-center ">
                        {/* <div id="cicon" className={` w-9 h-9 rounded-full overflow-hidden ${icof?" border-2 border-[#00ffff] ":" border-0 "}`}>
                            <Image src={bicon} alt={""} width={100} height={100} />
                        </div> */}
                        <div id="cname" className={` flex font-bold text-3xl `} style={{color: getContrastingTextColor(bmbgcolor)}}>
                            {bname}
                        </div>
                        <p className=" font-semibold" style={{color: getContrastingTextColor(bmbgcolor)}}>Ask any question. We are here to help you!</p>
                    </div>
                    {/* <div id="cmode" className=" flex ">
                        {
                            darkmode?
                            <HiOutlineSun className=" text-white text-2xl cursor-pointer " title="light" onClick={() => setDarkmode(false)} />:
                            <HiOutlineMoon className=" text-black text-2xl cursor-pointer " title="dark" onClick={() => setDarkmode(true)} />
                        }
                    </div> */}
                    <div className={` flex absolute top-1 right-2 font-bold cursor-pointer ${closeb==1?" hidden ":""}`} style={{color: getContrastingTextColor(bmbgcolor)}} title="Close" onClick={() => window.parent.postMessage("closeAgent","*")}>&#10005;</div>
                </div>
                {/* <Suspense fallback={<p>Loading...</p>}> */}
                <div id="cbody" className=" flex relative flex-1 h-full w-full flex-col p-2 px-4 overflow-y-auto bg-[#fafafa] gap-4 dark:bg-[#353c49] dark:antialiased transition-colors duration-200 " onScroll={(e) => {listenToScroll()}}>
                        {loadingconvo?<></>:builtinimsg}
                        
                        {loadingconvo?<></>:convo}
                        {loadingconvo?<LoadingDots />:<></>}
                        {lcontainer}
                        {loadingResponse && <LoadingDots />}
                        <div id="ctypingi" className=" flex w-full justify-end mb-4 " ref={keepFocusRef}>
                            {/* {loadingResponse?<SlSettings className=" text-2xl animate-spin dark:text-white "/>:<></>} */}
                            
                        </div>
                </div>
                {/* </Suspense> */}
                <div id="cfooter" className=" flex relative py-2 flex-col border-t-0 px-2 w-full bg-[#fafafa] dark:bg-[#353c49] dark:antialiased dark:border-slate-700 transition-colors duration-200 ">
                    {/* <div className={`  flex absolute w-fit object-contain -top-12 right-3 font-extrabold rounded-full p-2 animate-bounce cursor-pointer `} style={{color:getContrastingTextColor(bmbgcolor), backgroundColor: bmbgcolor, border: ` 1px solid ${getContrastingTextColor(bmbgcolor)}`}}
                    onClick={(e) => {
                            keepFocusRef.current?.scrollIntoView({behavior: "auto", block: "nearest"});
                            const curel = e.currentTarget;
                            setTimeout(() => {
                                curel.style.display = "none";
                            }, 50);
                        }
                    } ref={scrollRef}>
                        <BsChevronDoubleDown className=" w-8 h-8 font-extrabold"/>
                    </div> */}
                    <div id="cdefaultq" className=" flex gap-1 font-semibold text-sm flex-wrap ">
                        {builtdefq}
                    </div>
                    <div id="cinput" className=" flex py-1 gap-2 bg-gray-200 p-2 rounded mt-1 ">
                        <input type="text" className=" flex flex-1 p-2 bg-gray-200 rounded-md outline-none focus:ring-0 text-slate-700"  value={query} 
                        onChange={(e) => setQuery(e.currentTarget.value)} onKeyUp={(e) => {
                            if(e.currentTarget.value.trim().length > 0 &&  e.key === "Enter") {
                                fetchInformation();
                            }
                        }}  placeholder="Type your query here..."
                        />
                        <button className=" flex border rounded-md p-2 font-bold items-center disabled:cursor-not-allowed " style={{backgroundColor: bmbgcolor, color: getContrastingTextColor(bmbgcolor)}}
                        disabled={query.trim().length==0 || loadingResponse} onClick={() => fetchInformation()}
                        >
                            {loadingResponse?
                            <RiLoader3Fill className=" text-2xl animate-spin "/>:
                            <BsSendFill className=" text-2xl "/>
                            }
                        </button>
                    </div>
                </div>
                {wl?<></>:<Link target="blank" href={process.env.NEXT_PUBLIC_BASE_URL || ""} className=" flex text-black bg-[#fafafa] text-sm py-1 w-full justify-center dark:bg-[#353c49] dark:antialiased dark:text-white transition-colors duration-200 ">
                    <p>
                        Powered by&nbsp;<span className=" font-semibold ">Cyan Arrow</span>
                    </p>
                </Link>}
                {/**DO NOT DELETE CODE BELOW  */}
                {/* <div id="cgpolicy" className=" flex gap-2 font-semibold text-xs text-black pt-2 border-t px-2 w-full dark:text-white justify-center bg-white dark:bg-zinc-900 dark:antialiased dark:border-slate-700 transition-colors duration-200 ">
                    This site is protected by reCAPTCHA and the Google
                    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                </div> */}
                {tmr && <div className=" flx absolute bottom-28 p-4 bg-white text-slate-700 border rounded-sm font-bold">
                    <p>Chatbot is taking a break. Please try after sometime.</p>
                </div>}
                {lsubmitted && <div className=" flx absolute bottom-28 p-4 bg-white text-slate-700 border rounded-sm font-bold">
                    <p>Thank you!</p>
                </div>}
            </main>
        </>
    );
}

function LeadContainer({ lconfig, setlcontainer, chatinstid, botid, setlsubmitted }: any) {
    // const []
    const [ lname, setlname ] = useState("");
    const [ lemail, setlemail ] = useState("");
    const [ lphone, setlphone ] = useState("");
    const [ lorg, setlorg ] = useState("");
    const [ eerror, seteerror ] = useState(false);
    const [ perror, setperror ] = useState(false);
    const [ submitting, setsubmitting ] = useState(false);

    const emailregex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
    const phoneregex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm;

    const saveLead = async function () {
        setsubmitting(true);
        const leadj = {
            name: lname, email: lemail, phone: lphone, org: lorg
        }
        // console.log("-=-=-=-=-=--=-=-=-", leadj);
        try {
            const resl = await saveLeadInfo(leadj, chatinstid, Number(botid));
            setlcontainer(<></>);
            setlsubmitted(true);
            setTimeout(() => {
                setlsubmitted(false);
            }, 5000);
            sessionStorage.setItem("lclose", "s");
        } catch(e) {
            console.log("error submitting lead");
        }
        setsubmitting(false);
    }

    function ignorelcollect() {
        setlcontainer(<></>);
        sessionStorage.setItem("lclose", "i");
    }

    function evalidation(val: string) {
        if(val.match(emailregex)) seteerror(false);
        else seteerror(true);
    }
    function pvalidation(val: string) {
        if(val.match(phoneregex)) setperror(false);
        else setperror(true);
    }

    if(!lconfig.name && !lconfig.email && !lconfig.phone && !lconfig.org) return<></>;

    return <div className={` flex max-w-lg h-auto justify-start text-white flex-col`}>
        <div className={` flex  dark:bg-zinc-700 bg-zinc-900 max-w-[90%] rounded-xl p-4 text-start flex-col gap-2 `}>
            <div className=" flex justify-between items-center w-full ">
                <p className=" font-bold text-lg flex justify-between items-center ">
                    {lconfig.message}
                </p>
                <div className=" flex cursor-pointer " onClick={() => ignorelcollect()}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 
                        0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path>
                        <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 
                        372 372-166.6 372-372 372z"></path>
                    </svg>
                </div>
            </div>
            {lconfig.name && <>
                <label className=" flex font-semibold gap-2 justify-center flex-col "> Name
                    <input type="text" onChange={(e) => setlname(e.currentTarget.value)} 
                    className=" flex flex-1 p-2 font-semibold text-slate-500 outline-none rounded-sm  " placeholder="Enter your name"/>
                </label>
            </>}
            {lconfig.email && <>
                <label className=" flex font-semibold gap-2 justify-center flex-col "> Email
                    <input type="text" onChange={(e) => {setlemail(e.currentTarget.value);evalidation(e.currentTarget.value)}} 
                    className={` flex flex-1 p-2 font-semibold text-slate-500 outline-none rounded-sm  ${eerror?" border border-red-500 ":""} `} placeholder="Enter your email"/>
                    {eerror && <p className=" text-sm text-red-300 font-normal -mt-1 ">Enter valid email</p>}
                </label>
            </>}
            {lconfig.phone && <>
                <label className=" flex font-semibold gap-2 justify-center flex-col "> Phone
                    <input type="text" onChange={(e) => {setlphone(e.currentTarget.value);pvalidation(e.currentTarget.value)}}
                    className={` flex flex-1 p-2 font-semibold text-slate-500 outline-none rounded-sm  ${perror?" border border-red-500 ":""} `} placeholder="Enter your phone number"/>
                    {perror && <p className=" text-sm text-red-300 font-normal -mt-1 ">Enter valid phone</p>}
                </label>
            </>}
            {lconfig.org && <>
                <label className=" flex font-semibold gap-2 justify-center flex-col "> Orgnization
                    <input type="text" onChange={(e) => setlorg(e.currentTarget.value)} 
                    className=" flex flex-1 p-2 font-semibold text-slate-500 outline-none rounded-sm  " placeholder="Enter your organization name"/>
                </label>
            </>}  
            <Button variant="slim" type="button" onClick={() => saveLead()} disabled={(lconfig.name && !lname) || (lconfig.org && !lorg) || (lconfig.phone && !lphone) || (lconfig.email && !lemail) || eerror || perror}
            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" loading={submitting} >
                Submit
            </Button>
        </div>
    </div>
}
