'use client'

import { useEffect, useState } from "react";
import { PieChart, Pie, Legend, ResponsiveContainer, Cell, XAxis, YAxis, BarChart, Bar, LabelList } from 'recharts';
import Button from "@/components/ui/Button";
import { createBot } from "../supabase-server";
import { useRouter  } from "next/navigation";

export default function SelectBot({user, subscription, userLeads, userBots}: any) {
    const [ chatbotid, setChatbotid ] = useState("");
    const [ validsub, setValidSub ]: any = useState();
    const [ leadbybots, setLeadsbybots ]: any[] = useState([]);
    const [ bots, setBots ]: any[] = useState([]);
    const [ botname, setBotname ] = useState("");
    const [ createbot, setCreatebot] = useState(false);
    const [ execip, setExecip ] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        let validSub1: any;
        subscription.map((sub: any) => {
            if(sub.prices.products.name != "API Access") {
                setValidSub(sub);
                validSub1 = sub;
            }
        });

        const createdBots = userBots.length
        const remainingBots = validSub1?.prices?.products?.metadata?.total_bots - userBots.length;
        setBots([{name:"Created", value: createdBots, color:"#EC4899" },{name: "Remaining", value: remainingBots, color: "#14B8A6"}]);

        let templeadsbybots: Map<string, number> = new Map<string, number>();
        
        userLeads.map((lead: any) => {
            templeadsbybots.set(lead.bot_id, (templeadsbybots.get(lead.bot_id) || 0) + 1)
        });

        let bots: any = []

        for(let [key, value] of Object.entries(templeadsbybots)){
            bots.push({name: key, color: '#'+(Math.random()*0xFFFFFF<<0).toString(16), value});
        };

        let datalead: any = [{name:"Leads/Chatbot", bot:bots}];

        setLeadsbybots(datalead);
    }, [subscription, userLeads, userBots]);

    async function createChatbot() {
        setExecip(true);
        const res = await createBot(botname, user.id);
        console.log("-=-=-=-", res);
        // setBotname("");
        // setCreatebot(false);
        // setExecip(false);
        if(res.success) {
            push(`/dashboard/chatbotconfig?id=${res.data[0].id}`);
        }
    }

    return(
        <>  
            <div className=" flex max-w-[90%] w-full gap-4 flex-col md:flex-row ">
            <section className="mb-32 bg-zinc-900 w-[50%] border rounded-md border-pink-500 ">
                <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                            Chatbots
                        </h1>
                        <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
                            Based on your <span className=" group relative cursor-pointer text-teal-500 font-semibold underline ">
                                subscription
                                <span className=" absolute w-full right-0 top-8 z-10 invisible group-hover:visible whitespace-nowrap bg-zinc-800 p-2 text-white text-base border border-white rounded-sm">
                                    {validsub?.prices?.products?.name}<br/>Total bots: {validsub?.prices?.products?.metadata?.total_bots}
                                </span>
                            </span> below are the details
                        </p>
                    </div>
                    {/* <div className="sm:align-center sm:flex sm:flex-col mt-6 ">
                        <h2 className="text-2xl font-extrabold text-white sm:text-center sm:text-2xl">
                            Chatbots Created
                        </h2>
                        <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
                            6
                        </p>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col ">
                        <h2 className="text-2xl font-extrabold text-white sm:text-center sm:text-2xl">
                            Total Chatbots Available
                        </h2>
                        <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
                            20 (As per your subscription plan: Basic)
                        </p>
                    </div> */}
                    <div className="sm:align-center sm:flex sm:flex-col relative h-[190px] ">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    dataKey="value"
                                    nameKey="name"
                                    isAnimationActive={true}
                                    data={bots}
                                    cx="50%"
                                    cy="90%"
                                    innerRadius={60}
                                    outerRadius={120}
                                    startAngle={180}
                                    endAngle={0}
                                    stroke="#ffffff"
                                    // label
                                >
                                    {bots.map((entry: any, index: number) => (<>
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#000000" />
                                    </>))}
                                    <LabelList dataKey={(props) => props.value==0?"":props.value} fill="#FFFFFF" stroke="#FFFFFF" />
                                </Pie>
                                {/* <Tooltip /> */}
                                <Legend align="center" verticalAlign="bottom"/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col ">
                        <Button
                            variant="slim"
                            type="button"
                            disabled={!user}
                            onClick={() => setCreatebot(true)}
                            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                        >
                            Create New Chatbot
                        </Button>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col mt-10 ">
                        <h2 className="text-2xl font-extrabold text-white sm:text-center sm:text-2xl">
                            Select Chatbot to see details
                        </h2>
                        <div className=" w-full flex items-center justify-center gap-4 ">
                            <select className=" outline-none font-semibold focus:ring-pink-500 p-2 flex-1 bg-white rounded-sm hover:border hover:border-white
                                mt-5 text-sm text-slate-800 sm:text-center hover:bg-zinc-800 hover:text-white transition-colors duration-150 "
                                onChange={(e) => {setChatbotid(e.currentTarget.value)}} value={chatbotid}>
                                <option disabled value="">-- Select --</option>
                                {userBots.map((bot: any) => {
                                    return <option value={bot.id}>{bot.name}</option>
                                })}
                                {/* <option>Chatbot 3</option>
                                <option>Chatbot 4</option> */}
                            </select>
                            <Button
                                variant="slim"
                                type="button"
                                disabled={chatbotid==""}
                                onClick={() => push("/dashboard/chatbotconfig?id="+chatbotid)}
                                className="block mt-5 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900 !py-0 !px-2"
                            >
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2.6em" width="2.6em" xmlns="http://www.w3.org/2000/svg" className=" transition duration-150 hover:translate-x-1">
                                    <path fill="none" d="M0 0h24v24H0z"></path><path d="M6.41 6L5 7.41 9.58 12 5 16.59 6.41 18l6-6z"></path>
                                    <path d="M13 6l-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"></path>
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mb-32 bg-zinc-900 w-[50%] border rounded-md border-pink-500 h-[600px] ">
                <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex sm:flex-col ">
                        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                            Leads
                        </h1>
                        <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl mb-4 ">
                            Details of leads collected across chatbots
                        </p>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col relative h-[190px] ">
                        {userLeads?.length>0?<ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                            data={leadbybots}
                            layout="vertical" barCategoryGap={1}
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                            >
                                <XAxis type="number" hide/>
                                <YAxis type="category" width={60} height={100} dataKey="name" orientation="left" hide />
                                
                                {leadbybots[0]?.bot.map((entry: any, index: number) => (        
                                    <Bar 
                                    dataKey={() => entry.value} name={entry.name}
                                    stackId="a" key={`bar-${index}`} fill={entry.color}>
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                        <LabelList dataKey={() => entry.value} position="center" fill="#FFFFFF" />
                                    </Bar>
                                ))}
                                <Legend align="center"/>
                            </BarChart> 
                        </ResponsiveContainer>:
                        <div className=" sm:items-center sm:flex h-full sm:justify-center flex-col ">
                            <svg stroke="#EC4899" fill="#EC4899" stroke-width="0" viewBox="0 0 24 24" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M16 11V3H8v6H2v12h20V11h-6zm-6-6h4v14h-4V5zm-6 6h4v8H4v-8zm16 8h-4v-6h4v6z"></path>
                            </svg>
                            <p className="max-w-2xl mt-5 text-xl text-pink-500 sm:text-center sm:text-2xl ">
                                No Leads Available
                            </p>
                        </div>}
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col ">
                        <Button
                            variant="slim"
                            type="button"
                            disabled={userLeads.length==0}
                            onClick={() => console.log("redirect")}
                            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                        >
                            View Leads
                        </Button>
                    </div>
                </div>
            </section>
            </div>

            {createbot && 
            <div className=" flex w-full h-full px-4 py-8 sm:px-6 sm:pt-8 lg:px-8 absolute z-40 bg-black bg-opacity-75 justify-center " onClick={() => { setCreatebot(false); setBotname(""); setExecip(false); }}>
                <div className=" flex flex-col max-w-6xl w-full p-4 h-min bg-zinc-900 rounded-md border border-pink-500 gap-4 items-center relative " onClick={(e) => e.stopPropagation()}>
                    <p className="max-w-2xl mt-5 text-xl text-white sm:text-center sm:text-2xl ">
                        Enter a name for Chatbot
                    </p>
                    <input type="text" onChange={(e) => setBotname(e.currentTarget.value)} value={botname} 
                        className=" flex w-full p-2 text-slate-500 outline-none " placeholder="Enter Chatbot Name"/>
                    <Button
                        variant="slim"
                        type="button"
                        disabled={botname.trim().length==0}
                        loading={execip}
                        onClick={() => createChatbot()}
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                    >
                        Continue
                    </Button>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg" className=" absolute top-3 right-3 cursor-pointer " onClick={() => { setCreatebot(false); setBotname(""); setExecip(false); }}>
                        <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 
                        2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 
                        4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 
                        16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path>
                    </svg>
                </div>
            </div>}
        </>
    );
}
