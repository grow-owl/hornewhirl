import React, { useState } from "react";
import heroBg from "../assets/hero-bg.jpg";
import {
  FaHome,
  FaBed,
  FaRupeeSign,
  FaIdCard,
  FaReceipt,
  FaTools,
  FaCheckCircle,
  FaArrowRight,
  FaBuilding,
  FaShieldAlt,
  FaFileInvoiceDollar,
  FaChartLine,
  FaUsers,
  FaChevronRight,
  FaPlusCircle,
  FaBolt,
  FaEnvelope,
  FaPhoneAlt,
  FaPaperPlane,
  FaLock,
  FaLayerGroup,
  FaRegLightbulb
} from "react-icons/fa";
import { useApp } from "../context/AppContext";

function LandingPage({ onOpenSignIn, onOpenSecretRegister }) {
  const { activeProperty } = useApp();

  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: "", email: "", phone: "", message: "" });
    }, 4000);
  };

  return (
    <div className="space-y-20 pb-16 text-[#0b171e] w-full">

      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden w-full p-8 sm:p-16 shadow-2xl border-b border-[#ccd5d2] text-center space-y-8 min-h-[560px] flex flex-col justify-center items-center">
        {/* Background Image Container */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 hover:scale-100"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Gradient Overlay for visual warmth and high text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b171e]/85 via-[#0b171e]/75 to-[#0b171e]/95 backdrop-blur-[1px]" />

        {/* Hero Content (z-10) */}
        <div className="relative z-10 space-y-8 max-w-5xl mx-auto w-full px-4">
          {/* Top Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 text-[#f1e5d6] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg border border-white/25 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e4a576] animate-pulse"></span>
            <span>Simple PG & Hostel Management Operating System</span>
          </div>

          {/* Hero Slogan & Main Headline */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              Manage Rooms, Collect Rent & Digital KYC <br className="hidden sm:block" />
              <span className="text-[#e4a576]">Purely Built for PG & Hostel Owners</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow">
              HomeWhirl gives property owners complete visual control over floor-wise room matrices, automated utility billing, digital guest KYC ledgers, and staff maintenance tickets.
            </p>
          </div>

          {/* Hero Call to Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenSignIn}
              className="bg-[#e4a576] hover:bg-[#d89463] text-[#0b171e] font-black text-xs sm:text-sm px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <FaLock className="text-[#0b171e]" />
              <span>Sign In to Owner Dashboard</span>
              <FaArrowRight className="w-3.5 h-3.5 text-[#0b171e]" />
            </button>

            <a
              href="#how-it-works"
              className="bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs sm:text-sm px-6 py-4 rounded-2xl transition-all border border-white/30 backdrop-blur-md flex items-center gap-2"
            >
              <span>Learn How It Works</span>
            </a>
          </div>
        </div>
      </section>

      {/* Body Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ------------------------------------------------------------- */}
        {/* 2. FEATURES SECTION */}
        {/* ------------------------------------------------------------- */}
        <section id="features" className="space-y-8 text-center scroll-mt-24">

          <div>
            <span className="text-[11px] font-extrabold uppercase text-[#698ea2] tracking-wider bg-[#f1e5d6] px-3 py-1 rounded-full">
              Core Operational Features
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b171e] tracking-tight mt-2">
              Graphical & Intuitive Management Tools
            </h2>
            <p className="text-xs sm:text-sm text-[#698ea2] font-semibold max-w-xl mx-auto mt-1">
              Built specifically for PG & Hostel owners to streamline daily operations, tenant onboarding, rent collection, and maintenance.
            </p>
          </div>

          {/* 5 Core Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">

            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-3xl shadow-sunburn border border-[#ccd5d2] space-y-3 hover:border-[#0b171e] hover-lift transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center font-bold text-xl shadow-md">
                <FaChartLine />
              </div>
              <h3 className="text-lg font-black text-[#0b171e]">Real-Time Overview</h3>
              <p className="text-xs text-[#698ea2] font-semibold leading-relaxed">
                Track total monthly revenue, interactive occupancy donut graphs, pending rent alerts, and profit/loss summary in real-time.
              </p>
              <ul className="space-y-1.5 pt-2 text-xs font-bold text-[#0b171e]">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Gross Cash Revenue</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Occupancy Donut Graph</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Outstanding Rent Banners</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-3xl shadow-sunburn border border-[#ccd5d2] space-y-3 hover:border-[#0b171e] hover-lift transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center font-bold text-xl shadow-md">
                <FaBed />
              </div>
              <h3 className="text-lg font-black text-[#0b171e]">Room & Bed Customizer</h3>
              <p className="text-xs text-[#698ea2] font-semibold leading-relaxed">
                Visual floor-by-floor and room-by-room grid layout color-coded by status: Green (Available), Red (Occupied), and Orange (Maintenance).
              </p>
              <ul className="space-y-1.5 pt-2 text-xs font-bold text-[#0b171e]">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Color-Coded Status Grid</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Custom Floors & Beds</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Quick Status Toggles</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-3xl shadow-sunburn border border-[#ccd5d2] space-y-3 hover:border-[#0b171e] hover-lift transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center font-bold text-xl shadow-md">
                <FaIdCard />
              </div>
              <h3 className="text-lg font-black text-[#0b171e]">Digital Guest KYC</h3>
              <p className="text-xs text-[#698ea2] font-semibold leading-relaxed">
                Digital ledger for each guest showing contact details, bed allocation, joining date, due dates, payment history, and Aadhaar/PAN proofs.
              </p>
              <ul className="space-y-1.5 pt-2 text-xs font-bold text-[#0b171e]">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Aadhaar & PAN Credentials</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Emergency Contacts</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Digital Rent Ledger</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-3xl shadow-sunburn border border-[#ccd5d2] space-y-3 hover:border-[#0b171e] hover-lift transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center font-bold text-xl shadow-md">
                <FaFileInvoiceDollar />
              </div>
              <h3 className="text-lg font-black text-[#0b171e]">Billing & Expenses</h3>
              <p className="text-xs text-[#698ea2] font-semibold leading-relaxed">
                Automated invoice generator for rent and utility/electricity charges with profit/loss calculations and instant printable payment receipts.
              </p>
              <ul className="space-y-1.5 pt-2 text-xs font-bold text-[#0b171e]">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Rent + Electricity Breakdown</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Printable Payment Receipts</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> P&L Financial Summary</li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-3xl shadow-sunburn border border-[#ccd5d2] space-y-3 hover:border-[#0b171e] hover-lift transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center font-bold text-xl shadow-md">
                <FaTools />
              </div>
              <h3 className="text-lg font-black text-[#0b171e]">Issue & Maintenance Desk</h3>
              <p className="text-xs text-[#698ea2] font-semibold leading-relaxed">
                Ticket list view where owners track maintenance requests raised by tenants and assign staff members (Electrician, Plumber, Housekeeping).
              </p>
              <ul className="space-y-1.5 pt-2 text-xs font-bold text-[#0b171e]">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Priority Badges</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Staff Assignment Dropdowns</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-emerald-600 w-3.5 h-3.5" /> Status Resolution Workflow</li>
              </ul>
            </div>

          </div>

        </section>

        {/* ------------------------------------------------------------- */}
        {/* 3. HOW IT WORKS SECTION */}
        {/* ------------------------------------------------------------- */}
        <section id="how-it-works" className="space-y-8 text-center scroll-mt-24">

          <div>
            <span className="text-[11px] font-extrabold uppercase text-[#698ea2] tracking-wider bg-[#f1e5d6] px-3 py-1 rounded-full">
              3 Simple Steps
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b171e] tracking-tight mt-2">
              How HomeWhirl Works for Property Owners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">

            <div className="bg-white p-6 rounded-3xl shadow-sunburn border border-[#ccd5d2] space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-[#0b171e] text-[#e4a576] font-black text-xs flex items-center justify-center">1</span>
              <h3 className="text-base font-black text-[#0b171e]">Owner Sign In & Setup</h3>
              <p className="text-xs text-[#698ea2] font-semibold leading-relaxed">
                Sign in securely using your owner credentials. New owners can register via authorized secret key.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sunburn border border-[#ccd5d2] space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-[#0b171e] text-[#e4a576] font-black text-xs flex items-center justify-center">2</span>
              <h3 className="text-base font-black text-[#0b171e]">Customize Floor & Rooms</h3>
              <p className="text-xs text-[#698ea2] font-semibold leading-relaxed">
                Add floors, set room numbers, specify sharing options (Single/Double/Triple), and auto-generate bed slots.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sunburn border border-[#ccd5d2] space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-[#0b171e] text-[#e4a576] font-black text-xs flex items-center justify-center">3</span>
              <h3 className="text-base font-black text-[#0b171e]">Onboard & Collect Rent</h3>
              <p className="text-xs text-[#698ea2] font-semibold leading-relaxed">
                Onboard guests with Aadhaar/PAN KYC, issue automated rent + electricity bills, and track profit/loss.
              </p>
            </div>

          </div>

        </section>

        {/* ------------------------------------------------------------- */}
        {/* 4. CONTACT US SECTION */}
        {/* ------------------------------------------------------------- */}
        <section id="contact-us" className="bg-white rounded-3xl p-8 sm:p-12 shadow-sunburn border border-[#ccd5d2] space-y-8 scroll-mt-24">

          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-extrabold uppercase text-[#698ea2] tracking-wider bg-[#f1e5d6] px-3 py-1 rounded-full">
              Get in Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b171e] tracking-tight">
              Contact HomeWhirl Support Team
            </h2>
            <p className="text-xs text-[#698ea2] font-semibold">
              Have questions about PG onboarding, custom configurations, or technical setup? Send us a message below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Contact Details */}
            <div className="space-y-6 text-xs font-semibold bg-[#f7f4ef] p-6 rounded-2xl border border-[#ccd5d2]">
              <h3 className="text-sm font-extrabold text-[#0b171e] uppercase tracking-wider">Help Desk & Support Info</h3>

              <div className="space-y-4 text-[#0b171e]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center">
                    <FaEnvelope />
                  </div>
                  <div>
                    <span className="text-[#698ea2] block text-[10px] uppercase">Email Address</span>
                    <a href="mailto:support@homewhirl.in" className="font-bold hover:underline hover:text-[#e4a576] transition">
                      support@homewhirl.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <span className="text-[#698ea2] block text-[10px] uppercase">Phone / Support Line</span>
                    <a href="tel:+918609504186" className="font-bold hover:underline hover:text-[#e4a576] transition">
                      +91 86095 04186
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#ccd5d2] text-[#698ea2] leading-relaxed text-[11px]">
                Our support team is available Monday to Saturday, 9:00 AM – 7:00 PM IST to assist property owners.
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {contactSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
                  <FaCheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-sm">Thank You for Reaching Out!</h4>
                  <p className="text-xs">Your message has been sent successfully. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3 text-xs font-semibold">
                  <div>
                    <label className="block text-[#698ea2] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-2.5 text-xs text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#698ea2] mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="owner@gmail.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-2.5 text-xs text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#698ea2] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 86095 04186"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-2.5 text-xs text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#698ea2] mb-1">Message / Inquiry</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Tell us about your property requirements..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-2.5 text-xs text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0b171e] hover:bg-[#0b171e]/90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    <FaPaperPlane className="text-[#e4a576]" />
                    <span>Send Contact Message</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}

export default LandingPage;
