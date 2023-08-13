import Link from 'next/link';
import Image from 'next/image';
import { createServerSupabaseClient } from '@/app/supabase-server';

import Logo from '@/components/icons/Logo';
import SignOutButton from './SignOutButton';

import s from './Navbar.module.css';

export default async function Navbar({ currentPath } : {currentPath: string}) {

  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const launch = process.env.NEXT_PUBLIC_DEV_STAGE;

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-4">
          <div className="flex items-center flex-1">
            <Link href="/" className={s.logo} aria-label="Logo" >
              <div className=' flex w-10 h-10 justify-start items-start overflow-hidden '>
                <Image src="/lib/image/b/CyanArrow_8b.svg" height={100} width={100} alt="Cyan Arrow"/>
              </div>
              {/* <Logo className=' absolute'/> */}
            </Link>
            <nav className="hidden ml-6 space-x-2 lg:block">
              <Link href="/" className={`${s.link} ${currentPath==="/pricing"?" !text-[#00ffff] !font-bold ": ""} `}>
                Home
              </Link>
              {user && (
                <>
                  {/* <Link href="/dashboard" className={`${s.link} ${currentPath==="/dashboard"?" !text-[#00ffff] !font-bold ": ""} `}>
                    Dashboard
                  </Link> */}
                  <Link href="/chatbots" className={`${s.link} ${currentPath==="/chatbots"?" !text-[#00ffff] !font-bold ": ""} `}>
                    Chatbots
                  </Link>
                  <Link href="/leads" className={`${s.link} ${currentPath==="/leads"?" !text-[#00ffff] !font-bold ": ""} `}>
                    Leads
                  </Link>
                  <Link href="/conversations" className={`${s.link} ${currentPath==="/conversations"?" !text-[#00ffff] !font-bold ": ""} `}>
                    Conversations
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex justify-end space-x-8">
            {user ? (
              <>
              <Link href="/account" className={`${s.link} ${currentPath==="/account"?" !text-[#00ffff] !font-bold ": ""} `}>
                Account
              </Link><SignOutButton /></>
            ) : (
              launch=="cs"?<></>:<Link href="/signin" className={s.link}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
