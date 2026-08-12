import React from "react";
import {
  FaHome,
  FaBed,
  FaIdCard,
  FaReceipt,
  FaTools,
  FaBuilding,
  FaPlus,
  FaSignOutAlt,
  FaUserTie,
  FaChevronRight,
  FaTimes
} from "react-icons/fa";
import { useApp } from "../context/AppContext";

function Sidebar({ onOpenSignIn }) {
  const {
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    properties,
    selectedPropertyId,
    setSelectedPropertyId,
    activeProperty,
    setShowAddRoomModal,
    setShowAllocateBedModal,
    isAuthenticated,
    currentOwner,
    logoutOwner,
  } = useApp();

  const navItems = [
    { id: "dashboard", label: "Overview", icon: FaHome },
    { id: "rooms", label: "Room Matrix", icon: FaBed },
    { id: "kyc", label: "Tenant & KYC", icon: FaIdCard },
    { id: "billing", label: "Billing & P&L", icon: FaReceipt },
    { id: "complaints", label: "Issue Desk", icon: FaTools },
  ];

  if (!isAuthenticated) return null;

  const handleSelectNav = (id) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Backdrop overlay for closing drawer when clicking outside */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-[#152935]/60 backdrop-blur-xs z-40 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sliding Drawer Sidebar */}
      <aside
        className={`flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-[#152935] text-white z-50 p-5 justify-between shadow-2xl border-r border-white/10 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Brand Logo & Close Button */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#e4a576] flex items-center justify-center text-[#152935] font-black text-xl shadow-md">
                <FaHome className="w-5 h-5 text-[#152935]" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white block leading-tight">
                  Home<span className="text-[#e4a576]">Whirl</span>
                </span>
              </div>
            </div>

            {/* Close Drawer Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
              title="Close Sidebar"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Active Property Selector Card */}
          {properties.length > 0 && (
            <div className="bg-white/10 rounded-2xl p-3 border border-white/15 backdrop-blur-md space-y-1.5">
              <span className="text-[10px] text-[#ccd5d2] font-extrabold uppercase tracking-wider block">
                Active Property
              </span>
              <div className="flex items-center gap-2">
                <FaBuilding className="text-[#e4a576] w-3.5 h-3.5 shrink-0" />
                <select
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(parseInt(e.target.value))}
                  className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer w-full truncate"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#152935] text-white">
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Main Navigation Menu */}
          <nav className="space-y-1.5">
            <span className="text-[10px] text-[#698ea2] font-extrabold uppercase tracking-wider block px-3 mb-2">
              Management Modules
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectNav(item.id)}
                  className={`w-full px-3.5 py-3 rounded-xl transition flex items-center justify-between text-xs font-bold cursor-pointer ${
                    isActive
                      ? "bg-[#e4a576] text-[#152935] shadow-lg font-black"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#152935]" : "text-[#e4a576]"}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <FaChevronRight className="w-3 h-3 text-[#152935]" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Action Buttons & Owner Profile Footer */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          {/* Quick Add Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setShowAddRoomModal(true);
                setSidebarOpen(false);
              }}
              className="bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold py-2.5 px-3 rounded-xl transition border border-white/15 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <FaBed className="w-3 h-3 text-[#e4a576]" />
              <span>+ Room</span>
            </button>
            <button
              onClick={() => {
                setShowAllocateBedModal(true);
                setSidebarOpen(false);
              }}
              className="bg-[#e4a576] hover:bg-[#d89463] text-[#152935] text-[11px] font-black py-2.5 px-3 rounded-xl transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <FaPlus className="w-3 h-3 text-[#152935]" />
              <span>+ Tenant</span>
            </button>
          </div>

          {/* Owner Profile Card & Sign Out */}
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-xl bg-[#e4a576]/20 border border-[#e4a576]/30 flex items-center justify-center text-[#e4a576] font-bold text-xs shrink-0">
                <FaUserTie />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-white block truncate leading-tight">
                  {currentOwner?.name || "PG Owner"}
                </span>
                <span className="text-[10px] text-[#698ea2] font-semibold block truncate">
                  Property Owner
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                logoutOwner();
                setSidebarOpen(false);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer shrink-0"
              title="Sign Out"
            >
              <FaSignOutAlt className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
