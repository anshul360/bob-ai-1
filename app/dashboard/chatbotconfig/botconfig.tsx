'use client'

import { useState } from "react";
import UserNavigation from "./navigation";
import Config from "./config";
import Datasource from "./datasource";
import Leads from "./leads";
import {useRouter} from "next/navigation";

export default function Botconfig({botId, subscription}: any) {
    const [ activeTab, setActiveTab ] = useState("config");
    const setTab = (tab: string) => {
        setActiveTab(tab);
    }

    return <>
        <div className=" flex w-full justify-center items-center flex-col gap-4 ">
            <UserNavigation activeTab={activeTab} setTab={setTab}/>
            {activeTab=="config" && <Config botId={botId}/>}
            {activeTab=="data" && <Datasource botId={botId} subscription={subscription}/>}
            {activeTab=="leads" && <Leads />}
        </div>
    </>
}