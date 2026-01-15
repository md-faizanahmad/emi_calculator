"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, CalendarDays } from "lucide-react";

export default function BlogPreviewClient({ blogPosts }) {
  return (
    <section className="py-12 overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 mb-8 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Latest from <span className="text-blue-600">Our Blog</span>
        </h2>
        <Link
          href="/blog"
          className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:underline"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div
        className="flex overflow-x-auto pb-6 px-4 gap-4 snap-x snap-mandatory scrollbar-hide 
                   sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:max-w-6xl sm:mx-auto sm:overflow-visible sm:pb-0"
      >
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="min-w-[78%] sm:min-w-full snap-center bg-white rounded-2xl border border-gray-100 
                       shadow-sm hover:shadow-md transition-all flex flex-col shrink-0 group"
          >
            {/* Main Content Padding */}
            <div className="p-5 sm:p-6 flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                  <BookOpen size={12} />
                  Insights
                </div>
                {/* Read Time - Top Right */}
                <div className="flex items-center gap-1 text-[10px] font-medium text-gray-400">
                  <Clock size={10} />
                  {post.readTime || "5 min"} read
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
                {post.excerpt ||
                  "Expert advice on managing your loans and financial planning efficiently."}
              </p>

              {/* Read Button */}
              <Link href={post.url}>
                <button className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Full Post <ArrowRight size={14} />
                </button>
              </Link>
            </div>

            {/* Card Footer - Date Info */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 rounded-b-2xl flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                <CalendarDays size={12} className="text-gray-400" />
                {post.date || "Oct 24, 2023"}
              </div>
              {/* Optional: Author Initial Circle */}
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-[10px] flex items-center justify-center font-bold">
                EM
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
        {blogPosts.map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-blue-600/20" />
        ))}
      </div>
    </section>
  );
}
