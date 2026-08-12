import React from "react";
import { FaHome, FaBed, FaIdCard, FaReceipt, FaTools } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function BottomNav() {
  const { activeTab, setActiveTab, isAuthenticated } = useApp();

  const navItems = [
    { id: "dashboard", label: "Overview", icon: FaHome },
    { id: "rooms", label: "Rooms", icon: FaBed },
    { id: "kyc", label: "KYC", icon: FaIdCard },
    { id: "billing", label: "Billing", icon: FaReceipt },
    { id: "complaints", label: "Issues", icon: FaTools },
  ];

  if (!isAuthenticated) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#152935]/95 backdrop-blur-lg border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition cursor-pointer min-w-[56px] ${
              isActive
                ? "bg-[#e4a576] text-[#152935] font-black shadow-md scale-105"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? "text-[#152935]" : "text-[#e4a576]"}`} />
            <span className="text-[10px] font-extrabold tracking-tight leading-none block">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
