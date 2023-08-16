import dynamic from 'next/dynamic'
const RefineGuide = dynamic(() => import('./refineguide'), { ssr: false });


export default async function AboutPage() {

  return <RefineGuide />
}
