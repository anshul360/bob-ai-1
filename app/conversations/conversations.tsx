'use client'
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import Pageload from "./loading";
import { filterConversations, getBotConversations, getUserBots, getUserConversationsN } from "../supabase-server";
import { useRouter } from "next/navigation";

export default function Conversations({ user }: any) {

    const [ loadingpage, setloadingpage ] = useState(true);
    const [ tod, settod ] = useState("");
    const [ fromd, setfromd ] = useState("");
    const [ convos, setconvos ]: any = useState([]);
    const [ filterbots, setfilterbots ]: any[] = useState([]);
    const [ botids, setbotids ]: any[] = useState([]);
    const [ selectedbot, setselectedbot ] = useState("all");
    const { push } = useRouter();

    useEffect(() => {
        setloadingpage(true);
        let tempconvos: any[] = [];
        let tempfilterbots: any[] = [];
        if(user) {
            Promise.all([
                getUserConversationsN(user?.id),
                getUserBots(user?.id)
            ]).then(([rconvos, rbots]) => {
                rconvos?.map((convo: any, i: number) => {
                    tempconvos.push(
                        <div className=" flex w-full text-xl border-b gap-4 " key={i}>
                            <div className=" flex w-[20%] p-2 items-center justify-center underline cursor-pointer hover:text-pink-500 " key={i+"a"} onClick={() => push(`/conversations?id=${convo.id}`)}>{convo.id || "-"}</div>
                            <div className=" flex w-[30%] p-2 items-center justify-center  " key={i+"b"}>{new Date(convo.updated_at).toLocaleString() || "-"}</div>
                            <div className=" flex w-[30%] p-2 items-center justify-center underline cursor-pointer hover:text-pink-500 " key={i+"c"} onClick={() => push(`/chatbots?id=${convo.bots?.id}`)}>{convo.bots?.name || "-"}</div>
                            <div className=" flex w-[20%] p-2 items-center justify-center  " key={i+"d"}>{convo.geo?.country || "-"}</div>
                        </div>
                    );
                });
                setconvos(tempconvos);
                let botidst: any = [];
                rbots?.map((bot, i) => {
                    tempfilterbots.push(
                        <option value={bot.id} key={i}>{bot.name}</option>
                    );
                    botidst.push(bot.id)
                });
                setfilterbots(tempfilterbots);
                setbotids(botidst);
            }).catch()
            .finally(() => setloadingpage(false));
        }   
    }, []);

    async function filterconvobybot(val: string) {
        setloadingpage(true);
        setselectedbot(val);
        settod("");setfromd("");
        let tempconvos: any[] = [];
        let respl;
        val=="all"?
        respl = await getUserConversationsN(user?.id, botids):
        respl = await getBotConversations(val, user.id);
        respl?.map((convo: any, i: number) => {
            tempconvos.push(
                <div className=" flex w-full text-xl border-b gap-4 " key={i}>
                    <div className=" flex w-[20%] p-2 items-center justify-center underline cursor-pointer hover:text-pink-500 " key={i+"a"} onClick={() => push(`/conversations?id=${convo.id}`)}>{convo.id || "-"}</div>
                    <div className=" flex w-[30%] p-2 items-center justify-center overflow-hidden " key={i+"b"}>{new Date(convo.updated_at).toLocaleString() || "-"}</div>
                    <div className=" flex w-[30%] p-2 items-center justify-center underline cursor-pointer hover:text-pink-500 " key={i+"c"} onClick={() => push(`/chatbots?id=${convo.bots?.id}`)}>{convo.bots?.name || "-"}</div>
                    <div className=" flex w-[20%] p-2 items-center justify-center overflow-hidden " key={i+"d"}>{convo.geo?.country || "-"}</div>
                </div>
            );
        });
        setconvos(tempconvos);
        setloadingpage(false);
    }
    
    async function filterconvo() {
        setloadingpage(true);
        if(!tod || !fromd) {
            alert("Enter From date and To date to filter conversations!");
            return;
        }
        const td = new Date(tod);
        const fd = new Date(fromd);
        if(td < fd) {
            alert("To date should be greater than From date");
            return;
        }
        let botidst = selectedbot=="all"?[...botids]:[selectedbot];
        td.setDate(td.getDate()+1);
        // console.log(td.toDateString(), fd.toDateString());
        const resfil = await filterConversations(fd.toUTCString(), td.toUTCString(), user.id, botidst);
        let tempconvos: any[] = [];
        resfil?.map((convo: any, i: number) => {
            tempconvos.push(
                <div className=" flex w-full text-xl border-b gap-4 " key={i}>
                    <div className=" flex w-[20%] p-2 items-center justify-center underline cursor-pointer hover:text-pink-500 " key={i+"a"} onClick={() => push(`/conversations?id=${convo.id}`)}>{convo.id || "-"}</div>
                    <div className=" flex w-[30%] p-2 items-center justify-center overflow-hidden " key={i+"b"}>{new Date(convo.updated_at).toLocaleString() || "-"}</div>
                    <div className=" flex w-[30%] p-2 items-center justify-center underline cursor-pointer hover:text-pink-500 " key={i+"c"} onClick={() => push(`/chatbots?id=${convo.bots?.id}`)}>{convo.bots?.name || "-"}</div>
                    <div className=" flex w-[20%] p-2 items-center justify-center overflow-hidden " key={i+"d"}>{convo.geo?.country || "-"}</div>
                </div>
            );
        });
        setconvos(tempconvos);
        setloadingpage(false);
    }

    return <>
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
                    <div className="sm:align-center sm:flex mb-4 gap-4 justify-center flex-col items-center ">
                        <div className=" flex gap-6 items-end justify-end">
                            <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                                Conversations
                            </h1>
                            <label className=" font-semibold text-white flex gap-4 items-end "> View by chatbot
                                <select className=" flex px-2 py-1 rounded-sm w-20 text-slate-500" onChange={(e) => filterconvobybot(e.currentTarget.value)}>
                                    <option value="all">All</option>
                                    {filterbots}
                                </select>
                            </label>
                        </div>
                        <div className=" flex gap-6 items-center justify-center">
                            <label className=" font-semibold text-white flex gap-4 items-center "> From
                                <input type="date" onChange={(e) => setfromd(e.currentTarget.value)} value={fromd} 
                                    className=" flex w-full p-2 text-slate-500 outline-none " placeholder="Enter Chatbot Name"/>
                            </label>
                            <label className=" font-semibold text-white flex gap-4 items-center "> To
                                <input type="date" onChange={(e) => settod(e.currentTarget.value)} value={tod} 
                                    className=" flex w-full p-2 text-slate-500 outline-none " placeholder="Enter Chatbot Name"/>
                                
                            </label>
                            <Button variant="slim" type="button"  disabled={!user} onClick={() => filterconvo()}
                            className="block py-2 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Filter Conversations
                            </Button>
                            <Button variant="slim" type="button"  disabled={!user} onClick={() => {settod("");setfromd("");}}
                            className="block py-2 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Reset
                            </Button>
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        
                        <div className=" flex w-full text-pink-500 text-xl border-b ">
                            <div className=" flex w-[20%] p-2 items-center justify-center  ">Id</div>
                            <div className=" flex w-[30%] p-2 items-center justify-center  ">Updated Date</div>
                            <div className=" flex w-[30%] p-2 items-center justify-center  ">Associated Chatbot</div>
                            <div className=" flex w-[20%] p-2 items-center justify-center  ">Location</div>
                            {/* <div className=" flex w-[30%] p-2 items-center justify-center  ">Interests (AI)</div>
                            <div className=" flex w-[10%] p-2 items-center justify-center  ">Score (AI)</div> */}
                        </div>
                        {convos.length>0?
                        <>{convos}</>:
                        <div className=" flex flex-col gap-2 w-full items-center mt-4">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.80777 1.39355L22.6068 21.1925L21.1925 22.6068L17.5846 18.9996L6.45516 19.0002L2.00016 22.5002V4.00016C2.00016 3.83085 2.04223 3.67138 2.11649 3.53162L1.39355 
                                2.80777L2.80777 1.39355ZM3.99955 5.41355L4.00016 18.3855L5.76349 17.0002L15.5846 16.9996L3.99955 5.41355ZM21.0002 3.00016C21.5524 3.00016 22.0002 3.44787 22.0002 4.00016V17.7852L20.0002 
                                15.7852V5.00016L9.21316 4.99916L7.21416 3.00016H21.0002Z"></path>
                            </svg>
                            No Conversations Available
                        </div>}
                    </div>
                </div>
            </section>
            {loadingpage?<Pageload />:<></>}
        </div>
    </>
}