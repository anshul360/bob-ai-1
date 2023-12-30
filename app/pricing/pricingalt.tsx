'use client'

import Button from "@/components/ui/Button"
import { useEffect, useState } from "react";
import Stars from "../(landing)/stars";
import { useRouter } from "next/navigation";
import { postData } from '@/utils/helpers';
import { getStripe } from "@/utils/stripe-client";
import { Database } from "@/types_db";
import ManageSubscriptionButton from "../account/ManageSubscriptionButton";
import Image from "next/image"

export default function PricingAlt({session, subscriptions, prowpri, user, wlabeled, core}: any) {

    const [yearly, setyearly] = useState(true);
    const [ebotc, setebotc] = useState(1);
    const [emsgc, setemsgc] = useState(1);
    const [redirect, setredirect] = useState(false);
    // const [wlabeled,setwlabled] = useState(false);
    // const [core, setcore] = useState(false);
    const { push } = useRouter();
    /**stripe test env */
    // const addonp: any = {
    //     b: "price_1NhPvsSIKpTeZ6VRCKKIZq4K",
    //     m: "price_1NgkF4SIKpTeZ6VRkW2UAn3R",
    //     w: "price_1NgkFXSIKpTeZ6VRFtkStR2k"
    // }

    // const submp: any = {
    //     b: "price_1NgkDiSIKpTeZ6VR4ePqK5FB", //1600
    //     p: "price_1NgkEDSIKpTeZ6VRz7UMlm6q"  //6000
    // }

    // const subap: any = {
    //     b: "price_1NgkDjSIKpTeZ6VRMOkaKtRc", //16800
    //     p: "price_1NgkEDSIKpTeZ6VRvbajHBGP"  //60000
    // }

    /**stripe prod env */
    const addonp: any = {
        b: "price_1Ngg8GSIKpTeZ6VRktAghadZ",
        m: "price_1Ngg9BSIKpTeZ6VRV0PxnwL3",
        w: "price_1NggA4SIKpTeZ6VRijZtW9yA"
    }

    const submp: any = {
        b: "price_1OT4UZSIKpTeZ6VRC92HZaRt",//1750 //"price_1Ngg5ESIKpTeZ6VR8JUgE2XF", //1600
        p: "price_1OT4YeSIKpTeZ6VROefh0Wvr" //6250 //"price_1Ngg75SIKpTeZ6VRy1lxD7st"  //6000
    }

    const subap: any = {
        b: "price_1Ngg5ESIKpTeZ6VRGHttfM4W", //16800
        p: "price_1Ngg75SIKpTeZ6VRKLpFDnKZ"  //60000
    }

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
    const info = (text: string) => {
        return <span className="relative group ml-2">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
            </svg>
            <span className="absolute hidden group-hover:block bg-zinc-900 p-2 rounded-md -top-4 right-0  w-[150px] border border-white z-10">{text}</span>
        </span>
    }


    async function subscribe(type: string) {
        setredirect(true);
        if(!session) {
            push("/signin");
            return;
        }
        // console.log(type, submp[type], subap[type]);
        // console.log(prowpri);
        //iterate active products to see matching price
        let price: any = {};
        prowpri?.map((prod: any) => prod.prices?.map((pricel: any) => {
            if(pricel.id === submp[type] && !yearly) {
                price = pricel;
            } else if( pricel.id === subap[type] && yearly ) {
                price = pricel;
            }
        }));
        try {
            if(!price) throw new Error("Invalid price");
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price, core: true }
            });
    
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            setredirect(false);
            return alert((error as Error)?.message);
        } finally {
            // setredirect(false);
        }
    }

    async function addon(type: string, quantity: number = 1) {
        setredirect(true);
        if(!session) {
            push("/signin");
            return;
        }
        if(!core) {
            setredirect(false);
            return alert("Please subscribe to Starter or Pro plan first!");
        }
        // console.log(type, submp[type], subap[type]);
        // console.log(prowpri);
        //iterate active products to see matching price
        let price: any = {};
        prowpri?.map((prod: any) => prod.prices?.map((pricel: any) => {
            if(pricel.id === addonp[type]) {
                price = pricel;
            } 
        }));
        try {
            if(!price) throw new Error("Invalid price");
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price, quantity, core: false }
            });
    
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            setredirect(false);
            return alert((error as Error)?.message);
        } finally {
            // setPriceIdLoading(undefined);
        }

    }

    async function contactus() {
        console.log(session);
        setredirect(true);
        if(!session) {
            console.log(session);
            push("/signin");
            return;
        }
        // push("/contact");
        push("https://calendly.com/anshulkumar-ca/contact-us");
    }

    const redirectToCustomerPortal = async () => {
        try {
            setredirect(true);
            const { url } = await postData({
                url: '/api/create-portal-link',
                data: { pricing: true }
            });
            push(url);
        } catch (error) {
            if (error) return alert((error as Error).message);
        }
        setredirect(false);
    };


    return <section className="mb-12 bg-black ">
        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 lg:px-8 items-start justify-center mt-10 lg:mt-0">
            <div className="flex flex-col text-4xl lg:text-6xl items-center justify-center p-2 rounded-xl h-auto w-full " style={{fontWeight: ""}}>
                <h1 className=" text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Pricing Plans
                </h1>
                {/* <p className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 text-center">Simple Plans based on your requirements. <br/>Start your <span className="underline font-bold">7 days Free Trial</span> Now! <span className="underline font-bold">(No CC required)</span></p><div className="text-lg lg:text-2xl flex gap-6 items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 "> */}
                <p className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 text-center">Start your <span className="underline font-bold">Free 7-day</span> trial now! <span className="underline font-semibold">(No CC required)</span></p><div className="text-lg lg:text-2xl flex gap-6 items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">    
                    Pay
                </div>
                <div className="mt-4 relative text-lg lg:text-2xl flex gap-2 lg:gap-6 items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">
                    Monthly
                    <input className={switchclass} type="checkbox" role="switch" id="flexSwitchCheckDefault" autoComplete=""
                    onChange={(e) => {
                        setyearly(e.currentTarget.checked);
                    }} checked={yearly}/>
                    Annually <span className=" text-white text-sm absolute -right-[70px] bottom-0 ">(Save 20%)</span>
                </div>
                {/* <div className="text-lg lg:text-2xl flex gap-6 items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">
                    Save 16.67% on Annual Subscription
                </div> */}
            </div>
            <div className=" flex w-full flex-col lg:flex-row  gap-6 lg:gap-2 mt-10 h-full  ">
                <div className=" flex flex-col border-2 border-white rounded-lg gap-2 p-6 w-full lg:w-[33%] bg-black lg:hover:scale-105 hover:z-10 transition-transform duration-300 ">{/**card 1*/}
                    <h2 className=" text-2xl lg:text-4xl w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">Starter</h2>
                    <ul className="space-y-3 mt-8 h-full flex flex-col">
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4 relative ">2,000 messages/month </p>{info("This is the collective number of responses allowed from chatbots per month.")}
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">2 Chatbots</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">1,00,00,000 characters/chatbot</p>{info("The total number of characters for training chatbot. You can upload multiple files.")}
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Add on unlimited websites</p>{info("You can add 1 chatbot on unlimited number of websites.")}
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Capture Leads</p>{info("You can customize the information you want to collect.")}
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Conversation History</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Conversation Tracking</p>{info("This feature estimates the location of the visitors.")}
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Email Support</p>
                        </li>
                        {/* <li className="flex items-center">
                            {checksvg}<p className="ml-4">Conversation Tracking</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">API Access (Coming Soon)</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Zapier Integration (Coming Soon)</p>
                        </li> */}
                    </ul>
                    <div>
                        <p className="mt-8">
                            {
                                yearly?
                                <><span className="text-xl font-bold line-through text-gray-600 ">₹ 1,750</span>
                                <span className="text-base font-medium line-through text-gray-600">/month</span><br/>
                                <span className="text-3xl font-bold ">₹ 1,400</span>
                                <span className="text-base font-medium text-cyan-600">/month (billed annually)</span><br/>
                                <span className="text-xl font-medium text-cyan-600">Save 20%</span></>:
                                <><span className="text-3xl font-bold ">₹ 1,750</span>
                                <span className="text-base font-medium text-cyan-600">/month</span></>
                            }
                        </p>
                        {core?
                        <Button variant="slim" disabled={!session} onClick={redirectToCustomerPortal} loading={redirect}
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900">
                            Manage Subscription
                        </Button>:
                        <Button variant="slim" type="button" onClick={() => subscribe("b")} loading={redirect}
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Subscribe Starter
                        </Button>}
                    </div>
                </div>

                <div className=" flex flex-col border-4 relative border-[#00ffff] rounded-lg gap-2 p-6 w-full overflow-clip lg:w-[33%] bg-black h-full shadow-[0_0_30px_rgba(0,255,255,0.6)] lg:hover:scale-105 hover:z-10 transition-transform duration-300 ">{/**card 2*/}
                    <div className=" absolute top-3 bg-cyan-400 -right-7 rotate-45 px-2 py-1 ">&nbsp;&nbsp;&nbsp;POPULAR&nbsp;&nbsp;&nbsp;</div>
                    <h2 className=" text-2xl lg:text-4xl w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">Pro</h2>
                    <ul className="space-y-3 mt-8 h-full flex flex-col">
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">8,000 messages/month</p>{info("This is the collective number of responses allowed from chatbots per month.")}
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">5 Chatbots</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">1,00,00,000 characters/chatbot</p>{info("The total number of characters for training chatbot. You can upload multiple files.")}
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Add on unlimited websites</p>{info("You can add 1 chatbot on unlimited number of websites.")}
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Capture Leads</p>{info("You can customize the information you want to collect.")}
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Conversation History</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Conversation Tracking</p>{info("This feature estimates the location of the visitors.")}
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">API Access</p>{info("Integrate with your existing CRMs. Chat with your Chatbots via API")}
                        </li>
                        {/* <li className="flex items-center">
                            {checksvg}<p className="ml-4">Notion Integration (Coming Soon)</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Zapier Integration (Coming Soon)</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Shopify Integration (Coming Soon)</p>
                        </li> */}
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Email & On-call Support</p>
                        </li>
                    </ul>
                    <div className="flex flex-col">
                        <p className="mt-8">
                            {
                                yearly?
                                <><span className="text-xl font-bold line-through text-gray-600 ">₹ 6,250</span>
                                <span className="text-base font-medium line-through text-gray-600">/month</span><br/>
                                <span className="text-3xl font-bold ">₹ 5,000</span>
                                <span className="text-base font-medium text-cyan-600">/month (billed annually)</span><br/>
                                <span className="text-xl font-medium text-cyan-600 ">Save 20%</span></>:
                                <><span className="text-3xl font-bold ">₹ 6,250</span>
                                <span className="text-base font-medium text-cyan-600">/month</span></>
                            }
                        </p>
                        {core?
                        <Button variant="slim" disabled={!session} onClick={redirectToCustomerPortal} loading={redirect}
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900">
                            Manage Subscription
                        </Button>:
                        <Button variant="slim" type="button" onClick={() => subscribe("p")}  loading={redirect}
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Subscribe Pro
                        </Button>}
                    </div>
                </div>
                <div className=" flex flex-col border-2 border-white rounded-lg gap-2 p-6 w-full lg:w-[33%] bg-black lg:hover:scale-105 hover:z-10 transition-transform duration-300 ">{/**card 3*/}
                    <h2 className=" text-2xl lg:text-4xl w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">Custom</h2>
                    <ul className="space-y-3 mt-8 h-full flex flex-col">
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Private label</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Custom pricing</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Priority Support</p>
                        </li>
                    </ul>
                    <div>
                        <p className="mt-8">
                                <span className="text-3xl font-bold ">Price upon request</span>
                        </p>
                        <Button variant="slim" type="button" onClick={() => contactus()}  loading={redirect}
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Contact Us
                        </Button>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col text-4xl lg:text-6xl items-center justify-center p-2 rounded-xl h-auto w-full mt-10 " style={{fontWeight: ""}}>
                <h1 className=" text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Add-ons
                </h1>
                {/* <p className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 text-center">Simple Plans based on your requirements</p>
                <div className="mt-4 text-lg lg:text-2xl flex gap-2 lg:gap-6 items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">
                    Monthly
                    <input className={switchclass} type="checkbox" role="switch" id="flexSwitchCheckDefault" autoComplete=""
                    onChange={(e) => {
                        setyearly(e.currentTarget.checked);
                    }} checked={yearly}/>
                    Annual
                </div> */}
                {/* <div className="text-lg lg:text-2xl flex gap-6 items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">
                    Save 16.67% on Annual Subscription
                </div> */}
            </div>
            <div className=" flex w-full flex-col lg:flex-row items-center justify-center gap-6 mt-10 h-full lg:h-[400px] ">
                <div className=" flex flex-col border-2 border-white rounded-lg gap-2 p-6 w-full hover:scale-105 transition-transform duration-300 h-full ">{/**card 1*/}
                    <h2 className=" text-2xl pb-1 lg:text-4xl w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">Extra Chatbot</h2>
                    <ul className="space-y-3 mt-8 flex flex-col h-full">
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">{(ebotc==0?1:ebotc>10?10:ebotc)} Chatbot(s)</p>
                        </li>
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">1,00,00,000 characters/chatbot</p>
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
                            <Button variant="slim" type="button" onClick={() => addon("b", ebotc)}  loading={redirect}
                            className="block w-full text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Get Extra Chatbots
                            </Button>
                        </div>
                        <div className=" flex w-full items-center ">Quantity 1 - 10</div>
                    </div>
                </div>

                <div className=" flex flex-col border-2 border-white rounded-lg gap-2 p-6 w-full hover:scale-105 transition-transform duration-300 h-full ">{/**card 2*/}
                    <h2 className=" text-2xl lg:text-4xl pb-1 w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">Extra Messages</h2>
                    <ul className="space-y-4 mt-8 flex flex-col h-full">
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
                            <Button variant="slim" type="button" onClick={() => addon("m", emsgc)}  loading={redirect}
                            className="block w-full text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Get Extra Messages
                            </Button>
                        </div>
                        <div className=" flex w-full items-center ">Quantity 1 - 100</div>
                    </div>
                </div>

                <div className=" flex flex-col border-2 border-white rounded-lg gap-2 p-6 w-full hover:scale-105 transition-transform duration-300 h-full ">{/**card 2*/}
                    <h2 className=" text-2xl lg:text-4xl pb-1 w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">White Label</h2>
                    <ul className="space-y-4 mt-8 flex flex-col h-full">
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">Remove "Powered by Cyan Arrow" from the chatbots</p>
                        </li>
                        <li className="flex items-center">
                            {/* {checksvg}<p className="ml-4">12M charaters/chatbot</p> */}<br/>
                        </li>
                    </ul>
                    <div>
                        <p className="mt-8">
                                <span className="text-3xl font-bold ">₹ 3,500</span>
                                <span className="text-base font-medium text-cyan-600">{" "}one time</span>
                        </p>
                        <div className=" flex w-full items-center gap-2 mt-8 ">
                            <Button variant="slim" type="button" onClick={() => addon("w")}  loading={redirect} disabled={wlabeled}
                            className="block w-full text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                {wlabeled?"Purchased":"Get White Label"}
                            </Button>
                        </div>
                        <div className=" flex w-full items-center h-6 "></div>
                    </div>
                </div>

            </div>
            <div className=" flex w-full flex-col lg:flex-row items-center justify-center gap-6 mt-10 h-full lg:h-[400px] ">
                <div className=" flex flex-col border-2 border-white rounded-lg gap-2 p-6 w-full lg:w-[33%] hover:scale-105 transition-transform duration-300 h-full ">{/**card 1*/}
                    <h2 className=" text-2xl pb-1 lg:text-4xl w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">Setup Chatbots</h2>
                    <ul className="space-y-3 mt-8 flex flex-col h-full">
                        <li className="flex items-center">
                            {checksvg}<p className="ml-4">We will setup your chatbots</p>
                        </li>
                    </ul>
                    <div>
                        <p className="mt-8">
                                <span className="text-3xl font-bold ">₹ {(5000).toLocaleString("en-IN")}</span>
                                <span className="text-base font-medium text-cyan-600">{" "}one time</span>
                        </p>
                        <div className=" flex w-full items-center gap-2 mt-8 ">
                            <Button variant="slim" type="button"  onClick={() => contactus()}  loading={redirect}
                            className="block w-full text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}