'use client'
import { useEffect, useState } from "react";
import { getBotLeads, getUserBots, getUserLeads } from "../supabase-server";
import Pageload from "./loading";
import { useRouter  } from "next/navigation";

export default function Leads({ user }: any) {
    const [ loadingpage, setloadingpage ] = useState(false);
    const [ leads, setleads ]: any[] = useState([]);
    const [ filterbots, setfilterbots ]: any[] = useState([]);
    const { push } = useRouter();

    useEffect(() => {
        setloadingpage(true);
        let templeads: any[] = [];
        let tempfilterbots: any[] = [];
        if(user) {
            Promise.all([
                getUserLeads(user?.id),
                getUserBots(user?.id)
            ]).then(([rleads, rbots]) => {
                rleads?.map((lead: any, i: number) => {
                    templeads.push(
                        <div className=" flex w-full text-xl border-b gap-4 " key={i}>
                            <div className=" flex w-[25%] p-2 items-center justify-center underline cursor-pointer hover:text-pink-500 " key={i+"a"} onClick={() => push(`/leads?id=${lead.id}`)}>{lead.name || "-"}</div>
                            <div className=" flex w-[25%] p-2 items-center justify-center overflow-hidden " key={i+"c"}>{lead.email || "-"}</div>
                            <div className=" flex w-[25%] p-2 items-center justify-center overflow-hidden " key={i+"d"}>{lead.phone || "-"}</div>
                            <div className=" flex w-[25%] p-2 items-center justify-center " key={i+"b"}>{lead.conversations?.geo?.country || "-"}</div>
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
        respl?.map((lead: any, i: number) => {
            templeads.push(
                <div className=" flex w-full text-xl border-b gap-4 " key={i}>
                    <div className=" flex w-[25%] p-2 items-center justify-center underline cursor-pointer hover:text-pink-500 " key={i+"a"} onClick={() => push(`/leads?id=${lead.id}`)}>{lead.name || "-"}</div>
                    <div className=" flex w-[25%] p-2 items-center justify-center overflow-hidden " key={i+"c"}>{lead.email || "-"}</div>
                    <div className=" flex w-[25%] p-2 items-center justify-center overflow-hidden " key={i+"d"}>{lead.phone || "-"}</div>
                            <div className=" flex w-[25%] p-2 items-center justify-center " key={i+"b"}>{lead.conversations?.geo?.country || "-"}</div>
                    {/* <div className=" flex w-[30%] p-2 items-center justify-center overflow-hidden " key={i+"e"}>{lead.email}</div>
                    <div className=" flex w-[10%] p-2 items-center justify-center overflow-hidden " key={i+"d"}>90</div> */}
                </div>
            );
        });
        setleads(templeads);
        setloadingpage(false);
    }

    return <>
        <div className=" flex max-w-[90%] w-full gap-4 flex-row relative ">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-pink-500 ">
                <div className=" spx-4 py-8 sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex mb-4 gap-4 justify-center ">
                        <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                            Leads collected
                        </h1>
                        <label className=" font-semibold text-white flex gap-4 items-end "> View by chatbot
                            <select className=" flex px-2 py-1 rounded-sm w-20 text-slate-500" onChange={(e) => filterLeads(e.currentTarget.value)}>
                                <option value="all">All</option>
                                {filterbots}
                            </select>
                        </label>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        
                        <div className=" flex w-full text-pink-500 text-xl border-b ">
                            <div className=" flex w-[25%] p-2 items-center justify-center  ">Name</div>
                            <div className=" flex w-[25%] p-2 items-center justify-center  ">Email</div>
                            <div className=" flex w-[25%] p-2 items-center justify-center  ">Phone</div>
                            <div className=" flex w-[25%] p-2 items-center justify-center  ">Place</div>
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
    </>
} 