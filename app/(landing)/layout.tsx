import SupabaseProvider from '@/app/supabase-provider';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
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
        <link rel="shortcut icon" href="/lib/image/b/CyanArrow_8.png" />
        <Script>
          {`(function(doc, tag, id) {
              if (doc.getElementById(id)) {return;}
              js = doc.createElement(tag);
              js.id = id;
              js.src = 'http://192.168.1.11:3000/lib/widget/v1/agent.min.js';
              js.type = 'text/javascript';
              js.defer = 1;
              doc.body.appendChild(js);
              window.supportagentloaded = false;
          }(document, 'script', 'e2bf4ca8-f931-48c9-8886-701eda3434e7'));`}
      </Script>
      </head>
      <body className="bg-black loading selection:bg-cyan-300 selection:text-slate-800">
        <SupabaseProvider>
          {/* @ts-expect-error */}
          <Navbar currentPath='/pricing'/>
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
          >
            {children}
          </main>
          <Footer />
        </SupabaseProvider>
      </body>
    </>
  );
}
