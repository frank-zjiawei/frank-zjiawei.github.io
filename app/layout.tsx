import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CommandMenu } from '@/components/CommandMenu';

const serif = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

const sans = Inter({
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
    default: 'Jiawei Zhang — Learning Designer · AI Engineer · Researcher',
    template: '%s — Jiawei Zhang',
  },
  description:
    'Personal site of Jiawei Zhang. Harvard GSE · MIT Media Lab. Research and projects at the intersection of AI, learning design, and business analytics.',
  keywords: [
    'Jiawei Zhang',
    'Frank Zhang',
    'Harvard GSE',
    'MIT Media Lab',
    'Learning Design',
    'AI Engineer',
    'Business Analytics',
    'Portfolio',
  ],
  authors: [{ name: 'Jiawei Zhang' }],
  openGraph: {
    title: 'Jiawei Zhang',
    description:
      'Learning Designer · AI Engineer · Researcher. Harvard GSE · MIT Media Lab.',
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
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CommandMenu />
      </body>
    </html>
  );
}
