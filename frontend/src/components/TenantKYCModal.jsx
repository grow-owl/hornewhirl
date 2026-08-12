import React, { useState } from "react";
import { FaTimes, FaIdCard, FaCheckCircle, FaUserShield, FaPhoneAlt, FaEnvelope, FaBed, FaHistory, FaExternalLinkAlt, FaFileAlt } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function TenantKYCModal() {
  const { selectedStudentKYC, setSelectedStudentKYC, updateTenantKYC, invoices } = useApp();

  const [editMode, setEditMode] = useState(false);
  const [aadhaarNo, setAadhaarNo] = useState(selectedStudentKYC?.kyc?.aadhaarNo || "4812 9012 3456");
  const [panNo, setPanNo] = useState(selectedStudentKYC?.kyc?.panNo || "ABCDE1234F");
  const [emergencyContact, setEmergencyContact] = useState(selectedStudentKYC?.kyc?.emergencyContact || selectedStudentKYC?.phone);
  const [idProofType, setIdProofType] = useState(selectedStudentKYC?.kyc?.idProofType || "Aadhaar Card");

  if (!selectedStudentKYC) return null;

  const tenantInvoices = invoices.filter((inv) => inv.studentId === selectedStudentKYC.id);

  const handleSaveKYC = (e) => {
    e.preventDefault();
    updateTenantKYC(selectedStudentKYC.id, {
      aadhaarNo,
      panNo,
      emergencyContact,
      idProofType,
    });
    setEditMode(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b171e]/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-sunburn p-6 sm:p-8 text-[#0b171e] border border-[#ccd5d2] max-h-[90vh] overflow-y-auto animate-pop-in">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setSelectedStudentKYC(null);
            setEditMode(false);
          }}
          className="absolute top-5 right-5 bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#0b171e] p-2 rounded-full transition cursor-pointer"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        {/* Header Header */}
        <div className="flex items-center gap-4 mb-6 border-b border-[#f1e5d6] pb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center font-black text-xl shadow-md">
            {selectedStudentKYC.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-[#0b171e]">{selectedStudentKYC.name}</h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <FaCheckCircle className="w-3 h-3 text-emerald-600" /> KYC Verified
              </span>
            </div>
            <p className="text-xs text-[#698ea2] font-semibold mt-0.5">
              Room {selectedStudentKYC.roomNo} • {selectedStudentKYC.bedNo} • Joined: {selectedStudentKYC.joiningDate}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
          
          {/* Column 1: Contact Details & Bed Allocation */}
          <div className="space-y-4">
            <div className="bg-[#f7f4ef] p-4 rounded-2xl border border-[#ccd5d2] space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase text-[#0b171e] tracking-wider mb-2 flex items-center gap-1.5">
                <FaUserShield className="text-[#698ea2]" /> Contact & Emergency Info
              </h4>
              <div className="flex items-center justify-between text-[#0b171e]">
                <span className="text-[#698ea2]">Phone Number</span>
                <a href={`tel:${selectedStudentKYC.phone}`} className="font-bold flex items-center gap-1 hover:text-[#e4a576] hover:underline transition">
                  <FaPhoneAlt className="text-[#698ea2] w-3 h-3" /> {selectedStudentKYC.phone}
                </a>
              </div>
              <div className="flex items-center justify-between text-[#0b171e]">
                <span className="text-[#698ea2]">Email Address</span>
                <a href={`mailto:${selectedStudentKYC.email}`} className="font-bold flex items-center gap-1 hover:text-[#e4a576] hover:underline transition">
                  <FaEnvelope className="text-[#698ea2] w-3 h-3" /> {selectedStudentKYC.email}
                </a>
              </div>
              <div className="flex items-center justify-between text-[#0b171e]">
                <span className="text-[#698ea2]">Guardian Contact</span>
                <span className="font-bold text-right">{selectedStudentKYC.guardian}</span>
              </div>
              <div className="flex items-center justify-between text-[#0b171e]">
                <span className="text-[#698ea2]">Emergency Phone</span>
                <a href={`tel:${selectedStudentKYC.kyc?.emergencyContact || selectedStudentKYC.phone}`} className="font-bold text-amber-700 hover:underline transition">
                  {selectedStudentKYC.kyc?.emergencyContact || selectedStudentKYC.phone}
                </a>
              </div>
            </div>

            {/* KYC Credentials */}
            <div className="bg-[#f1e5d6]/60 p-4 rounded-2xl border border-[#ccd5d2] space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-extrabold uppercase text-[#0b171e] tracking-wider flex items-center gap-1.5">
                  <FaIdCard className="text-[#e4a576]" /> Government ID & KYC Proofs
                </h4>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="text-[11px] font-bold text-[#698ea2] hover:text-[#0b171e] underline cursor-pointer"
                >
                  {editMode ? "Cancel Edit" : "Edit KYC"}
                </button>
              </div>

              {editMode ? (
                <form onSubmit={handleSaveKYC} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[#698ea2] text-[10px] uppercase mb-1">Aadhaar Number</label>
                    <input
                      type="text"
                      value={aadhaarNo}
                      onChange={(e) => setAadhaarNo(e.target.value)}
                      className="w-full bg-white border border-[#ccd5d2] rounded-xl px-3 py-1.5 text-xs text-[#0b171e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#698ea2] text-[10px] uppercase mb-1">PAN Number</label>
                    <input
                      type="text"
                      value={panNo}
                      onChange={(e) => setPanNo(e.target.value)}
                      className="w-full bg-white border border-[#ccd5d2] rounded-xl px-3 py-1.5 text-xs text-[#0b171e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#698ea2] text-[10px] uppercase mb-1">Emergency Contact</label>
                    <input
                      type="text"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      className="w-full bg-white border border-[#ccd5d2] rounded-xl px-3 py-1.5 text-xs text-[#0b171e]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0b171e] text-white font-bold py-2 rounded-xl text-xs hover:bg-[#0b171e]/90 cursor-pointer"
                  >
                    Save Updated KYC Details
                  </button>
                </form>
              ) : (
                <div className="space-y-2 text-[#0b171e]">
                  <div className="flex justify-between border-b border-[#ccd5d2]/60 pb-1.5">
                    <span className="text-[#698ea2]">Aadhaar No.</span>
                    <span className="font-mono font-bold tracking-wider">{selectedStudentKYC.kyc?.aadhaarNo || "4812 9012 3456"}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#ccd5d2]/60 pb-1.5">
                    <span className="text-[#698ea2]">PAN Card No.</span>
                    <span className="font-mono font-bold tracking-wider">{selectedStudentKYC.kyc?.panNo || "ABCDE1234F"}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-[#698ea2]">Uploaded Proof</span>
                    <a
                      href={selectedStudentKYC.kyc?.idProofUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-white border border-[#ccd5d2] text-[#0b171e] px-2.5 py-1 rounded-lg text-[10px] font-bold hover:bg-[#f1e5d6]"
                    >
                      <FaFileAlt className="text-[#e4a576]" /> View ID Image <FaExternalLinkAlt className="w-2.5 h-2.5 text-[#698ea2]" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Digital Payment Ledger & Invoices */}
          <div className="space-y-4">
            <div className="bg-[#f7f4ef] p-4 rounded-2xl border border-[#ccd5d2] space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-[#0b171e] tracking-wider flex items-center gap-1.5">
                <FaHistory className="text-[#698ea2]" /> Tenant Rent Ledger & Payment History
              </h4>

              {tenantInvoices.length === 0 ? (
                <p className="text-xs text-[#698ea2]">No rent invoices issued yet.</p>
              ) : (
                <div className="space-y-2">
                  {tenantInvoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-3 bg-white rounded-xl border border-[#ccd5d2] flex justify-between items-center text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#0b171e] block">{inv.month}</span>
                        <span className="text-[10px] text-[#698ea2]">
                          Rent: ₹{inv.rentAmount || inv.amount} {inv.electricityAmount ? `+ Elec: ₹${inv.electricityAmount}` : ""}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[#0b171e] block">₹{inv.amount?.toLocaleString()}</span>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                            inv.status === "PAID" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setSelectedStudentKYC(null);
                setEditMode(false);
              }}
              className="w-full bg-[#0b171e] hover:bg-[#0b171e]/90 text-white font-bold py-3 rounded-2xl transition cursor-pointer text-xs"
            >
              Close Tenant Profile View
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default TenantKYCModal;
