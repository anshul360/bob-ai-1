'use client'

import { useRef } from "react";
import ReactPlayer from "react-player/lazy";
// import YouTubePlayer from "react-player/youtube";

export default function ChatbotGuide() {
    const createref = useRef<HTMLDivElement>(null);
    const appearanceref = useRef<HTMLDivElement>(null);
    const datasourceref = useRef<HTMLDivElement>(null);
    const embedref = useRef<HTMLDivElement>(null);

    return  <section className="mb-12 bg-black">
        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4  sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0">
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                <h1 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Steps to setup your chatbot
                </h1>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl">
                <p className=" p-2 ">There are following simple setup steps: </p>
                <ul className=" list-decimal list-inside p-2  ">
                <li onClick={() => createref.current?.scrollIntoView({behavior: "auto", block: "start"})} className=" cursor-pointer underline decoration-cyan-600 decoration-2 hover:decoration-4">Create Chatbot</li>
                    <li onClick={() => appearanceref.current?.scrollIntoView({behavior: "auto", block: "start"})} className=" cursor-pointer underline decoration-cyan-600 decoration-2 hover:decoration-4">Adjust chatbot appearance</li>
                    <li onClick={() => datasourceref.current?.scrollIntoView({behavior: "auto", block: "start"})} className=" cursor-pointer underline decoration-cyan-600 decoration-2 hover:decoration-4">Upload datasource</li>
                    <li onClick={() => embedref.current?.scrollIntoView({behavior: "auto", block: "start"})} className=" cursor-pointer underline decoration-cyan-600 decoration-2 hover:decoration-4">Add to your website</li>
                </ul>
            </div>
        </div>

        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-12 sm:py-[60px] sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0" ref={createref}>
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                <h2 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Create Chatbot
                </h2>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl" suppressHydrationWarning={true} >
                <p className=" px-2 pb-2 ">Goto <i>Chatbots</i> tab and click on <i>Create New Chatbot</i> button. After that enter <i>Name</i> for the chatbot and click <i>Continue</i></p>
                <img src="/lib/image/docs/chatbotlist.png" width="100%" height="auto" alt="visibility" className=" border border-[#00ffff]" /> 
                <img src="/lib/image/docs/chatbotnew.png" width="100%" height="auto" alt="visibility" className=" border border-[#00ffff] mt-2" /> 
            </div>
        </div>

        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-12 sm:py-[60px] sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0" ref={appearanceref}>
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                <h2 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Adjust chatbot appearance
                </h2>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl" suppressHydrationWarning={true} >
                {/* <ReactPlayer url="/lib/vids/CA-Appearance1.mp4" loop={true} controls={true} width="100%" height="auto" wrapper={undefined} suppressHydrationWarning={true} style={{border: "1px solid #00ffff"}}/> */}
                <ReactPlayer url="https://youtu.be/AC7in2dAyn4" loop={true} controls={true} width="auto" wrapper={undefined} suppressHydrationWarning={true} style={{border: "1px solid #00ffff"}}/>
                
                <h3 className=" p-2 sm:text-3xl text-xl ">You can change following attributes of the chatbot's appearance to match the style of your website</h3>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">Name</h4>
                <p className=" px-2 pb-2 ">You can change the display name of the chatbot.</p>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">Initial Messages</h4>
                <p className=" px-2 pb-2 ">These are the messages that a user will see on opening the chatbot. These messages will also be shown over the chat bubble after 5 secs.</p>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">Frequent Queries</h4>
                <p className=" px-2 pb-2 ">You can set the freuently asked questions for your website visitors.</p>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">Theme</h4>
                <p className=" px-2 pb-2 ">You can select the theme of the chatbot; Light ot Dark.</p>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">Chat bubble position</h4>
                <p className=" px-2 pb-2 ">You can select the position of the chatbubble to be displayed on your website: Bottom-rRght or Bottom-Left</p>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">Chat bubble message</h4>
                <p className=" px-2 pb-2 ">You can set the message displayed on the chat bubble.</p>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">User message background and text colors</h4>
                <p className=" px-2 pb-2 ">You can change the color for the text and background of the user chat message to match ypur brand colors.</p>
            </div>
        </div>

        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-12 sm:py-[60px] sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0" ref={datasourceref}>
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                <h2 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Upload data source
                </h2>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl" suppressHydrationWarning={true} >
                {/* <ReactPlayer url="/lib/vids/CA-Datasource.mp4" loop={true} controls={true} width="100%" height="auto" wrapper={undefined} suppressHydrationWarning={true} style={{border: "1px solid #00ffff"}}/> */}
                <ReactPlayer url="https://youtu.be/geRmockFCtg" loop={true} controls={true} width="auto" wrapper={undefined} suppressHydrationWarning={true} style={{border: "1px solid #00ffff"}}/>
                <h3 className=" p-2 sm:text-3xl text-xl ">This is the data that chatbot will use to respond to the visitor's queries.</h3>
                <p className=" px-2 pb-2 ">This is heart of your chabot. <i>Quality of data uploaded as data source will directly impact the accuracy of the chatbot responses.</i></p>
                <p className=" px-2 pb-2 ">You can upload data sources using following options:</p>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">Upload File</h4>
                <p className=" px-2 pb-2 ">You can upload PDFs/Word Docs/Plain Text files with this option.</p>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">Upload from website</h4>
                <p className=" px-2 pb-2 ">This option allows you to upload data from websites. You can mention multiple website adresses separated by comma.</p>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">Upload Q & A</h4>
                <p className=" px-2 pb-2 ">You can set the Q & A as the datasource. This comes in handy in making the chatbot responses accurate.</p>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">Uploaded data sources</h4>
                <p className=" px-2 pb-2 ">You can view/remove the data sources that you have added in this section.</p>
            </div>
        </div>

        <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-12 sm:py-[60px] sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0" ref={embedref}>
            <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                <h2 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
                    Add to your website
                </h2>
            </div>
            <div className=" mt-1 text-lg text-white sm:text-2xl" suppressHydrationWarning={true} >
                <h3 className=" p-2 sm:text-3xl text-xl ">You can add the chatbot using following steps:</h3>
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">Make the chatbot Public</h4>
                <p className=" px-2 pb-2 ">Goto <i>Settings</i> of your chatbot and set <i>Visibility</i> to <i>Public.</i></p>
                <img src="/lib/image/docs/visibility.png" width="100%" height="auto" alt="visibility" className=" border border-[#00ffff]" /> 
                <h4 className=" p-2 pb-0 font-bold text-cyan-600 ">Add to your website</h4>
                <p className=" px-2 pb-2 ">Goto Embed section og chatbot and copy the relevant script. Add this script to the html of your website page.</p>
                <img src="/lib/image/docs/embed.png" width="100%" height="auto" alt="embed" className=" border border-[#00ffff]" />
            </div>
        </div>
    </section>
  ;
}
