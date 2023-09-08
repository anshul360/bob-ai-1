import Link from 'next/link';
import Image from 'next/image';
import { createServerSupabaseClient } from '@/app/supabase-server';

import Logo from '@/components/icons/Logo';
import SignOutButton from './SignOutButton';

import s from './Navbar.module.css';
import Script from 'next/script';
import Hamburger from './hamburger';

export default async function Navbar({ currentPath } : {currentPath: string}) {

  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const launch = process.env.NEXT_PUBLIC_DEV_STAGE;
  <Script>{`
    const btn = document.querySelector("button.mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");
    alert("called");
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });`}
  </Script>

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className=" px-6 mx-auto">
        <div className=" flex flex-row justify-between py-4 align-center md:py-4">
          <div className="flex items-center flex-1 ">
            <Link href="/" className={`${s.logo} flex font-bold items-center text-white gap-2`} aria-label="Logo" >
              <div className=' flex lg:w-10 lg:h-10 h-7 w-7 justify-start items-start overflow-hidden '>
                <Image src="/lib/image/b/logo.svg" height={100} width={100} alt="Cyan Arrow"/>
              </div>
              <span className=" text-xl lg:text-2xl font-bold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-[#00ffff] to-cyan-500">Cyan Arrow</span>
              {/* <Logo className=' absolute'/> */}
            </Link>
            <nav className=" flex flex-1 w-full lg:justify-center justify-end ">
              <div className='hidden ml-6 space-x-2 lg:block'>
                <Link href="/" className={`${s.link} ${currentPath==="/"?" !text-[#00ffff] !font-bold !underline !decoration-2 !underline-offset-8 ": ""} `}>
                  Home
                </Link>
                <Link href="/pricing" className={`${s.link} ${currentPath==="/pricing"?" !text-[#00ffff] !font-bold !underline !decoration-2 !underline-offset-8 ": ""} `}>
                  Pricing
                </Link>
                <Link href="/docs" className={`${s.link} ${currentPath==="/docs"?" !text-[#00ffff] !font-bold !underline !decoration-2 !underline-offset-8 ": ""} `}>
                  Docs
                </Link>
                {user && (
                  <>
                    {/* <Link href="/dashboard" className={`${s.link} ${currentPath==="/dashboard"?" !text-[#00ffff] !font-bold ": ""} `}>
                      Dashboard
                    </Link> */}
                    <Link href="/chatbots" className={`${s.link} ${currentPath==="/chatbots"?" !text-[#00ffff] !font-bold !underline !decoration-2 !underline-offset-8 ": ""} `}>
                      Chatbots
                    </Link>
                    <Link href="/leads" className={`${s.link} ${currentPath==="/leads"?" !text-[#00ffff] !font-bold !underline !decoration-2 !underline-offset-8 ": ""} `}>
                      Leads
                    </Link>
                    <Link href="/conversations" className={`${s.link} ${currentPath==="/conversations"?" !text-[#00ffff] !font-bold !underline !decoration-2 !underline-offset-8 ": ""} `}>
                      Conversations
                    </Link>
                  </>
                )}
              </div>
              <Hamburger s={s} currentPath={currentPath} user={user} />
            </nav>
          </div>
          <div className="lg:flex justify-end space-x-8 hidden">
            {user ? (
              <>
              <Link href="/account" className={`${s.link} ${currentPath==="/account"?" !text-[#00ffff] !font-bold !underline !decoration-2 !underline-offset-8 ": ""} `}>
                Account
              </Link><SignOutButton /></>
            ) : (
              launch=="cs"?<></>:<><Link href="/signin?view=sign_up" className={`${s.link} bg-[#00ffff] !text-zinc-900 rounded-md !px-2 hover:!text-white hover:bg-zinc-900 hover:border hover:border-[#00ffff] transition-colors duration-300 `}>
                Sign up
              </Link>
              <Link href="/signin" className={s.link}>
                Sign in
              </Link></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
