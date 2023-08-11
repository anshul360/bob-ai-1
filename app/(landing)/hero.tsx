'use client'

import Stars from "./stars";
import ReactPlayer from 'react-player/youtube';

export default function Hero() {
    return <>
    
    <section className="dark:bg-black bg-black flex flex-col overflow-hidden relative ">{/** className="dark:bg-black bg-zinc-200 "  */}
        {/* <div className="relative flex w-full px-4 py-2 mx-auto sm:pt-6 sm:px-6 lg:px-8 justify-center bg-zinc-800 bg-opacity-40">
            <h1 className="text-4xl font-extrabold dark:text-white sm:text-center sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff]  to-[#00ffff] h-10 md:h-20 w-fit">
                Cyan Arrow
            </h1>
        </div> */}
        <Stars />
        <div className="relative flex max-w-6xl w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-10 sm:py-24 sm:px-6 lg:px-8 items-center justify-center mt-10 sm:mt-0">
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto sm:w-[50%] " style={{fontWeight: "900"}}>
                <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 sm:h-20 ">
                    Engage Visitors
                </div>
                <div className="w-full text-transparent bg-clip-text bg-gradient-to-r to-cyan-700 via-cyan-500 from-cyan-500 sm:h-20 ">
                    Get More Leads
                </div>
                {/* <div className="w-full  text-3xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-cyan-800 via-cyan-600 to-cyan-600 sm:h-20 ">
                    Optimize Conversions
                </div> */}
                <div className="w-full mt-1 text-lg font-semibold text-white sm:text-2xl">
                    Elevate your website with AI-powered chatbots, finely tuned to your data, within minutes
                </div>
            </div>
            <div className="sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl h-96">
                {/* <ReactPlayer url='/lib/CA_Script-2023-08-10 17_36_14.mp4' /> */}
            </div>
        </div>
        <div className="relative flex w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-10 sm:py-24 sm:px-6 lg:px-8  justify-center">
            <div className="sm:flex sm:flex-col sm:align-center items-center bg-white bg-opacity-50 p-8 rounded-xl h-auto">
                <div className=" flex w-full flex-col items-center justify-center ">
                    <div className=" flex flex-col items-center text-2xl">
                        <div className=" flex rounded-full border-4 border-zinc-600 text-zinc-600 p-2 px-4 font-bold w-fit ">1</div>
                        <div className=" flex h-5 w-2 bg-zinc-600 "></div>
                        <div className=" flex text-zinc-800 font-bold ">Add Data</div>
                    </div>
                    <div className=" flex h-5 w-2 bg-zinc-600 "></div>
                    <div className=" flex flex-col items-center text-2xl ">
                        <div className=" flex rounded-full border-4 border-zinc-600 text-zinc-600 p-2 px-4 font-bold w-fit ">2</div>
                        <div className=" flex h-5 w-2 bg-zinc-600 "></div>
                        <div className=" flex text-zinc-800 font-bold ">Add Chatbot on Website</div>
                    </div>
                    <div className=" flex h-5 w-2 bg-zinc-600 "></div>
                    <div className=" flex flex-col items-center text-2xl ">
                        <div className=" flex rounded-full border-4 border-zinc-600 text-zinc-600 p-2 px-4 font-bold w-fit ">3</div>
                        <div className=" flex h-5 w-2 bg-zinc-600 "></div>
                        <div className=" flex text-zinc-800 font-bold ">Delight your Customers</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
}

function Card({ title, description, footer, children }: any) {
    return (
        <div className="w-full max-w-3xl m-auto my-8 border rounded-md p border-zinc-700">
            <div className="px-5 py-4">
                <h3 className="mb-1 text-2xl font-medium">{title}</h3>
                <p className="text-zinc-300">{description}</p>
                {children}
            </div>
            <div className="p-4 border-t rounded-b-md border-zinc-700 bg-zinc-900 text-zinc-500">
                {footer}
            </div>
        </div>
    );
}