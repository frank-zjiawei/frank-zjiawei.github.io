import type { Metadata } from 'next';
import { Libre_Baskerville, Libre_Franklin, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CommandMenu } from '@/components/CommandMenu';
import { ConstructionBanner } from '@/components/ConstructionBanner';

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
    default: 'Jiawei Zhang — Researcher · Analytics · Learning Design',
    template: '%s — Jiawei Zhang',
  },
  description:
    'Personal site of Jiawei Zhang. Researcher at Harvard GSE LIT Lab · Business Analytics & BD at HBS Foundry · MIT cross-registered.',
  keywords: [
    'Jiawei Zhang',
    'Frank Zhang',
    'Harvard GSE',
    'HBS Foundry',
    'MIT',
    'Learning Design',
    'Business Analytics',
    'Portfolio',
  ],
  authors: [{ name: 'Jiawei Zhang' }],
  openGraph: {
    title: 'Jiawei Zhang',
    description:
      'Researcher at HGSE LIT Lab · Analytics & BD at HBS Foundry.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
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
        <CommandMenu />
      </body>
    </html>
  );
}
