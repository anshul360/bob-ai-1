import SupabaseProvider from '@/app/supabase-provider';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import Script from 'next/script';
import { PropsWithChildren } from 'react';import type { Metadata } from 'next';
// import { PopupWidget } from "react-calendly";

const meta = {
  title: 'Cyan Arrow - Grow with us!',
  description: 'A New Way To Attract More Customers',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: 'https://www.cyanarrow.com',
  type: "website"
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cyanarrow.com'),
  alternates: {
    canonical: '/'
  },
  title: 'Cyan Arrow - Grow with us!',
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
          {/* @ts-expect-error */}
          <Navbar currentPath='/'/>
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
