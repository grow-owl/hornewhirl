import "./index.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Homepage page="landing" />} />
        <Route path="/login" element={<Homepage page="login" />} />
        <Route path="/dashboard" element={<Homepage page="dashboard" />} />
        <Route path="/secret-register" element={<Homepage page="secret-register" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
