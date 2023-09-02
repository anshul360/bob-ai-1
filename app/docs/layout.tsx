// import SupabaseProvider from '@/app/supabase-provider';
import Footer from '@/components/ui/Footer';
// import Navbar from '@/components/ui/Navbar';
// import Script from 'next/script';
import { PropsWithChildren } from 'react';
import SupabaseProvider from '../supabase-provider';
import Navbar from '@/components/ui/Navbar';
import type { Metadata } from 'next'
import Script from 'next/script';

const meta = {
  title: 'Help Docs - Cyan Arrow',
  description: 'Engage your website visitors. Get more leads. Increase Conversion rates.',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: 'https://www.cyanarrow.com',
  type: "website"
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cyanarrow.com'),
  alternates: {
    canonical: '/docs'
  },
  title: 'Help Docs - Cyan Arrow',
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
      <head>
      {process.env.NEXT_PUBLIC_DEV_STAGE=='p'?<Script type="text/javascript">{`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "iou18u3cgf");`}
        </Script>:<></>}
      </head>
      <body className="bg-black loading selection:bg-cyan-300 selection:text-slate-800">
        <SupabaseProvider>
          {/* @ts-expect-error */}
          <Navbar currentPath='/docs'/>
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
