import dynamic from 'next/dynamic'
import Link from 'next/link'
// const ChatbotGuide = dynamic(() => import('./start/chatbotguide'), { ssr: false });


export default async function AboutPage() {

  return <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-12 sm:py-[60px] sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0" >
    <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
        <h1 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
            Help Documents
        </h1>
    </div>
  <div className=" mt-1 text-lg text-white sm:text-2xl" suppressHydrationWarning={true} >
      {/* <h1 className=" p-2 pb-0 font-bold text-cyan-600 ">Documents</h1> */}
      <ul className=" list-decimal list-inside p-2  ">
          <li><Link href="/docs/start" className=" cursor-pointer underline decoration-cyan-600 decoration-2 hover:decoration-4">Gettting Started</Link></li>
          <li><Link href="/docs/refine" className=" cursor-pointer underline decoration-cyan-600 decoration-2 hover:decoration-4">Finetune Chatbot</Link></li>
          <li><Link href="/docs/export" className=" cursor-pointer underline decoration-cyan-600 decoration-2 hover:decoration-4">Export Leads, Conversations</Link></li>
      </ul>
  </div>
</div>
}
