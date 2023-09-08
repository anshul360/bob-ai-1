import Link from 'next/link';
import Image from 'next/image';

import Logo from '@/components/icons/Logo';
import GitHub from '@/components/icons/GitHub';

export default function Footer() {
  const newwin = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 
    1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"></path>
    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"></path>
  </svg>;

  return (
    <footer className=" relative mx-auto max-w-[1920px] px-6 bg-zinc-900">
      <div className="grid grid-cols-1 gap-8 py-12 justify-center text-white transition-colors duration-150 border-b lg:grid-cols-12 border-zinc-600 bg-zinc-900">
        <div className="col-span-2 lg:col-span-4">
        <Link href="/" className={` flex font-bold items-center text-white gap-2`} aria-label="Logo" >
              <div className=' flex lg:w-10 lg:h-10 h-7 w-7 justify-start items-start overflow-hidden '>
                <Image src="/lib/image/b/logo.svg" height={100} width={100} alt="Cyan Arrow"/>
              </div>
              <span className=" text-xl lg:text-2xl font-bold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-[#00ffff] to-cyan-500">Cyan Arrow</span>
              {/* <Logo className=' absolute'/> */}
            </Link>
        </div>
        <div className="col-span-2 lg:col-span-4">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Home
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/about" target='_blank'
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200 flex gap-2 items-center"
              >
                About {newwin}
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/contact" target='_blank'
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200 flex gap-2 items-center"
              >
                Contact Us {newwin}
              </Link>
            </li><li className="py-3 md:py-0 md:pb-4">
              <Link
                href="https://calendly.com/anshulkumar-ca?background_color=27272a&text_color=ffffff&primary_color=00ffff" target='_blank'
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200 flex gap-2 items-center"
              >
                Book a Demo {newwin}
              </Link>
            </li>
            {/* <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Careers
              </Link>
            </li> */}
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/blog" target='_blank'
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200 flex gap-2 items-center"
              >
                Blog {newwin}
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 lg:col-span-4">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="font-bold text-white transition duration-150 ease-in-out hover:text-zinc-200">
                LEGAL
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/privacy" target='_blank'
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200 flex gap-2 items-center"
              >
                Privacy Policy {newwin}
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/terms" target='_blank'
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200 flex gap-2 items-center"
              >
                Terms of Use {newwin}
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="flex items-start col-span-1 text-white lg:col-span-6 lg:justify-end">
          <div className="flex items-center h-10 space-x-6">
            <a
              aria-label="Github Repository"
              href="https://github.com/vercel/nextjs-subscription-payments"
            >
              <GitHub />
            </a>
          </div>
        </div> */}
      </div>
      <div className="flex flex-col items-center justify-center py-12 space-y-4 md:flex-row bg-zinc-900">
        <div>
          <span className=" flex flex-col gap-2 items-center   ">
            <Image src="/lib/image/indiaFl1.png" height={100} width={100} alt="A Product of India" className=" w-10 rounded-sm overflow-hidden " title="A Product of India" />&copy; {new Date().getFullYear()} Cyan Arrow. All rights reserved.
          </span>
        </div>
        {/* <div className="flex items-center">
          <span className="text-white">Crafted by</span>
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            <img
              src="/vercel.svg"
              alt="Vercel.com Logo"
              className="inline-block h-6 ml-4 text-white"
            />
          </a>
        </div> */}
      </div>
    </footer>
  );
}
