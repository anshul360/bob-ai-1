import SupabaseProvider from './supabase-provider';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import Script from 'next/script';
import { PropsWithChildren } from 'react';
import 'styles/main.css';

const meta = {
  title: 'BobAI - Grow with us!',
  description: 'A New Way To Delight Your Customers',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: 'https://bob-ai-1.vercel.app',
  type: 'website'
};

export const metadata = {
  title: meta.title,
  description: meta.description,
  cardImage: meta.cardImage,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage,
    type: meta.type,
    site_name: meta.title
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vercel',
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage
  }
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <Script id="bobAiLoader">
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
        </Script>
      </head>
      <body className="bg-black loading selection:bg-pink-300 selection:text-slate-800">
        <SupabaseProvider>
          {/* @ts-expect-error */}
          <Navbar />
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
          >
            {children}
          </main>
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
}
