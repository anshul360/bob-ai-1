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

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center flex-1">
            <Link href="/" className={s.logo} aria-label="Logo" >
              <div className=' flex w-10 h-10 justify-start items-start overflow-hidden '>
                <Image src="/bobchat_avatar.svg" height={100} width={100} alt="BobAI"/>
              </div>
              {/* <Logo className=' absolute'/> */}
            </Link>
            <nav className="hidden ml-6 space-x-2 lg:block">
              <Link href="/" className={`${s.link} ${currentPath==="/pricing"?" !text-pink-500 !font-bold ": ""} `}>
                Pricing
              </Link>
              {user && (
                <>
                  <Link href="/account" className={`${s.link} ${currentPath==="/account"?" !text-pink-500 !font-bold ": ""} `}>
                    Account
                  </Link>
                  <Link href="/dashboard" className={`${s.link} ${currentPath==="/dashboard"?" !text-pink-500 !font-bold ": ""} `}>
                    Dashboard
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex justify-end flex-1 space-x-8">
            {user ? (
              <SignOutButton />
            ) : (
              <Link href="/signin" className={s.link}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
