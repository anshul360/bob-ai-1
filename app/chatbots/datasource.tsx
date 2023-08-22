import { deleteMainDocAndEmbeddings, getBotConfig, getBotDocuments, saveBotCharcount } from "@/app/supabase-server";
import Button from "@/components/ui/Button";
import LoadingDots from "@/components/ui/LoadingDots/LoadingDots";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Pageload from "./loading";
import { toast } from 'react-toastify';

export default function Datasource({botId, subscription, userId} : any) {
    const [ loadingpage, setloadingpage ] = useState(false);
    const [ currlimit, setcurrlimit ] = useState(0);
    const [ usedlimit, setusedlimit ] = useState(0);
    const [ charcount, setcharcount ] = useState(0);
    const [ docs, setDocs ]: any[] = useState([]);
    const [ activetab, setactivetab ] = useState("file");
    const [ upload, setupload ] = useState(false);
    const [ counting, setcounting ] = useState(false);
    const [ loadedfile, setfile ] = useState<File>();
    const [ webaddr, setwebaddr ] = useState("");
    const [ serror, setserror ] = useState("");
    const fileinref = useRef<any>(null);
    
    const [qaarr, setqaarr] = useState([{ q_value: "", a_value: "" }]);
    const [ showhelp, setshowhelp ] = useState(false);

    const handleQAChange = (e: any, intxt: boolean) => {
        e.preventDefault();
    
        const index = e.target.id;
        setqaarr(s => {
            const newArr = s.slice();
            if(intxt) newArr[index].q_value = e.target.value;
            else newArr[index].a_value = e.target.value;
            return newArr;
        })

        //countQaChars();
    };
    const deleteDoc = useCallback(async (source: string, docid: number, doccharcount: number) => {
        const affirmation = confirm(`Are you sure you want to delete data source "${source}"`);
        if(affirmation) {
            // setloadingpage(true);
            const botcharcount = usedlimit-doccharcount;
            console.log("-=-=charcount-=-=",botcharcount);
            const res = await deleteMainDocAndEmbeddings(docid, botcharcount, botId);
            console.log("-=-=-+_+_+_-=-=-",usedlimit, doccharcount);
            if(res.success)
                toast.success('Data Source deleted successfully!', {
                    position: "top-right", autoClose: 3000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                    theme: "dark",
                });
            else  
                toast.error('Error: Unable to delete data source', {
                    position: "top-right", autoClose: 3000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                    theme: "dark",
                });
            loaddatasource();
            loadbotconfig();
            // setloadingpage(false);
        }
    }, [usedlimit]);
    const loaddatasource = useCallback(() => {
        let tempdocs: any[] = []; 
        let currlimtemp = 0;
        getBotDocuments(botId, userId)
        .then((resbd) => {
            resbd.data.map((doc: any, i: number) => {
                if(doc.name === "Q & A") setqaarr(doc.data);
                currlimtemp = doc.users?.chatbot_char_count ?? 0;
                tempdocs.push(
                <div className=" flex w-full text-xl border-b " key={i}>
                    <div className=" flex w-[33%] p-2 items-center justify-start overflow-hidden  " key={i+"a"}><p className=" truncate ">{doc.name}</p></div>
                    <div className=" flex w-[31%] p-2 items-center justify-start overflow-hidden  " key={i+"b"}><p className=" truncate ">{doc.char_count}</p></div>
                    <div className=" flex w-[33%] p-2 items-center justify-start overflow-hidden  " key={i+"c"}><p className=" truncate ">{new Date(doc.created_at).toLocaleString()}</p></div>
                    <div className=" flex w-[3%] p-2 min-w-fit items-center justify-start cursor-pointer hover:text-red-700 "  key={i+"d"}
                    title="Delete source" onClick={() => deleteDoc(doc.name, doc.id, doc.char_count)}>
                        <AiOutlineDelete  key={i} className=" w-5 h-auto"/>
                    </div>
                </div>
                )
            });
            setcurrlimit(currlimtemp);
            setDocs(tempdocs);
        })
        .catch(() => console.log).finally(() => setloadingpage(false));
    }, [botId, subscription, usedlimit]);
    const loadbotconfig = useCallback(() => {
        getBotConfig(botId, userId)
            .then((resbc) => {
                setusedlimit(resbc.data[0].char_count);
                // setcurrlimit(subscription?.prices?.products?.metadata?.char_per_bot || 0);
            })
            .catch(() => console.log)
            // .finally(() => setloadingpage(false));
    }, [botId, subscription]);

    useEffect(() => {
        if(!currlimit || currlimit == 0) {
            setloadingpage(true);
            loadbotconfig();
            loaddatasource();
        }
    }, [botId, subscription]);

    useEffect(() => {
        if(activetab=="qa") countQaChars();
    }, [activetab, qaarr]);

    function tabchange(tab: string) {
        setactivetab(tab);
        setcharcount(0);
        setwebaddr("");
    }
    function fileonchange(file: File) {
        setfile(file); 
        setcharcount(0);
        // getBotConfig(botId)
        //     .then((resbc) => {
        //         setusedlimit(resbc.data[0].char_count);
        //     })
        //     .catch(() => console.log);
    }
    function addQa() {
        setqaarr((s: any) => {
            return [
              ...s,
              {
                q_value: "",
                a_value: ""
              }
            ];
          });
    }
    function removeQa(idx:number) {
        const affirmation = confirm(`Are you sure you want to delete Query${idx+1}/Answer${idx+1}?`);
        if(affirmation) setqaarr((s: any) => {
            let temparr = [...s];
            // s.map((item, i) => temparr.push);
            temparr.splice(idx, 1);
            return temparr;
        });
    }
    function countQaChars() {
        let charcountlo = 0;
        qaarr.map((qa) => {
            charcountlo += qa.q_value.length;
            charcountlo += qa.a_value.length;
            // charcountlo += 9;
            // countcharhi += qa.q_value.length;
            // countcharhi += qa.a_value.length;
        });
        setcharcount(charcountlo);
        return charcountlo;
    }
    async function countCharacters() {
        setcounting(true);
        const body = new FormData();
        try {
            formBody(loadedfile!, body);
            const response = await fetch("/api/docs/count", {
                method: "POST",
                body
            })
            response.json().then((data) => { 
                if(data.success) {
                    // setusedlimit(usedlimit + data.charcount);
                    setcharcount(data.charcount);

                    toast.success('File content extracted successfully!', {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                        theme: "dark",
                    });
                } else throw "unable to count characters"
            });
        } catch(e) {
            console.log(e);
            toast.error('Error: Unable to extract file content', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });
            setserror(String(e));
        }
        setcounting(false);
    }
    async function uploadFile() {
        setupload(true);
        const body = new FormData();
        try {
            formBody(loadedfile!, body);
            const response = await fetch("/api/docs/store", {
                method: "POST",
                body
            });
            if (!response.ok || !response.body) {
                if(response.status == 429) {
                    toast.info('Please wait for 1 minute before uploading another data source', {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                        theme: "dark",
                    });
                } else throw response.statusText;
            }
            response.json().then(async (data) => { 
                if(data.success) {
                    const resbc = await getBotConfig(botId, userId);

                    const rescc = await saveBotCharcount(botId, resbc.data[0].char_count+charcount);
                    if(!rescc.success) throw "error storing charcount"
                    
                    if(fileinref.current)
                        fileinref.current.value = null;
                    setusedlimit(resbc.data[0].char_count+charcount);
                    setcharcount(0);
                    setfile(undefined);
                    loaddatasource();

                    toast.success('File uploaded successfully!', {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                        theme: "dark",
                    });
                } else {
                    throw "unable to save embeddings";
                }
            });
        } catch(e) {
            console.log(e);
            toast.error('Error: Unable to upload file', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });
            setserror(String(e));
        }
        setupload(false);
    }
    function formBody(file2upload: File, body: FormData) {
        // console.log(file2upload?.name);
        const ext = file2upload?.name.split(".").pop();
        // console.log(ext);
        if(ext === "pdf")    body.append("type", "pdf");
        else if(ext === "doc")    body.append("type", "txt");
        else if(ext=== "docx")    body.append("type", "docx");
        else if(ext === "txt")    body.append("type", "txt");
        else throw "invalid file";
        body.append("file", file2upload!);
        body.append("botid", botId);
    }
    async function uploadWeb() {
        setupload(true);
        const body = new FormData();
        body.append("botid", botId);
        body.append("type", "web");
        body.append("paths", webaddr);
        try {
            const response = await fetch("/api/docs/store", {
                method: "POST",
                body
            });
            if (!response.ok || !response.body) {
                if(response.status == 429) {
                    toast.info('Please wait for 1 minute before uploading another data source', {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                        theme: "dark",
                    });
                } else throw response.statusText;
            }
            response.json().then(async (data) => { 
                if(data.success) {
                    const resbc = await getBotConfig(botId, userId);

                    const rescc = await saveBotCharcount(botId, resbc.data[0].char_count+charcount);
                    if(!rescc.success) throw "error storing charcount"
                    
                    setwebaddr("");
                    setusedlimit(resbc.data[0].char_count+charcount);
                    setcharcount(0);
                    loaddatasource();
                    
                    toast.success('Web content uploaded successfully!', {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                        theme: "dark",
                    });
                } else throw "unable to save embeddings"
            });
        } catch(e) {
            console.log(e);
            toast.error('Error: Unable to upload web content', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });
            setserror(String(e));
        }
        setupload(false);
    }
    async function countWebCharacters() {
        setcounting(true);
        const body = new FormData();
        body.append("botid", botId);
        body.append("type", "web");
        body.append("paths", webaddr);
        try {
            
            const response = await fetch("/api/docs/count", {
                method: "POST",
                body
            })
            response.json().then((data) => { 
                if(data.success) {
                    // setusedlimit(usedlimit + data.charcount);
                    setcharcount(data.charcount);

                    toast.success('Web content extracted successfully!', {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                        theme: "dark",
                    });
                } else throw "unable to count characters"
            });
        } catch(e) {
            console.log(e);
            toast.error('Error: Unable to extract web content', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                theme: "dark",
            });
            setserror(String(e));
        }
        setcounting(false);
    }
    async function uploadQa() {
        setupload(true);
        const finalcharcount = countQaChars();
        // console.log(JSON.stringify(qaarr),"---",finalcharcount);
        const body = new FormData();
        body.append("botid", botId);
        body.append("type", "Q_A");
        let temparr:any = [];
        qaarr.map((ar) => {
            if(ar.a_value && ar.q_value) temparr.push(ar);
        });
        body.append("content", JSON.stringify(temparr));
        try {
            const response = await fetch("/api/docs/store", {
                method: "POST",
                body
            });
            if (!response.ok || !response.body) {
                if(response.status == 429) {
                    toast.info('Please wait for 1 minute before uploading another data source', {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                        theme: "dark",
                    });
                } else throw response.statusText;
            }
            response.json().then(async (data) => { 
                if(data.success) {
                    const resbc = await getBotConfig(botId, userId);

                    const rescc = await saveBotCharcount(botId, resbc.data[0].char_count+finalcharcount);
                    if(!rescc.success) throw "error storing charcount"
                    
                    if(fileinref.current)
                        fileinref.current.value = null;
                    setusedlimit(resbc.data[0].char_count+finalcharcount);
                    setcharcount(0);
                    toast.success('Q & A uploaded successfully!', {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined,
                        theme: "dark",
                    });
                    loaddatasource();
                } else throw "unable to save embeddings"
            });
        } catch(e) {
            console.log(e);
            setserror(String(e));
        }
        setupload(false);
    }

    return <>
        <div className=" flex w-full gap-4 flex-row relative ">
            <section className="mb-4 bg-zinc-900 w-[20%] min-w-[250px] border-0 rounded-md border-[#00ffff] ">
                <div className=" flex flex-col max-w-6xl px-4 py-8 sm:px-6 sm:pt-8 lg:px-8 h-full pb-3">
                    <div className="align-center flex flex-col mb-4 ">
                        <h1 className=" font-extrabold text-white text-right text-6xl">
                            Upload
                        </h1>
                    </div>
                    <div className="align-center flex flex-col mb-4 h-full ">
                        <div className={` flex p-2 h-fit font-semibold text-2xl cursor-pointer justify-end rounded-sm ${activetab=="file"? "border border-[#00ffff] text-[#00ffff] ": " text-white "} `} onClick={() => tabchange("file")}>
                            File
                        </div>
                        <div className={` flex p-2 h-fit font-semibold text-2xl cursor-pointer justify-end rounded-sm ${activetab=="web"? "border border-[#00ffff] text-[#00ffff] ": " text-white "} `} onClick={() => tabchange("web")}>
                            Website 
                        </div>
                        <div className={` flex p-2 h-fit font-semibold text-2xl cursor-pointer justify-end rounded-sm ${activetab=="qa"? "border border-[#00ffff] text-[#00ffff] ": " text-white "} `} onClick={() => tabchange("qa")}>
                            Q & A
                        </div>
                    </div>
                    <div className="align-center flex flex-col ">
                        <div className={` flex flex-col w-full items-end text-end justify-end ${usedlimit>currlimit?" text-red-700":" text-teal-500 "} `}>
                            <p className=" text-base font-semibold ">Chatbot Characters Used / Limit</p>
                            <p className=" text-base font-semibold ">{usedlimit} / {currlimit}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mb-4 bg-zinc-900 w-[80%] border-0 rounded-md border-[#00ffff] ">
                <div className=" px-4 py-8 sm:px-6 sm:pt-8 lg:px-8 pb-0 ">
                    <div className="align-center flex flex-col mb-4 relative ">
                        <h1 className=" font-extrabold text-white text-left text-6xl">
                            {activetab=="file" && "File"}
                            {activetab=="web" && "Website"}
                            {activetab=="qa" && "Q & A"}
                        </h1>
                        <div className=" flex absolute top-0 right-0 text-[#00ffff] cursor-pointer" onClick={() => setshowhelp(true)}>
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </div>
                        {activetab=="file" && <p className="text-xl text-slate-500">
                            Upload the files with relevant data which can act as a source for chatbot to give response from.<br/>
                            You can add multiple files one by one.
                        </p>}
                        {activetab=="web" && <p className="text-xl text-slate-500">
                            Enter the website addresses with relevant data which can act as a source for chatbot to give response from.<br/>
                            You can add multiple website addresses separated by comma.
                        </p>}
                        {activetab=="qa" && <p className="text-xl text-slate-500">
                            Sometimes the chatbot doesn't give the most relevant response back. For such queries you can set the Query and the appropriate answer to it.<br/>
                            Use this section to make responses of your chatbot more accurate. You can add multiple entries.
                        </p>}
                    </div>
                    {activetab=="file" && 
                    <div className="align-center flex flex-col py-4 h-auto overflow-auto ">{/**File upload */}
                        <div className=" flex flex-col gap-2 w-full">
                            <input type="file" onChange={(e) => fileonchange(e.target.files![0])} accept=".pdf, .docx, .doc, .txt" ref={fileinref}
                            className=" relative cursor-pointer m-0 block w-full min-w-0 flex-auto rounded-sm border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-white transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary "/>
                            <p className=" text-base font-semibold text-slate-500 ">pdf, docx, doc, txt file types supported</p>
                            <p className=" text-base text-teal-500 flex-nowrap flex pt-1 font-semibold ">Number of characters: {charcount}</p>
                        </div>
                        <div className="sm:align-center sm:flex flex-col gap-4 ">
                            {loadedfile && usedlimit<currlimit && charcount>0?<Button variant="slim" type="button" disabled={upload} onClick={() => uploadFile()} loading={upload}
                            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Upload File
                            </Button>:
                            <Button variant="slim" type="button" disabled={counting || !loadedfile} onClick={() => countCharacters()} loading={counting}
                            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Extract Data
                            </Button>}
                            {usedlimit>currlimit?<p className=" text-base text-red-700 flex-nowrap flex font-semibold ">(Character Limit Exceeded)</p>:<></>}
                            {counting?<div className=" w-full text-[#00ffff] font-bold text-lg items-center justify-center"><LoadingDots />&nbsp;Extracting Data</div>:<></>}
                        </div>
                    </div>}
                    {activetab=="web" && 
                    <div className="align-center flex flex-col py-4 h-auto overflow-auto ">{/**URL upload */}
                        <div className=" flex flex-col gap-2 w-full">
                            <textarea onChange={(e) => {setwebaddr(e.currentTarget.value);setcharcount(0)}} value={webaddr} rows={1}  placeholder="Enter Website Addresses"
                            className=" flex w-full px-3 py-[0.32rem] font-semibold text-slate-500 outline-none rounded-sm border "/>
                            <p className=" text-base font-semibold text-slate-500 ">Example: https://www.example.com,https://www.anotherexample.com/blog/1</p>
                            <p className=" text-base text-teal-500 flex-nowrap flex pt-1 font-semibold ">Number of characters: {charcount}</p>
                        </div>
                        <div className="sm:align-center sm:flex flex-col gap-4 ">
                            {usedlimit<currlimit && charcount>0 && webaddr.length>0?<Button variant="slim" type="button" disabled={upload} onClick={() => uploadWeb()} loading={upload}
                            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Upload Data
                            </Button>:
                            <Button variant="slim" type="button" disabled={counting || webaddr.length==0} onClick={() => countWebCharacters()} loading={counting}
                            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Extract Data
                            </Button>}
                            {usedlimit>currlimit?<p className=" text-base text-red-700 flex-nowrap flex font-semibold ">(Character Limit Exceeded)</p>:<></>}
                            {counting?<div className=" w-full text-[#00ffff] font-bold text-lg items-center justify-center"><LoadingDots />&nbsp;Extracting Data</div>:<></>}
                        </div>
                    </div>}
                    {activetab=="qa" && 
                    <div className="align-center flex flex-col py-4 h-auto overflow-auto ">{/**Q&A upload */}
                        <div className=" flex flex-col gap-4 w-full ">
                            
                             {qaarr.map((qainst: any, i: number) => {

                                return (
                                <div className=" flex w-full flex-col gap-1 font-semibold " key={i}>
                                    <label key={i+"q"}> Query {i+1}
                                        <div className=" flex w-full items-center justify-center gap-2">
                                            <input type="text" className=" flex w-full px-3 py-[0.32rem] font-semibold text-slate-500 outline-none rounded-sm " placeholder="Enter Query"
                                            onChange={(e) => handleQAChange(e, true)} value={qainst.q_value} key={i} id={`${i}`}/>
                                            <div onClick={() => removeQa(i)} className=" flex cursor-pointer hover:text-red-500" title="Remove this Query">
                                                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z" fill="currentColor"></path>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 
                                                    23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="currentColor"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </label>
                                    <label key={i+"a"}> Answer {i+1}
                                        <textarea rows={2}  className=" flex w-full px-3 py-[0.32rem] font-semibold text-slate-500 outline-none rounded-sm " placeholder="Enter Answer"
                                        onChange={(e) => handleQAChange(e, false)} value={qainst.a_value} key={i} id={`${i}`}/>
                                    </label>
                                </div>
                                )
                            
                            })}
                            <div className=" flex w-full justify-between ">
                                <p className=" text-base text-teal-500 flex-nowrap flex pt-1 font-semibold ">Number of characters: {charcount}</p>
                                <Button variant="slim" type="button" disabled={upload} onClick={() => addQa()} loading={upload}
                                className="block py-2 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                    Add More Q&A
                                </Button>
                            </div>
                        </div>
                        <div className="align-center flex flex-col gap-4 ">
                            {usedlimit<currlimit && charcount>0?<Button variant="slim" type="button" disabled={upload} onClick={() => uploadQa()} loading={upload}
                            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Upload Q&A
                            </Button>:<></>}
                            {usedlimit>currlimit?<p className=" text-base text-red-700 flex-nowrap flex font-semibold ">(Character Limit Exceeded)</p>:<></>}
                        </div>
                    </div>}
                </div>
            </section>
        </div>
        <div className=" flex w-full gap-4 flex-row ">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-[#00ffff] ">
                <div className=" spx-4 py-8 px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                            Uploaded data sources
                        </h1>
                    </div>
                    <div className="align-center flex flex-col mb-4 ">
                        {docs?
                        <>
                            <div className=" flex w-full text-[#00ffff] text-xl border-b ">
                                <div className=" flex w-[33%] p-2 items-cente justify-start  ">Name</div>
                                <div className=" flex w-[31%] p-2 items-center justify-start  ">Total Characters</div>
                                <div className=" flex w-[33%] p-2 items-center justify-start  ">Created Date</div>
                                <div className=" flex w-[3%] p-2 items-center justify-start  "></div>
                            </div>
                            {docs}
                        </>:
                        <div className=" flex flex-col gap-2 w-full items-center">
                            No Records
                        </div>}
                    </div>
                </div>
            </section>
            {loadingpage?<Pageload />:<></>}
            {showhelp && <HelpComp setshowhelp={setshowhelp} activetab={activetab}/>}
        </div>
    </>
}

const checksvg = <svg className="h-6 w-6 flex-none  stroke-[#00ffff] stroke-2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="11" />
    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
</svg>

const fileh = <ul className="space-y-4">
    <li className="flex items-center">
        {checksvg}
        <p className="ml-4">
            Select the file you want to upload
        </p>
    </li>
    <li className="flex items-center">
        {checksvg}
        <p className="ml-4">
            Then click <b>Extract Data</b> to pull the data from file. This step will show you the number of characters inside your file.
        </p>
    </li>
    <li className="flex items-center">
        {checksvg}
        <p className="ml-4">
            After that click <b>Upload File</b>. This will upload the extracted data for the chatbot.
        </p>
    </li>
    <li className="flex items-center">
        {checksvg}
        <p className="ml-4">
            You can see the uploaded file in the <b>Uploaded data sources</b> section.
        </p>
    </li>
</ul>

const webh = <ul className="space-y-4">
    <li className="flex items-center">
        {checksvg}
        <p className="ml-4">
            Enter the website addess from which you want to extract data. <br/>You can enter multiple website addresses separated by comma.
        </p>
    </li>
    <li className="flex items-center">
        {checksvg}
        <p className="ml-4">
            Then click <b>Extract Data</b> to pull the data from mentioned website(s). <br/>This step will show you the number of characters in the website(s).
        </p>
    </li>
    <li className="flex items-center">
        {checksvg}
        <p className="ml-4">
            After that click <b>Upload Data</b>. This will upload the extracted data for the chatbot.
        </p>
    </li>
    <li className="flex items-center">
        {checksvg}
        <p className="ml-4">
            You can see the uploaded data in the <b>Uploaded data sources</b> section.
        </p>
    </li>
</ul>

const qah = <ul className="space-y-4">
    <li className="flex items-center">
        {checksvg}
        <p className="ml-4">
            Enter the Query and an Answer to that Query.
        </p>
    </li>
    <li className="flex items-center">
        {checksvg}
        <p className="ml-4">
            You can add multiple Query/Response pairs by clicking <b>Add More Q&A</b>.
        </p>
    </li>
    <li className="flex items-center">
        {checksvg}
        <p className="ml-4">
            After that click <b>Upload Q&A</b>. This will upload the data for the chatbot.
        </p>
    </li>
    <li className="flex items-center">
        {checksvg}
        <p className="ml-4">
            You can see the uploaded data in the <b>Uploaded data sources</b> section.
        </p>
    </li>
</ul>

function HelpComp({setshowhelp, activetab}:any) {
    return <div className=" flex w-full h-full top-0 left-0 px-4 py-8 sm:px-6 sm:pt-8 lg:px-8 absolute z-40 bg-black bg-opacity-75 justify-center " onClick={() => setshowhelp(false)}>
        <div className=" flex flex-col max-w-6xl w-full p-4 h-min bg-zinc-900 rounded-md border border-[#00ffff] gap-4 items-center relative " onClick={(e) => e.stopPropagation()}>
            {activetab=="file" && fileh}
            {activetab=="web" && webh}
            {activetab=="qa" && qah}
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg" 
            className=" absolute top-3 right-3 cursor-pointer " onClick={() => setshowhelp(false)}>
                <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 
                2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 
                4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 
                16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path>
            </svg>
        </div>
    </div>
}
