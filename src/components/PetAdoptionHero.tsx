"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const WhyChooseAdoption = () => {
  const features = [
    {
      title: "Save Deserving Lives",
      desc: "Shelters are crowded. Adopting frees up space for others.",
    },
    {
      title: "Combating Puppy Mills",
      desc: "Adoption stands against inhumane commercial breeding.",
    },
    {
      title: "Fully Vet-Checked",
      desc: "Pets come vaccinated, microchipped, and spayed/neutered.",
    },
  ];

  return (
    <section className="bg-[#0b1121] py-12 md:py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex-1 text-white space-y-5"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Why Choose <br />
            <span className="text-[#10b981]">Pet Adoption?</span>
          </h2>
          
          <p className="text-gray-400 text-base md:text-lg max-w-lg leading-relaxed">
            Giving a deserving animal a second chance at life and bringing 
            unconditional love into your home.
          </p>

          <div className="space-y-5 pt-2">
            {features.map((item, index) => (
              <div key={index} className="flex gap-4 items-start group">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="text-[#10b981] group-hover:scale-110 transition-transform" size={24} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold leading-none mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex-1 relative w-full"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-800">
            <img 
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1200" 
              alt="Cute Cat" 
              className="w-full h-[380px] md:h-[500px] object-cover" 
            />
            
            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-5 md:p-7 rounded-[1.8rem] shadow-xl">
              <p className="text-[#1e293b] font-semibold text-sm md:text-lg italic leading-tight">
                "Adopting Luna changed our family forever. She brings endless peace and joy."
              </p>
              <p className="text-[#10b981] mt-2 font-bold text-xs md:text-sm uppercase tracking-wider">
                — The Miller Family
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseAdoption;