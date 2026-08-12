import React, { useState } from "react";
import { FaTimes, FaUserTie, FaCheckCircle } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function SecretRegisterModal({ show, onClose, onSuccess }) {
  const { registerOwner } = useApp();

  const [enteredKey, setEnteredKey] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!show) return null;

  const secretKeyFromEnv = import.meta.env.VITE_SECRET_REGISTER_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enteredKey !== secretKeyFromEnv) {
      setErrorMsg("Unauthorized: Invalid Secret Registration Key!");
      return;
    }

    if (formData.password !== confirmPassword) {
      setErrorMsg("Passwords do not match! Please check and try again.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      await registerOwner(formData);
      onSuccess();
    } catch (err) {
      setErrorMsg(err.message || "Failed to register property owner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b171e]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-[#0b171e] border border-[#ccd5d2] animate-pop-in">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#0b171e] p-2 rounded-full transition cursor-pointer"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-[#0b171e] text-[#e4a576] flex items-center justify-center font-bold shadow-md">
            <FaUserTie className="w-6 h-6 text-[#e4a576]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#0b171e] tracking-tight">Owner Registration</h3>
            <p className="text-xs text-[#698ea2] font-semibold">Create your PG Owner Account</p>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold p-3 rounded-xl mb-4 text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          {/* Secret Registration Key Input */}
          <div>
            <label className="block text-[#698ea2] mb-1">Secret Registration Key</label>
            <input
              type="text"
              required
              value={enteredKey}
              onChange={(e) => setEnteredKey(e.target.value)}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-2.5 font-mono text-xs text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
              placeholder="Enter Secret Key"
            />
          </div>

          {/* Full Name Input */}
          <div>
            <label className="block text-[#698ea2] mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh V"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-2.5 text-xs text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block text-[#698ea2] mb-1">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+91 98480 12345"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-2.5 text-xs text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
            />
          </div>

          {/* Email Address Input */}
          <div>
            <label className="block text-[#698ea2] mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="owner@homewhirl.in"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-2.5 text-xs text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
            />
          </div>

          {/* Password & Confirm Password Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#698ea2] mb-1">Set Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-2.5 text-xs text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
              />
            </div>

            <div>
              <label className="block text-[#698ea2] mb-1">Confirm Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-2.5 text-xs text-[#0b171e] focus:outline-none focus:border-[#698ea2]"
              />
            </div>
          </div>

          {/* Info Note */}
          <div className="bg-[#f1e5d6]/60 p-3 rounded-xl text-[11px] text-[#698ea2] leading-snug font-medium">
            💡 PG property setup & room matrix configuration can be done inside your Owner Dashboard after registration.
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0b171e] hover:bg-[#0b171e]/90 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
            >
              <FaCheckCircle className="w-4 h-4 text-[#e4a576]" />
              <span>{loading ? "Registering Account..." : "Register Owner Account"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default SecretRegisterModal;
