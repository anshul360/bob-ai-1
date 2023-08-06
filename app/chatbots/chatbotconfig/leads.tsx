import { useEffect, useState } from "react";
import Pageload from "./loading";
import { getBotLeads } from "@/app/supabase-server";

export default function Leads({botId}: any) {
    const [ loadingpage, setloadingpage ] = useState(false);
    const [ leads, setleads ]: any[] = useState([]);

    useEffect(() => {
        setloadingpage(true);
        let templeads: any[] = [];
        getBotLeads(botId)
        .then((resp) => {
            console.log(resp);
            resp?.map((lead: any, i: number) => {
                templeads.push(
                    <div className=" flex w-full text-xl border-b gap-4 " key={i}>
                        <div className=" flex w-[20%] p-2 items-center justify-center  " key={i+"a"}>{lead.first_name}</div>
                        <div className=" flex w-[20%] p-2 items-center justify-center  " key={i+"b"}>{lead.last_name}</div>
                        <div className=" flex w-[20%] p-2 items-center justify-center overflow-hidden " key={i+"c"}>{lead.email}</div>
                        <div className=" flex w-[30%] p-2 items-center justify-center overflow-hidden  " key={i+"e"}>{lead.email}</div>
                        <div className=" flex w-[10%] p-2 items-center justify-center overflow-hidden  " key={i+"d"}>90</div>
                    </div>
                );
            });
            setleads(templeads);
        })
        .catch(() => console.log)
        .finally(() => setloadingpage(false));
    }, []);

    return <>
        <div className=" flex max-w-[90%] w-full gap-4 flex-row relative ">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-[#00ffff] ">
                <div className=" spx-4 py-8 sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                            Leads collected
                        </h1>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        
                        <div className=" flex w-full text-[#00ffff] text-xl border-b ">
                            <div className=" flex w-[20%] p-2 items-center justify-center  ">First Name</div>
                            <div className=" flex w-[20%] p-2 items-center justify-center  ">Last Name</div>
                            <div className=" flex w-[20%] p-2 items-center justify-center  ">Email</div>
                            <div className=" flex w-[30%] p-2 items-center justify-center  ">Interests (AI)</div>
                            <div className=" flex w-[10%] p-2 items-center justify-center  ">Score (AI)</div>
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
        </div></>
}