import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sandri Project",
  description: "Sandri project portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Favicon untuk browser umum */}
          <link rel="icon" href="/favicon.ico" />

          {/* Favicon 16x16 */}
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />

          {/* Favicon 32x32 */}
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />

          {/* Favicon untuk perangkat Android */}
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/android-chrome-512x512.png"
          />

          {/* Favicon untuk perangkat Apple */}
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

          {/* Manifest file */}
          <link rel="manifest" href="/site.webmanifest" />

          {/* Set theme color */}
          <meta name="theme-color" content="#ffffff" />
        </head>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
