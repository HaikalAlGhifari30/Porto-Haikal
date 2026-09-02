import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
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

import { FloatingButtonsServer } from "@/components/floating-buttons-server";

export const metadata: Metadata = {
  title: "Haikal Al Ghifari — Quality Assurance Engineer Portfolio",
  description: "Bachelor of Informatics Engineering graduate from UNIKOM (GPA 3.46) specialized in Quality Assurance, Manual Testing, test case design, and software quality validation.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.png?v=3" },
      { url: "/favicon.png?v=3", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >

      <body className="min-h-full flex flex-col transition-colors duration-300">
        <ThemeProvider defaultTheme="dark">
            {children}
            <FloatingButtonsServer />
            <Toaster 
                position="top-right" 
                duration={2000} 
                expand={false}
                richColors
                theme="dark"
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
