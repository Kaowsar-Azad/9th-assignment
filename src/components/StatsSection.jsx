"use client";
import React from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  const stats = [
    { value: "950+", label: "SHELTERS SUPPORTED" },
    { value: "3,400+", label: "ACTIVE ADOPTERS" },
    { value: "99.8%", label: "SAFETY RECORDS" },
    { value: "100%", label: "NON-PROFIT FOCUS" },
  ];

  return (
    <section className="bg-[#f3f4f6] dark:bg-slate-950 py-12 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#f8fafc] dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-16 shadow-sm transition-colors"
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center justify-center px-6 py-8 sm:py-4 transition-transform hover:scale-105 duration-300 ${
                index !== stats.length - 1 ? "lg:border-r border-gray-200 dark:border-slate-800" : ""
              } ${index % 2 === 0 ? "sm:border-r lg:border-r-0" : ""} ${index === 1 ? "lg:border-r" : ""}`}
            >
              <h2 className="text-[36px] md:text-[46px] font-black text-[#10b981] mb-2 leading-none">
                {stat.value}
              </h2>
              <p className="text-[10px] md:text-[12px] font-bold text-[#1e293b] dark:text-slate-100 tracking-widest uppercase opacity-80 text-center transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;