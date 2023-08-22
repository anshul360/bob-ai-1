'use client'

import Link from "next/link"


export default function Hamburger({s, currentPath}: any) {
    return <>
        {/* <div className="lg:hidden flex items-center">
            <button className="outline-none ">
                <svg className="w-10 h-10 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" viewBox="0 0 24 24" stroke="#00ffff" >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div> */}
        <div className=" space-x-2 lg:hidden ">
            {/* <ul className="">
                <li className="active"> */}
                    <Link href="/" className={`${s.link} ${currentPath==="/"?" !text-[#00ffff] !font-bold ": ""} `}>
                        Home
                    </Link>
                    <Link href="/pricing" className={`${s.link} ${currentPath==="/pricing"?" !text-[#00ffff] !font-bold ": ""} `}>
                        Pricing
                    </Link>
                {/* </li>
                <li> */}
                    <Link href="/docs" className={`${s.link} ${currentPath==="/docs"?" !text-[#00ffff] !font-bold ": ""} `}>
                        Docs
                    </Link>
                {/* </li>
            </ul> */}
        </div>
    </>
}