import React from 'react';
import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-emerald-500 text-white p-2 rounded-xl">
                <Heart size={16} fill="white" />
              </span>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Ado<span className="text-emerald-400">pets</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              We connect loving families with pets in need of a forever home. Providing shelter support, care guides, and seamless adoption matchmaking services.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center text-slate-400" aria-label="Facebook">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center text-slate-400" aria-label="Twitter">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center text-slate-400" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center text-slate-400" aria-label="LinkedIn">
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-base mb-5 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/pets" className="hover:text-emerald-400 transition-colors">Browse Available Pets</Link>
              </li>
              <li>
                <a href="#success-stories" className="hover:text-emerald-400 transition-colors">Success Stories</a>
              </li>
              <li>
                <a href="#care-tips" className="hover:text-emerald-400 transition-colors">Pet Care Guides</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white text-base mb-5 uppercase tracking-wider text-sm">Our Focus</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">Why Adopt?</span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">Adoption Standards</span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">Shelter Partnerships</span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">Volunteer Networks</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-white text-base mb-5 uppercase tracking-wider text-sm">Contact Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-emerald-400" />
                <span>support@adopets.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-emerald-400" />
                <span>+1 (800) 555-PETS</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-emerald-400 mt-0.5" />
                <span>101 Pawfect Lane, San Francisco, CA 94103</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-800 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Adopets Platform. All Rights Reserved. Built with premium MERN stack.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookie Configurations</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
