import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ViewProvider } from "../../public/context/View.ctx";
import { CartProvider } from "../../public/context/Cart.ctx";
import { UserProvider } from "../../public/context/Session.ctx";
import { LoadingProvider } from "../../public/context/Loading.ctx";
import { MenuProvider } from "../../public/context/Menu.ctx";
// Import Client Component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICH",
  description: "Indian Curry House-Ranjhi,JABALPUR",
  icons: {
    icon: "/icons/android-chrome-192x192.png",
    apple: "/icons/android-chrome-512x512.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LoadingProvider>
      <MenuProvider>
        <UserProvider>
          <CartProvider>
            <ViewProvider>
              <html lang="en">
                <head>
                  <link rel="manifest" href="/manifest.json" />
                  <meta name="theme-color" content="#000000" />
                  <meta name="apple-mobile-web-app-capable" content="yes" />
                  <meta name="mobile-web-app-capable" content="yes" />

                  {/* Fallback Icons for Apple Devices */}
                  <link rel="apple-touch-icon" sizes="192x192" href="/icons/android-chrome-192x192.png" />
                  <link rel="apple-touch-icon" sizes="512x512" href="/icons/android-chrome-512x512.png" />

                </head>
                <body
                  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                  {children}
                </body>
              </html>
            </ViewProvider>
          </CartProvider>
        </UserProvider>
      </MenuProvider>
    </LoadingProvider>
  );
}
