"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, Compass } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 p-8 md:p-12 max-w-md w-full text-center border border-gray-50"
      >
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-[#f0fdf4] rounded-full"></div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Heart size={60} fill="#4ade80" className="text-[#4ade80]" />
          </motion.div>

          <div className="absolute top-0 right-0 bg-[#f87171] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
            404
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-[#1e293b] mb-3 tracking-tight">
          Oops! Page Lost
        </h1>
        
        <p className="text-[#64748b] text-sm md:text-base leading-relaxed max-w-xs mx-auto mb-8">
          Just like an excited pup off its leash, it seems we've wandered 
          off the trail. The page you're searching for doesn't exist.
        </p>

        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#10b981] hover:bg-[#059669] text-white w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-50 transition-all"
          >
            <Compass size={18} />
            Back to Safe Trails (Home)
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;