import { Metadata } from "next";
import { Header } from "@/components/header/Header";
import Footer from "@/components/comman/Footer";
import { notFound } from "next/navigation";
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
async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(process.cwd(), "data", "blogs.json");
  const jsonData = await readFile(filePath, "utf-8");
  const posts: BlogPost[] = JSON.parse(jsonData);
  return posts.find((post) => post.slug === slug) || null;
}

// Generate metadata for individual blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>; // Update to Promise
}): Promise<Metadata> {
  const { slug } = await params; // Await the params to get the slug
  const post = await fetchBlogPost(slug);
  if (!post) {
    return {
      title: "Post Not Found - EMI Mitra",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} - EMI Mitra Blog`,
    description: post.excerpt,
    keywords: "EMI Mitra, blog, loan tips, financial planning",
    authors: [
      { name: "EMI Mitra Team", url: "https://md-faizan-ahmad.web.app/" },
    ],
    robots: "index, follow",
    alternates: { canonical: `https://emimitra.online/blogs/${post.slug}` },
    openGraph: {
      title: `${post.title} - EMI Mitra Blog`,
      description: post.excerpt,
      url: `https://emimitra.online/blogs/${post.slug}`,
      siteName: "EMI Mitra",
      images: [
        { url: "/logo.png", width: 1200, height: 630, alt: "EMI Mitra Logo" },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - EMI Mitra Blog`,
      description: post.excerpt,
      images: ["/logo.png"],
    },
  };
}

// Structured Data for individual blog post
function getStructuredData(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `https://emimitra.online/blogs/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "EMI Mitra",
      logo: { "@type": "ImageObject", url: "https://emimitra.online/logo.png" },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>; // Update to Promise
}) {
  const { slug } = await params; // Await the params to get the slug
  const post = await fetchBlogPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData(post)),
        }}
      />
      <div
        itemScope
        itemType="http://schema.org/BlogPosting"
        className="min-h-screen bg-gray-50"
      >
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article>
            <h1
              itemProp="headline"
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              {post.title}
            </h1>
            <p itemProp="datePublished" className="text-sm text-gray-500 mb-4">
              {post.date}
            </p>
            <p itemProp="description" className="text-gray-600 mb-6">
              {post.excerpt}
            </p>
            <div
              itemProp="articleBody"
              className="prose prose-gray max-w-none text-gray-700"
            >
              <p>{post.content}</p>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
