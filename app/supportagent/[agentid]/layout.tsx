import Script from 'next/script';
import { PropsWithChildren } from 'react';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <>
      <head>
        <Script src="https://www.google.com/recaptcha/enterprise.js?render=6Ldhw1knAAAAALTeoCS6KE3uiamWFWoJLwJajscG" strategy="beforeInteractive"></Script>
      </head>
      <body className="bg-black loading selection:bg-cyan-300 selection:text-slate-800 prose-">
          
          {/* <Navbar currentPath='/leads'/> */}
          <main id="skip" className="min-h-[calc(100dvh)] md:min-h[calc(100dvh)] px-0" >
            {children}
          </main>
          {/* <Footer /> */}
        
      </body>
    </>
  );
}
