"use client";
import { motion } from "framer-motion";

export default function WhyEmiMitraClient({ benefits }) {
  return (
    <section className="py-12 px-4 overflow-hidden">
      <h2
        className="text-3xl sm:text-4xl font-black text-center mb-8 sm:mb-12 tracking-tighter"
        style={{ color: "var(--foreground)" }}
      >
        Why Use <span className="text-sky-400">EMI Mitra?</span>
      </h2>

      {/* Horizontal Swiper for Mobile, Grid for Desktop */}
      <div
        className="flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory scrollbar-hide 
                   sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:max-w-6xl sm:mx-auto sm:overflow-visible sm:pb-0"
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
            // Compact styling: p-5 on mobile, p-8 on desktop
            // MD styling: shadow-sm, rounded-2xl
            className="min-w-[75%] sm:min-w-full snap-center p-6 sm:p-8 rounded-2xl sm:rounded-3xl 
                       border backdrop-blur-md shadow-sm hover:shadow-md 
                       hover:border-sky-400/50 transition-all group shrink-0"
          >
            <div className="flex flex-col items-start">
              {/* Smaller icon for mobile */}
              <span className="text-4xl sm:text-5xl mb-4 sm:mb-6 block group-hover:scale-110 transition-transform">
                {benefit.icon}
              </span>

              <h3
                className="text-lg sm:text-xl font-bold mb-2 sm:mb-3"
                style={{ color: "var(--foreground)" }}
              >
                {benefit.title}
              </h3>

              <p
                className="text-sm sm:text-base opacity-75 leading-relaxed"
                style={{ color: "var(--foreground)" }}
              >
                {benefit.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visual Swipe Indicator for Mobile */}
      <div className="flex justify-center gap-1.5 mt-2 sm:hidden">
        {benefits.map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-sky-400/20" />
        ))}
      </div>
    </section>
  );
}
