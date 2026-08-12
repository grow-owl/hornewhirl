import React, { useState } from "react";
import { FaHome, FaBed, FaIdCard, FaReceipt, FaTools, FaPlus, FaBars, FaTimes, FaLock, FaSignOutAlt, FaUserTie } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function Navbar({ viewMode, setViewMode, onOpenSignIn }) {
  const {
    activeTab,
    setActiveTab,
    setShowAllocateBedModal,
    setShowAddRoomModal,
    isAuthenticated,
    currentOwner,
    logoutOwner,
    toggleSidebar,
    sidebarOpen
  } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDashboardView = viewMode === "dashboard" && isAuthenticated;

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#ccd5d2] shadow-sm">
      <div className="w-full px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between transition-all">
        
        {/* Extreme Left Section: Hamburger Menu + Brand Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger 3-Line Button to open Drawer Sidebar */}
          {isAuthenticated && (
            <button
              onClick={toggleSidebar}
              className="p-2.5 rounded-xl bg-[#152935] hover:bg-[#152935]/90 text-white shadow-md transition flex items-center gap-2 cursor-pointer"
              title="Toggle Navigation Menu"
            >
              <FaBars className="w-4 h-4 text-[#e4a576]" />
              <span className="hidden sm:inline text-xs font-bold">Menu</span>
            </button>
          )}

          {/* Brand Logo */}
          <button onClick={() => setViewMode("landing")} className="flex items-center gap-2.5 cursor-pointer text-left">
            <div className="w-9 h-9 rounded-xl bg-[#152935] flex items-center justify-center text-[#e4a576] font-black text-lg shadow-sm">
              <FaHome className="w-4 h-4 text-[#e4a576]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#152935] block leading-tight">
                Home<span className="text-[#698ea2]">Whirl</span>
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Links (Landing Mode Desktop) */}
        {!isDashboardView && (
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-[#698ea2]">
            <a href="#features" className="hover:text-[#152935] transition">Features</a>
            <a href="#how-it-works" className="hover:text-[#152935] transition">How It Works</a>
            <a href="#contact-us" className="hover:text-[#152935] transition">Contact Us</a>
          </nav>
        )}

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {isAuthenticated ? (
            <>
              {viewMode === "landing" ? (
                <button
                  onClick={() => setViewMode("dashboard")}
                  className="bg-[#152935] text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-md cursor-pointer"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowAddRoomModal(true)}
                    className="bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#152935] text-xs font-extrabold px-3 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaBed className="w-3.5 h-3.5 text-[#698ea2]" />
                    <span>+ Rooms</span>
                  </button>
                  <button
                    onClick={() => setShowAllocateBedModal(true)}
                    className="bg-[#152935] hover:bg-[#152935]/90 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaPlus className="w-3 h-3 text-[#e4a576]" />
                    <span>Add Tenant</span>
                  </button>
                </>
              )}

              <button
                onClick={() => {
                  logoutOwner();
                  setViewMode("landing");
                }}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                title="Sign Out"
              >
                <FaSignOutAlt className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <button
              onClick={onOpenSignIn}
              className="bg-[#152935] hover:bg-[#152935]/90 text-white text-xs font-bold px-4.5 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <FaLock className="w-3 h-3 text-[#e4a576]" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-2">
          {!isAuthenticated ? (
            <button
              onClick={onOpenSignIn}
              className="bg-[#152935] text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md flex items-center gap-1 cursor-pointer"
            >
              <FaLock className="w-3 h-3 text-[#e4a576]" />
              <span>Sign In</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAllocateBedModal(true)}
              className="bg-[#152935] text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md flex items-center gap-1 cursor-pointer"
            >
              <FaPlus className="w-3 h-3 text-[#e4a576]" />
              <span>+ Tenant</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;
