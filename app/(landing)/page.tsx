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
