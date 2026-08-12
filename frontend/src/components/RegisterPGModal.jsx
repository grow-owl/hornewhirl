import React, { useState } from "react";
import { FaTimes, FaBuilding, FaCheck } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function RegisterPGModal() {
  const { showRegisterPGModal, setShowRegisterPGModal, registerProperty } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    city: "Vijayawada",
    locality: "Andhra Pradesh",
    type: "Co-Living PG",
    totalBeds: 50,
    monthlyRentPerBed: 7500,
    ownerName: "PG Owner",
    phone: "+91 86095 04186",
  });

  if (!showRegisterPGModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    registerProperty(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b171e]/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-sunburn p-6 sm:p-8 text-[#0b171e] border border-[#ccd5d2] animate-pop-in">
        
        {/* Close Button */}
        <button
          onClick={() => setShowRegisterPGModal(false)}
          className="absolute top-5 right-5 bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#0b171e] p-2 rounded-full transition cursor-pointer"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center font-bold shadow-sm">
            <FaBuilding className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0b171e]">Register New PG / Hostel Property</h3>
            <p className="text-xs text-[#698ea2]">Set up multi-floor rooms & bed management</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-[#698ea2] mb-1">PG Property Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Mens luxury pg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#698ea2] mb-1">City</label>
              <input
                type="text"
                required
                placeholder="Vijayawada"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
              />
            </div>

            <div>
              <label className="block text-[#698ea2] mb-1">Locality / State</label>
              <input
                type="text"
                required
                placeholder="Andhra Pradesh"
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[#698ea2] mb-1">Property Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-3 text-xs text-[#0b171e] focus:outline-none focus:border-[#698ea2] cursor-pointer"
              >
                <option value="Co-Living PG">Co-Living PG</option>
                <option value="Boys PG">Boys PG</option>
                <option value="Girls PG">Girls PG</option>
                <option value="Hostel">Hostel</option>
              </select>
            </div>

            <div>
              <label className="block text-[#698ea2] mb-1">Total Capacity</label>
              <input
                type="number"
                required
                value={formData.totalBeds}
                onChange={(e) => setFormData({ ...formData, totalBeds: parseInt(e.target.value) || 10 })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
              />
            </div>

            <div>
              <label className="block text-[#698ea2] mb-1">Rent / Bed (₹)</label>
              <input
                type="number"
                required
                value={formData.monthlyRentPerBed}
                onChange={(e) => setFormData({ ...formData, monthlyRentPerBed: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#0b171e] hover:bg-[#0b171e]/90 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <FaCheck className="w-4 h-4 text-[#e4a576]" />
              <span>Create Property Workspace</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPGModal;
