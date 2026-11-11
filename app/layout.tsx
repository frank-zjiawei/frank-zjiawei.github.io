import type { Metadata } from 'next';
import { Libre_Baskerville, Libre_Franklin, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CommandMenu } from '@/components/CommandMenu';
import { ConstructionBanner } from '@/components/ConstructionBanner';
import { NebulaFab } from '@/components/NebulaFab';
import { profile } from '@/content/profile';

const serif = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://frank-zjiawei.github.io'),
  title: {
    default: 'Jiawei Zhang — AI in Education · Learning Analytics',
    template: '%s — Jiawei Zhang',
  },
  description: profile.metaDescription,
  keywords: [
    'Jiawei Zhang',
    'Frank Zhang',
    'AI in Education',
    'Learning Sciences',
    'Learning Analytics',
    'Multimodal Learning Analytics',
    'Harvard Graduate School of Education',
    'Learning Innovation and Technology Lab',
  ],
  authors: [{ name: 'Jiawei Zhang' }],
  openGraph: {
    title: 'Jiawei Zhang — AI in Education · Learning Analytics',
    description: profile.metaDescription,
    type: 'website',
    images: [{ url: '/images/profile-900.jpg', width: 886, height: 900 }],
  },
  twitter: {
    card: 'summary',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans">
        <div className="relative z-10 flex min-h-screen flex-col">
          <ConstructionBanner />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <NebulaFab />
        <CommandMenu />
      </body>
    </html>
  );
}
