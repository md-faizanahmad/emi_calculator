"use client";
import { motion } from "framer-motion";

export default function WhyEmiMitraClient({ benefits }) {
  return (
    <section className="py-20 px-4">
      <h2
        className="text-4xl font-black text-center mb-12 tracking-tighter"
        style={{ color: "var(--foreground)" }}
      >
        Why Use <span className="text-sky-400">EMI Mitra?</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border)",
            }}
            className="p-8 rounded-3xl border backdrop-blur-md hover:border-sky-400/50 transition-all group"
          >
            <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">
              {benefit.icon}
            </span>
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: "var(--foreground)" }}
            >
              {benefit.title}
            </h3>
            <p
              className="opacity-70 leading-relaxed"
              style={{ color: "var(--foreground)" }}
            >
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
