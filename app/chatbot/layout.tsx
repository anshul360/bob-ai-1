// 'use client'

import { Inter } from 'next/font/google'
// import { FirebaseAppProvider } from 'reactfire';

// const firebaseConfig = {
//   apiKey: "AIzaSyAlc__n0JLRvyue-QDF_x3nQByTDOpbCmk",
//   authDomain: "scouthangout.firebaseapp.com",
//   databaseURL: "https://scouthangout-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "scouthangout",
//   storageBucket: "scouthangout.appspot.com",
//   messagingSenderId: "518444955661",
//   appId: "1:518444955661:web:59e9a15889ff573f03bd44",
//   measurementId: "G-DKVCQ0Q7GW"
// };
import type { Metadata } from 'next'

const meta = {
  title: 'Cyan Arrow - Grow with us!',
  description: 'A New Way To Attract More Customers',
  cardImage: '/og.png',
  robots: 'nofollow, noindex',
  favicon: '/favicon.ico',
  url: 'https://www.cyanarrow.com',
  type: "website"
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cyanarrow.com'),
  alternates: {
    canonical: '/chatbot'
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

const inter = Inter({ subsets: ['latin'] })


export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>
     
    <head>
      <link rel="shortcut icon" href="/lib/image/b/CyanArrow_8.png"  sizes="any" />
    </head>
    <body className=" loading selection:bg-cyan-300 selection:text-slate-800 ">
      {children}
    </body> 
   
  </>)
}
