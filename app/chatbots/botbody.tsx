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
import { getBotConfig } from "../supabase-server";
import { SlSettings } from "react-icons/sl";

export default function Botbody({botId}: any) {

    const [ builtinimsg, setbuiltinimsg ]: any[] = useState([]);
    const [ builtdefq, setbuiltdefq ]: any[] = useState([])
    const [ query, setQuery ] = useState("");
    const [ loadingResponse, setloadingResponse ] = useState(false);

    const [ bicon, setbicon ] = useState("/bobchat_avatar.svg");
    const [ bname, setbname ] = useState("BobAi");
    const [ bmbgcolor, setbmbgcolor ] = useState("#552299");
    const [ bmtxtcolor, setbmtxtcolor ] = useState("#ffffff");
    const [ binimsg, setbinimsg ]: any[] = useState(["👋 Hi! I am BobAI, ask me anything about BobAI!","By the way, you can create a chatbot like me for your website! 😮"]);
    // const [ tbinimsg, settbinimsg ]: any[] = useState("");
    const [ bdefaultq, setbdefaultq ]: any[] = useState(["What is BobAI?","How BobAI can help me getting more attention?"]);
    // const [ tbdefaultq, settbdefaultq ]: any[] = useState("");
    // const [ bdomains, setbdomains ] = useState("");
    // const [ bvisibility, setbvisibility ] = useState("");
    // const [ bfont, setbfont ] = useState("font-sans");
    const [ darkmode , setDarkmode ] = useState(true);
    // const [ saving, setsaving ] = useState(false);
    // const [ savedbotrec, setbotrec ] = useState();
    const keepFocusRef = useRef<null | HTMLDivElement>(null);

    const setBotconfig = useCallback((botrec: any, reset: boolean = false) => {
        setbname(botrec.name); setbmbgcolor(botrec.bg_color || "#552299"); setbmtxtcolor(botrec.text_color || "#ffffff");
        // settbinimsg(botrec.initial_msgs); settbdefaultq(botrec.default_questions); setbvisibility(botrec.visibility || "private");
        // setbdomains(botrec.allowed_domains);
        // if(!reset) setbotrec(botrec);
        if(botrec.initial_msgs) updateBinimsg(botrec.initial_msgs);
        if(botrec.default_questions) updateBdefaultq(botrec.default_questions);
    }, []);

    const message = useCallback((msg: string, user: boolean, key: number, ubgcolor: string, utxtcolor: string) => {
        const bgc =  user?ubgcolor:"";
        const tc = user?utxtcolor:"";
        console.log(bgc,tc);
        return(
            <div className={` flex w-full h-auto ${user?" justify-end ":" justify-start "} text-white`} key={key}>
                <div className={` flex ${user? ` ${bmtxtcolor} `:" dark:bg-zinc-700 bg-zinc-900 "} w-auto max-w-[90%] rounded-xl p-4 text-start `}
                style={{backgroundColor: bgc, color: tc}} key={key}>
                    <ReactMarkdown remarkPlugins={[remarkMath, rehypeKatex, remarkGfm]} className=" flex flex-col " key={key}>
                        {msg}
                    </ReactMarkdown>
                </div>
            </div>
        );
    }, [bmbgcolor, bmtxtcolor]);

    const buildDefaultQuestions = useCallback((question: string, index: number) => {
        return(
            <p className=" flex rounded-md bg-gray-200 text-gray-700 px-4 p-1 cursor-pointer hover:bg-gray-300 " 
            key={index} onClick={(e) => getInformation(e.currentTarget.innerText)}>
                {question}
            </p>
        );
    }, [bmbgcolor, bmtxtcolor]);

    useEffect(() => {
        // setloadingpage(true);
        if(botId) 
            getBotConfig(botId)
            .then((res: any) => {
                if(res.success) {
                    let botrec = res.data[0];
                    // console.log(res.data);
                    setBotconfig(botrec);
                }
            }).catch((error) => console.log(error))
            // .finally(() => setloadingpage(false));
    }, [botId]);
    
    useEffect(() => {
        let tempsysmsg: any[] = [];
        binimsg.map((msg: string, index: number) => {
            if(msg.trim()) tempsysmsg.push(message(msg, false, index, bmbgcolor, bmtxtcolor))
        });
        setbuiltinimsg(tempsysmsg);
    }, [ binimsg ]);

    useEffect(() => {
        let tempiniq: any[] = [];
        bdefaultq.map((msg: string, index: number) => {
            if(msg.trim()) tempiniq.push(buildDefaultQuestions(msg, index))
        });
        setbuiltdefq(tempiniq);
    }, [ bdefaultq ]);

    useEffect(() => {
        keepFocusRef.current?.scrollIntoView({behavior: 'smooth', block: "nearest"});
    }, [loadingResponse]);

    async function getInformation(defquery: string = "") {
        console.log("--=-===---==--",bmbgcolor, bmtxtcolor);
        setloadingResponse(true);
        const q = defquery.length>0?defquery:query;
        setbuiltinimsg((messages: any[]) => [...messages, message(q, true, messages.length+1, bmbgcolor, bmtxtcolor)]);
        setQuery("");
        // const resp: any = await queryDocument(altq);
        setbuiltinimsg((messages: any[]) => [...messages, message("test response", false, messages.length+1, "", "")]);
        setloadingResponse(false);
    }

    function updateBinimsg(val: string) {
        // settbinimsg(val);
        setbinimsg(val.split("\n"));
    }
    function updateBdefaultq(val: string) {
        // settbdefaultq(val);
        setbdefaultq(val.split("\n"));
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
            <main className={` flex w-full h-full flex-col items-center border border-pink-500 ${darkmode?" dark ":""} bg-white rounded-md overflow-hidden`}>
                <div id="cheader" className=" flex w-full p-2 justify-start items-center gap-4 border-b bg-white dark:bg-zinc-900 dark:antialiased dark:border-slate-700 dark:text-white transition-colors duration-200 ">
                    <Link href="/" className=" flex gap-4 justify-start items-center ">
                        <div id="cicon" className=" w-9 h-9 rounded-full overflow-hidden ">
                            <Image src={bicon} alt={""} width={100} height={100} />
                            {/* <img src={bicon} alt={bname} /> */}
                        </div>
                        <div id="cname" className=" flex font-bold text-xl flex-1 text-slate-800 dark:text-white ">
                            {bname}
                        </div>
                    </Link>
                    <div className="flex flex-1"></div>
                    <div id="cmode" className=" flex ">
                        {
                            darkmode?
                            <HiOutlineSun className=" text-white text-2xl cursor-pointer " title="light" onClick={() => setDarkmode(false)} />:
                            <HiOutlineMoon className=" text-black text-2xl cursor-pointer " title="dark" onClick={() => setDarkmode(true)} />
                        }
                    </div>
                </div>

                <div id="cbody" className=" flex h-[500px] w-full flex-col p-2 overflow-y-auto bg-white gap-4 dark:bg-black dark:antialiased transition-colors duration-200 ">
                        {builtinimsg}
                        {/* {message("This is user message", true, 12)} */}
                        <div id="ctypingi" className=" flex w-full justify-center " ref={keepFocusRef}>
                            {loadingResponse?<SlSettings className=" text-2xl animate-spin dark:text-white "/>:<></>}
                        </div>
                </div>

                <div id="cfooter" className=" flex pt-2 flex-col border-t px-2 w-full bg-white dark:bg-zinc-900 dark:antialiased dark:border-slate-700 transition-colors duration-200 ">
                    <div id="cdefaultq" className=" flex gap-1 font-semibold text-sm flex-wrap ">
                        {builtdefq}
                    </div>
                    <div id="cinput" className=" flex py-1 gap-2 ">
                        <input type="text" className=" flex flex-1 p-2 bg-gray-200 rounded-md outline-none focus:ring-1 focus:ring-gray-400 text-slate-700"  value={query} 
                        onChange={(e) => setQuery(e.currentTarget.value)} onKeyUp={(e) => {
                            if(e.currentTarget.value.trim().length > 0 &&  e.key === "Enter") {
                                getInformation();
                            }
                        }} 
                        />
                        <button className=" flex border rounded-md p-2 bg-zinc-900 dark:bg-zinc-700 text-white font-bold items-center dark:border-slate-700 disabled:cursor-not-allowed " 
                        disabled={query.trim().length==0 || loadingResponse} onClick={() => getInformation()}
                        >
                            {loadingResponse?
                            <RiLoader3Fill className=" text-2xl animate-spin "/>:
                            <BsSendFill className=" text-2xl "/>
                            }
                        </button>
                    </div>
                </div>
                <Link href="#" className=" flex text-black text-sm pb-1 w-full justify-center dark:bg-zinc-900 dark:antialiased dark:text-white transition-colors duration-200 ">
                    <p>
                        Powered by&nbsp;<span className=" font-semibold ">BobAI</span>
                    </p>
                </Link>
            </main>
        </>
    );
}