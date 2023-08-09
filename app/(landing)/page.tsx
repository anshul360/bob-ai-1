import Pricing from '@/components/Pricing';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import SBVS from '@/components/TestVectorStore';

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  return (
    <>
      <div className=" flex w-full flex-col ">
        <div className=" fixed top-0 h-[800px] w-full" style={{backgroundColor: "#00ffff", backgroundImage: "url(/lib/image/b/bg_wave.webp)", transform: "rotate(180deg)"}} ></div>
        <div className=" fixed top-[450px] h-[400px] w-full" style={{backgroundColor: "#00ffff", backgroundImage: "url(/lib/image/b/bg_wave.webp)", backgroundSize: "100% 400px", backgroundRepeat: "no-repeat"}} ></div>
        {/* <SBVS session={session} /> */}
        <Pricing
          session={session}
          user={session?.user}
          products={products}
          subscription={subscription}
        />
      </div>
    </>
  );
}
