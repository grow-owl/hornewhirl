import React, { useState } from "react";
import { FaTimes, FaBed, FaUserCheck, FaRupeeSign, FaCheck, FaIdCard, FaPhoneAlt } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function AllocateBedModal() {
  const { showAllocateBedModal, setShowAllocateBedModal, rooms, activeProperty, allocateBed } = useApp();

  const activeRooms = rooms.filter((r) => r.propertyId === activeProperty.id);
  const availableRooms = activeRooms.filter((r) => r.beds.some((b) => b.status === "AVAILABLE"));

  const [formData, setFormData] = useState({
    studentName: "",
    phone: "",
    email: "",
    gender: "Male",
    guardian: "",
    roomNo: availableRooms[0]?.roomNo || "101",
    bedNo: "Bed 1",
    rent: availableRooms[0]?.rent || 7500,
    joiningDate: new Date().toISOString().split("T")[0],
    aadhaarNo: "",
    panNo: "",
    emergencyContact: "",
    idProofType: "Aadhaar Card",
  });

  if (!showAllocateBedModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    allocateBed(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b171e]/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-sunburn p-6 sm:p-8 text-[#0b171e] border border-[#ccd5d2] animate-pop-in">
        
        {/* Close Button */}
        <button
          onClick={() => setShowAllocateBedModal(false)}
          className="absolute top-5 right-5 bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#0b171e] p-2 rounded-full transition cursor-pointer"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center font-bold shadow-sm">
            <FaBed className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0b171e]">Onboard Tenant & Allocate Bed</h3>
            <p className="text-xs text-[#698ea2]">{activeProperty.name} ({activeProperty.locality})</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-[#698ea2] mb-1">Tenant Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Peddi Ravindra"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#698ea2] mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+91 98480 12345"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
              />
            </div>

            <div>
              <label className="block text-[#698ea2] mb-1">Email Address</label>
              <input
                type="email"
                placeholder="tenant@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
              />
            </div>
          </div>

          {/* KYC Information */}
          <div className="bg-[#f1e5d6]/50 p-3.5 rounded-2xl border border-[#ccd5d2] space-y-3">
            <span className="text-[11px] font-extrabold uppercase text-[#0b171e] tracking-wider flex items-center gap-1.5">
              <FaIdCard className="text-[#e4a576]" /> Digital KYC & Proof Details
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#698ea2] text-[10px] uppercase mb-1">Aadhaar No.</label>
                <input
                  type="text"
                  placeholder="4812 9012 3456"
                  value={formData.aadhaarNo}
                  onChange={(e) => setFormData({ ...formData, aadhaarNo: e.target.value })}
                  className="w-full bg-white border border-[#ccd5d2] rounded-xl px-3 py-2 text-xs text-[#0b171e]"
                />
              </div>
              <div>
                <label className="block text-[#698ea2] text-[10px] uppercase mb-1">PAN Card No.</label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  value={formData.panNo}
                  onChange={(e) => setFormData({ ...formData, panNo: e.target.value })}
                  className="w-full bg-white border border-[#ccd5d2] rounded-xl px-3 py-2 text-xs text-[#0b171e]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[#698ea2] mb-1">Select Room</label>
              <select
                value={formData.roomNo}
                onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2] cursor-pointer"
              >
                {activeRooms.map((r) => (
                  <option key={r.id} value={r.roomNo}>
                    Room {r.roomNo} ({r.floor})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#698ea2] mb-1">Bed Slot</label>
              <select
                value={formData.bedNo}
                onChange={(e) => setFormData({ ...formData, bedNo: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2] cursor-pointer"
              >
                <option value="Bed 1">Bed 1</option>
                <option value="Bed 2">Bed 2</option>
                <option value="Bed 3">Bed 3</option>
                <option value="Bed 4">Bed 4</option>
              </select>
            </div>

            <div>
              <label className="block text-[#698ea2] mb-1">Monthly Rent (₹)</label>
              <input
                type="number"
                required
                value={formData.rent}
                onChange={(e) => setFormData({ ...formData, rent: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#698ea2] mb-1">Joining / Start Date</label>
            <input
              type="date"
              required
              value={formData.joiningDate}
              onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#0b171e] hover:bg-[#0b171e]/90 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <FaCheck className="w-4 h-4 text-[#e4a576]" />
              <span>Confirm Bed Allocation & KYC Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AllocateBedModal;
