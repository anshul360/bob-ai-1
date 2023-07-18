'use client'

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function ChatbotView({chatbot}: any) {
    const { push } = useRouter();

    return <>
        <div className=" flex max-w-[90%] w-full gap-4 flex-row relative ">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-pink-500 ">
                <div className=" spx-4 py-8 sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex mb-4 gap-4 justify-start items-end ">
                        <h1 className="text-4xl font-extrabold text-white text-center sm:text-6xl">
                            {`${chatbot?.name}`}
                        </h1>
                        <Button variant="slim" type="button" disabled={!chatbot} onClick={() => push(`/chatbots/chatbotconfig?id=${chatbot.id}`)}
                        className="block py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            View Config
                        </Button>
                        <Button variant="slim" type="button" disabled={!chatbot} onClick={() => push(`/chatbots/chatbotconfig?id=${chatbot.id}`)}
                        className="block py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900" >
                            Test Chatbot
                        </Button>
                    </div>
                    <div className="sm:align-center sm:flex mb-4 w-full ">
                        <div className=" flex w-[50%] text-xl border-b ">
                            <label className=" font-semibold text-white flex gap-4 items-end ">Unique Id
                                <p className=" text-slate-300">{chatbot?.uuid}</p>
                            </label>
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex mb-4 w-full ">
                        <div className=" flex w-[100%] text-xl border-b ">
                            <label className=" font-semibold text-white flex gap-4 items-end ">Base Prompt
                                <p className=" text-slate-300">{chatbot?.prompt}</p>
                            </label>
                        </div>
                    </div>
                    <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-full text-xl border-b ">
                            <label className=" font-semibold text-white flex gap-4 items-end ">Creativity
                                <p className=" text-slate-300">{chatbot?.creativity}</p>
                            </label>
                        </div>
                    </div>
                    {/* <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-full text-xl border-b ">
                            <label className=" font-semibold text-white flex gap-4 items-end ">Score (AI)
                                <p className=" text-slate-300">{lead?.score}</p>
                            </label>
                        </div>
                    </div> */}
                    
                    <div className="sm:align-center sm:flex w-full mb-4 ">
                        <div className=" flex w-full text-xl border-b ">
                            <label className=" font-semibold text-white flex gap-4 items-end w-full ">Conversation
                                <div id="cbody" className=" flex max-h-[400px] w-full max-w-2xl flex-col p-2 overflow-y-auto border border-pink-500 rounded-sm ">
                                        {/* {parsedconv} */}
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>;
}