// app/page.jsx
import Hero from "@/components/Hero/Hero";
import WhatIsEmi from "@/components/emifaq/WhatIsEmi";
import WhyEmiMitra from "@/components/emifaq/WhyEmiMitra";
import CalculatorGrid from "@/components/comman/CalculatorGrid";
// import PwaInstall from "@/components/comman/PWAinstall";
import BlogPreview from "@/components/comman/BlogPreview";
import EmiFaq from "@/components/emifaq/EmiFaq";

// SEO Metadata
export async function generateMetadata() {
  return {
    title: "EMI Mitra - Your Trusted EMI Calculator for Loans",
    description:
      "EMI Mitra offers easy EMI calculators for home loans, car loans, bike loans, product purchases, and salary-based loans. Calculate monthly payments instantly with accurate breakdowns.",
    keywords:
      "EMI calculator, home loan EMI calculator, car loan calculator, bike loan calculator, loan calculator, product EMI, salary-based loan, EMI Mitra",
    authors: [
      { name: "EMI Mitra Team", url: "https://md-faizan-ahmad.web.app/" },
    ],
    robots: "index, follow",
    alternates: { canonical: "https://emimitra.online" },
    openGraph: {
      title: "EMI Mitra - EMI Calculator for Loans",
      description:
        "Calculate EMIs for home loans, car loans, bike loans, and more with EMI Mitra’s user-friendly tools.",
      url: "https://emimitra.online",
      siteName: "EMI Mitra",
      images: [
        { url: "/logo.png", width: 1200, height: 630, alt: "EMI Mitra Logo" },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "EMI Mitra - EMI Calculator for Loans",
      description:
        "Use EMI Mitra’s EMI calculators for accurate loan payment estimates.",
      images: ["/logo.png"],
    },
    other: { "google-adsense-account": "ca-pub-3782365559827375" },
  };
}

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "EMI Mitra",
  description:
    "EMI Mitra provides EMI calculators for home loans, car loans, bike loans, product purchases, and salary-based loans.",
  url: "https://emimitra.online",
  publisher: {
    "@type": "Organization",
    name: "EMI Mitra",
    logo: { "@type": "ImageObject", url: "https://emimitra.online/logo.png" },
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div
        itemScope
        itemType="http://schema.org/FinancialService"
        className="min-h-screen backdrop-blur-lg"
      >
        <main className=" mx-auto  sm:px-6 lg:px-8">
          <Hero />
          <WhatIsEmi />
          <WhyEmiMitra />
          <CalculatorGrid />
          {/*   <PwaInstall />*/}

          <BlogPreview />
          <EmiFaq />
        </main>
      </div>
    </>
  );
}
