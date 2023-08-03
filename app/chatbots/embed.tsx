export default function Embed({botId}: any) {

    const ecode = 
`<script>
    (function(doc, tag, id) {
        if (doc.getElementById(id)) {return;}
        js = doc.createElement(tag);
        js.id = id;
        js.src = '${process.env.NEXT_PUBLIC_SCRIPT_URL}';
        js.type = 'text/javascript';
        js.defer = 1;
        doc.head.appendChild(js);
        window.chatbot_id = id;
    }(document, 'script', '${botId}'));
</script>`

    return<>
        <div className=" flex w-full gap-4 flex-col md:flex-row">
            <section className="mb-12 bg-zinc-900 w-full border-0 rounded-md border-pink-500 ">
                <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-8 lg:px-8 ">
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                            Embed Chatbot
                        </h1>
                    </div>
                    <div className="sm:align-center sm:flex sm:flex-col mb-4 ">
                        <div className="flex w-full flex-col items-center">
                            <p className=" gap-2 w-full text-center my-4 text-xl ">To embed this cahtbot add the following script to your website pages <br/>Make sure the vsibility of the chatbot is set to <b>Public</b> in <b>Base Config</b> tab.</p>
                            <code className=" prose-pre:w-full prose-pre:bg-zinc-800 w-full p-4 rounded-sm whitespace-nowrap justify-center relative text-xl ">
                                
                                <pre className=" rounded-sm p-2 ">
                                    {ecode}
                                </pre>
                                
                                <div className=" flex p-2 items-center justify-center cursor-pointer hover:bg-zinc-500 text-pink-500 absolute top-5 right-5 " title="Copy script" onClick={() => navigator.clipboard.writeText(ecode)}>
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.3em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                </div>
                            </code>
                        </div>
                        {/* <p className=" flex gap-2 w-full justify-center mt-4">If the chatbot's visibility is set to Private. To embed the chatbot in your website change the visibility to Public from <b>Base Config</b> tab.</p> */}
                    </div>
                </div>
            </section>
        </div>
    </>
}