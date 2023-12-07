import Link from "next/link";
import Image from "next/image";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { BsSendFill } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";

export default function Botbody({darkmode, setDarkmode, bfont, bicon, bname, binimsg, bdefaultq, bmbgcolor, bmtxtcolor, namef, inif, fqf, icof, bpos, bbmsg, wl}: any) {

    const [ builtinimsg, setbuiltinimsg ]: any[] = useState([]);
    const [ builtdefq, setbuiltdefq ]: any[] = useState([])
    const message = useCallback((msg: string, user: boolean, key: number) => {
        const bgc =  user?bmbgcolor:(darkmode?"#373e47":"");
        const tc = user?getContrastingTextColor(bmbgcolor):(darkmode?"white":"rgb(51 65 85)");
        return(
            <div className={` flex w-full h-auto ${user?" justify-end ":" justify-start "} text-slate-700 font-semibold`} key={key}>
                <div className={` flex ${user? " rounded-br-s rounded-t-3xl rounded-bl-3xl ":" bg-[#e2e8f0] rounded-bl-s rounded-t-3xl rounded-br-3xl "} w-auto max-w-[90%] p-4 text-start `}
                style={{backgroundColor: bgc, color: tc}} key={key}>
                    <ReactMarkdown remarkPlugins={[remarkMath, rehypeKatex, remarkGfm]} className=" flex flex-col  " key={key}>
                        {msg}
                    </ReactMarkdown>
                </div>
            </div>
        );
    }, [bmbgcolor,bmtxtcolor,darkmode]);

    const buildDefaultQuestions = useCallback((question: string, index: number) => {
        return(
            <p className=" flex rounded-md px-4 p-1 cursor-pointer bg-[#e2e8f0] dark:bg-[#373e47] dark:text-white text-slate-700 hover:bg-gray-300 dark:hover:bg-[#1c2128]" 
            key={index}>{question}</p>
        );
    }, [bmbgcolor, darkmode]);

    useEffect(() => {
        let tempsysmsg: any[] = [];
        binimsg.map((msg: string, index: number) => {
            if(msg.trim()) tempsysmsg.push(message(msg, false, index))
        });
        setbuiltinimsg(tempsysmsg);
    }, [ binimsg,darkmode]);

    useEffect(() => {
        let tempiniq: any[] = [];
        bdefaultq.map((msg: string, index: number) => {
            if(msg.trim()) tempiniq.push(buildDefaultQuestions(msg, index))
        });
        setbuiltdefq(tempiniq);
    }, [ bdefaultq, bmbgcolor  ]);

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
            <section className={` flex h-full flex-col items-center border border-[#00ffff] ${darkmode?" dark ":""} ${bfont} bg-white rounded-md overflow-hidden`}>
                <div id="cheader" className={` flex w-full p-2 justify-center items-center gap-4 border-b dark:antialiased dark:border-slate-700 h-60  transition-colors duration-200 `} 
                    style={{color: getContrastingTextColor(bmbgcolor), backgroundColor: bmbgcolor, 
                        backgroundImage: `linear-gradient(to right,${bmbgcolor}, ${((parseInt(bmbgcolor.replace(/^#/, ''), 16) & 0xfefefe) >> 1).toString(16).length<6?
                                                                                    "#0"+((parseInt(bmbgcolor.replace(/^#/, ''), 16) & 0xfefefe) >> 1).toString(16):
                                                                                    "#"+((parseInt(bmbgcolor.replace(/^#/, ''), 16) & 0xfefefe) >> 1).toString(16)})`}}>
                    <div className=" flex flex-col gap-2 justify-start items-center ">
                        {/* <div id="cicon" className={` w-9 h-9 rounded-full overflow-hidden ${icof?" border-2 border-[#00ffff] ":" border-0 "}`}>
                            <Image src={bicon} alt={""} width={100} height={100} />
                        </div> */}
                        <div id="cname" className={` flex font-bold text-2xl ${namef?" border-2 border-[#00ffff] ":" border-0 "}`} style={{color: getContrastingTextColor(bmbgcolor)}}>
                            {bname}
                        </div>
                        <p className=" font-semibold" style={{color: getContrastingTextColor(bmbgcolor)}}>Ask any question. We are here to help you!</p>
                    </div>
                    <div className="flex"></div>
                    {/* <div id="cmode" className=" flex ">
                        {
                            darkmode?
                            <HiOutlineSun className=" text-white text-2xl cursor-pointer " title="light" onClick={() => setDarkmode(false)} />:
                            <HiOutlineMoon className=" text-black text-2xl cursor-pointer " title="dark" onClick={() => setDarkmode(true)} />
                        }
                    </div> */}
                </div>

                <div id="cbody" className=" flex h-full w-full flex-col p-2 px-4 overflow-y-auto bg-[#fafafa] gap-4 dark:bg-[#22272e] dark:antialiased transition-colors duration-200 ">
                    {/* <div id="cmsglist" className=" flex flex-1 flex-col gap-4 overflow-y-auto "> */}
                        {/* {getMessages()} */}
                        <div className={` flex w-full flex-col gap-4 ${inif?" border-2 border-[#00ffff] ":" border-0 "}`}>
                            {builtinimsg}
                        </div>
                        {message("This is user message", true, 12)}
                        {/* <div id="ctypingi" className=" flex w-full justify-center " ref={keepFocusRef}>
                            {loadingResponse?<SlSettings className=" text-2xl animate-spin dark:text-white "/>:<></>}
                        </div> */}
                    {/* </div> */}
                </div>

                <div id="cfooter" className=" flex py-4 flex-col border-t-0 px-4 w-full bg-[#fafafa] dark:bg-[#22272e] dark:antialiased dark:border-slate-700 transition-colors duration-200 ">
                    <div id="cdefaultq" className={` flex gap-1 font-semibold text-sm flex-wrap  ${fqf?" border-2 border-[#00ffff] ":" border-0 "}`}>
                        {/* {getDefaultQuestions()} */}
                        {builtdefq}
                    </div>
                    <div id="cinput" className=" flex py-2 gap-2 bg-white dark:bg-[#1c2128] p-2 mt-2 rounded border-2 dark:border-[#373e47] ">
                        <input type="text" className=" flex flex-1 p-2 bg-white dark:bg-[#1c2128] rounded-md outline-none focus:ring-1 focus:ring-gray-400"  
                         placeholder="Type your query here..." disabled//value={query} 
                        // onChange={(e) => setQuery(e.currentTarget.value)} onKeyUp={(e) => {
                        //     if(e.currentTarget.value.trim().length > 0 &&  e.key === "Enter") {
                        //         getInformation();
                        //     }
                        // }} 
                        />
                        <button className=" flex border-0 rounded-md p-2 font-bold items-center  disabled:cursor-not-allowed " disabled style={{backgroundColor: bmbgcolor, color: getContrastingTextColor(bmbgcolor)}}
                        // disabled={query.trim().length==0 || loadingResponse} onClick={() => getInformation()}
                        >
                            {/* {loadingResponse?
                            <RiLoader3Fill className=" text-2xl animate-spin "/>: */}
                            <BsSendFill className=" text-2xl "/>
                            {/* } */}
                        </button>
                    </div>
                </div>
                {wl?<></>:<Link target="blank" href={process.env.NEXT_PUBLIC_BASE_URL || ""} className=" flex text-black text-sm py-1 w-full justify-center dark:bg-[#353c49] dark:antialiased dark:text-white transition-colors duration-200 ">
                    <p>
                        Powered by&nbsp;<span className=" font-semibold ">Cyan Arrow</span>
                    </p>
                </Link>}
            </section>
            <section className={` flex h-[60px] flex-col justify-center mt-4 border-0 ${darkmode?" dark ":""} ${bfont} bg-zinc-900 rounded-md overflow-hidden relative `}>
                <div id="ca_cbutton" className={bpos=="br"?"right-0":bpos=="bl"?"left-0":""} style={{position: "absolute", width: "auto", height: "50px", borderRadius: "25px 25px 25px 5px", backgroundColor: `${bmbgcolor}`, boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 8px 0px", cursor: "pointer", zIndex: "999999998", transition: "all 0.2s ease-in-out 0s", display: "flex", overflow: "hidden", left: "unset", color: `${getContrastingTextColor(bmbgcolor)}`, transform: "scale(1)"}}>
                    {bbmsg?<p style={{display: "flex", margin: "0px", whiteSpace: "nowrap", fontFamily: "sans-serif", fontWeight: "bold", paddingLeft: "8px", backgroundColor: `${bmbgcolor}`, color: `${getContrastingTextColor(bmbgcolor)}`, height: "100%", borderRadius: "25px 5px 5px", justifyContent: "center", alignItems: "center"}}>{bbmsg}</p>:<></>}
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "50px", zIndex: "999999999", padding: "10px"}}>
                        <svg stroke={`${getContrastingTextColor(bmbgcolor)}`} fill="none" strokeWidth="1.5" viewBox="0 0 24 24" height="1.7em" width="1.7em" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 
                            0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 
                            1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 
                            1.157.14 1.74.194V21l4.155-4.155"></path>
                        </svg>
                    </div>
                </div>
            </section>
        </>
    );
}