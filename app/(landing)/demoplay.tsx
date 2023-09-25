'use client';

import ReactPlayer from "react-player/lazy";
import { useState } from "react";

export default function Demoplay() {
    const [playvideo, setplayvideo] = useState(false);

    return <>
        <div className=" relative flex w-full lg:w-[50%] mt-1 font-semibold text-zinc-900 lg:text-2xl justify-center items-center rounded-sm group " >{/**"conic-gradient(cyan,blue,purple)" */}
            <img src="/lib/image/home/video.png" width="auto" height="auto" alt="Opening" className=" flex blur-sm w-full z-[4] rounded-full "/>
            <div className=" flex absolute w-full h-full bg-gray-400 top-0 left-0 opacity-75 -rotate-[12deg] scale-110 z-[1] rounded-full"></div>
            <div className=" flex absolute w-full h-full bg-gray-500 top-0 left-0 opacity-75 -rotate-[8deg] scale-105 z-[2] rounded-full"></div>
            <div className=" flex absolute w-full h-full bg-gray-600 top-0 left-0 opacity-75 -rotate-[4deg] z-[3] rounded-full"></div>
            <span className=" absolute flex text-xl border-0 border-cyan-600 rounded-full p-2 items-center justify-center gap-2 cursor-pointer opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300 z-[5] "
            onClick={() => setplayvideo(true)}>
                <span className=" flex  border-0 border-cyan-600 rounded-full h-[40px] w-[40px] items-center justify-center ">
                    <span className=" flex h-[100px] w-[100px] [border-width:50px_0px_50px_100px] ml-2 [border-color:transparent_transparent_transparent_#22d3ee]
                    [box-sizing:border-box] "></span>
                </span>
                
            </span>
        </div>
        {playvideo && <div className={` bg-opacity-60 bg-black flex absolute top-0 left-0 justify-center h-[100vh] w-full z-[6] `} onClick={() => setplayvideo(false)}>
            <div className=" flex lg:w-[80%] w-full justify-center mt-[25vh] lg:mt-[2vh] " onClick={(e) => e.preventDefault()}>
                <ReactPlayer url="/lib/vids/caintro.mp4" loop={true} controls={true} width="100%" height="auto" suppressHydrationWarning={true} playing={playvideo} muted={true}/>
            </div>
        </div>}
    </>
}