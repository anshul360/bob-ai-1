'use client'

import Link from "next/link"
import SignOutButton from "./SignOutButton"
import { useState } from "react";
import Image from 'next/image';


export default function Hamburger({s, currentPath, user}: any) {
    const [showmenu, setshowmenu] = useState(false);
    const launch = process.env.NEXT_PUBLIC_DEV_STAGE;
    return <>
        <div className="lg:hidden flex items-center">
            <button className="outline-none " onClick={() => setshowmenu(true)}>
                <svg className="w-10 h-10 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" viewBox="0 0 24 24" stroke="#00ffff" >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
        <div className={` absolute z-10 bg-black space-y-2 lg:hidden w-screen h-screen top-0 left-0 items-center justify-center ${showmenu?" visible ":" invisible "} `}>
            <div className=" absolute right-7 top-5 z-10" onClick={(e) => {
                    setshowmenu(false); e.stopPropagation(); console.log("clicked");
                }}>
                <svg stroke="#00ffff" fill="#00ffff" strokeWidth="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="#00ffff" strokeWidth="2" d="M3,3 L21,21 M3,21 L21,3"></path>
                </svg>
            </div>
            <div className=" absolute left-6 top-2 z-10" onClick={(e) => {
                    setshowmenu(false); e.stopPropagation(); console.log("clicked");
                }}>
                <div className=' flex w-10 h-10 justify-start items-start overflow-hidden '>
                    <Image src="/lib/image/b/CyanArrow_8b.svg" height={100} width={100} alt="Cyan Arrow"/>
              </div>
            </div>
            <ul className=" flex relative flex-col items-center pt-20">
                <li onClick={() => setshowmenu(false)}>
                    <Link href="/" className={`${s.link} ${currentPath==="/"?" !text-[#00ffff] !font-bold ": ""} `}>
                        Home
                    </Link>
                </li>
                <li onClick={() => setshowmenu(false)}>
                    <Link href="/pricing" className={`${s.link} ${currentPath==="/pricing"?" !text-[#00ffff] !font-bold ": ""} `}>
                        Pricing
                    </Link>
                </li>
                <li onClick={() => setshowmenu(false)}>
                    <Link href="/docs" className={`${s.link} ${currentPath==="/docs"?" !text-[#00ffff] !font-bold ": ""} `}>
                        Docs
                    </Link>
                </li>
                {user && (<>
                    <li onClick={() => setshowmenu(false)}>
                        <Link href="/chatbots" className={`${s.link} ${currentPath==="/chatbots"?" !text-[#00ffff] !font-bold ": ""} `}>
                            Chatbots
                        </Link>
                    </li>
                    <li onClick={() => setshowmenu(false)}>
                        <Link href="/leads" className={`${s.link} ${currentPath==="/leads"?" !text-[#00ffff] !font-bold ": ""} `}>
                            Leads
                        </Link>
                    </li>
                    <li onClick={() => setshowmenu(false)}>
                        <Link href="/conversations" className={`${s.link} ${currentPath==="/conversations"?" !text-[#00ffff] !font-bold ": ""} `}>
                            Conversations
                        </Link>
                    </li>
                    <li onClick={() => setshowmenu(false)}>
                        <Link href="/account" className={`${s.link} ${currentPath==="/account"?" !text-[#00ffff] !font-bold !underline !decoration-2 !underline-offset-8 ": ""} `}>
                            Account
                        </Link>
                    </li>
                </>)}
            </ul>
            <ul className=" flex relative flex-col items-center pt-20">
                {user ? (
                    <li>
                        <SignOutButton />
                    </li>
                    ) : (<>
                    <li onClick={() => setshowmenu(false)}>
                        <Link href="/signin?view=sign_up" className={`${s.link} bg-[#00ffff] !text-zinc-900 rounded-md !px-2 hover:!text-white hover:bg-zinc-900 hover:border hover:border-[#00ffff] transition-colors duration-300 `}>
                            Sign up
                        </Link>
                    </li>
                    <li onClick={() => setshowmenu(false)}>
                        {launch=="cs"?<></>:<Link href="/signin" className={s.link}>
                            Sign in
                        </Link>}
                    </li></>
                )}
            </ul>
        </div>
        {/* {user && (
                  <>
                    <Link href="/chatbots" className={`${s.link} ${currentPath==="/chatbots"?" !text-[#00ffff] !font-bold !underline !decoration-2 !underline-offset-8 ": ""} `}>
                      Chatbots
                    </Link>
                    <Link href="/leads" className={`${s.link} ${currentPath==="/leads"?" !text-[#00ffff] !font-bold !underline !decoration-2 !underline-offset-8 ": ""} `}>
                      Leads
                    </Link>
                    <Link href="/conversations" className={`${s.link} ${currentPath==="/conversations"?" !text-[#00ffff] !font-bold !underline !decoration-2 !underline-offset-8 ": ""} `}>
                      Conversations
                    </Link>
                  </>
                )}{user ? (
              <>
              <Link href="/account" className={`${s.link} ${currentPath==="/account"?" !text-[#00ffff] !font-bold !underline !decoration-2 !underline-offset-8 ": ""} `}>
                Account
              </Link><SignOutButton /></>
            ) : (
              launch=="cs"?<></>:<Link href="/signin" className={s.link}>
                Sign in
              </Link>
            )} */}
    </>
}