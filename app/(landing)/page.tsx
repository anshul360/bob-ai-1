import Pricing from '@/components/Pricing';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import SBVS from '@/components/TestVectorStore';
import Hero from './heroalt1';
import Script from 'next/script';

export default async function PricingPage({searchParams}: any) {
  // const [session, products, subscription] = await Promise.all([
  //   getSession(),
  //   getActiveProductsWithPrices(),
  //   getSubscription()
  // ]);
  const [session] = await Promise.all([
    getSession()
  ]);

  if(searchParams && searchParams.s) {
    console.log("source--->",searchParams.s);
  }
  
  return (
    <>
      <Script>
          {`(function(doc, tag, id) {
              if (doc.getElementById(id)) {
                doc.body.removeChild(doc.getElementById(id));
              }
              js = doc.createElement(tag);
              js.id = id;
              js.src = '${process.env.NEXT_PUBLIC_SCRIPT_URL}';
              js.type = 'text/javascript';
              js.defer = 1;
              doc.body.appendChild(js);
              window.supportagentloaded = false;
          }(document, 'script', 'e2bf4ca8-f931-48c9-8886-701eda3434e7'));`}
      </Script>
      <div className=" flex w-full flex-col ">
          <Hero session={session} />
      </div>
    </>
  );
}
