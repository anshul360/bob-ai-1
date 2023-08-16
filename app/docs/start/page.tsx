import dynamic from 'next/dynamic'
const ChatbotGuide = dynamic(() => import('./chatbotguide'), { ssr: false });


export default async function StartPage() {

  return <ChatbotGuide />
}
