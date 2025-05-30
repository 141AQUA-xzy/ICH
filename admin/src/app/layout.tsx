import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "../../public/context/Loading.ctx";
import { ViewProvider } from "../../public/context/View.ctx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICH-Admin",
  description: "Indian Curry House-Ranjhi,JABALPUR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <LoadingProvider>
      <ViewProvider>
        <html lang="en">
          <head>
            {/* Link to PWA Manifest */}
            <link rel="manifest" href="/manifest.json" />

            {/* PWA Theme Colors */}
            <meta name="theme-color" content="#ffffff" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="mobile-web-app-capable" content="yes" />

            {/* Fallback Icons for Apple Devices */}
            <link rel="apple-touch-icon" sizes="192x192" href="/icons/android-chrome-192x192[1].png" />
            <link rel="apple-touch-icon" sizes="512x512" href="/icons/android-chrome-512x512[1].png" />
          </head>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
          </body>
        </html>
      </ViewProvider>
    </LoadingProvider>
  );
}
