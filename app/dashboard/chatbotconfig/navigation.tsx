'use client'

import Link from 'next/link';
import s from './UserNavigation.module.css';

export default function UserNavigation({activeTab, setTab}: any) {
    return(
        <nav className={s.root}>
            <a href="#skip" className="sr-only focus:not-sr-only">
                Skip to content
            </a>
            <div className="max-w-6xl px-6 mx-auto">
                <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
                    <div className="flex items-center justify-center flex-1 gap-8 w-full">
                        <Link className={s.link} href="/dashboard">
                            Back
                        </Link>
                        <div className={`${s.link} ${activeTab=="config"?" !text-pink-500 ":""}`} onClick={() => setTab("config")}>
                            Chatbot Config
                        </div>
                        <div className={`${s.link} ${activeTab=="data"?" !text-pink-500 ":""}`} onClick={() => setTab("data")}>
                            Data Sources
                        </div>
                        <div className={`${s.link} ${activeTab=="leads"?" !text-pink-500 ":""}`} onClick={() => setTab("leads")}>
                            Leads
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}