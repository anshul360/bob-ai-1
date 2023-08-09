import { PropsWithChildren } from 'react';
import 'styles/main.css';

const meta = {
  title: 'CyanArrow - Grow with us!',
  description: 'A New Way To Attract More Customers',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.png',
  url: 'https://www.cyanarrow.com',
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
    <html lang="en" className="  ">
      {children}
    </html>
  );
}
