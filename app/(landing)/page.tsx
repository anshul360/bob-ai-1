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
  const launch = process.env.NEXT_PUBLIC_DEV_STAGE;
  return (
    <>
      <div className=" flex w-full flex-col ">
        <div className=" fixed top-0 h-[800px] w-full" style={{backgroundColor: "#00ffff", backgroundImage: "url(/lib/image/b/bg_wave.webp)", transform: "rotate(180deg)", backgroundSize: "auto auto"}} ></div>
        <div className=" fixed top-[450px] h-[500px] w-full" style={{backgroundColor: "#00ffff", backgroundImage: "url(/lib/image/b/bg_wave.webp)", backgroundSize: "auto auto", backgroundPositionY: "-250px"}} ></div>
        {/* <SBVS session={session} /> */}
        {launch=="cs"?<section className="dark:bg-black bg-white ">{/** className="dark:bg-black bg-zinc-200 "  */}
          <div className="relative max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center">
              <h1 className="text-4xl font-extrabold dark:text-white text-zinc-800 sm:text-center sm:text-6xl">
                CyanArrow
              </h1>
              <p className="max-w-2xl m-auto mt-5 text-2xl dark:text-zinc-200 text-zinc-600 sm:text-center sm:text-2xl">
                An exciting new channel to get more leads on your website.
              </p>
            </div>
            <h2 className="text-4xl mt-[100px] font-extrabold dark:text-white text-zinc-800 sm:text-center sm:text-6xl">
                Coming Soon...
            </h2>
          </div>
        </section>:
        <Pricing session={session} user={session?.user} products={products} subscription={subscription} />}
      </div>
    </>
  );
}
