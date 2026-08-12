import React, { useState } from "react";
import { FaTimes, FaFileInvoiceDollar, FaCalculator, FaCheckCircle, FaBolt, FaWater } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function GenerateInvoiceModal() {
  const { showGenerateBillModal, setShowGenerateBillModal, students, activeProperty, generateInvoice } = useApp();

  const activeStudents = students.filter(
    (s) => s.propertyId === activeProperty.id && s.status !== "CHECKED_OUT"
  );

  const [formData, setFormData] = useState({
    studentId: activeStudents[0]?.id || "",
    month: "August 2026",
    rentAmount: activeStudents[0]?.rent || 7500,
    electricityAmount: 450,
    waterAmount: 150,
    dueDate: "2026-08-15",
  });

  if (!showGenerateBillModal) return null;

  const selectedStudent = activeStudents.find((s) => s.id === parseInt(formData.studentId)) || activeStudents[0];

  const handleStudentChange = (e) => {
    const sId = parseInt(e.target.value);
    const stud = activeStudents.find((s) => s.id === sId);
    setFormData({
      ...formData,
      studentId: sId,
      rentAmount: stud ? stud.rent : 7500,
    });
  };

  const totalAmount = (parseInt(formData.rentAmount) || 0) + (parseInt(formData.electricityAmount) || 0) + (parseInt(formData.waterAmount) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.studentId) {
      generateInvoice(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b171e]/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-sunburn p-6 sm:p-8 text-[#0b171e] border border-[#ccd5d2] animate-pop-in">
        
        {/* Close Button */}
        <button
          onClick={() => setShowGenerateBillModal(false)}
          className="absolute top-5 right-5 bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#0b171e] p-2 rounded-full transition"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#e4a576] text-white flex items-center justify-center font-bold shadow-sm">
            <FaFileInvoiceDollar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0b171e]">Automated Bill & Rent Invoice Generator</h3>
            <p className="text-xs text-[#698ea2]">Rent + Utility / Electricity Charges Calculation</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-[#698ea2] mb-1">Select Active Tenant</label>
            <select
              value={formData.studentId}
              onChange={handleStudentChange}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2] cursor-pointer"
            >
              {activeStudents.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — Room {s.roomNo} ({s.bedNo})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#698ea2] mb-1">Billing Month</label>
              <input
                type="text"
                required
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
              />
            </div>

            <div>
              <label className="block text-[#698ea2] mb-1">Due Date</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
              />
            </div>
          </div>

          <div className="bg-[#f1e5d6]/50 p-4 rounded-2xl border border-[#ccd5d2] space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-[#0b171e] tracking-wider flex items-center gap-1.5">
              <FaCalculator className="text-[#e4a576]" /> Breakdown Charges
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[#698ea2] text-[11px] mb-1">Monthly Rent (₹)</label>
                <input
                  type="number"
                  required
                  value={formData.rentAmount}
                  onChange={(e) => setFormData({ ...formData, rentAmount: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white border border-[#ccd5d2] rounded-xl px-3 py-2 text-xs text-[#0b171e]"
                />
              </div>

              <div>
                <label className="block text-[#698ea2] text-[11px] mb-1 flex items-center gap-1">
                  <FaBolt className="text-amber-500" /> Electricity (₹)
                </label>
                <input
                  type="number"
                  value={formData.electricityAmount}
                  onChange={(e) => setFormData({ ...formData, electricityAmount: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white border border-[#ccd5d2] rounded-xl px-3 py-2 text-xs text-[#0b171e]"
                />
              </div>

              <div>
                <label className="block text-[#698ea2] text-[11px] mb-1 flex items-center gap-1">
                  <FaWater className="text-blue-500" /> Water / Gas (₹)
                </label>
                <input
                  type="number"
                  value={formData.waterAmount}
                  onChange={(e) => setFormData({ ...formData, waterAmount: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white border border-[#ccd5d2] rounded-xl px-3 py-2 text-xs text-[#0b171e]"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-[#ccd5d2] font-black text-sm">
              <span>Total Invoice Payable</span>
              <span className="text-emerald-700 text-base">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#0b171e] hover:bg-[#0b171e]/90 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <FaCheckCircle className="w-4 h-4 text-[#e4a576]" />
              <span>Generate & Issue Invoice</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GenerateInvoiceModal;
