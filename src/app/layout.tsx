import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Pixelify_Sans, Press_Start_2P, Silkscreen } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-arcade",
  subsets: ["latin"],
  weight: "400",
});

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
});

import { FloatingButtonsServer } from "@/components/floating-buttons-server";
import { DevNoticeModal } from "@/components/dev-notice-modal";

export const metadata: Metadata = {
  title: "Haikal Al Ghifari — Quality Assurance Specialist Portfolio",
  description: "Dedicated Quality Assurance Specialist currently actively working at COMO 1907 (Global Media Visual). Specialized in manual testing, end-to-end user flow verification, regression testing, and software quality validation.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico?v=6" },
      { url: "/favicon.png?v=6", sizes: "512x512", type: "image/png" },
      { url: "/android-chrome-192x192.png?v=6", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=6",
    apple: [
      { url: "/apple-touch-icon.png?v=6", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-precomposed.png?v=6", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    title: "Haikal AG Portfolio",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`light ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${pixelifySans.variable} ${pressStart.variable} ${silkscreen.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('ui-theme');
                  var theme = (stored === 'dark' || stored === 'light') ? stored : 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF6ED] dark:bg-[#030712] text-zinc-900 dark:text-slate-100 antialiased">
        <ThemeProvider defaultTheme="light">
            {children}
            <FloatingButtonsServer />
            <DevNoticeModal />
            <Toaster 
                position="top-right" 
                duration={2000} 
                expand={false}
                richColors
                theme="system"
                toastOptions={{
                    style: {
                        background: 'rgba(9, 9, 11, 0.8)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        color: '#fff',
                        borderRadius: '1.25rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        padding: '1rem 1.25rem',
                    },
                    className: "font-sans",
                }}
            />
        </ThemeProvider>
      </body>
    </html>
  );
}
