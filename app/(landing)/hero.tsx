'use client'

import Button from "@/components/ui/Button";
import Stars from "./stars";
import ReactPlayer from 'react-player/youtube';
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Hero() {
    const { push } = useRouter();

    function signIn() {
        if(process.env.NEXT_PUBLIC_DEV_STAGE != "cs") push("/signin");
        else alert("We are launching soon!");
    }

    return <>
    {/* <style jsx>

    </style> */}
        <section className="dark:bg-black bg-black flex flex-col overflow-hidden relative ">{/** className="dark:bg-black bg-zinc-200 "  */}
            {/* <div className="relative flex w-full px-4 py-2 mx-auto sm:pt-6 sm:px-6 lg:px-8 justify-center bg-zinc-800 bg-opacity-40">
                <h1 className="text-4xl font-extrabold dark:text-white sm:text-center sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff]  to-[#00ffff] h-10 md:h-20 w-fit">
                    Cyan Arrow
                </h1>
            </div> */}
            {/* <Stars /> */}
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-10 sm:py-14 sm:px-6 lg:px-8 items-center justify-center mt-10 sm:mt-0">
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto sm:w-[50%] " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        Engage Visitors
                    </div>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r to-cyan-700 via-cyan-500 from-cyan-500 pb-3 ">
                        Get More Leads
                    </div>
                    <div className="w-full mt-1 text-lg font-semibold text-white sm:text-2xl">
                        Elevate your website with AI-powered chatbots, finely tuned to your data
                    </div>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r to-cyan-700 via-cyan-500 from-cyan-500 pb-3 ">
                        Within Minutes
                    </div>
                </div>
                <div className=" flex w-full sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl justify-center items-center rounded-full " style={{transform: "rotate3d(-1, 1, 0.3, 30deg)", background: "radial-gradient(transparent, #00ffff, transparent, transparent)"}}>{/**"conic-gradient(cyan,blue,purple)" */}
                    <img src="/lib/image/home/opening2.webp" alt="Opening" className=" shadow-lg shadow-white antialiased h-[400px] sm:h-[700px]"/>
                </div>
            </div>


            <div className="relative flex max-w-[80rem] w-full px-4 flex-col-reverse md:flex-row mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className=" flex w-full sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl justify-center items-center" style={{transform: "rotate3d(1, 1, -0.3, 30deg)", background: "radial-gradient(transparent, #00ffff, transparent, transparent)"}}>
                    <img src="/lib/image/home/leads2.JPG" alt="Opening" className=" shadow-lg shadow-white antialiased h-[400px] sm:h-[700px]"/>
                </div>
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto sm:w-[50%] " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        Turn Conversations Into High-Quality Leads<br/>
                    </div>
                    <div className="w-full mt-1 text-lg font-semibold text-white sm:text-2xl">
                        Over half of the businesses that use AI-powered chatbots generate better quality leads.
                    </div>
                </div>
            </div>


            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto sm:w-[50%] " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        Get Immediate notification of potential Customer<br/>
                    </div>
                    <div className="w-full mt-1 text-lg font-semibold text-white sm:text-2xl">
                        Stats show that calling a lead within 5 minutes is more effective than calling in 30 minutes.
                    </div>
                </div>
                <div className=" flex w-full sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl justify-center items-center" style={{transform: "rotate3d(-1, 1, 0.3, 30deg)", background: "radial-gradient(transparent, #00ffff, transparent, transparent)"}}>
                    <img src="/lib/image/home/notice.JPG" alt="Opening" className=" shadow-lg shadow-white antialiased  w-[65%] sm:w-auto sm:h-[500px] "/>
                </div>
            </div>

            
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col-reverse md:flex-row mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className=" flex w-full sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl justify-center items-center" style={{transform: "rotate3d(1, 1, -0.3, 30deg)", background: "radial-gradient(transparent, #00ffff, transparent, transparent)"}}>
                    <img src="/lib/image/home/bubbles.webp" alt="Opening" className=" shadow-lg shadow-white antialiased  w-[65%] sm:w-auto sm:h-auto "/>
                </div>
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl sm:w-[50%] " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        Get your own Support Agent Working 24x7<br/>
                    </div>
                </div>
            </div>
            
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col-reverse md:flex-row mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <Button variant="slim" type="button" onClick={() => signIn()}
                className="block w-full !py-4 !rounded-full mt-8 text-3xl font-semibold text-center text-white bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300 hover:bg-zinc-900" >
                    Start your free trial!
                </Button>
            </div>
        </section>
        {/**Features */}
        <section className="dark:bg-black bg-black flex flex-col overflow-hidden relative ">{/** className="dark:bg-black bg-zinc-200 "  */}
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-0 sm:pb-6 sm:py-14 sm:px-6 lg:px-8 items-center justify-center mt-10 ">
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        Packed with essential Features
                    </div>
                </div>
            </div>

            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-5 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-auto sm:w-[50%] " style={{fontWeight: ""}}>
                    <Card title="AI Powered" description="Feels like talking to a person. Keeps visitor engaged" />
                </div>
                <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-auto sm:w-[50%] " style={{fontWeight: ""}}>
                    <Card title="Personalised" description="Chatbot trained on your data. Accurate and Effective responses." />
                </div>
            </div>

            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-5 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-auto sm:w-[50%] " style={{fontWeight: ""}}>
                    <Card title="Notifications" description="Sends out notification as soon as a lead is received" />
                </div>
                <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-auto sm:w-[50%] " style={{fontWeight: ""}}>
                    <Card title="Data Analysis" description="Analyse Conversations & Leads inside the app to get more insights" />
                </div>
            </div>

            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-auto sm:w-[50%] " style={{fontWeight: ""}}>
                    <Card title="Super Quick Setup" description="Lightning fast setup. Get your chatbot running in minutes." />
                </div>
            </div>

            <div className="relative flex max-w-[80rem] w-full px-4 flex-col-reverse md:flex-row mx-auto gap-4 pb-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <Button variant="slim" type="button" onClick={() => signIn()}
                className="block w-full !py-4 !rounded-full mt-8 text-3xl font-semibold text-center text-white bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300 hover:bg-zinc-900" >
                    Start your free trial!
                </Button>
            </div>
        </section>
        {/**FAQs */}
        <section className="dark:bg-black bg-black flex flex-col overflow-hidden relative ">{/** className="dark:bg-black bg-zinc-200 "  */}
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-0 sm:pb-2 sm:px-6 lg:px-8 items-center justify-center mt-10 ">
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        FAQs
                    </div>
                </div>
            </div>
            
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 pb-0 sm:pb-6 sm:px-6 lg:px-8 items-center justify-center mt-2">
                <div className="group flex flex-col gap-2 rounded-lg bg-black px-5 py-1 text-white w-full" tabIndex={1} >
                    <div className="flex cursor-pointer items-center justify-between">
                    <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                        <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-1 ">
                            What is Cyan Arrow?
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#22d3ee" className="h-6 w-6 transition-all duration-500 group-focus:-rotate-180">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                    </div>
                    <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000 text-lg sm:text-2xl" >
                        Cyan Arrow is an app which lets you build AI chatbots effortlessly.<br/>
                        With it you can train AI specifically on your data - which enables chatbot to respond queries about your products/services. Then you can add the chatbot to your website.<br/>
                        It also helps you collect data about your potential customer like Contact information, Conversation & Location(if available).
                    </div>
                </div>

                <div className="group flex flex-col gap-2 rounded-lg bg-black  px-5 py-1 text-white w-full" tabIndex={2} >
                    <div className="flex cursor-pointer items-center justify-between">
                        <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                            <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-1 ">
                                What are accepted Data sources?
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#22d3ee" className="h-6 w-6 transition-all duration-500 group-focus:-rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000 text-lg sm:text-2xl" >
                        You can upload files (.pdf, .txt, .doc, .docx).<br/>
                        You can upload data from websites by simply adding the website address.<br/>
                        You can also enter data manually.
                    </div>
                </div>

                <div className="group flex flex-col gap-2 rounded-lg bg-black  px-5 py-1 text-white w-full" tabIndex={3} >
                    <div className="flex cursor-pointer items-center justify-between">
                        <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                            <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-1 ">
                                Are chatbots customizable?
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#22d3ee" className="h-6 w-6 transition-all duration-500 group-focus:-rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000 text-lg sm:text-2xl " >
                        Yes. You can customize following: 
                        <ul className=" list-disc pl-8 list-inside">
                            <li>Appearance - Change colors, theme, position, greeting message of chatbot to match your website's style. </li>
                            <li>Personality - Adjust behaviour and creativity of the chatbot. </li>
                            <li>Leads - Select what information you want to collect from your website visitors. </li>
                        </ul>
                    </div>
                </div>

                <div className="group flex flex-col gap-2 rounded-lg bg-black  px-5 py-1 text-white w-full" tabIndex={4} >
                    <div className="flex cursor-pointer items-center justify-between">
                        <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                            <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-1 ">
                                Is my data secure?
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#22d3ee" className="h-6 w-6 transition-all duration-500 group-focus:-rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000 text-lg sm:text-2xl " >
                        Yes. Your data is completely secure on AWS/GCP servers located in US.
                    </div>
                </div>
            </div>

            <div className="relative flex max-w-[80rem] w-full px-4 flex-col-reverse md:flex-row mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <Button variant="slim" type="button" onClick={() => signIn()}
                className="block w-full !py-4 !rounded-full mt-8 text-3xl font-semibold text-center text-white bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300 hover:bg-zinc-900" >
                    Start your free trial!
                </Button>
            </div>
        </section>
        
    </> 
}

function Card({ title, description, footer, children }: any) {
    return (
        <div className="w-full max-w-3xl m-auto my-2 border rounded-md p border-zinc-700">
            <div className="px-5 py-4">
                <h3 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">{title}</h3>
                <p className="w-full mt-1 text-lg font-semibold text-white sm:text-2xl">{description}</p>
                {children}
            </div>
            <div className="p-4 border-t rounded-b-md border-zinc-700 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pb-3 text-zinc-500">
                {footer}
            </div>
        </div>
    );
}