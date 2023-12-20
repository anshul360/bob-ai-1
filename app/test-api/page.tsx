"use client"

import Button from "@/components/ui/Button";
import { useState } from "react";

export default function TestAPIPage() {
    const [query, setquery] = useState("");
    const [loading, setloading] = useState(false);
    const [response, setresponse] = useState("");
    const [conversation, setconversation] = useState([{ role: "assistant", content: "how can I help you today?" }]);

    async function callApi() {
        const messages = [...conversation];
        messages.push({ role: "user", content: query });
        setloading(true);
        setconversation((conv) => [...conv, { role: "user", content: query }]);
        const res = await fetch('https://www.cyanarrow.com/api/v1/chat/e2bf4ca8-f931-48c9-8886-701eda3434e7', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer xWbZ_lQzufGhmudDVj7gbA8ZLkC9u6bgHvPoLTSzUE4',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                messages,
                stream: false,
                creativity: 1
            })
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw Error(errorData.message);
        }
        const data = await res.json();
        console.log(data);
        setresponse(data.content);
        setconversation((conv) => [...conv, { role: "assistant", content: data.content }]);
        setloading(false);
    }

    async function callApiStreaming() {
        const messages = [...conversation];
        messages.push({ role: "user", content: query });
        setloading(true);
        setconversation((conv) => [...conv, { role: "user", content: query }]);

        const res = await fetch('https://www.cyanarrow.com/api/v1/chat/e2bf4ca8-f931-48c9-8886-701eda3434e7', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer xWbZ_lQzufGhmudDVj7gbA8ZLkC9u6bgHvPoLTSzUE4'
            },
            body: JSON.stringify({
                messages,
                stream: true,
                creativity: 0,
            })
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw Error(errorData.message);
        }

        const data = res.body;

        if (!data) {
            throw Error("no data available");
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        setconversation((conv) => [...conv, { role: "assistant", content: "" }]);
        let tempstr = "";
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            tempstr += chunkValue;
            //log the chunks received
            console.log(chunkValue);
            setresponse(tempstr);
            setconversation((conv) => {
                const tempa = [...conv];
                const lastele = tempa.splice(tempa.length-1, 1);
                lastele[0].content = tempstr;
                return [...tempa, ...lastele]
            });
        }

        setloading(false);
    }
    return (
        <div className=" flex flex-col w-full bg-slate-700 space-y-4 mt-4 p-4">
            <div className="  flex flex-col items-center justify-center space-y-4 w-full ">
                <input type="text" onChange={(e) => setquery(e.target.value)} className=" w-60 p-2 rounded-md text-slate-800" placeholder="Enter your message..." />
                <Button loading={loading} type="button" className=" border bg-slate-200 hover:bg-slate-400 rounded-xl cursor-pointer text-slate-800 w-32 h-10 whitespace-nowrap "
                    onClick={() => { callApi() }}
                >Hit it!</Button>
                <Button loading={loading} type="button" className=" border bg-slate-200 hover:bg-slate-400 rounded-xl cursor-pointer text-slate-800 w-32 h-10 whitespace-nowrap "
                    onClick={() => { callApiStreaming() }}
                >Stream it!</Button>
            </div>
            <div className=" flex flex-col border items-center min-h-[50vh] space-y-4 w-full p-4 ">
                <p className=" text-lg text-cyan-500 border p-2 rounded-xl">{response}</p>
                <p className=" text-3xl font-semibold text-white underline ">Conversation</p>
                <div className=" flex flex-col w-full space-y-2">
                    {conversation.map((val, key) => {
                        return <div key={key} className={` w-full p-2 rounded-xl text-slate-800 ${val.role == "user" ? " bg-orange-300 rounded-br-none" : " bg-indigo-300 rounded-bl-none"}`}>
                            <p>{val.content}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}