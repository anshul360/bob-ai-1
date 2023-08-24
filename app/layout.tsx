import Script from 'next/script';
import { PropsWithChildren } from 'react';
import 'styles/main.css';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <html lang="en" className="  ">
      <head>
        <link rel="shortcut icon" type="image/png" href="/favicon.ico" ></link>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"></link>
        <meta name="msapplication-TileColor" content="#27272a"></meta>
        <meta name="theme-color" content="#27272a"></meta>
        {process.env.NEXT_PUBLIC_DEV_STAGE != "cs1"?
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-X5L6SBB5Z8"></Script>
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-X5L6SBB5Z8');
            `}
          </Script>
        </>:
        <></>}
      </head>
      {children}
    </html>
  );
}
