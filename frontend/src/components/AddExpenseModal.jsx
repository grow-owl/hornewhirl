import React, { useState } from "react";
import { FaTimes, FaCoins, FaCheckCircle } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function AddExpenseModal() {
  const { showAddExpenseModal, setShowAddExpenseModal, activeProperty, addExpense } = useApp();

  const [formData, setFormData] = useState({
    category: "Electricity Bill",
    amount: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });

  if (!showAddExpenseModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(formData);
    setFormData({
      category: "Electricity Bill",
      amount: "",
      notes: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b171e]/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-sunburn p-6 sm:p-8 text-[#0b171e] border border-[#ccd5d2] animate-pop-in">
        
        {/* Close Button */}
        <button
          onClick={() => setShowAddExpenseModal(false)}
          className="absolute top-5 right-5 bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#0b171e] p-2 rounded-full transition cursor-pointer"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center font-bold shadow-sm">
            <FaCoins className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0b171e]">Log Operating Expense</h3>
            <p className="text-xs text-[#698ea2]">{activeProperty.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-[#698ea2] mb-1">Expense Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2] cursor-pointer"
            >
              <option value="Electricity Bill">Electricity Bill</option>
              <option value="Water & Gas Essentials">Water & Gas Essentials</option>
              <option value="Staff Salary">Staff Salary & Allowance</option>
              <option value="Maintenance & Plumbing">Maintenance & Repairs</option>
              <option value="High-Speed Wi-Fi">High-Speed Wi-Fi / Internet</option>
              <option value="Groceries & Kitchen">Groceries & Food Supplies</option>
              <option value="General Operating">General Operating Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-[#698ea2] mb-1">Amount Spent (₹)</label>
            <input
              type="number"
              required
              placeholder="e.g. 5000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
            />
          </div>

          <div>
            <label className="block text-[#698ea2] mb-1">Expense Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
            />
          </div>

          <div>
            <label className="block text-[#698ea2] mb-1">Description / Notes</label>
            <textarea
              rows="2"
              placeholder="Details about vendor, bill number, etc..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-xs text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#0b171e] hover:bg-[#0b171e]/90 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <FaCheckCircle className="w-4 h-4 text-[#e4a576]" />
              <span>Record Expense Log</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddExpenseModal;
