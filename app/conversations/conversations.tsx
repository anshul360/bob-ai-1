'use client'
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import Pageload from "./loading";
import { deleteConversation, filterConversations, getBotConversations, getUserBots, getUserConversationsN } from "../supabase-server";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";

export default function Conversations({ user }: any) {

    const [ loadingpage, setloadingpage ] = useState(true);
    const [ tod, settod ] = useState("");
    const [ fromd, setfromd ] = useState("");
    const [ convos, setconvos ]: any = useState([]);
    const [ filterbots, setfilterbots ]: any[] = useState([]);
    const [ botids, setbotids ]: any[] = useState([]);
    const [ selectedbot, setselectedbot ] = useState("all");
    const [ filterc, setfilterc ] = useState(false);
    const [ exportc, setexportc ] = useState(false);
    const [ exporting, setexporting ] = useState(false);
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
                        <div className=" flex w-full text-xl border-b hover:bg-zinc-700 " key={i}>
                            <div className=" flex w-[20%] p-2 items-center justify-start underline cursor-pointer hover:text-[#00ffff] " key={i+"a"} onClick={() => push(`/conversations?id=${convo.id}`)}><p className=" truncate ">{convo.id || "-"}</p></div>
                            <div className=" flex w-[30%] p-2 items-center justify-start  " key={i+"b"}><p className=" truncate ">{new Date(convo.updated_at).toLocaleString() || "-"}</p></div>
                            <div className=" flex w-[30%] p-2 items-center justify-start underline cursor-pointer hover:text-[#00ffff] " key={i+"c"} onClick={() => push(`/chatbots?id=${convo.bots?.id}`)}><p className=" truncate ">{convo.bots?.name || "-"}</p></div>
                            <div className=" flex w-[20%] p-2 items-center justify-start  " key={i+"d"}><p className=" truncate ">
                                {convo?.geo?.city?convo?.geo?.city+", ":""} 
                                {convo?.geo?.region?convo?.geo?.region+", ":""} 
                                {convo?.geo?.country || "-"}    </p>
                            </div>
                            {/* <div className=" flex w-[3%] p-2 items-center justify-center cursor-pointer hover:text-red-700 "  key={i+"e"}
                            title="Delete source" onClick={() => deleteConvo(convo.id)}>
                                <AiOutlineDelete  key={i}/>
                            </div> */}
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
                <div className=" flex w-full text-xl border-b hover:bg-zinc-700 " key={i}>
                    <div className=" flex w-[20%] p-2 items-center justify-start underline cursor-pointer hover:text-[#00ffff] " key={i+"a"} onClick={() => push(`/conversations?id=${convo.id}`)}><p className=" truncate ">{convo.id || "-"}</p></div>
                    <div className=" flex w-[30%] p-2 items-center justify-start overflow-hidden " key={i+"b"}><p className=" truncate ">{new Date(convo.updated_at).toLocaleString() || "-"}</p></div>
                    <div className=" flex w-[30%] p-2 items-center justify-start underline cursor-pointer hover:text-[#00ffff] " key={i+"c"} onClick={() => push(`/chatbots?id=${convo.bots?.id}`)}><p className=" truncate ">{convo.bots?.name || "-"}</p></div>
                    <div className=" flex w-[20%] p-2 items-center justify-start  " key={i+"d"}><p className=" truncate ">
                        {convo?.geo?.city?convo?.geo?.city+", ":""} 
                        {convo?.geo?.region?convo?.geo?.region+", ":""} 
                        {convo?.geo?.country || "-"}    </p>
                    </div>
                    {/* <div className=" flex w-[3%] p-2 items-center justify-center cursor-pointer hover:text-red-700 "  key={i+"e"}
                    title="Delete source" onClick={() => deleteConvo(convo.id)}>
                        <AiOutlineDelete  key={i}/>
                    </div> */}
                </div>
            );
        });
        setconvos(tempconvos);
        setloadingpage(false);
    }
    
    async function filterconvo() {
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
        setloadingpage(true);
        let botidst = selectedbot=="all"?[...botids]:[selectedbot];
        td.setDate(td.getDate()+1);
        // console.log(td.toDateString(), fd.toDateString());
        const resfil = await filterConversations(fd.toUTCString(), td.toUTCString(), user.id, botidst);
        let tempconvos: any[] = [];
        resfil?.map((convo: any, i: number) => {
            tempconvos.push(
                <div className=" flex w-full text-xl border-b hover:bg-zinc-700 " key={i}>
                    <div className=" flex w-[20%] p-2 items-center justify-start underline cursor-pointer hover:text-[#00ffff] " key={i+"a"} onClick={() => push(`/conversations?id=${convo.id}`)}><p className=" truncate ">{convo.id || "-"}</p></div>
                    <div className=" flex w-[30%] p-2 items-center justify-start overflow-hidden " key={i+"b"}><p className=" truncate ">{new Date(convo.updated_at).toLocaleString() || "-"}</p></div>
                    <div className=" flex w-[30%] p-2 items-center justify-start underline cursor-pointer hover:text-[#00ffff] " key={i+"c"} onClick={() => push(`/chatbots?id=${convo.bots?.id}`)}><p className=" truncate ">{convo.bots?.name || "-"}</p></div>
                    <div className=" flex w-[20%] p-2 items-center justify-start  " key={i+"d"}><p className=" truncate ">
                        {convo?.geo?.city?convo?.geo?.city+", ":""} 
                        {convo?.geo?.region?convo?.geo?.region+", ":""} 
                        {convo?.geo?.country || "-"}    </p>
                    </div>
                    {/* <div className=" flex w-[3%] p-2 items-center justify-center cursor-pointer hover:text-red-700 "  key={i+"e"}
                    title="Delete source" onClick={() => deleteConvo(convo.id)}>
                        <AiOutlineDelete  key={i}/>
                    </div> */}
                </div>
            );
        });
        setconvos(tempconvos);
        setloadingpage(false);
        setfilterc(false); settod(""); setfromd("");
    }

    async function exportConvos() {
        if(!tod || !fromd) {
            alert("Enter From date and To date to export Conversations!");
            return;
        }
        const td = new Date(tod);
        const fd = new Date(fromd);
        if(td < fd) {
            alert("To date should be greater than From date");
            return;
        }
        td.setDate(td.getDate()+1);
        try {
            setexporting(true);
            const data = await filterConversations(fd.toUTCString(), td.toUTCString(), user.id, botids)

            const csvdata = outcsv(data);
            download(csvdata);
            toast.success('Conversations exported successfully!', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });
        } catch(e) {
            console.log(e);
            toast.error('Error: Unable to export conversations', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });
        }
        setexporting(false);
        setexportc(false); settod(""); setfromd("");
    }

    const download = function (data: any) {
  
        const blob = new Blob([data], { type: 'text/csv' });
      
        const url = window.URL.createObjectURL(blob);
      
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'Conversations.csv');
        a.click();
    }
      
    const outcsv = function (data: any) {
      
        const csvRows: any = [];
        // const headers = Object.keys(data);
        csvRows.push(`"Associated Chatbot","Conversation","Location"`);
      
        
        data.map((convoi: any) => {
            let values:any = [];
            values.push(`"${convoi.bots?.name || "-"}"`); 
            values.push(`"${JSON.stringify(convoi.chat_data || {}).replaceAll(`"`,`'`)}"`); 
            values.push(`"${JSON.stringify(convoi.geo || {}).replaceAll(`"`,`'`)}"`);
            csvRows.push(values.join(","));
        });
       
        return csvRows.join('\n')
    }

    async function deleteConvo(id: string) {
        const affirmation = confirm("Are you sure you want to delete Conversation #"+id);
        if(affirmation) {
            setloadingpage(true);
            try {
                const resd = await deleteConversation(id, user.id);
                if(resd.success) {
                    setconvos((convos: any) => {
                        let tempconvos:any = [];
                        convos.map((convo: any) => {
                            if(convo.id != id) tempconvos.push(convo);
                        });
                        return tempconvos;
                    });
                    toast.success('Conversation deleted successfully!', {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                        theme: "dark",
                    });
                } else throw "Issue with delete conversation";
            } catch(e) {
                toast.error('Error: Unable to delete conversation', {
                    position: "top-right", autoClose: 3000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                    theme: "dark",
                });
            }
            setloadingpage(false);
        }
    }

    return <>
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
        <div className=" flex max-w-[90%] w-full gap-4 flex-row relative ">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-[#00ffff] ">
                <div className=" spx-4 py-8 sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center flex mb-4 gap-4 justify-between items-end px-4 ">
                        <div className=" flex gap-6 items-start justify-start flex-col">
                            <h1 className="text-4xl font-extrabold text-white text-center lg:text-6xl">
                                Conversations
                            </h1>
                            <label className=" font-semibold text-white flex gap-4 items-end "> View by chatbot
                                <select className=" flex px-2 py-1 rounded-sm text-slate-500" onChange={(e) => filterconvobybot(e.currentTarget.value)}>
                                    <option value="all">All</option>
                                    {filterbots}
                                </select>
                            </label>
                        </div>
                        <div className=" flex gap-6 items-center justify-center">
                            <Button variant="slim" type="button" disabled={filterc} onClick={() => setfilterc(true)}
                            className="flex !h-fit py-2 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Filter by Date
                            </Button>
                            <Button variant="slim" type="button" disabled={exportc} onClick={() => setexportc(true)}
                            className="flex !h-fit py-2 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Export Conversations
                            </Button>
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        
                        <div className=" flex w-full text-[#00ffff] text-xl border-b ">
                            <div className=" flex w-[20%] p-2 items-center justify-start  ">Id</div>
                            <div className=" flex w-[30%] p-2 items-center justify-start  ">Updated Date</div>
                            <div className=" flex w-[30%] p-2 items-center justify-start  ">Associated Chatbot</div>
                            <div className=" flex w-[20%] p-2 items-center justify-start  ">Location</div>
                            {/* <div className=" flex w-[3%] p-2 items-center justify-center  "></div> */}
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
        {filterc && 
            <div className=" flex w-full min-w-[1024px] h-full top-20 left-0 px-4 py-8 sm:px-6 sm:pt-8 lg:px-8 absolute z-80 bg-black bg-opacity-75 justify-center ">
                <div className=" flex flex-col max-w-6xl w-full p-4 h-min min-w-[600px] bg-zinc-900 rounded-md border border-[#00ffff] gap-4 items-center relative " onClick={(e) => e.stopPropagation()}>
                    <p className="max-w-2xl mt-5 text-xl text-white sm:text-center sm:text-2xl font-bold ">
                        Select Date Range to filter Conversations
                    </p>
                    <div className=" flex flex-col gap-6 items-center justify-center w-full">
                        <div className=" flex gap-6 ">
                            <label className=" font-semibold text-white flex gap-4 items-center "> From
                                <input type="date" onChange={(e) => setfromd(e.currentTarget.value)} value={fromd} 
                                    className=" flex w-full p-2 text-slate-500 outline-none " placeholder="Enter Chatbot Name"/>
                            </label>
                            <label className=" font-semibold text-white flex gap-4 items-center "> To
                                <input type="date" onChange={(e) => settod(e.currentTarget.value)} value={tod} 
                                    className=" flex w-full p-2 text-slate-500 outline-none " placeholder="Enter Chatbot Name"/>
                                
                            </label>
                        </div>
                        <div className=" flex gap-6 mt-10 w-full ">
                            <Button variant="slim" type="button"  disabled={!user} onClick={() => filterconvo()} loading={loadingpage}
                            className="block py-2 w-full text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Filter Conversations
                            </Button>
                            <Button variant="slim" type="button"  disabled={!user} onClick={() => {settod("");setfromd("");}} loading={loadingpage}
                            className="block py-2 w-full text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Reset
                            </Button>
                        </div>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg" 
                        className=" absolute top-3 right-3 cursor-pointer " onClick={() => setfilterc(false)}>
                            <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 
                            2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 
                            4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 
                            16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        }
        {exportc && 
            <div className=" flex w-full h-full min-w-[1024px] top-20 left-0 px-4 py-8 sm:px-6 sm:pt-8 lg:px-8 absolute z-80 bg-black bg-opacity-75 justify-center ">
                <div className=" flex flex-col max-w-6xl w-full p-4 h-min min-w-[600px] bg-zinc-900 rounded-md border border-[#00ffff] gap-4 items-center relative " onClick={(e) => e.stopPropagation()}>
                    <p className="max-w-2xl mt-5 text-xl text-white sm:text-center sm:text-2xl font-bold ">
                        Select Date Range to export Conversations
                    </p>
                    <div className=" flex flex-col gap-6 items-center justify-center w-full">
                        <div className=" flex gap-6 ">
                            <label className=" font-semibold text-white flex gap-4 items-center "> From
                                <input type="date" onChange={(e) => setfromd(e.currentTarget.value)} value={fromd} 
                                    className=" flex w-full p-2 text-slate-500 outline-none " placeholder="Enter Chatbot Name"/>
                            </label>
                            <label className=" font-semibold text-white flex gap-4 items-center "> To
                                <input type="date" onChange={(e) => settod(e.currentTarget.value)} value={tod} 
                                    className=" flex w-full p-2 text-slate-500 outline-none " placeholder="Enter Chatbot Name"/>
                                
                            </label>
                        </div>
                        <div className=" flex gap-6 mt-10 w-full ">
                            <Button variant="slim" type="button"  disabled={exporting} onClick={() => exportConvos()} loading={exporting}
                            className="block w-full py-2 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Export Conversations
                            </Button>
                            <Button variant="slim" type="button"  disabled={exporting} onClick={() => {settod("");setfromd("");}} loading={exporting}
                            className="block py-2 w-full text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Reset
                            </Button>
                        </div>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg" 
                        className=" absolute top-3 right-3 cursor-pointer " onClick={() => setexportc(false)}>
                            <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 
                            2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 
                            4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 
                            16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        }
    </>
}