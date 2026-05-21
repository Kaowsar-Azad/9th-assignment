"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const SuccessStories = () => {
  return (
    <section className="bg-[#f8fafc] dark:bg-slate-900/30 py-16 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e293b] dark:text-white mb-4 transition-colors">
            Success Adoption Stories
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed transition-colors">
            Read heartwarming stories of pets finding their true happy places and
            the lives they've illuminated.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#062c1b] rounded-[2.5rem] p-6 md:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 shadow-2xl"
        >
          
          <div className="w-full lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=1200" 
              alt="Beautiful Dog" 
              className="w-full h-[300px] md:h-[450px] object-cover rounded-[2rem] shadow-lg"
            />
          </div>

          <div className="w-full lg:w-1/2 text-white">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#facc15" className="text-[#facc15]" />
              ))}
            </div>

            <h3 className="text-2xl md:text-4xl font-bold mb-6">
              "Buster found his safe space!"
            </h3>

            <p className="text-gray-300 text-sm md:text-lg italic leading-relaxed mb-8">
              "Buster had spent months in a crowded shelter, feeling scared and quiet. Once we adopted him 
              through this platform, he transformed into the most active, loving beagle pup! We play every 
              afternoon, and he is a total blessing."
            </p>

            <div className="flex items-center gap-2">
              <div className="h-[2px] w-8 bg-[#10b981]"></div>
              <p className="text-[#10b981] font-bold text-sm md:text-base uppercase tracking-wider">
                SARAH & BUSTER (ADOPTED BEAGLE)
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;