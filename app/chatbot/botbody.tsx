import Link from "next/link";
import Image from "next/image";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { BsSendFill } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";

export default function Botbody({darkmode, setDarkmode, bfont, bicon, bname, binimsg, bdefaultq, bmbgcolor, bmtxtcolor, namef, inif, fqf, icof}: any) {

    const [ builtinimsg, setbuiltinimsg ]: any[] = useState([]);
    const [ builtdefq, setbuiltdefq ]: any[] = useState([])
    const message = useCallback((msg: string, user: boolean, key: number) => {
        const bgc =  user?bmbgcolor:"";
        const tc = user?bmtxtcolor:"";
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
    }, [bmbgcolor,bmtxtcolor]);

    const buildDefaultQuestions = useCallback((question: string, index: number) => {
        return(
            <p className=" flex rounded-md bg-gray-200 text-gray-700 px-4 p-1 cursor-pointer hover:bg-gray-300 " 
            key={index}>{question}</p>
        );
    }, []);

    useEffect(() => {
        let tempsysmsg: any[] = [];
        binimsg.map((msg: string, index: number) => {
            if(msg.trim()) tempsysmsg.push(message(msg, false, index))
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
            <main className={` flex h-full flex-col items-center border border-pink-500 ${darkmode?" dark ":""} ${bfont} bg-white rounded-md overflow-hidden`}>
                <div id="cheader" className=" flex w-full p-2 justify-start items-center gap-4 border-b bg-white dark:bg-zinc-900 dark:antialiased dark:border-slate-700 dark:text-white transition-colors duration-200 ">
                    <div className=" flex gap-4 justify-start items-center ">
                        {/* <div id="cicon" className={` w-9 h-9 rounded-full overflow-hidden ${icof?" border-2 border-pink-500 ":" border-0 "}`}>
                            <Image src={bicon} alt={""} width={100} height={100} />
                        </div> */}
                        <div id="cname" className={` flex font-bold text-xl flex-1 text-slate-800 dark:text-white ${namef?" border-2 border-pink-500 ":" border-0 "}`}>
                            {bname}
                        </div>
                    </div>
                    <div className="flex flex-1"></div>
                    <div id="cmode" className=" flex ">
                        {
                            darkmode?
                            <HiOutlineSun className=" text-white text-2xl cursor-pointer " title="light" onClick={() => setDarkmode(false)} />:
                            <HiOutlineMoon className=" text-black text-2xl cursor-pointer " title="dark" onClick={() => setDarkmode(true)} />
                        }
                    </div>
                </div>

                <div id="cbody" className=" flex h-full w-full flex-col p-2 overflow-y-auto bg-white gap-4 dark:bg-black dark:antialiased transition-colors duration-200 ">
                    {/* <div id="cmsglist" className=" flex flex-1 flex-col gap-4 overflow-y-auto "> */}
                        {/* {getMessages()} */}
                        <div className={` flex w-full flex-col gap-4 ${inif?" border-2 border-pink-500 ":" border-0 "}`}>
                            {builtinimsg}
                        </div>
                        {message("This is user message", true, 12)}
                        {/* <div id="ctypingi" className=" flex w-full justify-center " ref={keepFocusRef}>
                            {loadingResponse?<SlSettings className=" text-2xl animate-spin dark:text-white "/>:<></>}
                        </div> */}
                    {/* </div> */}
                </div>

                <div id="cfooter" className=" flex pt-2 flex-col border-t px-2 w-full bg-white dark:bg-zinc-900 dark:antialiased dark:border-slate-700 transition-colors duration-200 ">
                    <div id="cdefaultq" className={` flex gap-1 font-semibold text-sm flex-wrap  ${fqf?" border-2 border-pink-500 ":" border-0 "}`}>
                        {/* {getDefaultQuestions()} */}
                        {builtdefq}
                    </div>
                    <div id="cinput" className=" flex py-1 gap-2 ">
                        <input type="text" className=" flex flex-1 p-2 bg-gray-200 rounded-md outline-none focus:ring-1 focus:ring-gray-400"  disabled//value={query} 
                        // onChange={(e) => setQuery(e.currentTarget.value)} onKeyUp={(e) => {
                        //     if(e.currentTarget.value.trim().length > 0 &&  e.key === "Enter") {
                        //         getInformation();
                        //     }
                        // }} 
                        />
                        <button className=" flex border rounded-md p-2 bg-zinc-900 dark:bg-zinc-700 text-white font-bold items-center dark:border-slate-700 disabled:cursor-not-allowed " disabled
                        // disabled={query.trim().length==0 || loadingResponse} onClick={() => getInformation()}
                        >
                            {/* {loadingResponse?
                            <RiLoader3Fill className=" text-2xl animate-spin "/>: */}
                            <BsSendFill className=" text-2xl "/>
                            {/* } */}
                        </button>
                    </div>
                </div>
                <Link target="blank" href={process.env.NEXT_PUBLIC_BASE_URL || ""} className=" flex text-black text-sm pb-1 w-full justify-center dark:bg-zinc-900 dark:antialiased dark:text-white transition-colors duration-200 ">
                    <p>
                        Powered by&nbsp;<span className=" font-semibold ">CyanArrow</span>
                    </p>
                </Link>
            </main>
        </>
    );
}