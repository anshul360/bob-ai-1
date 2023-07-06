import { getSession } from '@/app/supabase-server';
import AuthUI from './AuthUI';
import Image from 'next/image';

import { redirect } from 'next/navigation';
import Logo from '@/components/icons/Logo';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/account');
  }

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center mb-12 ">
          {/* <Logo width="64px" height="64px" /> */}
          <div className=' flex w-[100px] h-[100px] justify-start items-start overflow-hidden '>
            <Image src="/bobchat_avatar.svg" height={100} width={100} alt="BobAI"/>
          </div>
        </div>
        <AuthUI />
      </div>
    </div>
  );
}
