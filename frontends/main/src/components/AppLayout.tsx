import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import { Motorcycles } from "../pages/motorcycle/Motorcycles";
import Maintenance from "../pages/maintenance/MaintenancePage";
import SpareParts from "../pages/spareParts/SpareParts";
import MaintenanceDetailsPage from "../pages/maintenance/MaintenanceDetailsPage";
import TestDrives from "../pages/testDrive/TestDrive";
import Users from "../pages/user/Users";
import Companies from "../pages/company/Company";
import Notifications from "../pages/notification/Notifications";
import Driver from "../pages/driver/Driver";
// import Settings from "../pages/Settings";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./Topbar";
import AddEditMotorcycle from "../pages/motorcycle/MotorcycleEditPage";
import MotorcycleDetails from "../pages/motorcycle/MotorcycleDetails";
import MotorcycleFormPage from "../pages/motorcycle/MotorcycleFormPage";
import PlanMaintenance from "../pages/maintenance/PlanMaintenance";
import SparePartFormPage from "../pages/spareParts/SparePartFormPage";
import SparePartEditPage from "../pages/spareParts/SparePartEditPage";

import UserFormPage from "../pages/user/UserFormPage";
import UserEditPage from "../pages/user/UserEditPage";

import TestDriveFormPage from "../pages/testDrive/TestDriveFormPage";
import TestDriveEditPage from "../pages/testDrive/TestDriveEditPage";

import CompanyFormPage from "../pages/company/CompanyFormPage";
import CompanyEditPage from "../pages/company/CompanyEditPage";
import SparePartsByCompany from "../pages/spareParts/SparePartsByCompany";
import EditSparePartCommand from "../pages/spareParts/EditSparePartCommand";
import AddSparePartCommand from "../pages/spareParts/AddSparePartCommand";

import DriverFormPage from "../pages/driver/DriverFormPage";
import DriverEditPage from "../pages/driver/DriverEditPage";

const AppLayout: React.FC<{ user: object }> = ({ user }) => {
  const company_type = user.fk_company.type;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64">
        <TopBar />

        {/* Pages */}
        <main className="flex-1 p-4 bg-gray-100 mt-16 overflow-auto">
          <Routes>
            {company_type == 'Concessionnaire' && 
              <>
                <Route path="/spare-parts" element={<SpareParts />} />
                <Route path="/spare-parts/add" element={<SparePartFormPage />} />
                <Route path="/spare-parts/edit/:id" element={<SparePartEditPage />} />

                <Route path="/drivers" element={<Driver />} />
                <Route path="/drivers/add" element={<DriverFormPage />} />
                <Route path="/drivers/edit/:id" element={<DriverEditPage />} />

                <Route path="/test-drives/add" element={<TestDriveFormPage />} />
                <Route path="/test-drives/edit/:id" element={<TestDriveEditPage />} />

                <Route path="/maintenances/:id" element={<MaintenanceDetailsPage />} />
                <Route path="/maintenances/add/:id" element={<PlanMaintenance />} />

                <Route path="/motorcycles/add" element={<MotorcycleFormPage />} />
                <Route path="/motorcycles/edit/:id" element={<AddEditMotorcycle />} />
                <Route path="/motorcycles/:id" element={<MotorcycleDetails />} />
              </>
            }

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/motorcycles" element={<Motorcycles userRole={"dealer"} />} />

            <Route path="/maintenances" element={<Maintenance />} />

            <Route path="/test-drives" element={<TestDrives />} />

            { user.is_admin &&
              <>
                <Route path="/users" element={<Users />} />
                <Route path="/users/add" element={<UserFormPage />} />
                <Route path="/users/edit/:id" element={<UserEditPage />} />

                <Route path="/companies" element={<Companies />} />
                <Route path="/companies/add" element={<CompanyFormPage />} />
                <Route path="/companies/edit/:id" element={<CompanyEditPage />} />
              </>
            }

            <Route path="/notifications" element={<Notifications />} />
            {/* <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
