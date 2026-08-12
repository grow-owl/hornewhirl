import React, { useEffect, lazy, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

// Lazy Loaded Components for Code Splitting & Performance
const OwnerDashboard = lazy(() => import("../components/OwnerDashboard"));
const SignInModal = lazy(() => import("../components/SignInModal"));
const SecretRegisterModal = lazy(() => import("../components/SecretRegisterModal"));
const RegisterPGModal = lazy(() => import("../components/RegisterPGModal"));
const AddRoomModal = lazy(() => import("../components/AddRoomModal"));
const AllocateBedModal = lazy(() => import("../components/AllocateBedModal"));
const RecordPaymentModal = lazy(() => import("../components/RecordPaymentModal"));
const AddExpenseModal = lazy(() => import("../components/AddExpenseModal"));
const AddComplaintModal = lazy(() => import("../components/AddComplaintModal"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-12 space-x-3 text-[#0b171e]">
    <div className="w-6 h-6 border-3 border-[#0b171e] border-t-[#e4a576] rounded-full animate-spin"></div>
    <span className="text-xs font-extrabold text-[#698ea2]">Loading HomeWhirl Workspace...</span>
  </div>
);

function MainContent({ page }) {
  const { isAuthenticated } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const secretKeyParam = searchParams.get("secret") || searchParams.get("register");
  const secretEnvPath = import.meta.env.VITE_SECRET_REGISTER_PATH || "/secret-register";
  const secretEnvKey = import.meta.env.VITE_SECRET_REGISTER_KEY;

  // Hidden secret registration route detection
  const isSecretRoute =
    page === "secret-register" ||
    path === "/secret-register" ||
    path === secretEnvPath ||
    (secretKeyParam && secretKeyParam === secretEnvKey);

  const showSignInModal = page === "login" || path === "/login";
  const showSecretRegisterModal = Boolean(isSecretRoute);

  const viewMode = (page === "dashboard" || path === "/dashboard") && isAuthenticated ? "dashboard" : "landing";

  useEffect(() => {
    if ((page === "dashboard" || path === "/dashboard") && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [page, path, isAuthenticated, navigate]);

  const handleSignInSuccess = () => {
    navigate("/dashboard");
  };

  const handleRegisterSuccess = () => {
    navigate("/dashboard");
  };

  const handleCloseModal = () => {
    if (viewMode === "dashboard") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#0b171e] flex flex-col font-sans selection:bg-[#0b171e] selection:text-[#e4a576]">
      {/* Desktop Sidebar */}
      {viewMode === "dashboard" && isAuthenticated && (
        <Sidebar onOpenSignIn={() => navigate("/login")} />
      )}

      {/* Top Header Navbar */}
      <Navbar
        viewMode={viewMode}
        setViewMode={(mode) => {
          if (mode === "dashboard") {
            if (isAuthenticated) {
              navigate("/dashboard");
            } else {
              navigate("/login");
            }
          } else {
            navigate("/");
          }
        }}
        onOpenSignIn={() => navigate("/login")}
      />

      {/* Main Workspace with Suspense Boundary */}
      <main className="flex-1">
        <Suspense fallback={<LoadingFallback />}>
          {viewMode === "dashboard" && isAuthenticated ? (
            <OwnerDashboard />
          ) : (
            <LandingPage
              onOpenSignIn={() => navigate("/login")}
              onOpenSecretRegister={() => navigate("/secret-register")}
            />
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <div className={viewMode === "dashboard" && isAuthenticated ? "hidden md:block" : ""}>
        <Footer />
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {viewMode === "dashboard" && isAuthenticated && <BottomNav />}

      {/* Auth & Operational Modals wrapped in Suspense */}
      <Suspense fallback={null}>
        <SignInModal
          show={showSignInModal}
          onClose={handleCloseModal}
          onSuccess={handleSignInSuccess}
          onOpenSecretRegister={() => navigate("/secret-register")}
        />

        <SecretRegisterModal
          show={showSecretRegisterModal}
          onClose={handleCloseModal}
          onSuccess={handleRegisterSuccess}
        />

        <RegisterPGModal />
        <AddRoomModal />
        <AllocateBedModal />
        <RecordPaymentModal />
        <AddExpenseModal />
        <AddComplaintModal />
      </Suspense>
    </div>
  );
}

function Homepage({ page }) {
  return <MainContent page={page} />;
}

export default Homepage;
