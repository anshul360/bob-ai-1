import Script from 'next/script';
import PricingMain from './pricingmain';
import PricingAlt from './pricingalt';
import { getActiveProductsWithPrices, getSession, getSubscriptionAll, getUserDetails, getUserDetailsId } from '../supabase-server';

export default async function PricingPage() {
    // const [session, products, subscription] = await Promise.all([
    //   getSession(),
    //   getActiveProductsWithPrices(),
    //   getSubscription()
    // ]);
    const [session, subscriptions, prowpri, user1] = await Promise.all([
        getSession(),
        getSubscriptionAll(),
        getActiveProductsWithPrices(),
        getUserDetails()
    ]);
    const user = await getUserDetailsId(session?.user.id!);
    /**stripe test env */
    // const submp: any = {
    //     b: "price_1NgkDiSIKpTeZ6VR4ePqK5FB", //1600
    //     p: "price_1NgkEDSIKpTeZ6VRz7UMlm6q"  //6000
    // }

    // const subap: any = {
    //     b: "price_1NgkDjSIKpTeZ6VRMOkaKtRc", //16800
    //     p: "price_1NgkEDSIKpTeZ6VRvbajHBGP"  //60000
    // }

    /**stripe prod env */
    const submp: any = {
        b: "price_1Ngg5ESIKpTeZ6VR8JUgE2XF", //1600
        p: "price_1Ngg75SIKpTeZ6VRy1lxD7st"  //6000
    }

    const subap: any = {
        b: "price_1Ngg5ESIKpTeZ6VRGHttfM4W", //16800
        p: "price_1Ngg75SIKpTeZ6VRKLpFDnKZ"  //60000
    }

    let wlabeled = false;
    let core = false;
    
    // console.log("-=-user-=-", user);
    // console.log("-=-sub-=-",subscriptions);

    if(user) {
        wlabeled = user.white_labeled ?? false;

        if(subscriptions) {
            subscriptions.map((sub: any) => {
                if(sub.prices?.id === submp['b'] || sub.prices?.id === subap['b'] || sub.prices?.id === submp['p'] || sub.prices?.id === subap['p']) {
                    core = true;
                }
            });
        }
    } 
    // console.log("-=-core-=-",core,"-=-wl-=-",wlabeled);
    // const launch = process.env.NEXT_PUBLIC_DEV_STAGE;
    return <>
        <PricingAlt session={session} subscriptions={subscriptions} prowpri={prowpri} wlabeled={wlabeled} core={core}/>
    </>;
}