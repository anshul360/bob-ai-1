
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import Button from '@/components/ui/Button';
// import { Database } from '@/types_db';
// import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
// import { revalidatePath } from 'next/cache';
// import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function BlogPage() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const user = session?.user;

  if (!session) {
    return redirect('/signin');
  }

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription![0]?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription![0]?.prices?.unit_amount || 0) / 100);

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
            Recent Posts
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Here you can find welth of information related to attracting and capturing new leads.
          </p>
        </div>
      </div>
      
    </section>
  );
}

interface Props {
  title: string;
  description?: string;
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
