import Pricing from '@/components/Pricing';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import SBVS from '@/components/TestVectorStore';
import Hero from './hero';

export default async function PricingPage() {
  // const [session, products, subscription] = await Promise.all([
  //   getSession(),
  //   getActiveProductsWithPrices(),
  //   getSubscription()
  // ]);
  const launch = process.env.NEXT_PUBLIC_DEV_STAGE;
  return (
    <>
      <div className=" flex w-full flex-col ">
        {/* <div className=" fixed top-0 h-[800px] w-full" style={{backgroundColor: "#00ffff", backgroundImage: "url(/lib/image/b/bg_wave.webp)", transform: "rotate(180deg)", backgroundSize: "auto auto"}} ></div>
        <div className=" fixed top-[450px] h-[500px] w-full" style={{backgroundColor: "#00ffff", backgroundImage: "url(/lib/image/b/bg_wave.webp)", backgroundSize: "auto auto", backgroundPositionY: "-250px"}} ></div> */}
        {/* <SBVS session={session} /> */}
        {launch=="cs"?<section className="dark:bg-black bg-zinc-200 ">{/** className="dark:bg-black bg-zinc-200 "  */}
          <div className="relative max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center items-center">
              <h1 className="text-4xl font-extrabold dark:text-white sm:text-center sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r via-cyan-400 from-[#00ffff]  to-zinc-800 h-20 w-fit">
                Cyan Arrow
              </h1>
              <p className="max-w-2xl m-auto font-bold mt-5 text-2xl dark:text-zinc-200 text-zinc-600 sm:text-center sm:text-2xl">
                An exciting new channel to get more leads on your website with Chatbots trained on your data within minutes. <br/>Now that is lightning fast!!!
              </p>
            </div>
            <h2 className="text-4xl mt-[100px] font-extrabold dark:text-white text-zinc-800 sm:text-center sm:text-6xl ">
                Coming Soon...
            </h2>
          </div>
        </section>:<>
          <Hero />
          
          {/* <Pricing session={session} user={session?.user} products={products} subscription={subscription} /> */}
        </>}
      </div>
    </>
  );
}
