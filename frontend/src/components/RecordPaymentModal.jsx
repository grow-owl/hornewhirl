import React, { useState } from "react";
import { FaTimes, FaRupeeSign, FaCheckCircle, FaPrint, FaReceipt } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function RecordPaymentModal() {
  const {
    showRecordPaymentModal,
    setShowRecordPaymentModal,
    invoices,
    activeProperty,
    recordPayment,
    selectedReceipt,
    setSelectedReceipt,
  } = useApp();

  const dueInvoices = invoices.filter(
    (inv) => inv.propertyId === activeProperty.id && inv.status !== "PAID"
  );

  const [selectedInvoiceId, setSelectedInvoiceId] = useState(dueInvoices[0]?.id || "");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  if (!showRecordPaymentModal) return null;

  const handleRecord = (e) => {
    e.preventDefault();
    if (selectedInvoiceId) {
      recordPayment(selectedInvoiceId, paymentMethod);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b171e]/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-sunburn p-6 sm:p-8 text-[#0b171e] border border-[#ccd5d2] animate-pop-in">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setShowRecordPaymentModal(false);
            setSelectedReceipt(null);
          }}
          className="absolute top-5 right-5 bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#0b171e] p-2 rounded-full transition cursor-pointer"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        {selectedReceipt ? (
          /* Receipt Digital View */
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <FaCheckCircle className="w-6 h-6" />
            </div>

            <div>
              <span className="bg-[#f1e5d6] text-[#0b171e] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Official Rent Receipt
              </span>
              <h3 className="text-xl font-black text-[#0b171e] mt-2">Receipt #{selectedReceipt.receiptNo}</h3>
              <p className="text-xs text-[#698ea2]">{activeProperty.name}</p>
            </div>

            <div className="bg-[#f7f4ef] p-4 rounded-2xl border border-[#ccd5d2] text-xs space-y-2 text-left">
              <div className="flex justify-between border-b border-[#f1e5d6] pb-2">
                <span className="text-[#698ea2]">Tenant Name</span>
                <span className="font-bold text-[#0b171e]">{selectedReceipt.studentName}</span>
              </div>
              <div className="flex justify-between border-b border-[#f1e5d6] pb-2">
                <span className="text-[#698ea2]">Billing Month</span>
                <span className="font-bold text-[#0b171e]">{selectedReceipt.month}</span>
              </div>
              <div className="flex justify-between border-b border-[#f1e5d6] pb-2">
                <span className="text-[#698ea2]">Amount Paid</span>
                <span className="font-extrabold text-emerald-700 text-sm">₹{selectedReceipt.paidAmount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-[#f1e5d6] pb-2">
                <span className="text-[#698ea2]">Payment Mode</span>
                <span className="font-bold text-[#0b171e]">{selectedReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#698ea2]">Date Settlement</span>
                <span className="font-bold text-[#0b171e]">{selectedReceipt.paidDate}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="w-full bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#0b171e] font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <FaPrint className="w-3.5 h-3.5" /> Print Receipt
              </button>
              <button
                onClick={() => {
                  setShowRecordPaymentModal(false);
                  setSelectedReceipt(null);
                }}
                className="w-full bg-[#0b171e] hover:bg-[#0b171e]/90 text-white font-bold py-3 rounded-xl text-xs transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Payment Entry Form */
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center font-bold shadow-sm">
                <FaReceipt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0b171e]">Collect Rent & Record Payment</h3>
                <p className="text-xs text-[#698ea2]">Digital ledger entry & instant receipt</p>
              </div>
            </div>

            {dueInvoices.length === 0 ? (
              <div className="text-center py-6 text-xs text-[#698ea2]">
                🎉 All rent invoices for {activeProperty.name} are fully settled!
              </div>
            ) : (
              <form onSubmit={handleRecord} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-[#698ea2] mb-1">Select Pending Invoice</label>
                  <select
                    value={selectedInvoiceId}
                    onChange={(e) => setSelectedInvoiceId(e.target.value)}
                    className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2] cursor-pointer"
                  >
                    {dueInvoices.map((inv) => (
                      <option key={inv.id} value={inv.id}>
                        {inv.studentName} — ₹{inv.amount?.toLocaleString()} ({inv.month})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#698ea2] mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#0b171e] focus:outline-none focus:border-[#698ea2] cursor-pointer"
                  >
                    <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                    <option value="Cash">Cash Handover</option>
                    <option value="Bank Transfer">NEFT / IMPS Bank Transfer</option>
                    <option value="Razorpay Online">Razorpay Gateway</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#0b171e] hover:bg-[#0b171e]/90 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <FaCheckCircle className="w-4 h-4 text-[#e4a576]" />
                    <span>Confirm Settlement & Generate Receipt</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default RecordPaymentModal;
