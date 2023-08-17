'use client'
import { useEffect, useState } from "react";
import { deleteLead, filterLeadsExport, getBotLeads, getUserBots, getUserLeads } from "../supabase-server";
import Pageload from "./loading";
import { useRouter  } from "next/navigation";
import Button from "@/components/ui/Button";
import { toast } from 'react-toastify';
import { AiOutlineDelete } from "react-icons/ai";

export default function Leads({ user }: any) {
    const [ loadingpage, setloadingpage ] = useState(false);
    const [ leads, setleads ]: any[] = useState([]);
    const [ leadrecs, setleadrecs ]: any[] = useState([]);
    const [ filterbots, setfilterbots ]: any[] = useState([]);
    const [ exportl, setexportl ] = useState(false);
    const [ exporting, setexporting ] = useState(false);
    const [ tod, settod ] = useState("");
    const [ fromd, setfromd ] = useState("");
    const { push } = useRouter();

    useEffect(() => {
        let templeads: any[] = [];
        let tempfilterbots: any[] = [];
        if(user && leads.length == 0) {
            setloadingpage(true);
            Promise.all([
                getUserLeads(user?.id),
                getUserBots(user?.id)
            ]).then(([rleads, rbots]) => {
                setleadrecs(rleads);
                rleads?.map((lead: any, i: number) => {
                    templeads.push(
                        <div className=" flex  text-xl border-b hover:bg-zinc-700 " key={i}>
                            <div className=" flex w-[25%] col-auto p-1 items-center justify-start underline cursor-pointer hover:text-[#00ffff] overflow-hidden " key={i+"a"} onClick={() => push(`/leads?id=${lead.id}`)}><p className=" truncate ">{lead.name || "-"}</p></div>
                            <div className=" flex w-[25%] p-1 items-center justify-start overflow-hidden " key={i+"c"}><p className=" truncate ">{lead.email || "-"}</p></div>
                            <div className=" flex w-[15%] p-1 items-center justify-start overflow-hidden " key={i+"d"}><p className=" truncate ">{lead.phone || "-"}</p></div>
                            <div className=" flex w-[10%] p-1 items-center justify-start overflow-hidden " key={i+"f"}><p className=" truncate ">{new Date(lead?.created_at).toLocaleDateString()}</p></div>
                            <div className=" flex w-[22%] p-1 items-center justify-start overflow-hidden " key={i+"b"}><p className=" truncate ">
                                {lead.conversations?.geo?.city?lead.conversations?.geo?.city+", ":""} 
                                {lead.conversations?.geo?.region?lead.conversations?.geo?.region+", ":""} 
                                {lead.conversations?.geo?.country || "-"}</p>
                            </div>
                            <div className=" flex w-[3%] p-2 min-w-fit items-center justify-center cursor-pointer hover:text-red-700 "  key={i+"e"}
                            title="Delete Lead" onClick={() => deleteLeadL(lead.id, lead.name)}>
                                <AiOutlineDelete  key={i} className=" w-5 h-auto "/>
                            </div>
                            {/* <div className=" flex w-[30%] p-2 items-center justify-center overflow-hidden " key={i+"e"}>{lead.email}</div>
                            <div className=" flex w-[10%] p-2 items-center justify-center overflow-hidden " key={i+"d"}>90</div> */}
                        </div>
                    );
                });
                setleads(templeads);
                rbots?.map((bot) => {
                    tempfilterbots.push(
                        <option value={bot.id}>{bot.name}</option>
                    )
                });
                setfilterbots(tempfilterbots);
                // console.log(rleads);
                // console.log(rbots);
            }).catch()
            .finally(() => setloadingpage(false));
        }   
        
        // .then((resp) => {
        //     console.log(resp);
        //     resp?.map((lead: any, i: number) => {
        //         templeads.push(
        //             <div className=" flex w-full text-xl border-b gap-4 " key={i}>
        //                 <div className=" flex w-[20%] p-2 items-center justify-center  " key={i+"a"}>{lead.first_name}</div>
        //                 <div className=" flex w-[20%] p-2 items-center justify-center  " key={i+"b"}>{lead.last_name}</div>
        //                 <div className=" flex w-[20%] p-2 items-center justify-center overflow-hidden " key={i+"c"}>{lead.email}</div>
        //                 <div className=" flex w-[30%] p-2 items-center justify-center overflow-hidden  " key={i+"e"}>{lead.email}</div>
        //                 <div className=" flex w-[10%] p-2 items-center justify-center overflow-hidden  " key={i+"d"}>90</div>
        //             </div>
        //         );
        //     });
        //     setleads(templeads);
        // })
        // .catch(() => console.log)
        // .finally(() => setloadingpage(false));
    }, [user]);

    async function filterLeads(val: string) {
        setloadingpage(true);
        let templeads: any[] = [];
        let respl;
        val=="all"?
        respl = await getUserLeads(user?.id):
        respl = await getBotLeads(val);
        setleadrecs(respl);
        respl?.map((lead: any, i: number) => {
            templeads.push(
                <div className=" flex w-full text-xl border-b hover:bg-zinc-700 " key={i}>
                    <div className=" flex w-[25%] p-2 items-center justify-start underline cursor-pointer hover:text-[#00ffff] overflow-hidden " key={i+"a"} onClick={() => push(`/leads?id=${lead.id}`)}><p className=" truncate ">{lead.name || "-"}</p></div>
                    <div className=" flex w-[25%] p-2 items-center justify-start overflow-hidden " key={i+"c"}><p className=" truncate ">{lead.email || "-"}</p></div>
                    <div className=" flex w-[15%] p-2 items-center justify-start overflow-hidden " key={i+"d"}><p className=" truncate ">{lead.phone || "-"}</p></div>
                    <div className=" flex w-[10%] p-2 items-center justify-start overflow-hidden " key={i+"f"}><p className=" truncate ">{new Date(lead?.created_at).toLocaleDateString()}</p></div>
                    <div className=" flex w-[22%] p-2 items-center justify-start overflow-hidden " key={i+"b"}><p className=" truncate ">
                        {lead.conversations?.geo?.city?lead.conversations?.geo?.city+", ":""} 
                        {lead.conversations?.geo?.region?lead.conversations?.geo?.region+", ":""} 
                        {lead.conversations?.geo?.country || "-"}</p>
                    </div>
                    <div className=" flex w-[3%] p-2 min-w-fit items-center justify-center cursor-pointer hover:text-red-700 "  key={i+"e"}
                    title="Delete Lead" onClick={() => deleteLeadL(lead.id, lead.name)}>
                        <AiOutlineDelete  key={i} className=" w-5 h-auto "/>
                    </div>
                    {/* <div className=" flex w-[30%] p-2 items-center justify-center overflow-hidden " key={i+"e"}>{lead.email}</div>
                    <div className=" flex w-[10%] p-2 items-center justify-center overflow-hidden " key={i+"d"}>90</div> */}
                </div>
            );
        });
        setleads(templeads);
        setloadingpage(false);
    }

    async function exportLeads() {
        setexporting(true);
        if(!tod || !fromd) {
            alert("Enter From date and To date to export Leads!");
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
            const data = await filterLeadsExport(fd.toUTCString(), td.toUTCString(), user.id);

            const csvdata = outcsv(data);
            download(csvdata);
            toast.success('Leads exported successfully!', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });
        } catch(e) {
            console.log(e);
            toast.error('Error: Unable to export leads', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });
        }
        setexporting(false);
        setexportl(false);
    }

    const download = function (data: any) {
  
        const blob = new Blob([data], { type: 'text/csv' });
      
        const url = window.URL.createObjectURL(blob);
      
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'Leads.csv');
        a.click();
    }
      
    const outcsv = function (data: any) {
      
        const csvRows: any = [];
        // const headers = Object.keys(data);
        csvRows.push(`"Name","Email","Phone","Conversation","Organization","Source","Location"`);
      
        
        data.map((lrec: any) => {
            let values:any = [];
            values.push(`"${lrec.name || "-"}"`); values.push(`"${lrec.email || "-"}"`); values.push(`"${lrec.phone || "-"}"`); values.push(`"${JSON.stringify(lrec.conversations?.chat_data || {}).replaceAll(`"`,`'`)}"`); 
            values.push(`"${lrec.org || "-"}"`); values.push(`"${lrec.bots?.name || "-"}"`); values.push(`"${JSON.stringify(lrec.conversations?.geo || {}).replaceAll(`"`,`'`)}"`);
            csvRows.push(values.join(","));
        });
       
        return csvRows.join('\n')
    }

    async function deleteLeadL(id: string, name: string) {
        const affirmation = confirm("Are you sure you want to delete Lead: "+name+id);
        if(affirmation) {
            setloadingpage(true);
            try {
                const resd = await deleteLead(id, user.id);
                if(resd.success) {
                    let templeads: any[] = [];
                    setleadrecs((leads: any) => {
                        let templeadsl:any = [];
                        leads.map((leadl: any, i: number) => {
                            if(leadl.id != id) {
                                templeadsl.push(leadl);
                                templeads.push(
                                    <div className=" flex w-full text-xl border-b hover:bg-zinc-700 " key={i}>
                                        <div className=" flex w-[25%] p-2 items-center justify-start underline cursor-pointer hover:text-[#00ffff] overflow-hidden " key={i+"a"} onClick={() => push(`/leads?id=${leadl.id}`)}><p className=" truncate ">{leadl.name || "-"}</p></div>
                                        <div className=" flex w-[25%] p-2 items-center justify-start overflow-hidden " key={i+"c"}><p className=" truncate ">{leadl.email || "-"}</p></div>
                                        <div className=" flex w-[15%] p-2 items-center justify-start overflow-hidden " key={i+"d"}><p className=" truncate ">{leadl.phone || "-"}</p></div>
                                        <div className=" flex w-[10%] p-2 items-center justify-start overflow-hidden " key={i+"f"}><p className=" truncate ">{new Date(leadl?.created_at).toLocaleDateString()}</p></div>
                                        <div className=" flex w-[22%] p-2 items-center justify-start overflow-hidden " key={i+"b"}><p className=" truncate ">
                                            {leadl.conversations?.geo?.city?leadl.conversations?.geo?.city+", ":""} 
                                            {leadl.conversations?.geo?.region?leadl.conversations?.geo?.region+", ":""} 
                                            {leadl.conversations?.geo?.country || "-"}</p>
                                        </div>
                                        <div className=" flex w-[3%] p-2 min-w-fit items-center justify-center cursor-pointer hover:text-red-700 "  key={i+"e"}
                                        title="Delete Lead" onClick={() => deleteLeadL(leadl.id, leadl.name)}>
                                            <AiOutlineDelete  key={i} className=" w-5 h-auto "/>
                                        </div>
                                    </div>
                                );
                            }
                            // console.log(leadl.id);
                        });
                        return templeadsl;
                    });
                    setleads(templeads);

                    toast.success('Lead deleted successfully!', {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                        theme: "dark",
                    });
                } else throw "Issue with delete lead";
            } catch(e) {
                toast.error('Error: Unable to delete lead', {
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
                <div className=" spx-4 py-8 px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center flex mb-4 gap-4 justify-between items-end px-4 ">
                        <div className=" flex w-fit gap-4 items-start flex-col  ">
                            <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                                Leads
                            </h1>
                            <label className=" font-semibold text-white flex gap-4 items-end whitespace-nowrap "> View by chatbot
                                <select className=" flex px-2 py-1 rounded-sm w-20 text-slate-500" onChange={(e) => filterLeads(e.currentTarget.value)}>
                                    <option value="all">All</option>
                                    {filterbots}
                                </select>
                            </label>
                        </div>
                        <Button variant="slim" type="button" disabled={exportl} onClick={() => setexportl(true)}
                        className="flex !h-fit py-2 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Export Leads
                        </Button>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 max-w-full ">
                        
                        <div className=" flex w-full text-[#00ffff] text-xl border-b ">
                            <div className=" flex w-[25%] p-2 items-center justify-start  ">Name</div>
                            <div className=" flex w-[25%] p-2 items-center justify-start  ">Email</div>
                            <div className=" flex w-[15%] p-2 items-center justify-start  ">Phone</div>
                            <div className=" flex w-[10%] p-2 items-center justify-start  ">Created Date</div>
                            <div className=" flex w-[22%] p-2 items-center justify-start  ">Location</div>
                            <div className=" flex w-[3%] p-2 items-center justify-start  "></div>
                            {/* <div className=" flex w-[30%] p-2 items-center justify-center  ">Interests (AI)</div>
                            <div className=" flex w-[10%] p-2 items-center justify-center  ">Score (AI)</div> */}
                        </div>
                        {leads.length>0?
                        <>{leads}</>:
                        <div className=" flex flex-col gap-2 w-full items-center mt-4">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M32 32v432a16 16 0 0016 16h432"></path>
                                <rect width="80" height="192" x="96" y="224" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect>
                                <rect width="80" height="240" x="240" y="176" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect>
                                <rect width="80" height="304" x="383.64" y="112" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect>
                            </svg>
                            No Leads Available
                        </div>}
                    </div>
                </div>
            </section>
            {loadingpage?<Pageload />:<></>}
        </div>
        {exportl && 
            <div className=" flex w-full h-full top-20 left-0 px-4 py-8 sm:px-6 sm:pt-8 lg:px-8 absolute z-80 bg-black bg-opacity-75 justify-center ">
                <div className=" flex flex-col max-w-6xl w-full p-4 h-min bg-zinc-900 rounded-md border border-[#00ffff] gap-4 items-center relative " onClick={(e) => e.stopPropagation()}>
                    <p className="max-w-2xl mt-5 text-xl text-white sm:text-center sm:text-2xl font-bold ">
                        Select Date Range to export Leads
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
                            <Button variant="slim" type="button"  disabled={exporting} onClick={() => exportLeads()} loading={exporting}
                            className="block w-full py-2 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Export Leads
                            </Button>
                            <Button variant="slim" type="button"  disabled={exporting} onClick={() => {settod("");setfromd("");}} loading={exporting}
                            className="block py-2 w-full text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Reset
                            </Button>
                        </div>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg" 
                        className=" absolute top-3 right-3 cursor-pointer " onClick={() => setexportl(false)}>
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