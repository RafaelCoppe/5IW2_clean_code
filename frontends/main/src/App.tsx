import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
// import Dashboard from "./pages/Dashboard";
// import Motorcycles from "./pages/Motorcycles";
// import Maintenance from "./pages/Maintenance";
// import SpareParts from "./pages/SpareParts";
// import TestDrives from "./pages/TestDrives";
// import Users from "./pages/Users";
// import Notifications from "./pages/Notifications";
// import Settings from "./pages/Settings";
import Login from "./pages/login/Login";

const App: React.FC = () => {
  const isAdmin = true; // Simulated admin role
  const isAuthenticated = true; // Simulated authentication

  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Protected pages */}
        {isAuthenticated && (
          <Route path="/*" element={<AppLayout isAdmin={isAdmin} />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
