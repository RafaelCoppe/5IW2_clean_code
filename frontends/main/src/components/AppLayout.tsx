import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import { Motorcycles } from "../pages/motorcycle/Motorcycles";
import Maintenance from "../pages/maintenance/MaintenancePage";
import SpareParts from "../pages/spareParts/SpareParts";
import MaintenanceDetailsPage from "../pages/maintenance/MaintenanceDetailsPage";
import MaintenanceFormPage from "../pages/maintenance/MaintenanceFormPage";
import TestDrives from "../pages/testDrive/TestDrives";
import Users from "../pages/user/Users";
import Notifications from "../pages/notification/Notifications";
// import Settings from "../pages/Settings";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./Topbar";
import AddEditMotorcycle from "../pages/motorcycle/AddEditMotorcycle";
import MotorcycleDetails from "../pages/motorcycle/MotorcycleDetails";
import PlanMaintenance from "../pages/maintenance/PlanMaintenance";
import SparePartFormPage from "../pages/spareParts/SparePartFormPage";
import SparePartEditPage from "../pages/spareParts/SparePartEditPage";

const AppLayout: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isAdmin={isAdmin} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <TopBar />

        {/* Pages */}
        <main className="flex-1 p-4 bg-gray-100">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/motorcycles"
              element={<Motorcycles userRole={"dealer"} />}
            />
            <Route path="/motorcycles/add" element={<AddEditMotorcycle />} />
            <Route
              path="/motorcycles/edit/:id"
              element={<AddEditMotorcycle />}
            />
            <Route path="/motorcycles/:id" element={<MotorcycleDetails />} />

            <Route path="/maintenances" element={<Maintenance />} />
            <Route
              path="/maintenances/:id"
              element={<MaintenanceDetailsPage />}
            />
            <Route path="/maintenances/add" element={<PlanMaintenance />} />
            <Route path="/spare-parts" element={<SpareParts />} />
            <Route path="/spare-parts/add" element={<SparePartFormPage />} />
            <Route
              path="/spare-parts/edit/:id"
              element={<SparePartEditPage />}
            />
            <Route path="/test-drives" element={<TestDrives />} />
            {isAdmin && <Route path="/users" element={<Users />} />}
            <Route path="/notifications" element={<Notifications />} />
            {/* <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
