import { useEffect, useState } from "react";
import Pageload from "./loading";
import Button from "@/components/ui/Button";
import { getApikeysFromUser, saveApikeyToUser } from "../supabase-server";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Apikeygen({userId}: any) {
    const [ loadingpage, setloadingpage ] = useState(true);
    const [ saving, setsaving ] = useState(false);
    const [ keys, setkeys ]: any[] = useState([]);
    const [ keysj, setkeysj ]: any[] = useState([]);
    const [ newkey, setnewkey ] = useState("");
    const [ keyname, setkeyname ] = useState("New Key");
    const [ revkey, setrevkey ] = useState(-1);

    useEffect(() => {
        getApikeysFromUser(userId)
        .then((res) => {
            if(res.success) {
                setkeysj(res.data[0].api_keys);
            }
        }).catch(() => console.log)
        .finally(() => setloadingpage(false));
    }, []);

    useEffect(() => {
        let tempkeysjsx: any[] = [];
        keysj.map((key: any, i: number) => {
            tempkeysjsx.push(<div className=" flex w-full text-xl border-b " key={i}>
                <div className=" flex w-[30%] p-2 items-center justify-center  " key={i+"d"}>{key.name}</div>
                <div className=" flex w-[20%] p-2 items-center justify-center  " key={i+"a"}>{key.key.slice(0,5)+"..."+key.key.slice(-5)}</div>
                <div className=" flex w-[47%] p-2 items-center justify-center  " key={i+"c"}>{`${key.created_at}`}</div>
                <div className=" flex w-[3%] p-2 items-center justify-center cursor-pointer hover:text-red-700 " key={i+"b"}
                title="Revoke key" onClick={() => setrevkey(i)}>
                    <AiOutlineDelete  key={i}/>
                </div>
            </div>);
        });
        setkeys(tempkeysjsx);
    }, [keysj]);

    async function generateKey(){

        let k = await crypto.subtle.generateKey(
            {name: "AES-GCM", length: 256}, true, ["encrypt"]
        );
        const jwk = await crypto.subtle.exportKey("jwk", k);
        console.log(jwk);
        setnewkey(jwk.k!);
    }

    async function savekey() {
        setsaving(true);
        let tempkeys: any[] = [...keysj];
        tempkeys.push({
            name: keyname,
            key: newkey,
            created_at: new Date().toUTCString()
        });
        const resap = await saveApikeyToUser(userId, tempkeys);

        if(resap.success) {
            toast.success('API Key saved successfully!', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });
            setkeysj(tempkeys);
        } else
            toast.error('Error: Unable to save API Key', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });

        setnewkey("");
        setsaving(false);
        setkeyname("New Key");
    }

    async function deleteKey() {
        setsaving(true);
        let tempkeys: any[] = [];
        keysj.map((key: any, i: number) => {
            // console.log(key);
            if(i != revkey) {
                tempkeys.push(key);
            }
        });
        const resap = await saveApikeyToUser(userId, tempkeys);
        if(resap.success) {
            toast.success('API Key revoked successfully!', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });
            setkeysj(tempkeys);
        } else
            toast.error('Error: Unable to revoke API Key', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });

        setrevkey(-1);
        setsaving(false);
    }

    return <><ToastContainer />
        {/* <button onClick={() => generateKey()}>New Key</button> */}
        
        <div className=" flex w-full gap-4 flex-row ">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-pink-500 ">
                <div className=" spx-4 py-8 sm:px-6 sm:pt-8 lg:px-8 w-full ">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                            Existing Keys
                        </h1>
                        <p className="text-xl text-slate-500 mt-4 font-semibold">
                            Your secret API keys are listed below. Please note that we do not display your secret API keys again after you generate them.
                            
                        </p>
                        <p className="text-xl text-slate-500 font-semibold">
                            Do not share your API key with others, or expose it in the browser or other client-side code.
                        </p>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        {keys?
                        <>
                            <div className=" flex w-full text-pink-500 text-xl border-b ">
                                <div className=" flex w-[30%] p-2 items-center justify-center  ">Name</div>
                                <div className=" flex w-[20%] p-2 items-center justify-center  ">API Key</div>
                                <div className=" flex w-[47%] p-2 items-center justify-center  ">Created Date</div>
                                <div className=" flex w-[3%] p-2 items-center justify-center  "></div>
                            </div>
                            {keys}
                        </>:
                        <div className=" flex flex-col gap-2 w-full items-center">
                            No API Keys found
                        </div>}
                    </div>
                    
                    <div className="sm:align-center sm:flex sm:flex-row gap-4 ">
                        <Button variant="slim" type="button" onClick={() => generateKey()}
                        className="block w-fit whitespace-nowrap py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Generate New API Key
                        </Button>
                    </div>
                </div>
            </section>
            {loadingpage?<Pageload />:<></>}
        </div>
        {newkey && 
            <div className=" flex w-full h-full top-0 left-0 px-4 py-8 sm:px-6 sm:pt-8 lg:px-8 absolute z-40 bg-black bg-opacity-75 justify-center ">
                <div className=" flex flex-col max-w-6xl w-full p-4 h-min bg-zinc-900 rounded-md border border-pink-500 gap-4 items-center relative " onClick={(e) => e.stopPropagation()}>
                    <p className="max-w-2xl mt-5 text-xl text-white sm:text-center sm:text-2xl font-bold ">
                        Create New API Key
                    </p>
                    <p className=" mt-5 text-xl text-white sm:text-center sm:text-lg ">
                        Please save this API key somewhere safe and accessible. For security reasons, <b>you won't be able to view it again</b> through your account. If you lose this secret key, you'll need to generate a new one.
                    </p>
                    <label className=" w-full flex flex-col ">Name (Optional)
                            <input type="text" onChange={(e) => setkeyname(e.currentTarget.value)} value={keyname} 
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-sm " placeholder="Enter Chatbot Name"/>
                    </label>
                    <div className=" flex gap-2 w-full items-end justify-center">
                        {/* <p className=" flex w-full p-2 text-white outline-none ">{newkey}</p> */}
                        <label className=" w-full flex flex-col ">API key 
                            <input type="text" value={newkey} disabled
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-sm bg-white"/>
                        </label>
                        <div className=" flex p-2 items-center justify-center cursor-pointer hover:bg-zinc-500 text-pink-500 " title="Copy key" onClick={() => navigator.clipboard.writeText(newkey)}>
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.3em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </div>
                    </div>
                    <div className=" flex gap-8 w-full items-end justify-center">
                        <Button
                            variant="slim" type="button" loading={saving} disabled={saving}
                            onClick={() => savekey()}
                            className="block py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                        >
                            Done
                        </Button>
                        <Button
                            variant="slim" type="button" loading={saving} disabled={saving}
                            onClick={() => setnewkey("")}
                            className="block py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        }
        {revkey>=0 && 
            <div className=" flex w-full h-full top-0 left-0 px-4 py-8 sm:px-6 sm:pt-8 lg:px-8 absolute z-80 bg-black bg-opacity-75 justify-center ">
                <div className=" flex flex-col max-w-6xl w-full p-4 h-min bg-zinc-900 rounded-md border border-pink-500 gap-4 items-center relative " onClick={(e) => e.stopPropagation()}>
                    <p className="max-w-2xl mt-5 text-xl text-white sm:text-center sm:text-2xl font-bold ">
                        Revoke API Key
                    </p>
                    <p className=" mt-5 text-xl text-white sm:text-center sm:text-lg ">
                        This API key will immediately be disabled. API requests made using this key will be rejected, which could cause any systems still depending on it to break. Once revoked, you'll no longer be able to view or modify this API key.
                    </p>
                    <div className=" flex gap-2 w-full items-end justify-center">
                        {/* <p className=" flex w-full p-2 text-white outline-none ">{newkey}</p> */}
                        <label className=" w-full flex flex-col ">API key 
                            <input type="text" value={keysj[revkey].key.slice(0,5)+"..."+keysj[revkey].key.slice(-5)} disabled
                            className=" flex w-full p-2 font-semibold text-slate-500 outline-none rounded-sm bg-white"/>
                        </label>
                    </div>
                    <div className=" flex gap-8 w-full items-end justify-center">
                        <Button
                            variant="slim" type="button" loading={saving} disabled={saving}
                            onClick={() => setrevkey(-1)}
                            className="block py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="slim" type="button" loading={saving} disabled={saving}
                            onClick={() => deleteKey()}
                            className="block py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900 !bg-red-400"
                        >
                            Revoke Key
                        </Button>
                    </div>
                </div>
            </div>
        }
    </>;
}