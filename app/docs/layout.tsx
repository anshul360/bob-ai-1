// import SupabaseProvider from '@/app/supabase-provider';
import Footer from '@/components/ui/Footer';
// import Navbar from '@/components/ui/Navbar';
// import Script from 'next/script';
import { PropsWithChildren } from 'react';
import SupabaseProvider from '../supabase-provider';
import Navbar from '@/components/ui/Navbar';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <>
      <head>
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
