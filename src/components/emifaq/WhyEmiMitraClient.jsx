"use client";
import { motion } from "framer-motion";

export default function WhyEmiMitraClient({ benefits }) {
  return (
    <section className="py-12 px-4 overflow-hidden">
      <h2
        className="text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-12 tracking-tighter"
        style={{ color: "var(--foreground)" }}
      >
        Why Use <span className="text-sky-400">EMI Mitra?</span>
      </h2>

      {/* 1. Changed gap to 3 on mobile (gap-3)
          2. min-w-[65%] makes cards narrower so you see more of the next card
      */}
      <div
        className="flex overflow-x-auto pb-6 gap-3 snap-x snap-mandatory scrollbar-hide 
                   sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:max-w-6xl sm:mx-auto sm:overflow-visible sm:pb-0"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border)",
            }}
            // Reduced mobile padding (p-5) and width (min-w-[65%])
            className="min-w-[65%] sm:min-w-full snap-center p-5 sm:p-8 rounded-2xl sm:rounded-3xl 
                       border backdrop-blur-md shadow-sm hover:shadow-md 
                       hover:border-sky-400/50 transition-all group shrink-0"
          >
            <div className="flex flex-col items-start">
              {/* Scaled down icon for mobile */}
              <span className="text-3xl sm:text-5xl mb-3 sm:mb-6 block group-hover:scale-110 transition-transform">
                {benefit.icon}
              </span>

              <h3
                className="text-base sm:text-xl font-bold mb-1 sm:mb-3 leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                {benefit.title}
              </h3>

              <p
                className="text-xs sm:text-base opacity-75 leading-relaxed line-clamp-3 sm:line-clamp-none"
                style={{ color: "var(--foreground)" }}
              >
                {benefit.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visual Swipe Indicator */}
      <div className="flex justify-center gap-1 mt-4 sm:hidden">
        {benefits.map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-sky-400/20" />
        ))}
      </div>
    </section>
  );
}
