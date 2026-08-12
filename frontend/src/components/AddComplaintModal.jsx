import React, { useState } from "react";
import { FaTimes, FaTools, FaCheckCircle, FaUserCheck } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function AddComplaintModal() {
  const { showAddComplaintModal, setShowAddComplaintModal, activeProperty, students, staffList, addComplaint } = useApp();

  const activeStudents = students.filter(
    (s) => s.propertyId === activeProperty.id && s.status !== "CHECKED_OUT"
  );

  const [formData, setFormData] = useState({
    studentName: activeStudents[0]?.name || "Ravindra",
    roomNo: activeStudents[0]?.roomNo || "101",
    category: "Electrical Issue",
    priority: "MEDIUM",
    description: "",
    assignedStaff: staffList[0] || "Ramesh (Electrician)",
  });

  if (!showAddComplaintModal) return null;

  const handleStudentChange = (e) => {
    const sName = e.target.value;
    const stud = activeStudents.find((s) => s.name === sName);
    setFormData({
      ...formData,
      studentName: sName,
      roomNo: stud ? stud.roomNo : "101",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComplaint(formData);
    setFormData({
      studentName: activeStudents[0]?.name || "Ravindra",
      roomNo: activeStudents[0]?.roomNo || "101",
      category: "Electrical Issue",
      priority: "MEDIUM",
      description: "",
      assignedStaff: staffList[0] || "Ramesh (Electrician)",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#152935]/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-sunburn p-6 sm:p-8 text-[#152935] border border-[#ccd5d2] animate-pop-in">
        
        {/* Close Button */}
        <button
          onClick={() => setShowAddComplaintModal(false)}
          className="absolute top-5 right-5 bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#152935] p-2 rounded-full transition cursor-pointer"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#152935] text-[#e4a576] flex items-center justify-center font-bold shadow-sm">
            <FaTools className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#152935]">Raise Maintenance Ticket</h3>
            <p className="text-xs text-[#698ea2]">Assign staff & track issue resolution</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-[#698ea2] mb-1">Select Tenant</label>
            <select
              value={formData.studentName}
              onChange={handleStudentChange}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#152935] focus:outline-none focus:border-[#698ea2] cursor-pointer"
            >
              {activeStudents.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} (Room {s.roomNo})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#698ea2] mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-3 text-xs text-[#152935] focus:outline-none focus:border-[#698ea2] cursor-pointer"
              >
                <option value="Electrical Issue">Electrical Issue</option>
                <option value="Plumbing">Plumbing & Water</option>
                <option value="Housekeeping">Housekeeping & Cleaning</option>
                <option value="Wi-Fi / Internet">Wi-Fi / Internet</option>
                <option value="Furniture / Woodwork">Furniture / Woodwork</option>
                <option value="General Appliance">General Appliance</option>
              </select>
            </div>

            <div>
              <label className="block text-[#698ea2] mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-3 py-3 text-xs text-[#152935] focus:outline-none focus:border-[#698ea2] cursor-pointer"
              >
                <option value="LOW">Low Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="HIGH">High Priority / Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#698ea2] mb-1">Assign Staff Member</label>
            <select
              value={formData.assignedStaff}
              onChange={(e) => setFormData({ ...formData, assignedStaff: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#152935] focus:outline-none focus:border-[#698ea2] cursor-pointer"
            >
              {staffList.map((st, i) => (
                <option key={i} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#698ea2] mb-1">Issue Description</label>
            <textarea
              rows="3"
              required
              placeholder="Describe the complaint or repair required..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-xs text-[#152935] focus:outline-none focus:border-[#698ea2]"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#152935] hover:bg-[#152935]/90 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <FaCheckCircle className="w-4 h-4 text-[#e4a576]" />
              <span>Log Ticket & Assign Staff</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddComplaintModal;
