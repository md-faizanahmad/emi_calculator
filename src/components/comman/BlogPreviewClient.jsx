// app/components/BlogPreviewClient.jsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogPreviewClient({ blogPosts }) {
  return (
    <section className="py-12">
      <h2 className="text-3xl cursor-pointer font-bold text-center text-gray-900 mb-8">
        Latest from Our Blog
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white cursor-pointer p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {post.title}
            </h3>
            <Link href={post.url}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
