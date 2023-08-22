import ManageSubscriptionButton from './ManageSubscriptionButton';
import {
  getSession,
  getUserDetails,
  getSubscription,
  getSubscriptionAll,
  getOnetimeAll,
  getUserDetailsId
} from '@/app/supabase-server';
import Button from '@/components/ui/Button';
// import { Database } from '@/types_db';
// import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
// import { revalidatePath } from 'next/cache';
// import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Apikeygen from './apikeygen';

export default async function Account() {
  const [session, userDetails1, subscriptions, onetimes] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscriptionAll(),
    getOnetimeAll()
  ]);
  // const [session, userDetails, ] = await Promise.all([
  //   getSession(),
  //   getUserDetails(),
  // ]);
  const userDetails = await getUserDetailsId(session?.user.id!);
  /**stripe test env */
  // const coresubp = ["price_1NgkDiSIKpTeZ6VR4ePqK5FB", "price_1NgkEDSIKpTeZ6VRz7UMlm6q", "price_1NgkDjSIKpTeZ6VRMOkaKtRc", "price_1NgkEDSIKpTeZ6VRvbajHBGP"];
  // const addonsubp = ["price_1NhPvsSIKpTeZ6VRCKKIZq4K", "price_1NgkF4SIKpTeZ6VRkW2UAn3R"];
  // const wlp = 'price_1NgkFXSIKpTeZ6VRFtkStR2k';

  /**stripe prod env */
  const coresubp = ["price_1Ngg5ESIKpTeZ6VR8JUgE2XF", "price_1Ngg75SIKpTeZ6VRy1lxD7st", "price_1Ngg5ESIKpTeZ6VRGHttfM4W", "price_1Ngg75SIKpTeZ6VRKLpFDnKZ"];
  const addonsubp = ["price_1Ngg8GSIKpTeZ6VRktAghadZ", "price_1Ngg9BSIKpTeZ6VRV0PxnwL3"];
  const wlp = 'price_1NggA4SIKpTeZ6VRijZtW9yA';

  const user = session?.user;
  let activecoreprod = '';
  let activecoreprice = '';
  let addon = false;
  const addonqmap: any = {};
  const addonpmap: any = {};

  subscriptions?.map((sub: any ) => {
    // subs += sub.prices?.products?.name + ", ";
    const pricet = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: sub.prices.currency,
      minimumFractionDigits: 0
    }).format((sub.prices.unit_amount || 0) / 100);

    if(coresubp.includes(sub.price_id)) {
      activecoreprod += sub.prices.products.name ;
      activecoreprice += pricet + '/' + sub.prices.interval;
    }
    if(addonsubp.includes(sub.price_id)) {
      addon = true;
      addonqmap[sub.prices.products.name] = sub.quantity + (addonqmap[sub.prices.products.name] ?? 0);
      addonpmap[sub.prices.products.name] = pricet + '/' + sub.prices.interval;
    }
  })
  
  onetimes?.map((otp: any) => {
    if(otp.price_id === wlp) {
      addon = true;
      const pricet = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: otp.prices.currency,
        minimumFractionDigits: 0
      }).format((otp.prices.unit_amount || 0) / 100);
      addonqmap[otp.prices.products.name] = 1;
      addonpmap[otp.prices.products.name] = pricet ;
    }
  });

  // console.log("-=-=aoqm=-=-", addonqmap);
  // console.log("-=-=aopm=-=-", addonpmap);

  if (!session) {
    return redirect('/signin');
  }

  // const subscriptionPrice =
  //   subscription &&
  //   new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: subscription![0]?.prices?.currency!,
  //     minimumFractionDigits: 0
  //   }).format((subscription![0]?.prices?.unit_amount || 0) / 100);

  const updateName = async (formData: FormData) => {
    'use server';

    // const newName = formData.get('name') as string;
    // const supabase = createServerActionClient<Database>({ cookies });
    // const session = await getSession();
    // const user = session?.user;
    // const { error } = await supabase
    //   .from('users')
    //   .update({ full_name: newName })
    //   .eq('id', user?.id);
    // if (error) {
    //   console.log(error);
    // }
    // revalidatePath('/account');
  };

  const updateEmail = async (formData: FormData) => {
    'use server';

    // const newEmail = formData.get('email') as string;
    // const supabase = createServerActionClient<Database>({ cookies });
    // const { error } = await supabase.auth.updateUser({ email: newEmail });
    // if (error) {
    //   console.log(error);
    // }
    // revalidatePath('/account');
  };

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Account
          </h1>
          {/* <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            We partnered with Stripe for a simplified billing.
          </p> */}
        </div>
      </div>
      <div className="p-4">
        <Card
          title="Your Plan"
          description={
            activecoreprod
              ? `You are currently on the ${activecoreprod} plan.`:
              'You are not currently subscribed to any plan.'
          }
          footer={<ManageSubscriptionButton session={session} />}
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            {activecoreprice ? (
              activecoreprice
            ) : (
              <Link href="/pricing">Choose your plan</Link>
            )} 
          </div>
        </Card>
        <Card
          title="Your Addons"
          description={
            activecoreprod
              ? `You have purchased following addon(s):`:
              'You have not purchased any addon(s).'
          }
          footer={<ManageSubscriptionButton session={session} />}
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            {Object.keys(addonqmap)?.map((key: string) => {
              return <div key={key}>{key} (x{addonqmap[key]}) {addonpmap[key]}<br/></div>
            })} 
            {/* <Link href="/pricing">Get more Addons</Link> */}
          </div>
        </Card>
        <Card
          title="Your Name"
          description="Please enter your full name, or a display name you are comfortable with."
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">64 characters maximum</p>
              <Button
                variant="slim"
                // type="submit"
                form="nameForm"
                disabled={true}
              >
                {/* WARNING - In Next.js 13.4.x server actions are in alpha and should not be used in production code! */}
                Update Name
              </Button>
            </div>
          }
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            <form id="nameForm" action={updateName}>
              <input
                type="text"
                name="name"
                className="w-1/2 p-3 rounded-md bg-zinc-800"
                defaultValue={userDetails?.full_name ?? ''}
                placeholder="Your name"
                maxLength={64}
              />
            </form>
          </div>
        </Card>
        <Card
          title="Your Email"
          description="Please enter the email address you want to use to login."
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">
                We will email you to verify the change.
              </p>
              <Button
                variant="slim"
                // type="submit"
                form="emailForm"
                disabled={true}
              >
                {/* WARNING - In Next.js 13.4.x server actions are in alpha and should not be used in production code! */}
                Update Email
              </Button>
            </div>
          }
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            <form id="emailForm" action={updateEmail}>
              <input
                type="text"
                name="email"
                className="w-1/2 p-3 rounded-md bg-zinc-800"
                defaultValue={user ? user.email : ''}
                placeholder="Your email"
                maxLength={64}
              />
            </form>
          </div>
        </Card>

        <Card title="Manage API Secrets" description={<><span>Your secret API keys are listed below. Please note that we do not display your secret API keys again after you generate them.</span><br/><span>Do not share your API key with others, or expose it in the browser or other client-side code.</span></>} >
            <Apikeygen userId={userDetails?.id}/>
        </Card>
      </div>
    </section>
  );
}

interface Props {
  title: string;
  description?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl m-auto my-8 border rounded-md p border-zinc-700">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-2xl font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="p-4 border-t rounded-b-md border-zinc-700 bg-zinc-900 text-zinc-500">
        {footer}
      </div>
    </div>
  );
}
