'use client'

import Image from "next/image";
import { useRef } from "react";
import ReactPlayer from "react-player/lazy";

export default function ExportGuide() {

  return  <section className="mb-12 bg-black">
        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4  sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0">
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                <h1 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Export your Leads and Conversations
                </h1>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl ">
                <p className=" p-2 ">Cyan Arrow app gives you capability to export captured Leads and Conversations. The exported data will be in a CSV file.</p>
            </div>
        </div>

        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-12 sm:py-[60px] sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0">
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                <h2 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Leads
                </h2>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl" suppressHydrationWarning={true} >
                <h3 className=" p-2 sm:text-3xl text-xl ">On the <i>Leads</i> tab you can view all the collected leads</h3>
                <p className=" px-2 pb-2 ">On this page <i>Export Leads</i> button is present</p>
                <img src="/lib/image/docs/leadslist.png" width="100%" height="auto" className=" border border-[#00ffff]" />
                <p className=" px-2 pb-2 ">Enter <i>From</i> and <i>To</i> dates and click <i>Export Leads</i>. Data will be exported in CSV file.</p>
                <img src="/lib/image/docs/leadexport.png" width="100%" height="auto" className=" border border-[#00ffff]" />
            </div>
        </div>

        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-12 sm:py-[60px] sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0">
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                <h2 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Conversations
                </h2>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl" suppressHydrationWarning={true} >
                <h3 className=" p-2 sm:text-3xl text-xl ">On the <i>Conversations</i> tab you can view all the conversations.</h3>
                <p className=" px-2 pb-2 ">On this page <i>Export Leads</i> button is present</p>
                <img src="/lib/image/docs/convolist.png" width="100%" height="auto" className=" border border-[#00ffff]" />
                <p className=" px-2 pb-2 ">Enter <i>From</i> and <i>To</i> dates and click <i>Export Conversations</i>. Data will be exported in CSV file.</p>
                <img src="/lib/image/docs/convoexport.png" width="100%" height="auto" className=" border border-[#00ffff]" />
            </div>
        </div>
      
    </section>
  ;
}
