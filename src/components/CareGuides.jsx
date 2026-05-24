"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";

const CareGuides = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const guides = [
    {
      title: "Nutritional Balance for Puppies & Kittens",
      content: "Young pets require diets rich in protein and calcium to support high metabolic growth. Always feed high-quality formula designed specifically for their life stages and consult your vet for custom portion controls.",
    },
    {
      title: "Mental & Physical Stimulation Needs",
      content: "Dogs typically require 30 to 60 minutes of active exercise daily, while cats benefit greatly from structured interactive playtime using laser toys or feather wands. Stimulation prevents behavioral anxiety issues.",
    },
    {
      title: "Routine Grooming & Dental Hygiene",
      content: "Regular brushing helps reduce hairballs, maintains coat sheen, and allows you to inspect for ticks. Combine grooming with dental brushing at least twice weekly to prevent early onset periodontal diseases.",
    },
    {
      title: "Vaccination & Vet Checkup Schedules",
      content: "Schedule general checkups annually. Puppies and kittens require booster rounds every 3-4 weeks until 16 weeks of age. Ensure rabies and core multi-vaccine shots are kept up-to-date annually.",
    },
  ];

  return (
    <section className="bg-[#f3f4f6] dark:bg-slate-950 py-16 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
        
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#ecfdf5] dark:bg-emerald-950/30 text-[#065f46] dark:text-[#34d399] px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wide uppercase border border-[#d1fae5] dark:border-emerald-800 transition-colors">
            <BookOpen size={14} />
            EXPERT HEALTH GUIDES
          </div>
          
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1e293b] dark:text-white leading-[1.1] transition-colors">
            Essential Care Guides <br />
            For New Pet Owners
          </h2>
          
          <p className="text-[#64748b] dark:text-slate-400 text-[16px] md:text-[18px] leading-relaxed max-w-xl transition-colors">
            Dive into our expert-crafted guides to ensure your new best friend gets the 
            healthiest, happiest start in their new home. It&apos;s all about love and care.
          </p>

          <button className="bg-[#10b981] hover:bg-[#059669] text-white px-8 py-4 rounded-2xl font-bold text-[16px] transition-all shadow-lg shadow-emerald-100 transform hover:-translate-y-1">
            Browse Pets & Practice Guides
          </button>
        </div>

        <div className="flex-1 w-full space-y-4">
          {guides.map((guide, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 transition-colors"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between p-6 md:p-7 text-left transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-[10px] h-[10px] bg-[#10b981] rounded-full"></div>
                  <span className="text-[16px] md:text-[18px] font-bold text-[#1e293b] dark:text-white transition-colors">
                    {guide.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-[#1e293b] dark:text-white transition-colors" size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-[52px] pb-8 text-[#94a3b8] dark:text-slate-400 leading-relaxed text-[13px] md:text-[14px] transition-colors">
                      {guide.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CareGuides;