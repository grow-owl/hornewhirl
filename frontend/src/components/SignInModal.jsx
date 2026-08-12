import React, { useState } from "react";
import { FaTimes, FaLock, FaUserTie, FaCheckCircle, FaKey, FaBuilding } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function SignInModal({ show, onClose, onSuccess, onOpenSecretRegister }) {
  const { loginOwner } = useApp();
  const [credential, setCredential] = useState("owner@homewhirl.in");
  const [password, setPassword] = useState("owner123");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg(null);
      await loginOwner(credential, password);
      onSuccess();
    } catch (err) {
      setErrorMsg(err.message || "Invalid Email/Phone or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#152935]/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-sunburn p-6 sm:p-8 text-[#152935] border border-[#ccd5d2] animate-pop-in">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-[#f1e5d6] hover:bg-[#ccd5d2] text-[#152935] p-2 rounded-full transition cursor-pointer"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#152935] text-[#e4a576] flex items-center justify-center font-bold shadow-sm">
            <FaLock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#152935]">PG Owner Sign In</h3>
            <p className="text-xs text-[#698ea2]">Enter your credentials to access your dashboard</p>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold p-3 rounded-xl mb-4 text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-[#698ea2] mb-1">Email Address or Registered Phone</label>
            <input
              type="text"
              required
              placeholder="owner@homewhirl.in or +91 98480 12345"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#152935] focus:outline-none focus:border-[#698ea2]"
            />
          </div>

          <div>
            <label className="block text-[#698ea2] mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f7f4ef] border border-[#ccd5d2] rounded-xl px-4 py-3 text-sm text-[#152935] focus:outline-none focus:border-[#698ea2]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#152935] hover:bg-[#152935]/90 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <FaCheckCircle className="w-4 h-4 text-[#e4a576]" />
              <span>{loading ? "Authenticating..." : "Sign In to Owner Dashboard"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default SignInModal;
