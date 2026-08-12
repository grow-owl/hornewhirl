import React from "react";
import { FaHome, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-[#698ea2] pt-8 pb-6 border-t border-[#ccd5d2] mt-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
          
          {/* Brand & Clean Slogan */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0b171e] flex items-center justify-center text-[#e4a576] font-black text-xs shadow-sm">
              <FaHome className="w-3.5 h-3.5 text-[#e4a576]" />
            </div>
            <div>
              <span className="text-base font-extrabold text-[#0b171e]">
                Home<span className="text-[#698ea2]">Whirl</span>
              </span>
            </div>
          </div>

          {/* Minimal Contact & Copyright */}
          <div className="flex flex-wrap items-center gap-4 text-[#0b171e] text-[11px] font-bold">
            <a href="mailto:support@homewhirl.in" className="flex items-center gap-1.5 hover:text-[#e4a576] hover:underline transition">
              <FaEnvelope className="text-[#698ea2]" /> support@homewhirl.in
            </a>
            <a href="tel:+918609504186" className="flex items-center gap-1.5 hover:text-[#e4a576] hover:underline transition">
              <FaPhoneAlt className="text-[#698ea2]" /> +91 86095 04186
            </a>
            <span className="text-[#698ea2] font-normal">© {new Date().getFullYear()} HomeWhirl. All rights reserved.</span>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
