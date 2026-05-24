import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-transparent dark:from-emerald-950/20 dark:via-slate-950 dark:to-transparent pt-12 md:pt-20 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Hero Left Content */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider animate-pulse transition-colors">
            <Sparkles size={14} />
            Re-home & Save a Life Today
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-none transition-colors">
            Find Your Perfect <br />
            <span className="text-gradient">Furry Companion</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed transition-colors">
            We connect compassionate people with adorable pets in need of shelter and love. Start your journey today and experience the unmatched joy of pet adoption.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <Link
              href="/courses"
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white px-8 h-12 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <Heart size={18} fill="white" />
              Adopt Now
            </Link>
            <a
              href="#process"
              className="border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-900 hover:text-slate-800 dark:hover:text-slate-100 text-slate-650 dark:text-slate-300 px-8 h-12 rounded-xl font-bold flex items-center justify-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              How It Works
            </a>
          </div>
          {/* Quick Hero stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 max-w-sm mx-auto lg:mx-0">
            <div className="text-center lg:text-left">
              <p className="text-2xl font-black text-slate-800 dark:text-slate-200 transition-colors">1,200+</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase transition-colors">Pets Saved</p>
            </div>
            <div className="text-center lg:text-left border-x border-slate-100 dark:border-slate-800 px-4 transition-colors">
              <p className="text-2xl font-black text-slate-800 dark:text-slate-200 transition-colors">50+</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase transition-colors">Partner Shelters</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-2xl font-black text-slate-800 dark:text-slate-200 transition-colors">99%</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase transition-colors">Happy Matches</p>
            </div>
          </div>
        </div>

        {/* Hero Right Images Grid */}
        <div className="grid grid-cols-2 gap-4 relative">
          {/* Absolute decorative glow background */}
          <div className="absolute -inset-4 bg-emerald-200/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="space-y-4">
            <div className="h-44 sm:h-64 rounded-3xl overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform duration-300">
              <Image src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400" width={400} height={400} alt="Cute dog looking happy" className="w-full h-full object-cover" />
            </div>
            <div className="h-32 sm:h-48 rounded-3xl overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform duration-300">
              <Image src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400" width={400} height={400} alt="Playful cat" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="h-32 sm:h-48 rounded-3xl overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform duration-300">
              <Image src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=400" width={400} height={400} alt="Cute golden puppy" className="w-full h-full object-cover" />
            </div>
            <div className="h-44 sm:h-64 rounded-3xl overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform duration-300">
              <Image src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=400" width={400} height={400} alt="Lovely bunny rabbit" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
