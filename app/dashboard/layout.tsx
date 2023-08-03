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
        {/* <Script id="bobAiLoader">
          {
            `(function(doc, tag, id, bobaibot_id) {
              if (doc.getElementById(id)) {return;}
              js = doc.createElement(tag); 
              js.id = id;
              js.src = window.location.origin + "/lib/widget/v1/chatbot.js";
              js.type = "text/javascript";
              js.defer = 1;
              doc.head.appendChild(js);
              window.bobaibot_id = bobaibot_id;
            }(document, 'script', 'bobAi', 'randomBotId'));`
          }
        </Script> */}
      </head>
      <body className="bg-black loading selection:bg-pink-300 selection:text-slate-800">
        <SupabaseProvider>
          {/* @ts-expect-error */}
          <Navbar currentPath='/dashboard'/>
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)] px-4"
          >
            {children}
          </main>
          <Footer />
        </SupabaseProvider>
      </body>
    </>
  );
}
