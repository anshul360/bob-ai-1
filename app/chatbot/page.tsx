'use client'

import Image from "next/image";
import { HiOutlineSun, HiMoon } from "react-icons/hi";
import { BsHourglass, BsSendFill } from "react-icons/bs";
import { RiLoader2Line, RiLoader3Fill } from "react-icons/ri";
import { SlSettings } from "react-icons/sl";
// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from 'remark-gfm'


export default function ChatBot() {
    /**
     * config for chatbot
     */
    const [ bicon, setbicon ] = useState("/bobchat_avatar.svg");
    const [ bname, setbname ] = useState("BobAi");
    const [ bmbgcolor, setbmbgcolor ] = useState("bg-[#552299]");
    const [ bmtxtcolor, setbmtxtcolor ] = useState("text-[#ffffff]");
    const [ binimsg, setbinimsg ]: any[] = useState([]);
    const [ bdefaultq, setbdefaultq ]: any[] = useState([]);
    const [ bfont, setbfont ] = useState("font-sans");
    const [  ] = useState();
    const [  ] = useState();
    const [  ] = useState();
    const [  ] = useState();
    const [  ] = useState();

    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [ darkmode, setDarkmode ] = useState(false);
    const [ query, setQuery] = useState("");
    const [ loadingResponse, setLoadingResponse ] = useState(false);
    const [ messages, setMessages ]: any[] = useState([]);
    const keepFocusRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        keepFocusRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [loadingResponse, messages]);

    useEffect(() => {
        keepFocusRef.current?.scrollIntoView({behavior: 'smooth'});

        // function inimessage(msg: string, user: boolean, key: number) {
        //     return(
        //         <div className={` flex w-full h-auto ${user?" justify-end ":" justify-start "} text-white`} key={key}>
        //             {/* <div className={` flex ${user?" bg-emerald-400 ":" bg-emerald-600 "} w-auto max-w-[90%] rounded-xl p-4 text-start `} key={key}>rgb(5 150 105 */}
        //             <div className={` flex ${user? ` ${bmbgcolor}  ${bmtxtcolor} ` :" bg-gray-500 "} w-auto max-w-[90%] rounded-xl p-4 text-start `} key={key}>
        //                 <ReactMarkdown remarkPlugins={[remarkMath, rehypeKatex, remarkGfm]} className=" flex flex-col " key={key}>{msg}</ReactMarkdown>
        //             </div>
        //         </div>
        //     );
        // }

        // function buildDefaultQuestions(question: string) {
        //     return(
        //         <p className=" flex rounded-md bg-gray-200 text-gray-700 px-4 p-1 cursor-pointer " 
        //         onClick={(e) => { 
        //             // setQuery();
        //             getInformation(e.currentTarget.innerText);
        //         }} key="1">{question}</p>
        //     );
        // }
        
        setbinimsg((binimsg: any[]) => [...binimsg, message("this is first ini message", false, 1001)]);
        setbinimsg((binimsg: any[]) => [...binimsg, message("this is second ini message", false, 1002)]);

        setbdefaultq((bdefaultq: any[]) => [...bdefaultq, buildDefaultQuestions("What is your name?")]);
        setbdefaultq((bdefaultq: any[]) => [...bdefaultq, buildDefaultQuestions("What is Akanksha's address?")]);
        setbdefaultq((bdefaultq: any[]) => [...bdefaultq, buildDefaultQuestions("What technical skills does Akanksha have?")]);
    }, [bmbgcolor, bmtxtcolor]);

    

    function message(msg: string, user: boolean, key: number) {
        return(
            <div className={` flex w-full h-auto ${user?" justify-end ":" justify-start "} text-white`} key={key}>
                {/* <div className={` flex ${user?" bg-emerald-400 ":" bg-emerald-600 "} w-auto max-w-[90%] rounded-xl p-4 text-start `} key={key}>rgb(5 150 105 */}
                <div className={` flex ${user? ` ${bmbgcolor}  ${bmtxtcolor} `:" bg-gray-500 "} w-auto max-w-[90%] rounded-xl p-4 text-start `} key={key}>
                    <ReactMarkdown remarkPlugins={[remarkMath, rehypeKatex, remarkGfm]} className=" flex flex-col " key={key}>{msg}</ReactMarkdown>
                </div>
            </div>
        );
    }

    function buildDefaultQuestions(question: string) {
        return(
            <p className=" flex rounded-md bg-gray-200 text-gray-700 px-4 p-1 cursor-pointer " 
            onClick={(e) => { 
                // setQuery();
                getInformation(e.currentTarget.innerText);
            }} key="1">{question}</p>
        );
    }

    const queryDocument = async (altq: string = "") => {
        const q = query || altq;
        const data = await fetch("/api/docs/query", {
            method: "POST",
            body: JSON.stringify({ query: q })
        }).then((resp) => resp.json());
        console.log(data);
        return data;
    }

    async function getInformation(altq: string = "") {
        setMessages((messages: any[]) => [...messages, message(query || altq, true, new Date().getMilliseconds())]);
        setQuery("");
        setLoadingResponse(true);
        const resp: any = await queryDocument(altq);
        // setTimeout(function(){
            setLoadingResponse(false);
        // }, 5000);
        setMessages((messages: any[]) => [...messages, message(resp?.results?.text, false, new Date().getMilliseconds())]);
    }
  
    return (
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
            <main className={` flex flex-col h-[100vh] items-center border-0 ${darkmode?" dark ":""} ${bfont} `}>
                <div id="cheader" className=" flex w-full p-2 justify-start items-center gap-4 border bg-white dark:bg-slate-700 dark:border-slate-700 dark:text-white transition-colors duration-200 ">
                    <div id="cicon" className=" w-9 h-9 rounded-full ">
                        <Image src={bicon} alt={bname} width={100} height={100} />
                    </div>
                    <div id="cname" className=" flex font-bold text-xl flex-1 ">
                        BobAI
                    </div>
                    <div id="cmode" className=" flex ">
                        {
                            darkmode?
                            <HiOutlineSun className=" text-white text-2xl cursor-pointer " title="light" onClick={() => setDarkmode(false)} />:
                            <HiMoon className=" text-black text-2xl cursor-pointer " title="dark" onClick={() => setDarkmode(true)} />
                        }
                    </div>
                </div>

                <div id="cbody" className=" flex h-[100vh] w-full flex-col p-2 overflow-y-auto gap-4 dark:bg-slate-600 transition-colors duration-200 ">
                    {/* <div id="cmsglist" className=" flex flex-1 flex-col gap-4 overflow-y-auto "> */}
                        {/* {getMessages()} */}
                        {binimsg}
                        {message("test message user", true, 1)}
                        {message("test message bot", false, 2)}
                        {messages}
                        <div id="ctypingi" className=" flex w-full justify-center " ref={keepFocusRef}>
                            {loadingResponse?<SlSettings className=" text-2xl animate-spin dark:text-white "/>:<></>}
                        </div>
                    {/* </div> */}
                </div>

                <div id="cfooter" className=" flex pt-2 flex-col border-t px-2 bg-white dark:bg-slate-700 dark:border-slate-700 transition-colors duration-200 ">
                    <div id="cdefaultq" className=" flex gap-1 font-semibold text-sm flex-wrap ">
                        {/* {getDefaultQuestions()} */}
                        {bdefaultq}
                    </div>
                    <div id="cinput" className=" flex py-1 gap-2 ">
                        <input type="text" className=" flex flex-1 p-2 bg-gray-200 rounded-md outline-none focus:ring-1 focus:ring-gray-400" value={query} 
                        onChange={(e) => setQuery(e.currentTarget.value)} onKeyUp={(e) => {
                            if(e.currentTarget.value.trim().length > 0 &&  e.key === "Enter") {
                                getInformation();
                            }
                        }} />
                        <button className=" flex border rounded-md p-2 bg-emerald-400 text-white font-bold items-center dark:border-slate-700 disabled:cursor-not-allowed " 
                        disabled={query.trim().length==0 || loadingResponse} onClick={() => getInformation()}>
                            {loadingResponse?
                            <RiLoader3Fill className=" text-2xl animate-spin "/>:
                            <BsSendFill className=" text-2xl "/>}
                        </button>
                    </div>
                </div>
                <p className=" flex text-black text-sm pb-1 w-full justify-center dark:bg-slate-700 dark:text-white transition-colors duration-200 ">
                    Powered by&nbsp;<span className=" font-semibold ">BobAI</span>
                </p>
            </main>
        </>
    )
  //}

  //return <a href="/api/auth/login">Login</a>;
}

            // <MainContainer className=" w-full rounded-t-[30px] !border-b-0 " responsive>
            //     <ChatContainer className="border-b-0">
            //         <ConversationHeader>
            //             {/* <ConversationHeader.Back /> */}
            //             <Avatar src="/library/img/bobchat_avatar.svg" name="BobAI" />
            //             <ConversationHeader.Content userName="BobAI" />                                   
            //             {/* <ConversationHeader.Actions>                                                                             
            //                 <StarButton title="Add to favourites" />
            //                 <VoiceCallButton title="Start voice call" />
            //                 <VideoCallButton title="Start video call" />
            //                 <InfoButton title="Show info" />
            //             </ConversationHeader.Actions> */}
            //         </ConversationHeader>
            //         <MessageList typingIndicator={<TypingIndicator content="BobAI is typing" />}>
            //             {/* <Message
            //                 model={{
            //                     sentTime: "just now",
            //                     sender: "BobAI",
            //                     direction: "incoming",
            //                     position: 0,
            //                     type: "custom"
            //                 }}
            //             >
            //                 <Message.CustomContent>
            //                     <ReactMarkdown remarkPlugins={[remarkMath, rehypeKatex]} >
            //                         {"- first \n - *second* \n - **third** "}
            //                     </ReactMarkdown>
            //                 </Message.CustomContent>
            //             </Message>
            //             <Message
            //                 model={{
            //                     sentTime: "just now",
            //                     sender: "BobAI",
            //                     direction: "incoming",
            //                     position: 0,
            //                     type: "custom"
            //                 }}
            //             >
            //                 <Message.CustomContent>
            //                     <div className=" flex flex-col gap-2 w-[300px]">
            //                         {!emailSubmitted?<><p className=" flex text-base font-semibold ">Enter your email below and we will get in touch with you with details</p>
            //                         <div className=" flex gap-2 ">
            //                             <input type="text" className=" outline-none w-full p-2 rounded-md " />
            //                             <SendButton title="Send details" className=" !bg-pink-500 !text-white" onClick={() => setEmailSubmitted(true)} />
            //                         </div></>:<p className=" flex text-base font-semibold ">Thank you! 🤗</p>}
            //                     </div>
            //                 </Message.CustomContent>
            //             </Message> */}
            //             <MessageList.Content style={{
            //                 display: "flex",
            //                 "flexDirection": "column",
            //                 "justifyContent": "start",
            //                 height: "100%",
            //                 textAlign: "center",
            //                 fontSize: "1.2em"
            //             }} className=" gap-2 relative w-full p-2 pb-4 ">
            //                 {getMessages()}
            //             </MessageList.Content>
            //         </MessageList>
            //         <MessageInput placeholder="Type message here" attachButton={false} autoFocus onSend={(e: any) => console.log(e)} className="border-b-0" />
            //     </ChatContainer>
            // </MainContainer>
