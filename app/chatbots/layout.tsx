import SupabaseProvider from '@/app/supabase-provider';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import Script from 'next/script';
import { PropsWithChildren } from 'react';
import type { Metadata } from 'next'

const meta = {
  title: 'Chatbots - Cyan Arrow',
  description: 'Engage your website visitors. Get more leads. Increase Conversion rates.',
  cardImage: '/og.png',
  robots: 'nofollow, noindex',
  favicon: '/favicon.ico',
  url: 'https://www.cyanarrow.com',
  type: "website"
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cyanarrow.com'),
  alternates: {
    canonical: '/chatbots'
  },
  title: 'Chatbots - Cyan Arrow',
  description: meta.description,
  // cardImage: meta.cardImage,
  robots: meta.robots,
  // favicon: meta.favicon,
  // url: meta.url,
  // type: "website",
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    // cardImage: meta.cardImage,
    type: "website",
    siteName: meta.title,
    images: [{
      url: "https://www.cyanarrow.com/og.png",
    }]
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@vercel',
  //   title: meta.title,
  //   description: meta.description,
  //   // cardImage: meta.cardImage
  // }
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <>
      <body className="bg-black loading selection:bg-cyan-300 selection:text-slate-800">
        <SupabaseProvider>
          {/* @ts-ignore */}
          <Navbar currentPath='/chatbots'/>
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)] px-4 overflow-x-auto "
          >
          {/* <div className="absolute inset-0 bg-[url(/lib/image/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div> */}
            {children}
          </main>
          <Footer />
        </SupabaseProvider>
      </body>
    </>
  );
}
