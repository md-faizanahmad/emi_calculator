// import type { Metadata } from "next";
// import "./globals.css";
// import { Analytics } from "@vercel/analytics/next";
// import Head from "next/head";
// import { SpeedInsights } from "@vercel/speed-insights/next";

// export const metadata: Metadata = {
//   title: "EMI Calculator | Home Loan , Car Loan",
//   description:
//     "Calculate your EMI for products, home loans, and car loans with ease.",
//   keywords: ["EMI calculator", "loan calculator", "Emi Mitra", "finance tool"],
//   openGraph: {
//     title: "EMI Calculator",
//     description: "Calculate your EMI with our user-friendly tool.",
//     url: "https://emimitra.online/",
//     siteName: "EMI Calculator",
//     images: [
//       {
//         url: "logo.png", // Place an image in public/
//         width: 1200,
//         height: 630,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "EMI Calculator",
//     description: "Calculate your EMI for various loans.",
//     images: ["/logo.png"],
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <Head>
//         <link rel="manifest" href="/manifest.json" />
//         <meta name="theme-color" content="#000000" />
//       </Head>
//       <body className="bg-gray-50">
//         {children}
//         <Analytics />
//         <SpeedInsights />
//       </body>
//     </html>
//   );
// }

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://emimitra.online"),
  title: "EMI Calculator | Home Loan, Car Loan",
  description:
    "Calculate your EMI for products, home loans, and car loans with ease.",
  keywords: ["EMI calculator", "loan calculator", "Emi Mitra", "finance tool"],
  openGraph: {
    title: "EMI Calculator",
    description: "Calculate your EMI with our user-friendly tool.",
    url: "https://emimitra.online/",
    siteName: "EMI Calculator",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMI Calculator",
    description: "Calculate your EMI for various loans.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager (head) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q3CN6EGW8Y"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q3CN6EGW8Y');
          `}
        </Script>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-gray-50">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NL7VL79F"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3782365559827375"
          crossOrigin="anonymous"
        />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
