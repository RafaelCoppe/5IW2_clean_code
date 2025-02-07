import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import { Motorcycles } from "../pages/motorcycle/Motorcycles";
import Maintenance from "../pages/maintenance/MaintenancePage";
import SpareParts from "../pages/spareParts/SpareParts";
import MaintenanceDetailsPage from "../pages/maintenance/MaintenanceDetailsPage";
import TestDrives from "../pages/testDrive/TestDrives";
import Users from "../pages/user/Users";
import Notifications from "../pages/notification/Notifications";
// import Settings from "../pages/Settings";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./Topbar";
import AddEditMotorcycle from "../pages/motorcycle/AddEditMotorcycle";
import MotorcycleDetails from "../pages/motorcycle/MotorcycleDetails";
import SparePartFormPage from "../pages/spareParts/SparePartFormPage";
import SparePartEditPage from "../pages/spareParts/SparePartEditPage";
import MotoModelCategoriesList from "../pages/motorcycle/MotoModelCategoriesList";
import MotoModelsListPage from "../pages/motorcycle/MotoModelsListPage";
import MotoModelCategoryForm from "../pages/motorcycle/MotoModelCategoryForm";
import MotoModelForm from "../pages/motorcycle/MotoModelForm";
import MotoModelServicesList from "../pages/motorcycle/MotoModelServicesList";
import MotoModelForfaitForm from "../pages/motorcycle/MotoModelServiceForm";
import MotoMaintenanceList from "../pages/maintenance/MotoMaintenanceList";
import AddMotoMaintenance from "../pages/maintenance/AddMotoMaintenance";

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
              path="/moto-model-categories"
              element={<MotoModelCategoriesList />}
            />
            <Route
              path="/moto-model-categories/edit/:id"
              element={<MotoModelCategoryForm />}
            />
            <Route
              path="/moto-model-categories/add"
              element={<MotoModelCategoryForm />}
            />
            <Route path="/moto-models" element={<MotoModelsListPage />} />
            <Route path="/moto-models/add" element={<MotoModelForm />} />
            <Route path="/moto-models/edit/:id" element={<MotoModelForm />} />
            <Route path="/moto-models/edit/:id" element={<MotoModelForm />} />
            <Route
              path="/moto-models/:modelId/services/add"
              element={<MotoModelForfaitForm />}
            />
            <Route
              path="/moto-models/:modelId/services/edit/:distanceInterval"
              element={<MotoModelForfaitForm />}
            />
            <Route
              path="/motorcycles"
              element={<Motorcycles userRole={"dealer"} />}
            />
            <Route path="/motorcycles/add" element={<AddEditMotorcycle />} />
            <Route
              path="/motorcycles/edit/:id"
              element={<AddEditMotorcycle />}
            />
            <Route
              path="/moto-models/services/:modelId"
              element={<MotoModelServicesList />}
            />
            <Route path="/motorcycles/:id" element={<MotorcycleDetails />} />
            /* New routes */
            {/* <Route path="/maintenances" element={<Maintenance />} />
            <Route
              path="/maintenances/:id"
              element={<MaintenanceDetailsPage />}
            />
            <Route path="/maintenances/add" element={<PlanMaintenance />} /> */}
            <Route path="/maintenances" element={<MotoMaintenanceList />} />
            <Route
              path="/maintenances/:id"
              element={<MaintenanceDetailsPage />}
            />
            <Route path="/maintenances/add" element={<AddMotoMaintenance />} />
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
