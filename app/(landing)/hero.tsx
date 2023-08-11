'use client'

import Button from "@/components/ui/Button";
import Stars from "./stars";
import ReactPlayer from 'react-player/youtube';
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Hero() {
    const { push } = useRouter();

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
                        Elevate your website with AI-powered chatbots, finely tuned to your data, within minutes
                    </div>
                </div>
                <div className=" flex sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl justify-center items-center" style={{transform: "rotate3d(-1, 1, 0.3, 30deg)"}}>
                    <img src="/lib/image/home/opening2.webp" alt="Opening" className=" shadow-lg shadow-white antialiased h-[400px] sm:h-[700px]"/>
                </div>
            </div>


            <div className="relative flex max-w-[80rem] w-full px-4 flex-col-reverse md:flex-row mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className=" flex sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl justify-center items-center" style={{transform: "rotate3d(1, 1, -0.3, 30deg)"}}>
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
                <div className=" flex sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl justify-center items-center" style={{transform: "rotate3d(-1, 1, 0.3, 30deg)"}}>
                    <img src="/lib/image/home/notice.JPG" alt="Opening" className=" shadow-lg shadow-white antialiased h-[400px] sm:h-[500px] "/>
                </div>
            </div>

            
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col-reverse md:flex-row mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className=" flex sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl justify-center items-center" style={{transform: "rotate3d(1, 1, -0.3, 30deg)"}}>
                    <img src="/lib/image/home/bubbles.webp" alt="Opening" className=" shadow-lg shadow-white antialiased h-[200px] sm:h-auto "/>
                </div>
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl sm:w-[50%] " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        Get your own personal Support Agent working 24x7<br/>
                    </div>
                </div>
            </div>
            
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col-reverse md:flex-row mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <Button variant="slim" type="button" onClick={() => push("/signin")}
                className="block w-full !py-4 !rounded-full mt-8 text-3xl font-semibold text-center text-white bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 hover:bg-zinc-900" >
                    Sign In to start your free trial!
                </Button>
            </div>
        </section>
        
        {/* <section className="dark:bg-black bg-gradient-to-b from-zinc-900 via-black to-black flex flex-col overflow-hidden relative pt-10 ">
            <div className="relative text-4xl sm:text-6xl flex max-w-6xl w-full px-4 flex-col mx-auto gap-4 sm:px-6 lg:px-8 items-center justify-center">
                <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 sm:h-20 text-center ">
                    Setup is Lightning Fast and Easy
                </div>
            </div>
            <div className="relative flex w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-10 sm:px-6 lg:px-8  justify-center ">
                <div className="relative flex max-w-6xl w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                    <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl sm:w-[50%] " style={{fontWeight: ""}}>
                        <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">1. Configure </div>
                    </div>
                    <div className="sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl h-96">
                    </div>
                </div>
            </div>
            <div className="relative flex w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-10 sm:px-6 lg:px-8  justify-center border-t-0 border-[#00ffff]">
                <div className="relative flex max-w-6xl w-full px-4 flex-col-reverse md:flex-row mx-auto gap-4 pb-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                    <div className="sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl h-96">
                        {/* <ReactPlayer url='/lib/CA_Script-2023-08-10 17_36_14.mp4' /> 
                    </div>
                    <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl sm:w-[50%] " style={{fontWeight: ""}}>
                        <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">2. Upload Data</div>
                    </div>
                </div>
            </div>
            <div className="relative flex w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-10 sm:px-6 lg:px-8  justify-center border-t-0 border-[#00ffff]">
                <div className="relative flex max-w-6xl w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                    <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl sm:w-[50%] " style={{fontWeight: ""}}>
                        <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">3. Add on Website</div>
                    </div>
                    <div className="sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl h-96">
                    </div>
                </div>
            </div>
        </section> */}
    </> 
}

// function Card({ title, description, footer, children }: any) {
//     return (
//         <div className="w-full max-w-3xl m-auto my-8 border rounded-md p border-zinc-700">
//             <div className="px-5 py-4">
//                 <h3 className="mb-1 text-2xl font-medium">{title}</h3>
//                 <p className="text-zinc-300">{description}</p>
//                 {children}
//             </div>
//             <div className="p-4 border-t rounded-b-md border-zinc-700 bg-zinc-900 text-zinc-500">
//                 {footer}
//             </div>
//         </div>
//     );
// }