"use client";
import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Clock, Heart } from "lucide-react";

const AdoptionProcess = () => {
  const steps = [
    {
      id: 1,
      title: "1. Apply Online",
      desc: "Explore listings, select your dream pet, and click 'Adopt Now' to fill out our quick scheduling details and message form.",
      icon: <ClipboardList className="text-[#10b981]" size={32} />,
    },
    {
      id: 2,
      title: "2. Review & Meet",
      desc: "The pet listing owner/shelter reviews your request details, messages back, and schedules an interactive meetup.",
      icon: <Clock className="text-[#10b981]" size={32} />,
    },
    {
      id: 3,
      title: "3. Take Them Home",
      desc: "Upon approval, finalize fee processing, coordinate final pickups, and start your incredible life journey together!",
      icon: <Heart className="text-[#10b981]" size={32} />,
    },
  ];

  return (
    <section className="bg-[#f8fafc] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e293b] mb-4">
            Our 3-Step Adoption Process
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Adopting a pet shouldn't be stressful. We've optimized the process to
            make it fast, secure, and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center border border-gray-100"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#10b981] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-4 border-white">
                {step.id}
              </div>

              <div className="w-16 h-16 bg-[#ecfdf5] rounded-2xl flex items-center justify-center mb-6 mt-4">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-[#1e293b] mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdoptionProcess;