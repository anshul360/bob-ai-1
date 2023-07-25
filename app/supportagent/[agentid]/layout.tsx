import Script from 'next/script';
import { PropsWithChildren } from 'react';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <>
      <body className="bg-black loading selection:bg-pink-300 selection:text-slate-800">
        
          
          {/* <Navbar currentPath='/leads'/> */}
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)] px-4"
          >
            {children}
          </main>
          {/* <Footer /> */}
        
      </body>
    </>
  );
}
