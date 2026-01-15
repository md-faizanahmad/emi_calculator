// app/blog/page.tsx
import { Metadata } from "next";
import { Header } from "@/components/header/Header";
import Footer from "@/components/comman/Footer";
import BlogListClient from "@/components/blog/BlogListClient";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { readFile } from "fs/promises";
import path from "path";

// Define TypeScript interface for blog post
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
}

// Fetch blog posts from JSON file
async function fetchBlogPosts(): Promise<BlogPost[]> {
  const filePath = path.join(process.cwd(), "data", "blogs.json");
  const jsonData = await readFile(filePath, "utf-8");
  return JSON.parse(jsonData);
}

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "EMI Mitra Blog - Loan Tips and Financial Insights",
    description:
      "Explore the EMI Mitra blog for expert tips on loans, EMI calculations, and financial planning. Stay informed with our latest articles.",
    keywords:
      "EMI Mitra blog, loan tips, EMI calculator guide, financial planning, loan management",
    authors: [
      { name: "EMI Mitra Team", url: "https://md-faizan-ahmad.web.app/" },
    ],
    robots: "index, follow",
    alternates: { canonical: "https://emimitra.online/blog" },
    openGraph: {
      title: "EMI Mitra Blog - Loan Tips and Financial Insights",
      description:
        "Read the latest articles on loan management and EMI calculations from EMI Mitra.",
      url: "https://emimitra.online/blog",
      siteName: "EMI Mitra",
      images: [
        { url: "/logo.png", width: 1200, height: 630, alt: "EMI Mitra Logo" },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "EMI Mitra Blog - Loan Tips and Financial Insights",
      description:
        "Discover expert advice on loans and EMI calculations on the EMI Mitra blog.",
      images: ["/logo.png"],
    },
    other: { "google-adsense-account": "ca-pub-3782365559827375" },
  };
}

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "EMI Mitra Blog",
  description:
    "The EMI Mitra blog provides insights on loans, EMI calculations, and financial planning.",
  url: "https://emimitra.online/blog",
  publisher: {
    "@type": "Organization",
    name: "EMI Mitra",
    logo: { "@type": "ImageObject", url: "https://emimitra.online/logo.png" },
  },
};

export default async function BlogPage() {
  const blogPosts = await fetchBlogPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Analytics />
      <SpeedInsights />
      <div
        itemScope
        itemType="http://schema.org/Blog"
        className="min-h-screen bg-gray-50"
      >
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section className="text-center py-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              EMI Mitra Blog
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Expert tips and insights on loans, EMI calculations, and financial
              planning.
            </p>
          </section>
          <BlogListClient blogPosts={blogPosts} />
        </main>
        <Footer />
      </div>
    </>
  );
}
