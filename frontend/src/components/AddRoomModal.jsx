import React, { useState } from "react";
import { FaTimes, FaBed, FaCheckCircle, FaPlusCircle, FaBuilding } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function AddRoomModal() {
  const { showAddRoomModal, setShowAddRoomModal, activeProperty, addRoom } = useApp();

  const [formData, setFormData] = useState({
    floor: "Ground Floor",
    customFloor: "",
    roomNo: "103",
    sharingType: "Double Sharing",
    acType: "AC",
    rent: 8000,
    bedCount: 2,
  });

  if (!showAddRoomModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetFloor = formData.floor === "Custom" ? (formData.customFloor || "Floor X") : formData.floor;

    addRoom({
      propertyId: activeProperty.id,
      floor: targetFloor,
      roomNo: formData.roomNo,
      sharingType: formData.sharingType,
      acType: formData.acType,
      rent: parseInt(formData.rent) || 7500,
      bedCount: parseInt(formData.bedCount) || 2,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#152935]/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-sunburn p-6 sm:p-8 text-[#152935] border border-[#ccd5d2] animate-pop-in">
        
        {/* Close Button */}
        <button
          onClick={() => setShowAddRoomModal(false)}
          className="absolute top-5 right-5 bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#152935] p-2 rounded-full transition cursor-pointer"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#152935] text-[#e4a576] flex items-center justify-center font-bold shadow-sm">
            <FaBed className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#152935]">Configure Room & Beds</h3>
            <p className="text-xs text-[#698ea2]">{activeProperty.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-[#698ea2] mb-1">Select Floor</label>
            <select
              value={formData.floor}
              onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#152935] focus:outline-none focus:border-[#698ea2] cursor-pointer"
            >
              <option value="Ground Floor">Ground Floor</option>
              <option value="Floor 1">Floor 1 (1st Floor)</option>
              <option value="Floor 2">Floor 2 (2nd Floor)</option>
              <option value="Floor 3">Floor 3 (3rd Floor)</option>
              <option value="Floor 4">Floor 4 (4th Floor)</option>
              <option value="Custom">+ Create New Floor Name</option>
            </select>
          </div>

          {formData.floor === "Custom" && (
            <div>
              <label className="block text-[#698ea2] mb-1">Enter Custom Floor Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Mezzanine Floor / Penthouse"
                value={formData.customFloor}
                onChange={(e) => setFormData({ ...formData, customFloor: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#152935] focus:outline-none focus:border-[#698ea2]"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#698ea2] mb-1">Room Number</label>
              <input
                type="text"
                required
                placeholder="e.g. 104"
                value={formData.roomNo}
                onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#152935] focus:outline-none focus:border-[#698ea2]"
              />
            </div>

            <div>
              <label className="block text-[#698ea2] mb-1">Number of Beds</label>
              <select
                value={formData.bedCount}
                onChange={(e) => setFormData({ ...formData, bedCount: parseInt(e.target.value) })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#152935] focus:outline-none focus:border-[#698ea2] cursor-pointer"
              >
                <option value={1}>1 Bed (Single Room)</option>
                <option value={2}>2 Beds (Double Sharing)</option>
                <option value={3}>3 Beds (Triple Sharing)</option>
                <option value={4}>4 Beds (Four Sharing)</option>
                <option value={5}>5 Beds (Multi-Sharing)</option>
                <option value={6}>6 Beds (Dormitory)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[#698ea2] mb-1">Sharing Type</label>
              <select
                value={formData.sharingType}
                onChange={(e) => setFormData({ ...formData, sharingType: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-3 text-xs text-[#152935] focus:outline-none focus:border-[#698ea2] cursor-pointer"
              >
                <option value="Single Private">Single Private</option>
                <option value="Double Sharing">Double Sharing</option>
                <option value="Triple Sharing">Triple Sharing</option>
                <option value="Four Sharing">Four Sharing</option>
              </select>
            </div>

            <div>
              <label className="block text-[#698ea2] mb-1">AC Type</label>
              <select
                value={formData.acType}
                onChange={(e) => setFormData({ ...formData, acType: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-3 text-xs text-[#152935] focus:outline-none focus:border-[#698ea2] cursor-pointer"
              >
                <option value="AC">AC Room</option>
                <option value="NON-AC">NON-AC Room</option>
              </select>
            </div>

            <div>
              <label className="block text-[#698ea2] mb-1">Rent / Bed (₹)</label>
              <input
                type="number"
                required
                value={formData.rent}
                onChange={(e) => setFormData({ ...formData, rent: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-3 text-sm text-[#152935] focus:outline-none focus:border-[#698ea2]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#152935] hover:bg-[#152935]/90 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <FaCheckCircle className="w-4 h-4 text-[#e4a576]" />
              <span>Add Room & Generate Bed Slots</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddRoomModal;
