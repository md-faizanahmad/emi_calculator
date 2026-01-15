// src/components/blog/BlogListClient.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";

// Define TypeScript interface for blog post
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
}

// Define props interface
interface BlogListClientProps {
  blogPosts: BlogPost[];
}

export default function BlogListClient({ blogPosts }: BlogListClientProps) {
  // Handle empty or invalid blogPosts
  if (!blogPosts || !Array.isArray(blogPosts) || blogPosts.length === 0) {
    return (
      <section className="py-12 text-center">
        <p className="text-gray-600">No blog posts available at the moment.</p>
      </section>
    );
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Latest Blog Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link href={`/blogs/${post.slug}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Read More
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
