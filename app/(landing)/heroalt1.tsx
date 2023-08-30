'use client'

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactPlayer from "react-player/lazy";

export default function Hero({session}: any) {
    const { push } = useRouter();
    const stage = process.env.NEXT_PUBLIC_DEV_STAGE;
    const checksvg = <svg className="h-6 w-6 flex-none  stroke-[#00ffff] stroke-2" strokeLinecap="round" strokeLinejoin="round">
        {/* <circle cx="12" cy="12" r="11" /> */}
        <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
    </svg>

    const buttons = session?
        <Button variant="slim" type="button" onClick={() => push('/pricing')}
        className="relative block w-full !py-2 lg:!py-4 !rounded-full text-xl lg:text-3xl font-semibold text-center !leading-tight text-white bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300  hover:from-cyan-300 hover:to-cyan-600 hover:via-cyan-400 transition-all duration-300 !border-black" >
            {stage == "cs"?"Coming Soon!":"Subscribe Now!"}
        </Button>:
        <Button variant="slim" type="button" onClick={() => signIn()}
        className="block w-full !py-2 lg:!py-4 !rounded-full text-xl lg:text-3xl font-semibold text-center !leading-tight text-white bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300  hover:from-cyan-300 hover:to-cyan-600 hover:via-cyan-400 transition-all duration-300 !border-black" >
            {stage == "cs"?"Coming Soon!":"Sign up free"}
        </Button>;

    function signIn() {
        if(stage != "cs") push("/signin?view=sign_up");
        else alert("We are launching soon!");
    }

    return <>
        <style jsx>
        {`
            .floatingl { 
                animation-name: floatingl;
                animation-duration: 3s;
                animation-iteration-count: infinite;
                animation-timing-function: ease-in-out;
            
            }
            
            @keyframes floatingl {
                0% { transform: translate(0,  0px); }
                50%  { transform: translate(15px, -15px); }
                100%   { transform: translate(0, -0px); }   
            }

            .floatingr { 
                animation-name: floatingr;
                animation-duration: 3s;
                animation-iteration-count: infinite;
                animation-timing-function: ease-in-out;
            
            }
            
            @keyframes floatingr {
                0% { transform: translate(0,  0px); }
                50%  { transform: translate(-15px, -15px); }
                100%   { transform: translate(0, -0px); }   
            }

            @keyframes shine { 
                20%, 100% { transform: translateX(150%); }
            }

            .shine {
                position: absolute;
                top: 0; left: 0;
                width: 100%;
                height: 100%;
                color: rgba(255, 255, 255, 0);
                background-color: rgba(255, 255, 255,0);
                background-image: linear-gradient(
                    to right,
                    rgba(255, 255, 255, 0) 25%,
                    rgba(255, 255, 255, .5) 50%,
                    rgba(255, 255, 255, 0) 75%
                );
                transform: skewX(-20deg) translateX(-100%);
                animation: 3s linear 0s infinite forwards shine;
            }
        `}
        </style>
        <section className="dark:bg-black bg-black flex flex-col overflow-hidden relative ">{/** className="dark:bg-black bg-zinc-200 "  */}
            {/* <div className="relative flex w-full px-4 py-2 mx-auto sm:pt-6 sm:px-6 lg:px-8 justify-center bg-zinc-800 bg-opacity-40">
                <h1 className="text-4xl font-extrabold dark:text-white sm:text-center sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff]  to-[#00ffff] h-10 md:h-20 w-fit">
                    Cyan Arrow
                </h1>
            </div> */}
            {/* <Stars /> */}
            <div className=" fixed bottom-4 border-2 border-[#00ffff] rounded-t-full rounded-bl-full px-4 py-[9px] cursor-pointer z-[999999]
            text-lg font-semibold bg-zinc-900 right-[170px] md:right-auto md:left-5 text-[#00ffff] hover:scale-105 transition-transform duration-300" style={{borderBottomRightRadius: "2000px"}} >
                <Link href="https://calendly.com/anshulkumar-ca?background_color=27272a&text_color=ffffff&primary_color=00ffff" target="_blank" className="flex gap-4 items-center ">
                    Book a Demo
                    {/* <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 
                        1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"></path>
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"></path>
                    </svg> */}
                </Link>
            </div>
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 pb-10 sm:py-14 sm:px-6 lg:px-8 items-center justify-start sm:justify-center mt-10 sm:mt-0 min-h-[90vh]">
                <div className=" flex flex-col sm:flex-row w-full ">
                    <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto sm:w-[50%] " style={{fontWeight: ""}}>
                        <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                            Engage Visitors
                        </div>
                        <div className="w-full text-transparent bg-clip-text bg-gradient-to-r to-cyan-700 via-cyan-500 from-cyan-500 pb-3 ">
                            Get More Leads
                        </div>
                        <div className="w-full  text-lg font-semibold text-white sm:text-2xl  pb-2 pl-1">
                            Elevate your website with AI-powered chatbots, <br className=" hidden sm:block"/>finely tuned to your data,
                        </div>
                        <div className="w-full text-transparent bg-clip-text bg-gradient-to-r to-cyan-700 via-cyan-500 from-cyan-500 pb-3 ">
                            Easily without Code
                        </div>
                    </div>
                    <div className=" flex w-full sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl justify-center items-start sm:items-center rounded-sm overflow-hidden " >{/**"conic-gradient(cyan,blue,purple)" */}
                        {/* <img src="/lib/image/home/opening2.webp" alt="Opening" className="floatingr shadow-lg shadow-white antialiased h-[400px] sm:h-[700px]"/> */}
                        <ReactPlayer url="/lib/vids/caintro.mp4" loop={true} controls={true} width="100%" height="auto" suppressHydrationWarning={true}/>
                    </div>
                </div>
                <div className="relative flex max-w-[80rem] mt-2 w-full px-4 flex-col mx-auto gap-1  items-center justify-center h-[20vh] ">
                    {buttons}
                    <div className="flex justify-center lg:gap-8 gap-4 w-full text-sm lg:text-lg items-center">
                        <div className=" flex gap-2 items-center justify-center ">{checksvg} <>Free 7-day trial!</></div>
                        <div className=" flex gap-2 items-center justify-center ">{checksvg} <>No credit card required</></div>
                    </div>
                </div>
            </div>
            {/* <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0 ">
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        Try Me
                    </div>
                </div>
                <div className="flex flex-col w-full items-center justify-center p-2 h-auto border border-[#00ffff] rounded-sm " style={{fontWeight: ""}}>
                    <iframe src="https://www.cyanarrow.com/supportagent/e2bf4ca8-f931-48c9-8886-701eda3434e7?i=1" width="100%" height="650px"></iframe>
                </div>
            </div> */}
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col-reverse md:flex-row mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0 ">
                <div className=" flex w-full sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl justify-center items-center" style={{transform: "rotate3d(1, 1, -0.3, 30deg)", background: "radial-gradient(transparent, #00ffff, transparent, transparent)"}}>
                    <img src="/lib/image/home/leads2.JPG" alt="Opening" className="floatingl shadow-lg shadow-white antialiased h-[400px] sm:h-[700px]"/>
                </div>
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto sm:w-[50%] " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        Turn Conversations Into High-Quality Leads<br/>
                    </div>
                    <div className="w-full mt-1 text-lg font-semibold text-white sm:text-2xl">
                        Capture essential contact information seamlessly. Watch your contact list grow as you foster meaningful relationships through personalized communication.
                    </div>
                </div>
            </div>


            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto sm:w-[50%] " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        Increase your Conversion Rates<br/>
                    </div>
                    <div className="w-full mt-1 text-lg font-semibold text-white sm:text-2xl">
                        Get visitor insights to optimize your website, content, and offerings. Tailor your strategies to what truly resonates with your audience.
                    </div>
                </div>
                <div className=" flex w-full sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl justify-center items-center" style={{transform: "rotate3d(-1, 1, 0.3, 30deg)", background: "radial-gradient(transparent, #00ffff, transparent, transparent)"}}>
                    {/* <img src="/lib/image/home/notice.JPG" alt="Opening" className=" shadow-lg shadow-white antialiased  w-[65%] sm:w-auto sm:h-[500px] "/> */}
                    <div className="floatingr relative flex shadow-lg shadow-white antialiased  w-[65%] sm:w-[70%] sm:h-[500px] bg-black">
                        <div className=" flex w-full h-full items-center justify-center ">
                            {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg"><polygon fill="#3F51B5" points="42,37 6,37 6,25 16,10 30,17 42,6"></polygon><polygon fill="#00BCD4" points="42,42 6,42 6,32 16,24 30,26 42,17"></polygon></svg> */}
                            <svg stroke="currentColor" fill="#00f1bb" strokeWidth="0" viewBox="0 0 1024 1024" height="80%" width="80%" xmlns="http://www.w3.org/2000/svg">
                                <path d="M336.7 586h350.6l84.9-148H251.8zm543.4-432H143.9c-24.5 0-39.8 26.7-27.5 48L215 374h594l98.7-172c12.2-21.3-3.1-48-27.6-48zM349 838c0 17.7 14.2 32 
                                31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V650H349v188z"></path>
                            </svg>
                        </div>
                        <div className=" absolute top-0 left-0 w-[50%] ">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#00BCD4" d="M24,30c-3.3,0-6-2.7-6-6s2.7-6,6-6V5C13.5,5,5,13.5,5,24s8.5,19,19,19c4.4,0,8.5-1.5,11.8-4.1l-8-10.2 C26.7,29.5,25.4,30,24,30z"></path>
                                <path fill="#448AFF" d="M30,24h13c0-10.5-8.5-19-19-19v13C27.3,18,30,20.7,30,24z"></path>
                                <path fill="#3F51B5" d="M43,24H30c0,1.9-0.9,3.6-2.3,4.7l8,10.2C40.2,35.4,43,30,43,24z"></path>
                            </svg>
                        </div>
                        <div className=" absolute bottom-0 right-0 w-[50%] ">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                                <polygon fill="#CFD8DC" points="35,36 39,36 39,22 26,22 26,13 22,13 22,22 9,22 9,36 13,36 13,26 22,26 22,36 26,36 26,26 35,26"></polygon>
                                <rect x="17" y="6" fill="#3F51B5" width="14" height="10"></rect>
                                <rect x="32" y="32" fill="#00BCD4" width="10" height="10"></rect>
                                <rect x="6" y="32" fill="#00BCD4" width="10" height="10"></rect>
                                <rect x="19" y="32" fill="#00BCD4" width="10" height="10"></rect>
                            </svg>
                        </div>
                        <div className=" absolute bottom-5 sm:bottom-20 left-0 w-[30%] ">
                            <svg stroke="currentColor" fill="#00ffff" strokeWidth="0" viewBox="0 0 24 24" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.54 2.2 2.86 3.16 4.4.47.75.81 1.45 1.17 2.26.26.55.47 1.5 
                                1.26 1.5s1-.95 1.25-1.5c.37-.81.7-1.51 1.17-2.26.96-1.53 2.21-2.85 3.16-4.4C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7zm0 9.75a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col-reverse md:flex-row mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className=" flex w-full sm:w-[50%] mt-1 font-semibold text-white sm:text-2xl justify-center items-center" style={{transform: "rotate3d(1, 1, -0.3, 30deg)", background: "radial-gradient(transparent, #00ffff, transparent, transparent)"}}>
                    <img src="/lib/image/home/bubbles.webp" alt="Opening" className="floatingl shadow-lg shadow-white antialiased  w-[65%] sm:w-auto sm:h-auto "/>
                </div>
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl sm:w-[50%] " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        Get your own Support Agent Working 24x7<br/>
                    </div>
                </div>
            </div>
            
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                {buttons}
                <div className="flex justify-center lg:gap-8 gap-4 w-full text-sm lg:text-lg items-center">
                    <div className=" flex gap-2 items-center justify-center ">{checksvg} <>Free 7-day trial!</></div>
                    <div className=" flex gap-2 items-center justify-center ">{checksvg} <>No credit card required</></div>
                </div>
            </div>
        </section>
        {/**Integrations */}
        <section className="dark:bg-black bg-black flex flex-col overflow-hidden relative items-center justify-center  min-h-[90vh] ">{/** className="dark:bg-black bg-zinc-200 "  */}
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-0 sm:pb-6 sm:py-14 sm:px-6 lg:px-8 items-center justify-center mt-10 ">
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        Connect with your favorite platforms
                    </div>
                </div>
            </div>

            <div className="relative flex max-w-[80rem] gap-10 md:gap-[150px] w-full px-4 flex-col md:flex-row mx-auto pb-5 sm:px-6 lg:px-8 items-center justify-center mt-6 sm:mt-0 md:pt-28">
                <div className=" ">
                    <svg viewBox="0 0 87 30" fill="none" xmlns="http://www.w3.org/2000/svg" className=" h-20 ">
                        <path d="M1.805 1.294l16.6-1.226c2.039-.175 2.563-.057 3.845.875l5.299 3.733c.874.642 1.165.817 1.165 1.516v20.473c0 1.283-.466 2.042-2.097 2.158L7.34 
                        29.99c-1.224.058-1.807-.117-2.448-.934L.99 23.982c-.7-.934-.99-1.633-.99-2.45V3.334c0-1.049.466-1.924 1.805-2.04z" fill="#000"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.405.068l-16.6 1.226C.466 1.41 0 2.285 0 3.334v18.198c0 .817.29 1.516.99 2.45l3.902 5.074c.641.817 1.224.992 
                        2.448.934l19.277-1.167c1.63-.116 2.097-.875 2.097-2.158V6.192c0-.663-.262-.854-1.033-1.42a85.473 85.473 0 01-.133-.096L22.25.943c-1.282-.932-1.806-1.05-3.845-.875zM7.776 
                        5.857c-1.574.106-1.931.13-2.825-.597L2.678 3.452c-.231-.234-.115-.526.467-.584l15.958-1.166c1.34-.117 2.038.35 2.562.758l2.737 1.983c.117.059.408.408.058.408l-16.48.992-.204.014zM5.941 
                        26.49V9.11c0-.759.233-1.109.931-1.168L25.8 6.834c.642-.058.932.35.932 1.108v17.264c0 .759-.117 1.401-1.165 1.459l-18.113 1.05c-1.048.058-1.513-.291-1.513-1.225zm17.88-16.448c.116.525 
                        0 1.05-.525 1.11l-.873.173v12.832c-.758.408-1.456.641-2.039.641-.932 0-1.165-.292-1.863-1.166l-5.709-8.982v8.69l1.806.409s0 
                        1.05-1.457 1.05l-4.017.233c-.117-.234 0-.817.407-.933l1.049-.291v-11.49L9.144 12.2c-.117-.525.174-1.283.99-1.342l4.31-.29 5.94 
                        9.098v-8.049l-1.514-.174c-.117-.643.349-1.11.931-1.167l4.02-.234z" fill="#fff"></path>
                        <path  d="M41.434 21.251v-7.91h.137l5.704 7.91h1.796V9.627h-1.997v7.902h-.137l-5.704-7.902H39.43V21.25h2.005zM54.715 21.429c2.635 0 4.238-1.724 4.238-4.584 
                        0-2.852-1.611-4.584-4.238-4.584-2.618 0-4.237 1.74-4.237 4.584 0 2.86 1.595 4.584 4.237 4.584zm0-1.676c-1.393 0-2.19-1.063-2.19-2.908 0-1.837.797-2.908 2.19-2.908 
                        1.386 0 2.183 1.071 2.183 2.908 0 1.845-.789 2.908-2.183 2.908zM60.778 10.28v2.215h-1.393v1.595h1.393v4.809c0 1.708.806 2.393 2.828 2.393.386 0 .757-.04 
                        1.047-.097v-1.563c-.242.024-.395.04-.677.04-.837 0-1.208-.386-1.208-1.256V14.09h1.885v-1.595h-1.885v-2.216h-1.99zM65.85 21.251h1.99v-8.813h-1.99v8.813zm.991-10.27c.66 0 1.192-.533 
                        1.192-1.201 0-.669-.531-1.209-1.192-1.209-.652 0-1.192.54-1.192 1.209 0 .668.54 1.2 1.192 1.2zM73.299 21.429c2.634 0 4.237-1.724 4.237-4.584 0-2.852-1.611-4.584-4.237-4.584-2.619 
                        0-4.238 1.74-4.238 4.584 0 2.86 1.595 4.584 4.238 4.584zm0-1.676c-1.394 0-2.192-1.063-2.192-2.908 0-1.837.798-2.908 2.192-2.908 1.385 0 2.183 1.071 2.183 2.908 0 1.845-.79 2.908-2.183 
                        2.908zM78.725 21.251h1.998V16.12c0-1.297.75-2.119 1.941-2.119 1.217 0 1.78.677 1.78 2.022v5.228h1.999v-5.703c0-2.103-1.072-3.287-3.037-3.287-1.314 0-2.2.604-2.619 
                        1.587h-.137v-1.41h-1.925v8.813z" fill="#fff"></path>
                    </svg>
                </div>
                <div>
                    <svg width="230" height="70" viewBox="0 0 244 66" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M57.1877 45.2253L57.1534 45.1166L78.809 25.2914V15.7391H44.0663V25.2914H64.8181L64.8524 25.3829L43.4084 45.2253V54.7775H79.1579V45.2253H57.1877Z" fill="#fff"></path>
                        <path d="M100.487 14.8297C96.4797 14.8297 93.2136 15.434 90.6892 16.6429C88.3376 17.6963 86.3568 19.4321 85.0036 21.6249C83.7091 23.8321 82.8962 26.2883 82.6184 28.832L93.1602 
                        30.3135C93.5415 28.0674 94.3042 26.4754 95.4482 25.5373C96.7486 24.5562 98.3511 24.0605 99.9783 24.136C102.118 24.136 103.67 24.7079 104.634 25.8519C105.59 26.9959 106.076 28.5803 
                        106.076 30.6681V31.7091H95.9401C90.7807 31.7091 87.0742 32.8531 84.8206 35.1411C82.5669 37.429 81.442 40.4492 81.4458 44.2014C81.4458 48.0452 82.5707 50.9052 84.8206 52.7813C87.0704 
                        54.6574 89.8999 55.5897 93.3089 55.5783C97.5379 55.5783 100.791 54.1235 103.067 51.214C104.412 49.426 105.372 47.3793 105.887 45.2024H106.27L107.723 54.7546H117.275V30.5651C117.275 
                        25.5659 115.958 21.6936 113.323 18.948C110.688 16.2024 106.409 14.8297 100.487 14.8297ZM103.828 44.6475C102.312 45.9116 100.327 46.5408 97.8562 46.5408C95.8199 46.5408 94.4052 46.1843 
                        93.6121 45.4712C93.2256 45.1338 92.9182 44.7155 92.7116 44.246C92.505 43.7764 92.4043 43.2671 92.4166 42.7543C92.3941 42.2706 92.4702 41.7874 92.6403 41.3341C92.8104 40.8808 93.071 
                        40.4668 93.4062 40.1174C93.7687 39.7774 94.1964 39.5145 94.6633 39.3444C95.1303 39.1743 95.6269 39.1006 96.1231 39.1278H106.093V39.7856C106.113 40.7154 105.919 41.6374 105.527 
                        42.4804C105.134 43.3234 104.553 44.0649 103.828 44.6475Z" fill="#fff"></path>
                        <path d="M175.035 15.7391H163.75V54.7833H175.035V15.7391Z" fill="#fff"></path>
                        <path d="M241.666 15.7391C238.478 15.7391 235.965 16.864 234.127 19.1139C232.808 20.7307 231.805 23.1197 231.119 26.2809H230.787L229.311 
                        15.7391H219.673V54.7775H230.959V34.7578C230.959 32.2335 231.55 30.2982 232.732 28.9521C233.914 27.606 236.095 26.933 239.275 26.933H243.559V15.7391H241.666Z" fill="#fff"></path>
                        <path d="M208.473 17.0147C205.839 15.4474 202.515 14.6657 198.504 14.6695C192.189 14.6695 187.247 16.4675 183.678 20.0634C180.108 23.6593 178.324 28.6166 178.324 34.9352C178.233 
                        38.7553 179.067 42.5407 180.755 45.9689C182.3 49.0238 184.706 51.5592 187.676 53.2618C190.665 54.9892 194.221 55.8548 198.344 55.8586C201.909 55.8586 204.887 55.3095 207.278 
                        54.2113C209.526 53.225 211.483 51.6791 212.964 49.7211C214.373 47.7991 215.42 45.6359 216.052 43.3377L206.329 40.615C205.919 42.1094 205.131 43.4728 204.041 44.5732C202.942 
                        45.6714 201.102 46.2206 198.521 46.2206C195.451 46.2206 193.163 45.3416 191.657 43.5837C190.564 42.3139 189.878 40.5006 189.575 38.1498H216.201C216.31 37.0515 216.367 36.1306 
                        216.367 35.387V32.9561C216.431 29.6903 215.757 26.4522 214.394 23.4839C213.118 20.7799 211.054 18.5248 208.473 17.0147ZM198.178 23.9758C202.754 23.9758 205.348 26.2275 205.962 
                        30.731H189.775C190.032 29.2284 190.655 27.8121 191.588 26.607C193.072 24.8491 195.268 23.972 198.178 23.9758Z" fill="#fff"></path>
                        <path d="M169.515 0.00366253C168.666 -0.0252113 167.82 0.116874 167.027 0.421484C166.234 0.726094 165.511 1.187 164.899 1.77682C164.297 2.3723 163.824 
                        3.08658 163.512 3.87431C163.2 4.66204 163.055 5.50601 163.086 6.35275C163.056 7.20497 163.201 8.05433 163.514 8.84781C163.826 9.64129 164.299 10.3619 164.902 
                        10.9646C165.505 11.5673 166.226 12.0392 167.02 12.3509C167.814 12.6626 168.663 12.8074 169.515 12.7762C170.362 12.8082 171.206 12.6635 171.994 12.3514C172.782 
                        12.0392 173.496 11.5664 174.091 10.963C174.682 10.3534 175.142 9.63077 175.446 8.83849C175.75 8.04621 175.89 7.20067 175.859 6.35275C175.898 5.50985 175.761 4.66806 
                        175.456 3.88115C175.151 3.09424 174.686 2.37951 174.09 1.78258C173.493 1.18565 172.779 0.719644 171.992 0.414327C171.206 0.109011 170.364 -0.0288946 169.521 0.00938803L169.515 
                        0.00366253Z" fill="#fff"></path>
                        <path d="M146.201 14.6695C142.357 14.6695 139.268 15.8764 136.935 18.2902C135.207 20.0786 133.939 22.7479 133.131 26.2981H132.771L131.295 
                        15.7563H121.657V66H132.942V45.3054H133.354C133.698 46.6852 134.181 48.0267 134.795 49.3093C135.75 51.3986 137.316 53.1496 139.286 54.3314C141.328 55.446 143.629 56.0005 145.955 
                        55.9387C150.68 55.9387 154.277 54.0988 156.748 50.419C159.219 46.7392 160.455 41.6046 160.455 35.0153C160.455 28.6509 159.259 23.6689 156.869 20.0691C154.478 16.4694 150.922 14.6695 
                        146.201 14.6695ZM147.345 42.9602C146.029 44.8668 143.97 45.8201 141.167 45.8201C140.012 45.8735 138.86 45.6507 137.808 45.1703C136.755 44.6898 135.832 43.9656 135.116 43.0574C133.655 
                        41.2233 132.927 38.7122 132.931 35.5243V34.7807C132.931 31.5432 133.659 29.0646 135.116 27.3448C136.572 25.625 138.59 24.7747 141.167 24.7937C144.02 24.7937 146.092 25.6994 147.385 
                        27.5107C148.678 29.322 149.324 31.8483 149.324 35.0896C149.332 38.4414 148.676 41.065 147.356 42.9602H147.345Z" fill="#fff"></path>
                        <path d="M39.0441 45.2253H0V54.789H39.0441V45.2253Z" fill="#FF4F00"></path>
                    </svg>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 608 173.7" className=" h-20 ">
                        <title>Shopify</title>
                        <path fill="#95BF47" d="M130.7 32.9c-.1-.9-.9-1.3-1.5-1.4-.6-.1-12.6-.2-12.6-.2s-10.1-9.8-11.1-10.8-2.9-.7-3.7-.5c0 0-1.9.6-5.1 
                        1.6-.5-1.7-1.3-3.8-2.4-5.9-3.6-6.9-8.8-10.5-15.2-10.5-.4 0-.9 0-1.3.1-.2-.2-.4-.4-.6-.7-2.8-3-6.3-4.4-10.5-4.3-8.2.2-16.3 6.1-23 
                        16.7-4.7 7.4-8.2 16.7-9.2 23.9-9.4 2.9-16 4.9-16.1 5-4.7 1.5-4.9 1.6-5.5 6.1C12.4 55.3 0 151.4 0 151.4l104.1 18 45.1-11.2S130.8 
                        33.7 130.7 32.9zm-39.2-9.7c-2.4.7-5.1 1.6-8.1 2.5-.1-4.1-.6-9.9-2.5-14.9 6.3 1.2 9.3 8.2 10.6 12.4zM78 27.4c-5.5 1.7-11.4 3.5-17.4 
                        5.4 1.7-6.4 4.9-12.8 8.8-17 1.5-1.6 3.5-3.3 5.9-4.3 2.3 4.7 2.7 11.4 2.7 15.9zM66.8 5.8c1.9 0 3.5.4 4.9 1.3-2.2 1.1-4.4 2.8-6.4 5-5.2 
                        5.6-9.2 14.2-10.8 22.6-5 1.5-9.8 3-14.3 4.4 3-13.2 14-32.9 26.6-33.3z"></path>
                        <path fill="#5E8E3E" d="M129.2 31.5c-.6-.1-12.6-.2-12.6-.2s-10.1-9.8-11.1-10.8c-.4-.4-.9-.6-1.4-.6v149.5l45.1-11.2S130.8 33.8 130.7 32.9c-.2-.9-.9-1.3-1.5-1.4z"></path>
                        <path fill="#FFF" d="M79.1 54.7l-5.2 19.6s-5.8-2.7-12.8-2.2c-10.2.6-10.3 7-10.2 8.7.6 8.8 23.6 10.7 24.9 31.2 1 
                        16.2-8.6 27.2-22.4 28.1-16.6 1-25.7-8.7-25.7-8.7l3.5-14.9s9.2 6.9 16.5 6.5c4.8-.3 6.5-4.2 6.3-7-.7-11.4-19.5-10.8-20.7-29.5-1-15.8 
                        9.4-31.8 32.3-33.3 9-.8 13.5 1.5 13.5 1.5z"></path>
                        <path fill="#FFF" d="M210.3 96.5c-5.2-2.8-7.9-5.2-7.9-8.5 0-4.2 3.7-6.9 9.6-6.9 6.8 0 12.8 2.8 12.8 2.8l4.8-14.6s-4.4-3.4-17.3-3.4c-18 0-30.5 
                        10.3-30.5 24.8 0 8.2 5.8 14.5 13.6 19 6.3 3.6 8.5 6.1 8.5 9.9 0 3.9-3.1 7-9 7-8.7 0-16.9-4.5-16.9-4.5l-5.1 14.6s7.6 5.1 20.3 5.1c18.5 0 
                        31.8-9.1 31.8-25.5.1-8.9-6.6-15.2-14.7-19.8zm73.8-30.8c-9.1 0-16.3 4.3-21.8 10.9l-.3-.1 7.9-41.4h-20.6l-20 105.3h20.6l6.9-36c2.7-13.6 
                        9.7-22 16.3-22 4.6 0 6.4 3.1 6.4 7.6 0 2.8-.3 6.3-.9 9.1l-7.8 41.2h20.6l8.1-42.6c.9-4.5 1.5-9.9 1.5-13.4 0-11.5-6.2-18.6-16.9-18.6zm63.5 
                        0c-24.8 0-41.2 22.4-41.2 47.4 0 16 9.9 28.8 28.4 28.8 24.3 0 40.8-21.8 40.8-47.4-.1-14.7-8.8-28.8-28-28.8zm-10.2 60.4c-7 0-10-6-10-13.4 0-11.8 6.1-31.1 17.3-31.1 
                        7.3 0 9.7 6.3 9.7 12.4 0 12.7-6.1 32.1-17 32.1zm90.8-60.4c-13.9 0-21.8 12.2-21.8 12.2h-.3l1.2-11.1h-18.2c-.9 7.5-2.5 18.8-4.2 27.3l-14.3 75.4h20.6l5.7-30.5h.4s4.2 
                        2.7 12.1 2.7c24.2 0 40-24.8 40-49.9.1-13.7-6.1-26.1-21.2-26.1zm-19.7 60.7c-5.4 0-8.5-3-8.5-3l3.4-19.3c2.4-12.8 9.1-21.4 16.3-21.4 6.3 0 8.2 5.8 8.2 11.4 0 13.3-7.9 
                        32.3-19.4 32.3zm70.4-90.2c-6.6 0-11.8 5.2-11.8 12 0 6.1 3.9 10.3 9.7 10.3h.3c6.4 0 12-4.3 12.1-12 0-6-4-10.3-10.3-10.3zm-28.8 104.2h20.6l14-73h-20.8zm87-73.2h-14.3l.7-3.4c1.2-7 
                        5.4-13.3 12.2-13.3 3.7 0 6.6 1 6.6 1l4-16.1s-3.6-1.8-11.2-1.8c-7.3 0-14.6 2.1-20.2 6.9-7 6-10.3 14.6-12 23.3l-.6 3.4h-9.6l-3 15.5h9.6l-10.9 57.7H509l10.9-57.7h14.2l3-15.5zm49.6.2s-12.9 
                        32.5-18.7 50.2h-.3c-.4-5.7-5.1-50.2-5.1-50.2H541l12.4 67.1c.3 1.5.1 2.4-.4 3.4-2.4 4.6-6.4 9.1-11.2 12.4-3.9 2.8-8.2 4.6-11.7 5.8l5.7 17.5c4.2-.9 12.8-4.3 20.2-11.2 9.4-8.8 
                        18.1-22.4 27-40.9l25.2-54.1h-21.5z"></path>
                    </svg>
                </div>
            </div>

            <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                {buttons}
                <div className="flex justify-center lg:gap-8 gap-4 w-full text-sm lg:text-lg items-center">
                    <div className=" flex gap-2 items-center justify-center ">{checksvg} <>Free 7-day trial!</></div>
                    <div className=" flex gap-2 items-center justify-center ">{checksvg} <>No credit card required</></div>
                </div>
            </div>
        </section>
        {/**Features */}
        <section className="dark:bg-black bg-black flex flex-col overflow-hidden relative min-h-[90vh] ">{/** className="dark:bg-black bg-zinc-200 "  */}
            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-0 sm:pb-6 sm:py-14 sm:px-6 lg:px-8 items-center justify-center mt-10 ">
                <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
                    <div className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3 ">
                        Packed with essential Features
                    </div>
                </div>
            </div>

            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-5 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-full sm:w-[50%] " style={{fontWeight: ""}}>
                    <Card title="AI Powered" description="Keeps visitor engaged. More than 95% response accuracy." />
                </div>
                <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-full sm:w-[50%] " style={{fontWeight: ""}}>
                    <Card title="Tailored" description="Chatbot trained on your data. Accurate and Effective responses." />
                </div>
            </div>

            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-5 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-full sm:w-[50%] " style={{fontWeight: ""}}>
                    <Card title="Data Analysis" description="Analyse Conversations & Leads inside the app to get more insights." />
                </div>
                <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl sm:w-[50%] " style={{fontWeight: ""}}>
                    <Card title="Export Data" description="Export your Leads and Conversations." />
                </div>
            </div>

            <div className="relative flex max-w-[80rem] w-full px-4 flex-col md:flex-row mx-auto gap-4 pb-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-full sm:w-[50%] " style={{fontWeight: ""}}>
                    <Card title="Notifications" description="Sends out notification as soon as a lead is captured." />
                </div>
                <div className="sm:flex flex-col text-2xl sm:text-4xl items-center justify-center p-2 rounded-xl h-full sm:w-[50%] " style={{fontWeight: ""}}>
                    <Card title="Super Quick Setup" description="Lightning fast setup. Get your chatbot running in minutes." />
                </div>
            </div>

            <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 pb-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                {buttons}
                <div className="flex justify-center lg:gap-8 gap-4 w-full text-sm lg:text-lg items-center">
                    <div className=" flex gap-2 items-center justify-center ">{checksvg} <>Free 7-day trial!</></div>
                    <div className=" flex gap-2 items-center justify-center ">{checksvg} <>No credit card required</></div>
                </div>
            </div>
        </section>
        {/**FAQs */}
        <section className="dark:bg-black bg-black flex flex-col overflow-hidden relative items-center justify-center min-h-[90vh] ">{/** className="dark:bg-black bg-zinc-200 "  */}
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

            <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-10 sm:px-6 lg:px-8 items-center justify-center sm:mt-0">
                {buttons}
                <div className="flex justify-center lg:gap-8 gap-4 w-full text-sm lg:text-lg items-center">
                    <div className=" flex gap-2 items-center justify-center ">{checksvg} <>Free 7-day trial!</></div>
                    <div className=" flex gap-2 items-center justify-center ">{checksvg} <>No credit card required</></div>
                </div>
            </div>
        </section>
        
    </> 
}

function Card({ title, description, footer, children }: any) {
    return (
        <div className="w-full max-w-3xl m-auto my-2 border rounded-md p border-zinc-700 sm:h-56 flex flex-col">
            <div className="px-5 py-4 h-full">
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