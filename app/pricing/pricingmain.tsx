'use client'

import Button from "@/components/ui/Button"
import { useState } from "react";

export default function PricingMain() {

    const [yearly, setyearly] = useState(true);
    const [ebotc, setebotc] = useState(1);
    const [emsgc, setemsgc] = useState(1);

    const checksvg = <svg className="h-6 w-6 flex-none  stroke-[#00ffff] stroke-2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="11" />
        <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
    </svg>
    const switchclass = `mr-1 h-8 w-20 appearance-none rounded-[1rem] bg-[#00ffffff] before:pointer-events-none before:absolute before:h-10 
    before:w-10 before:rounded-full before:bg-transparent before:content-[''] before:-mt-[0.3rem] before:-ml-[0.6rem] after:absolute after:z-[2] after:-mt-[0.3rem] after:-ml-[0.4rem] after:h-10 after:w-10 after:rounded-full 
    after:border-none after:bg-cyan-600 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_1s] 
    after:content-[''] checked:bg-[#00ffff] checked:after:absolute checked:after:z-[2] checked:after:-mt-[0.3rem] checked:after:ml-[3rem] checked:after:h-10 checked:after:w-10 
    checked:after:rounded-full checked:after:border-none checked:after:bg-cyan-600 
    checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] 
    checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 
    focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
    focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-10 focus:after:w-10 focus:after:rounded-full focus:after:content-[''] 
    checked:focus:border-primary checked:focus:bg-[#00FFFF] checked:focus:before:ml-[3rem] checked:focus:before:-mt-[3px] checked:focus:before:scale-100 
    checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-cyan-600 dark:after:bg-neutral-400 
    dark:checked:bg-[#00FFFF] dark:checked:after:bg-[#00FFFF]`;

    async function subscribe() {

    }

    async function addon() {

    }


    return <section className="mb-12 bg-black ">
        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4  sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0">
            <div className="flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto w-full " style={{fontWeight: ""}}>
                <h1 className=" text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Pricing Plans
                </h1>
                <p className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 text-center">Simple Plans based on your requirements</p>
                <div className="mt-4 text-lg lg:text-2xl flex gap-2 lg:gap-6 items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">
                    Monthly
                    <input className={switchclass} type="checkbox" role="switch" id="flexSwitchCheckDefault" autoComplete=""
                    onChange={(e) => {
                        setyearly(e.currentTarget.checked);
                    }} checked={yearly}/>
                    Annual
                </div>
                <div className="text-lg lg:text-2xl flex gap-6 items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">
                    Save 16.67% on Annual Subscription
                </div>
            </div>
            <div className=" flex w-full flex-col md:flex-row items-start justify-start gap-6 mt-10 h-auto ">
                <div className=" flex flex-col border-2 border-white rounded-lg gap-2 p-6 w-full lg:w-[33%] ">{/**card 1*/}
                    <h2 className=" text-2xl md:text-4xl w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">Freelancer</h2>
                    <ul className="space-y-4 mt-8">
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">2 Chatbots</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">2,000 messages/month</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">1,00,00,000 charaters/chatbot</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Capture Leads</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Conversation History</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Conversation Tracking</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">API Access (Coming Soon)</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Zapier Integration (Coming Soon)</p>
                        </li>
                    </ul>
                    <div>
                        <p className="mt-8">
                            {
                                yearly?
                                <><span className="text-xl font-bold line-through text-gray-600 ">₹ 21,600</span>
                                <span className="text-base font-medium line-through text-gray-600">/year</span><br/>
                                <span className="text-3xl font-bold ">₹ 18,000</span>
                                <span className="text-base font-medium text-cyan-600">/year</span><br/>
                                <span className="text-base font-medium text-cyan-600">Save 16.67%</span></>:
                                <><span className="text-3xl font-bold ">₹ 1,800</span>
                                <span className="text-base font-medium text-cyan-600">/month</span></>
                            }
                        </p>
                        <Button variant="slim" type="button" onClick={() => subscribe()} 
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Subscribe
                        </Button>
                    </div>
                </div>
                {/* <div className=" flex flex-col ">{/**card 2
                    <h2>Business</h2>
                    <ul>
                        <li>5 Chatbots</li>
                        <li>10 000 messages/month</li>
                        <li>12M charaters/chatbot</li>
                        <li>Leads</li>
                        <li>Conversation History</li>
                        <li>Conversation Tracking</li>
                        <li>API Access (Coming Soon)</li>
                        <li>Zapier Integration (Coming Soon)</li>
                    </ul>
                    <p>INR 6 000 / month</p>
                    <p>INR 60 000 / year</p>
                </div> */}
                <div className=" flex flex-col border-2 border-white rounded-lg gap-2 p-6 w-full lg:w-[33%] ">{/**card 2*/}
                    <h2 className=" text-2xl md:text-4xl w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">Business</h2>
                    <ul className="space-y-4 mt-8">
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">5 Chatbots</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">10,000 messages/month</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">1,00,00,000 charaters/chatbot</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Capture Leads</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Conversation History</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Conversation Tracking</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">API Access (Coming Soon)</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Zapier Integration (Coming Soon)</p>
                        </li>
                    </ul>
                    <div>
                        <p className="mt-8">
                            {
                                yearly?
                                <><span className="text-xl font-bold line-through text-gray-600 ">₹ 72,000</span>
                                <span className="text-base font-medium line-through text-gray-600">/year</span><br/>
                                <span className="text-3xl font-bold ">₹ 60,000</span>
                                <span className="text-base font-medium text-cyan-600">/year</span><br/>
                                <span className="text-base font-medium text-cyan-600">Save 16.67%</span></>:
                                <><span className="text-3xl font-bold ">₹ 6,000</span>
                                <span className="text-base font-medium text-cyan-600">/month</span></>
                            }
                        </p>
                        <Button variant="slim" type="button" onClick={() => subscribe()} 
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Subscribe
                        </Button>
                    </div>
                </div>
                <div className=" flex flex-col border-2 border-white rounded-lg gap-2 p-6 w-full lg:w-[33%] ">{/**card 3*/}
                    <h2 className=" text-2xl md:text-4xl w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">Custom</h2>
                    <ul className="space-y-4 mt-8">
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Custom implementation</p>
                        </li>
                    </ul>
                    <div>
                        <p className="mt-8">
                                <span className="text-3xl font-bold ">Price on call</span>
                        </p>
                        <Button variant="slim" type="button" onClick={() => subscribe()} 
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Contact Us
                        </Button>
                    </div>
                </div>
            </div>

            <div className=" flex w-full flex-col md:flex-row items-center justify-center gap-6 mt-10 ">
                <div className=" flex flex-col border-2 border-white rounded-lg gap-2 p-6 w-full ">{/**card 1*/}
                    <h2 className=" text-2xl pb-1 md:text-4xl w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">Extra Chatbot</h2>
                    <ul className="space-y-4 mt-8">
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">{(ebotc==0?1:ebotc>10?10:ebotc)} Chatbot(s)</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">1,00,00,000 charaters/chatbot</p>
                        </li>
                    </ul>
                    <div>
                        <p className="mt-8">
                                <span className="text-3xl font-bold ">₹ {(800 * (ebotc==0?1:ebotc>10?10:ebotc)).toLocaleString("en-IN")}</span>
                                <span className="text-base font-medium text-cyan-600">/month</span>
                        </p>
                        <div className=" flex w-full items-center gap-2 mt-8 ">
                            <input type="number" step={1} min={1} max={10} onChange={(e) => setebotc(Number(e.currentTarget.value))} value={ebotc}
                                className=" flex p-2 font-semibold text-slate-500 outline-none rounded-sm invalid:bg-red-300 h-fit " placeholder="Enter message to show to customer"/>
                            <Button variant="slim" type="button" onClick={() => addon()} 
                            className="block w-full text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Get Add-on
                            </Button>
                        </div>
                        <div className=" flex w-full items-center ">Quantity 1 - 10</div>
                    </div>
                </div>

                <div className=" flex flex-col border-2 border-white rounded-lg gap-2 p-6 w-full ">{/**card 2*/}
                    <h2 className=" text-2xl md:text-4xl pb-1 w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">Extra Messages</h2>
                    <ul className="space-y-4 mt-8">
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">{((emsgc==0?1:emsgc>100?10:emsgc) * 1000).toLocaleString("en-IN")} messages/month</p>
                        </li>
                        <li className="flex items-center">
                            {/* {checksvg}<p className="ml-4">12M charaters/chatbot</p> */}<br/>
                        </li>
                    </ul>
                    <div>
                        <p className="mt-8">
                                <span className="text-3xl font-bold ">₹ {(800 * (emsgc==0?1:emsgc>100?10:emsgc)).toLocaleString("en-IN")}</span>
                                <span className="text-base font-medium text-cyan-600">/month</span>
                        </p>
                        <div className=" flex w-full items-center gap-2 mt-8 ">
                            <input type="number" step={1} min={1} max={100} onChange={(e) => setemsgc(Number(e.currentTarget.value))} value={emsgc}
                                className=" flex p-2 font-semibold text-slate-500 outline-none rounded-sm invalid:bg-red-300 h-fit " placeholder="Enter message to show to customer"/>
                            <Button variant="slim" type="button" onClick={() => addon()} 
                            className="block w-full text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Get Add-on
                            </Button>
                        </div>
                        <div className=" flex w-full items-center ">Quantity 1 - 10</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}