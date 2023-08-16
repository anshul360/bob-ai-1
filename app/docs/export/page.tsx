import dynamic from 'next/dynamic'
const ExportGuide = dynamic(() => import('./exportguide'), { ssr: false });


export default async function ExportPage() {

  return <ExportGuide />
}
