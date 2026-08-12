import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  FaBuilding,
  FaBed,
  FaRupeeSign,
  FaExclamationTriangle,
  FaPlusCircle,
  FaUserPlus,
  FaCheckCircle,
  FaPhoneAlt,
  FaSearch,
  FaTrash,
  FaExchangeAlt,
  FaCoins,
  FaTools,
  FaReceipt,
  FaPrint,
  FaChartLine,
  FaEdit,
  FaIdCard,
  FaFileInvoiceDollar,
  FaChevronRight
} from "react-icons/fa";
import TenantKYCModal from "./TenantKYCModal";
import GenerateInvoiceModal from "./GenerateInvoiceModal";

function OwnerDashboard() {
  const {
    properties,
    selectedPropertyId,
    setSelectedPropertyId,
    activeProperty,
    activeTab,
    setActiveTab,
    rooms,
    students,
    invoices,
    expenses,
    complaints,
    staffList,
    setShowRegisterPGModal,
    setShowAddRoomModal,
    setShowAllocateBedModal,
    setShowRecordPaymentModal,
    setShowGenerateBillModal,
    setShowAddExpenseModal,
    setShowAddComplaintModal,
    setSelectedReceipt,
    setSelectedStudentKYC,
    updateBedStatus,
    deleteRoom,
    checkoutStudent,
    transferBed,
    assignComplaintStaff,
    updateComplaintStatus,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("All");
  const [bedStatusFilter, setBedStatusFilter] = useState("All");
  const [transferModalStudent, setTransferModalStudent] = useState(null);
  const [targetRoomNo, setTargetRoomNo] = useState("101");
  const [targetBedNo, setTargetBedNo] = useState("Bed 1");

  // Filter Data for Active Property
  const activeRooms = rooms.filter((r) => r.propertyId === activeProperty.id);
  const activeStudents = students.filter((s) => s.propertyId === activeProperty.id && s.status !== "CHECKED_OUT");
  const activeInvoices = invoices.filter((i) => i.propertyId === activeProperty.id);
  const activeExpenses = expenses.filter((e) => e.propertyId === activeProperty.id);
  const activeComplaints = complaints.filter((c) => c.propertyId === activeProperty.id);

  // Compute Occupancy & Bed Statistics
  let totalBeds = 0;
  let occupiedBeds = 0;
  let vacantBeds = 0;
  let maintenanceBeds = 0;

  activeRooms.forEach((r) => {
    (r.beds || []).forEach((b) => {
      totalBeds += 1;
      if (b.status === "OCCUPIED") occupiedBeds += 1;
      else if (b.status === "MAINTENANCE") maintenanceBeds += 1;
      else vacantBeds += 1;
    });
  });

  const occupancyPercentage = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  // Financial Calculations
  const grossCollection = activeInvoices
    .filter((i) => i.status === "PAID")
    .reduce((acc, i) => acc + (i.paidAmount || i.amount || 0), 0);

  const pendingInvoices = activeInvoices.filter((i) => i.status === "DUE" || i.status === "OVERDUE");
  const pendingRentSum = pendingInvoices.reduce((acc, i) => acc + (i.amount || 0), 0);

  const totalOperatingExpenses = activeExpenses.reduce((acc, e) => acc + (e.amount || 0), 0);
  const estimatedOperatingProfit = grossCollection - totalOperatingExpenses;

  // Unique Floors list for room grid filtering
  const floors = ["All", ...Array.from(new Set(activeRooms.map((r) => r.floor)))];

  // Room filtering
  const filteredRooms = activeRooms.filter((r) => {
    const floorMatch = selectedFloor === "All" || r.floor === selectedFloor;
    const statusMatch =
      bedStatusFilter === "All" ||
      r.beds.some((b) => b.status === bedStatusFilter);
    return floorMatch && statusMatch;
  });

  // Student filtering
  const filteredStudents = activeStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roomNo.includes(searchTerm) ||
      s.phone.includes(searchTerm) ||
      (s.kyc?.aadhaarNo && s.kyc.aadhaarNo.includes(searchTerm))
  );

  const handleTransfer = (e) => {
    e.preventDefault();
    if (transferModalStudent) {
      transferBed(transferModalStudent.id, targetRoomNo, targetBedNo);
      setTransferModalStudent(null);
    }
  };

  if (properties.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] text-[#152935] py-16 px-4 flex items-center justify-center">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sunburn border border-[#ccd5d2] max-w-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#152935] text-[#e4a576] flex items-center justify-center text-2xl mx-auto font-black shadow-md">
            <FaBuilding />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#152935]">Welcome to HomeWhirl SaaS</h2>
            <p className="text-xs text-[#698ea2] mt-2 leading-relaxed font-semibold">
              No PG or Hostel property registered yet. Click below to register your first property and start customizing floors, rooms, beds & onboarding tenants!
            </p>
          </div>
          <button
            onClick={() => setShowRegisterPGModal(true)}
            className="w-full bg-[#152935] hover:bg-[#152935]/90 text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <FaPlusCircle className="w-4 h-4 text-[#e4a576]" />
            <span>+ Register Your First PG Property</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#152935] py-8 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* PG Top Header Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sunburn border border-[#ccd5d2] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-extrabold uppercase px-3 py-1 rounded-full bg-[#f1e5d6] text-[#152935] tracking-wider">
                {activeProperty.type || "Co-Living PG"}
              </span>
              <span className="text-xs text-[#698ea2] font-bold">📍 {activeProperty.city}, {activeProperty.locality}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#152935] tracking-tight flex items-center gap-3">
              {activeProperty.name}
            </h1>
            <p className="text-xs text-[#698ea2] mt-1 font-semibold">
              Owner Contact: {activeProperty.ownerName} {activeProperty.phone && (<a href={`tel:${activeProperty.phone}`} className="hover:underline hover:text-[#152935] transition">({activeProperty.phone})</a>)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Property Switcher */}
            <div className="bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-2 flex items-center gap-2">
              <FaBuilding className="text-[#698ea2] w-3.5 h-3.5" />
              <select
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(parseInt(e.target.value))}
                className="bg-transparent text-xs font-bold text-[#152935] focus:outline-none cursor-pointer"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.locality})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowAddRoomModal(true)}
              className="bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#152935] text-xs font-extrabold px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
            >
              <FaBed className="w-3.5 h-3.5 text-[#698ea2]" />
              <span>+ Add Room</span>
            </button>

            <button
              onClick={() => setShowAllocateBedModal(true)}
              className="bg-[#152935] hover:bg-[#152935]/90 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
            >
              <FaUserPlus className="w-3.5 h-3.5 text-[#e4a576]" />
              <span>Add Tenant</span>
            </button>

            <button
              onClick={() => setShowRecordPaymentModal(true)}
              className="bg-[#e4a576] hover:bg-[#e4a576]/90 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
            >
              <FaReceipt className="w-3.5 h-3.5 text-white" />
              <span>Collect Rent</span>
            </button>
          </div>
        </div>

        {/* Pending Rent Alerts Banner */}
        {pendingInvoices.length > 0 && (
          <div className="bg-[#f1e5d6] border border-[#e4a576]/60 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e4a576] text-white flex items-center justify-center font-bold text-sm">
                <FaExclamationTriangle />
              </div>
              <div>
                <span className="text-xs font-black text-[#152935] block">
                  ⚠️ ₹{(pendingRentSum / 1000).toFixed(1)}K pending • {pendingInvoices.length} dues outstanding
                </span>
                <span className="text-[11px] text-[#698ea2] font-semibold">
                  Only property owner can record payment settlements and issue receipts.
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveTab("billing");
                setShowRecordPaymentModal(true);
              }}
              className="bg-[#152935] text-[#e4a576] hover:bg-[#152935]/90 font-extrabold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1 cursor-pointer"
            >
              <span>View & Collect Dues</span>
              <FaChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* MODULE 1: OVERVIEW DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Top Stat Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#ccd5d2] shadow-card text-center space-y-1 hover-lift">
                <span className="text-3xl font-black text-[#152935]">{totalBeds}</span>
                <span className="text-xs font-extrabold text-[#698ea2] block uppercase tracking-wider">Total Beds</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#ccd5d2] shadow-card text-center space-y-1 hover-lift">
                <span className="text-3xl font-black text-emerald-600">{occupiedBeds}</span>
                <span className="text-xs font-extrabold text-emerald-700 block uppercase tracking-wider">Occupied Beds</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#ccd5d2] shadow-card text-center space-y-1 hover-lift">
                <span className="text-3xl font-black text-[#e4a576]">{vacantBeds}</span>
                <span className="text-xs font-extrabold text-[#e4a576] block uppercase tracking-wider">Vacant Beds</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#ccd5d2] shadow-card text-center space-y-1 hover-lift">
                <span className="text-3xl font-black text-[#152935]">{occupancyPercentage}%</span>
                <span className="text-xs font-extrabold text-emerald-600 block uppercase tracking-wider">Occupancy Rate</span>
              </div>
            </div>

            {/* Financial & Occupancy Rate Graphs Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Occupancy Rate Visual Graph */}
              <div className="bg-white rounded-3xl p-6 shadow-sunburn border border-[#ccd5d2] space-y-4">
                <h3 className="text-base font-extrabold text-[#152935] flex items-center justify-between">
                  <span>Occupancy Breakdown Graph</span>
                  <span className="text-xs font-bold text-[#698ea2]">{occupiedBeds} Occupied / {vacantBeds} Vacant</span>
                </h3>

                <div className="flex items-center justify-around py-4">
                  {/* SVG Donut Chart */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#f1e5d6]"
                        strokeWidth="3.8"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#ef4444]"
                        strokeDasharray={`${(occupiedBeds / (totalBeds || 1)) * 100}, 100`}
                        strokeWidth="3.8"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#22c55e]"
                        strokeDasharray={`${(vacantBeds / (totalBeds || 1)) * 100}, 100`}
                        strokeDashoffset={`-${(occupiedBeds / (totalBeds || 1)) * 100}`}
                        strokeWidth="3.8"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-black text-[#152935]">{occupancyPercentage}%</span>
                      <span className="text-[10px] font-bold text-[#698ea2] block">Occupied</span>
                    </div>
                  </div>

                  {/* Legend Pills */}
                  <div className="space-y-3 text-xs font-extrabold">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-md bg-[#ef4444] inline-block"></span>
                      <span>Occupied Beds ({occupiedBeds})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-md bg-[#22c55e] inline-block"></span>
                      <span>Available Beds ({vacantBeds})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-md bg-[#f97316] inline-block"></span>
                      <span>Maintenance ({maintenanceBeds})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Monthly Revenue & Financial Summary */}
              <div className="bg-white rounded-3xl p-6 shadow-sunburn border border-[#ccd5d2] space-y-4">
                <h3 className="text-base font-extrabold text-[#152935] flex items-center justify-between">
                  <span>Total Monthly Revenue & P&L</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">August 2026</span>
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                  <div className="bg-[#f7f4ef] p-4 rounded-2xl border border-[#ccd5d2]">
                    <span className="text-[#698ea2] block mb-1">Gross Revenue Collected</span>
                    <span className="text-xl font-black text-emerald-700">₹{grossCollection.toLocaleString()}</span>
                  </div>

                  <div className="bg-[#f7f4ef] p-4 rounded-2xl border border-[#ccd5d2]">
                    <span className="text-[#698ea2] block mb-1">Operating Expenses</span>
                    <span className="text-xl font-black text-[#152935]">₹{totalOperatingExpenses.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-[#f1e5d6] p-4 rounded-2xl border border-[#e4a576]/50 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[#698ea2] font-bold block">Estimated Net Profit</span>
                    <span className="text-2xl font-black text-[#152935]">₹{estimatedOperatingProfit.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => setShowGenerateBillModal(true)}
                    className="bg-[#152935] text-white hover:bg-[#152935]/90 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaFileInvoiceDollar className="text-[#e4a576]" /> Generate Bill
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white rounded-3xl p-6 shadow-sunburn border border-[#ccd5d2] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-extrabold text-[#152935] uppercase tracking-wider">Owner Actions & Configuration</span>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowAddRoomModal(true)}
                  className="bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#152935] font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
                >
                  <FaBed className="text-[#698ea2]" /> Customize Rooms & Beds
                </button>

                <button
                  onClick={() => setShowAllocateBedModal(true)}
                  className="bg-[#152935] hover:bg-[#152935]/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <FaUserPlus className="text-[#e4a576]" /> Add Tenant
                </button>

                <button
                  onClick={() => setShowRecordPaymentModal(true)}
                  className="bg-[#e4a576] hover:bg-[#e4a576]/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <FaReceipt /> Collect Rent
                </button>

                <button
                  onClick={() => setShowGenerateBillModal(true)}
                  className="bg-[#698ea2] hover:bg-[#698ea2]/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <FaFileInvoiceDollar /> Issue Bill
                </button>
              </div>
            </div>

          </div>
        )}

        {/* MODULE 2: ROOM & BED MATRIX WITH FULL CUSTOMIZATION */}
        {activeTab === "rooms" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Header Controls & Customization Trigger */}
            <div className="bg-white rounded-3xl p-6 shadow-sunburn border border-[#ccd5d2] space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-[#152935]">Floor-Wise Room & Bed Customizer</h3>
                  <p className="text-xs text-[#698ea2] font-semibold mt-0.5">
                    Customize how many rooms exist per floor, set bed slots, sharing type & AC options
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddRoomModal(true)}
                    className="bg-[#152935] text-white hover:bg-[#152935]/90 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <FaBed className="text-[#e4a576]" /> + Add / Configure Room & Beds
                  </button>
                </div>
              </div>

              {/* Status Badges Legend */}
              <div className="flex flex-wrap items-center justify-between border-t border-[#f1e5d6] pt-3 gap-2">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></span> Green: Available ({vacantBeds})
                  </span>
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span> Red: Occupied ({occupiedBeds})
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]"></span> Orange: Maintenance ({maintenanceBeds})
                  </span>
                </div>

                {/* Floor Tabs Navigation */}
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-xs font-extrabold text-[#698ea2]">Floor:</span>
                  {floors.map((fl) => (
                    <button
                      key={fl}
                      onClick={() => setSelectedFloor(fl)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                        selectedFloor === fl
                          ? "bg-[#152935] text-white shadow-md"
                          : "bg-[#f7f4ef] text-[#698ea2] hover:bg-[#f1e5d6] hover:text-[#152935]"
                      }`}
                    >
                      {fl} {fl !== "All" ? `(${activeRooms.filter((r) => r.floor === fl).length})` : ""}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Room Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <div key={room.id} className="bg-white rounded-3xl p-6 shadow-sunburn border border-[#ccd5d2] space-y-4">
                  <div className="flex justify-between items-center border-b border-[#f1e5d6] pb-3">
                    <div>
                      <span className="text-[10px] text-[#698ea2] uppercase font-bold tracking-wider">{room.floor}</span>
                      <h4 className="text-lg font-black text-[#152935]">ROOM {room.roomNo}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span className="bg-[#f1e5d6] text-[#152935] text-xs font-extrabold px-3 py-1 rounded-full block">
                          ₹{room.rent}/mo
                        </span>
                        <span className="text-[10px] text-[#698ea2] font-semibold block mt-0.5">{room.acType || "NON-AC"}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete Room ${room.roomNo}?`)) {
                            deleteRoom(room.id);
                          }
                        }}
                        className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition"
                        title="Delete Room"
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Bed Grid Slots Color-coded by Bed Status */}
                  <div className="grid grid-cols-2 gap-3">
                    {room.beds.map((bed) => {
                      const isOccupied = bed.status === "OCCUPIED";
                      const isMaintenance = bed.status === "MAINTENANCE";

                      return (
                        <div
                          key={bed.id}
                          className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col justify-between space-y-2 ${
                            isOccupied
                              ? "bg-rose-50/80 border-rose-200 text-rose-900"
                              : isMaintenance
                              ? "bg-amber-50/80 border-amber-200 text-amber-900"
                              : "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span
                              className={`w-6 h-6 rounded-lg text-[10px] font-black flex items-center justify-center text-white ${
                                isOccupied ? "bg-[#ef4444]" : isMaintenance ? "bg-[#f97316]" : "bg-[#22c55e]"
                              }`}
                            >
                              🛏
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-wider">{bed.bedNo}</span>
                          </div>

                          <div>
                            {isOccupied ? (
                              <span className="font-extrabold text-xs block text-slate-900 truncate">{bed.studentName}</span>
                            ) : isMaintenance ? (
                              <span className="font-extrabold text-xs block text-amber-800">Maintenance</span>
                            ) : (
                              <span className="font-extrabold text-xs block text-emerald-800">Available</span>
                            )}
                          </div>

                          {/* Quick Bed Status Dropdown Toggle */}
                          <div className="pt-1">
                            <select
                              value={bed.status}
                              onChange={(e) => updateBedStatus(room.id, bed.bedNo, e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 text-[10px] font-bold focus:outline-none cursor-pointer"
                            >
                              <option value="AVAILABLE">Green: Available</option>
                              <option value="OCCUPIED">Red: Occupied</option>
                              <option value="MAINTENANCE">Orange: Maintenance</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-[#f1e5d6] flex justify-between items-center text-xs font-semibold text-[#698ea2]">
                    <span>Sharing: {room.sharingType}</span>
                    <span className="font-bold text-[#152935]">{room.beds.filter((b) => b.status === "OCCUPIED").length} / {room.beds.length} Occupied</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* MODULE 3: TENANT PROFILE & KYC VIEW */}
        {activeTab === "kyc" && (
          <div className="bg-white rounded-3xl p-6 shadow-sunburn border border-[#ccd5d2] space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-[#152935]">Tenant Profiles & Digital KYC Ledger</h3>
                <p className="text-xs text-[#698ea2] font-semibold mt-0.5">
                  Guest contact details, bed allocation, due dates, payment history & Aadhaar/PAN proofs
                </p>
              </div>

              <div className="relative w-full sm:w-80">
                <FaSearch className="absolute left-3.5 top-3 text-[#698ea2] w-3.5 h-3.5" />
                <input
                  type="text"
                  placeholder="Search tenant, Aadhaar or room..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-full pl-10 pr-4 py-2 text-xs text-[#152935] focus:outline-none focus:border-[#698ea2]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#ccd5d2] text-[#698ea2] uppercase font-extrabold text-[10px] tracking-wider">
                    <th className="pb-3 px-3">Tenant Name & Contact</th>
                    <th className="pb-3 px-3">Allocated Room</th>
                    <th className="pb-3 px-3">Government ID / KYC</th>
                    <th className="pb-3 px-3">Joining Date</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1e5d6]">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-[#f7f4ef]/80 transition font-semibold">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-[#152935] text-sm">{s.name}</div>
                        <a href={`tel:${s.phone}`} className="text-[#698ea2] text-[11px] flex items-center gap-1 mt-0.5 hover:text-[#152935] hover:underline transition">
                          <FaPhoneAlt className="w-2.5 h-2.5 text-[#698ea2]" /> {s.phone}
                        </a>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="bg-[#f1e5d6] text-[#152935] font-extrabold px-3 py-1 rounded-lg">
                          Room {s.roomNo} ({s.bedNo})
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="text-[11px]">
                          <span className="font-mono font-bold text-[#152935] block">Aadhaar: {s.kyc?.aadhaarNo || "4812 9012 3456"}</span>
                          <span className="text-emerald-700 font-bold block text-[10px]">✓ KYC Verified</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-[#698ea2]">{s.joiningDate}</td>
                      <td className="py-3.5 px-3">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                          ACTIVE
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right space-x-2">
                        <button
                          onClick={() => setSelectedStudentKYC(s)}
                          className="bg-[#152935] text-white hover:bg-[#152935]/90 font-bold px-3 py-1.5 rounded-xl text-[11px] transition inline-flex items-center gap-1 cursor-pointer"
                        >
                          <FaIdCard className="text-[#e4a576]" /> KYC Ledger
                        </button>
                        <button
                          onClick={() => checkoutStudent(s.id)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1.5 rounded-xl text-[11px] transition cursor-pointer"
                        >
                          Checkout
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* MODULE 4: BILLING & EXPENSE TRACKER */}
        {activeTab === "billing" && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="bg-white rounded-3xl p-6 shadow-sunburn border border-[#ccd5d2] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-[#152935]">Billing & Operating Expense Tracker</h3>
                <p className="text-xs text-[#698ea2] font-semibold mt-0.5">
                  Automated invoice generator for rent and utility/electricity bills with profit/loss summary charts
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowGenerateBillModal(true)}
                  className="bg-[#152935] hover:bg-[#152935]/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <FaFileInvoiceDollar className="text-[#e4a576]" /> Auto Bill Generator
                </button>
                <button
                  onClick={() => setShowAddExpenseModal(true)}
                  className="bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#152935] font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
                >
                  <FaCoins className="text-[#698ea2]" /> + Log Expense
                </button>
              </div>
            </div>

            {/* Invoices List View */}
            <div className="bg-white rounded-3xl p-6 shadow-sunburn border border-[#ccd5d2] space-y-4">
              <h4 className="text-sm font-extrabold text-[#152935] uppercase tracking-wider">Issued Rent & Utility Invoices</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#ccd5d2] text-[#698ea2] uppercase font-bold text-[10px]">
                      <th className="pb-3 px-3">Tenant & Invoice ID</th>
                      <th className="pb-3 px-3">Month</th>
                      <th className="pb-3 px-3">Breakdown (Rent + Utility)</th>
                      <th className="pb-3 px-3">Total Payable</th>
                      <th className="pb-3 px-3">Status</th>
                      <th className="pb-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1e5d6] font-semibold">
                    {activeInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#f7f4ef]/60 transition">
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-[#152935]">{inv.studentName}</div>
                          <div className="text-[#698ea2] text-[10px]">{inv.id}</div>
                        </td>
                        <td className="py-3.5 px-3 text-[#698ea2]">{inv.month}</td>
                        <td className="py-3.5 px-3">
                          <span>Rent: ₹{inv.rentAmount || inv.amount}</span>
                          {inv.electricityAmount > 0 && <span className="text-[#698ea2] block text-[10px]">Elec: ₹{inv.electricityAmount} • Water: ₹{inv.waterAmount}</span>}
                        </td>
                        <td className="py-3.5 px-3 font-extrabold text-[#152935] text-sm">₹{inv.amount?.toLocaleString()}</td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`font-bold px-2.5 py-1 rounded-full text-[10px] uppercase ${
                              inv.status === "PAID" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          {inv.status === "PAID" ? (
                            <button
                              onClick={() => {
                                setSelectedReceipt(inv);
                                setShowRecordPaymentModal(true);
                              }}
                              className="bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#152935] font-bold px-3 py-1.5 rounded-xl text-[11px] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <FaPrint className="text-[#698ea2]" /> Receipt
                            </button>
                          ) : (
                            <button
                              onClick={() => setShowRecordPaymentModal(true)}
                              className="bg-[#152935] text-white hover:bg-[#152935]/90 font-bold px-3.5 py-1.5 rounded-xl text-[11px] cursor-pointer"
                            >
                              Record Settlement
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Operating Expenses Log */}
            <div className="bg-white rounded-3xl p-6 shadow-sunburn border border-[#ccd5d2] space-y-4">
              <h4 className="text-sm font-extrabold text-[#152935] uppercase tracking-wider">Operating Expenses Log</h4>
              <div className="space-y-3">
                {activeExpenses.map((exp) => (
                  <div key={exp.id} className="bg-[#f7f4ef] p-4 rounded-2xl border border-[#ccd5d2] flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-[#152935] text-sm block">{exp.category}</span>
                      <span className="text-[11px] text-[#698ea2]">{exp.notes} • {exp.date}</span>
                    </div>
                    <span className="font-black text-[#152935] text-base">₹{exp.amount?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* MODULE 5: COMPLAINT / ISSUE DESK */}
        {activeTab === "complaints" && (
          <div className="bg-white rounded-3xl p-6 shadow-sunburn border border-[#ccd5d2] space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-[#152935]">Complaint / Issue Maintenance Desk</h3>
                <p className="text-xs text-[#698ea2] font-semibold mt-0.5">
                  Track maintenance requests raised by tenants & assign staff members (Electrician, Plumber, Housekeeping)
                </p>
              </div>

              <button
                onClick={() => setShowAddComplaintModal(true)}
                className="bg-[#152935] hover:bg-[#152935]/90 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <FaTools className="text-[#e4a576]" /> Log Maintenance Request
              </button>
            </div>

            <div className="space-y-3">
              {activeComplaints.map((c) => (
                <div key={c.id} className="bg-[#f7f4ef] p-5 rounded-2xl border border-[#ccd5d2] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-semibold">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="bg-[#f1e5d6] text-[#152935] text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                        {c.category}
                      </span>
                      <span className="font-bold text-[#152935]">Room {c.roomNo} ({c.studentName})</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                          c.priority === "HIGH" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {c.priority} Priority
                      </span>
                    </div>
                    <p className="text-[#698ea2] text-xs leading-relaxed">{c.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Staff Assignment Dropdown */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#698ea2]">Staff:</span>
                      <select
                        value={c.assignedStaff || "Unassigned"}
                        onChange={(e) => assignComplaintStaff(c.id, e.target.value)}
                        className="bg-white border border-[#ccd5d2] text-[#152935] text-xs font-bold px-3 py-1.5 rounded-xl focus:outline-none cursor-pointer"
                      >
                        {staffList.map((st, idx) => (
                          <option key={idx} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    {c.status === "RESOLVED" ? (
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-3.5 py-1.5 rounded-xl text-[11px]">
                        ✓ Resolved
                      </span>
                    ) : (
                      <button
                        onClick={() => updateComplaintStatus(c.id, "RESOLVED")}
                        className="bg-[#152935] text-white hover:bg-[#152935]/90 font-bold px-3.5 py-1.5 rounded-xl text-[11px] cursor-pointer"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* Bed Transfer Modal */}
      {transferModalStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#152935]/75 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full space-y-4 text-xs font-semibold text-[#152935] border border-[#ccd5d2] shadow-sunburn">
            <h4 className="text-base font-bold">Transfer Bed for {transferModalStudent.name}</h4>
            <div>
              <label className="block text-[#698ea2] mb-1">Target Room Number</label>
              <input
                type="text"
                value={targetRoomNo}
                onChange={(e) => setTargetRoomNo(e.target.value)}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-2 text-xs text-[#152935]"
              />
            </div>
            <div>
              <label className="block text-[#698ea2] mb-1">Target Bed Slot</label>
              <select
                value={targetBedNo}
                onChange={(e) => setTargetBedNo(e.target.value)}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-2 text-xs text-[#152935]"
              >
                <option value="Bed 1">Bed 1</option>
                <option value="Bed 2">Bed 2</option>
                <option value="Bed 3">Bed 3</option>
                <option value="Bed 4">Bed 4</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setTransferModalStudent(null)}
                className="w-full bg-[#f1e5d6] py-2 rounded-xl font-bold text-[#152935]"
              >
                Cancel
              </button>
              <button onClick={handleTransfer} className="w-full bg-[#152935] text-white py-2 rounded-xl font-bold">
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Modals */}
      <TenantKYCModal />
      <GenerateInvoiceModal />
    </div>
  );
}

export default OwnerDashboard;
