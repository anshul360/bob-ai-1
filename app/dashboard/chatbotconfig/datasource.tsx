import { getBotConfig, getBotDocuments, saveBotCharcount } from "@/app/supabase-server";
import Button from "@/components/ui/Button";
import LoadingDots from "@/components/ui/LoadingDots/LoadingDots";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

export default function Datasource({botId, subscription} : any) {
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


    const deleteDoc = useCallback((source: string) => {
        const affirmation = confirm(`Confirm the deletion of data source "${source}"`);
    }, []);

    useEffect(() => {
        getBotConfig(botId)
            .then((resbc) => {
                setusedlimit(resbc.data[0].char_count);
                setcurrlimit(subscription?.prices?.products?.metadata?.char_per_bot);
            })
            .catch(() => console.log);
        
        let tempdocs: any[] = []; 
        getBotDocuments(botId)
        .then((resbd) => {
            resbd.data.map((doc: any, i: number) => {
                if(doc.name === "Q & A") setqaarr(doc.data);
                tempdocs.push(
                <div className=" flex w-full text-xl border-b " key={i}>
                    <div className=" flex w-[33%] p-2 items-center justify-center  " key={i+"a"}>{doc.name}</div>
                    <div className=" flex w-[31%] p-2 items-center justify-center  " key={i+"b"}>{doc.char_count}</div>
                    <div className=" flex w-[33%] p-2 items-center justify-center  " key={i+"c"}>{doc.created_at.split("T")[0]}</div>
                    <div className=" flex w-[3%] p-2 items-center justify-center cursor-pointer hover:text-red-700 " 
                    title="Delete source" onClick={() => deleteDoc(doc.name)}>
                        <AiOutlineDelete  key={i}/>
                    </div>
                </div>
                )
            });
            setDocs(tempdocs);
        })
        .catch(() => console.log);
    }, [botId, subscription]);

    useEffect(() => {
        if(activetab=="qa") countQaChars();
    }, [activetab, qaarr]);

    function tabchange(tab: string) {
        setactivetab(tab);
        setcharcount(0);
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
    function countQaChars() {
        let charcountlo = 0;
        qaarr.map((qa) => {
            charcountlo += qa.q_value.length;
            charcountlo += qa.a_value.length;
            charcountlo += 17;
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
                } else throw "unable to count characters"
            });
        } catch(e) {
            console.log(e);
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
            response.json().then(async (data) => { 
                if(data.success) {
                    const resbc = await getBotConfig(botId);

                    const rescc = await saveBotCharcount(botId, resbc.data[0].char_count+charcount);
                    if(!rescc.success) throw "error storing charcount"
                    
                    if(fileinref.current)
                        fileinref.current.value = null;
                    setusedlimit(resbc.data[0].char_count+charcount);
                    setcharcount(0);
                    setfile(undefined);
                } else throw "unable to save embeddings"
            });
        } catch(e) {
            console.log(e);
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

    }
    async function countWebCharacters() {

    }

    async function uploadQa() {
        setupload(true);
        const finalcharcount = countQaChars();
        console.log(JSON.stringify(qaarr),"---",finalcharcount);
        const body = new FormData();
        body.append("botid", botId);
        body.append("type", "Q_A");
        body.append("content", JSON.stringify(qaarr));
        try {
            const response = await fetch("/api/docs/store", {
                method: "POST",
                body
            });
            response.json().then(async (data) => { 
                if(data.success) {
                    const resbc = await getBotConfig(botId);

                    const rescc = await saveBotCharcount(botId, resbc.data[0].char_count+finalcharcount);
                    if(!rescc.success) throw "error storing charcount"
                    
                    if(fileinref.current)
                        fileinref.current.value = null;
                    setusedlimit(resbc.data[0].char_count+finalcharcount);
                    setcharcount(0);
                } else throw "unable to save embeddings"
            });
        } catch(e) {
            console.log(e);
            setserror(String(e));
        }
        setupload(false);
    }

    return <>
        <div className=" flex max-w-[90%] w-full gap-4 flex-row ">
            <section className="mb-12 bg-zinc-900 md:w-[20%] w-full border-0 rounded-md border-pink-500 ">
                <div className=" flex flex-col max-w-6xl px-4 py-8sm:px-6 sm:pt-8 lg:px-8 h-full">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white text-right sm:text-6xl">
                            Upload
                        </h1>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 h-full ">
                        <div className={` flex p-2 h-fit font-semibold text-2xl cursor-pointer justify-end rounded-sm ${activetab=="file"? "border border-pink-500 text-pink-500 ": " text-white "} `} onClick={() => tabchange("file")}>
                            File
                        </div>
                        <div className={` flex p-2 h-fit font-semibold text-2xl cursor-pointer justify-end rounded-sm ${activetab=="web"? "border border-pink-500 text-pink-500 ": " text-white "} `} onClick={() => tabchange("web")}>
                            Website 
                        </div>
                        <div className={` flex p-2 h-fit font-semibold text-2xl cursor-pointer justify-end rounded-sm ${activetab=="qa"? "border border-pink-500 text-pink-500 ": " text-white "} `} onClick={() => tabchange("qa")}>
                            Q & A
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <div className={` flex flex-col w-full items-end ${usedlimit>currlimit?" text-red-700":" text-teal-500 "} `}>
                            <p className=" text-base font-semibold ">Chatbot Characters Used / Limit</p>
                            <p className=" text-base font-semibold ">{usedlimit} / {currlimit}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mb-12 bg-zinc-900 md:w-[80%] w-full border-0 rounded-md border-pink-500 ">
                <div className=" px-4 py-8 sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white text-left sm:text-6xl">
                            {activetab=="file" && "File"}
                            {activetab=="web" && "Website"}
                            {activetab=="qa" && "Q & A"}
                        </h1>
                        {activetab=="file" && <p className="text-xl text-zinc-200">
                            Upload the files with relevant data which can act as a source for chatbot to give response from.<br/>
                            You can add multiple files one by one.
                        </p>}
                        {activetab=="web" && <p className="text-xl text-zinc-200">
                            Enter the website addresses with relevant data which can act as a source for chatbot to give response from.<br/>
                            You can add multiple website addresses separated by comma.
                        </p>}
                        {activetab=="qa" && <p className="text-xl text-zinc-200">
                            Sometimes the chatbot doesn't give the most relevant response back. For such queries you can set the Query and the appropriate answer to it.<br/>
                            Use this section to make responses of your chatbot more accurate. You can add multiple entries.
                        </p>}
                    </div>
                    {activetab=="file" && 
                    <div className="sm:align-center sm:flex sm:flex-col py-4 ">{/**File upload */}
                        <div className=" flex flex-col gap-2 w-full">
                            <input type="file" onChange={(e) => fileonchange(e.target.files![0])} accept=".pdf, .docx, .doc, .txt" ref={fileinref}
                            className=" relative cursor-pointer m-0 block w-full min-w-0 flex-auto rounded-sm border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-white transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary "/>
                            <p className=" text-base font-semibold ">pdf, docx, doc, txt file types supported</p>
                            <p className=" text-base text-teal-500 flex-nowrap flex pt-1 font-semibold ">Number of characters: {charcount}</p>
                        </div>
                        <div className="sm:align-center sm:flex flex-col gap-4 ">
                            {loadedfile && usedlimit<currlimit && charcount>0?<Button variant="slim" type="button" disabled={upload} onClick={() => uploadFile()} loading={upload}
                            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Upload File
                            </Button>:
                            <Button variant="slim" type="button" disabled={upload || !loadedfile} onClick={() => countCharacters()} loading={upload}
                            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Extract Data
                            </Button>}
                            {usedlimit>currlimit?<p className=" text-base text-red-700 flex-nowrap flex font-semibold ">(Character Limit Exceeded)</p>:<></>}
                            {counting?<div className=" w-full text-pink-500 font-bold text-lg items-center justify-center"><LoadingDots />Extracting Data</div>:<></>}
                        </div>
                    </div>}
                    {activetab=="web" && 
                    <div className="sm:align-center sm:flex sm:flex-col py-4 ">{/**URL upload */}
                        <div className=" flex flex-col gap-2 w-full">
                            <textarea onChange={(e) => setwebaddr(e.currentTarget.value)} value={webaddr} rows={1}  placeholder="Enter Website Addresses"
                            className=" flex w-full px-3 py-[0.32rem] font-semibold text-slate-500 outline-none rounded-sm border "/>
                            <p className=" text-base font-semibold ">Example: https://www.example.com,https://www.anotherexample.com/blog/1</p>
                            <p className=" text-base text-teal-500 flex-nowrap flex pt-1 font-semibold ">Number of characters: {charcount}</p>
                        </div>
                        <div className="sm:align-center sm:flex flex-col gap-4 ">
                            {usedlimit<currlimit && charcount>0 && webaddr.length>0?<Button variant="slim" type="button" disabled={upload} onClick={() => uploadWeb()} loading={upload}
                            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Upload Data
                            </Button>:
                            <Button variant="slim" type="button" disabled={upload || !loadedfile} onClick={() => countWebCharacters()} loading={upload}
                            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Extract Data
                            </Button>}
                            {usedlimit>currlimit?<p className=" text-base text-red-700 flex-nowrap flex font-semibold ">(Character Limit Exceeded)</p>:<></>}
                            {counting?<div className=" w-full text-pink-500 font-bold text-lg items-center justify-center"><LoadingDots />Extracting Data</div>:<></>}
                        </div>
                    </div>}
                    {activetab=="qa" && 
                    <div className="sm:align-center sm:flex sm:flex-col py-4 ">{/**Q&A upload */}
                        <div className=" flex flex-col gap-2 w-full">
                            
                             {qaarr.map((qainst: any, i: number) => {

                                return (
                                <div className=" flex w-full flex-col gap-1 " key={i}>
                                    <label key={i+"q"}> Query {i+1}
                                        <input type="text" className=" flex w-full px-3 py-[0.32rem] font-semibold text-slate-500 outline-none rounded-sm " placeholder="Enter Query"
                                        onChange={(e) => handleQAChange(e, true)} value={qainst.q_value} key={i} id={`${i}`}/>
                                    </label>
                                    <label key={i+"a"}> Response {i+1}
                                        <textarea rows={2}  className=" flex w-full px-3 py-[0.32rem] font-semibold text-slate-500 outline-none rounded-sm " placeholder="Enter Response"
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
                        <div className="sm:align-center sm:flex flex-col gap-4 ">
                            {usedlimit<currlimit && charcount>0?<Button variant="slim" type="button" disabled={upload} onClick={() => uploadQa()} loading={upload}
                            className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                                Upload Q&A
                            </Button>:<></>}
                            {usedlimit>currlimit?<p className=" text-base text-red-700 flex-nowrap flex font-semibold ">(Character Limit Exceeded)</p>:<></>}
                            {counting?<div className=" w-full text-pink-500 font-bold text-lg items-center justify-center"><LoadingDots />Extracting Data</div>:<></>}
                        </div>
                    </div>}
                </div>
            </section>
        </div>
        <div className=" flex max-w-[90%] w-full gap-4 flex-row ">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-pink-500 ">
                <div className=" spx-4 py-8 sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                            Uploaded data sources
                        </h1>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        {docs?
                        <>
                            <div className=" flex w-full text-pink-500 text-xl border-b ">
                                <div className=" flex w-[33%] p-2 items-center justify-center  ">Name</div>
                                <div className=" flex w-[31%] p-2 items-center justify-center  ">Total Characters</div>
                                <div className=" flex w-[33%] p-2 items-center justify-center  ">Created Date</div>
                                <div className=" flex w-[3%] p-2 items-center justify-center  "></div>
                            </div>
                            {docs}
                        </>:
                        <div className=" flex flex-col gap-2 w-full items-center">
                            No Records
                        </div>}
                    </div>
                </div>
            </section>
        </div>
    </>
}