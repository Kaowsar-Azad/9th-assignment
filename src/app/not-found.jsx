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
        
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Don&apos;t worry, there are still plenty of furry friends waiting for you!
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