import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MaintenanceTable from "../../components/maintenance/MaintenanceTable";
import { fetchMaintenances } from "../../services/maintenanceService";
import { Maintenance } from "../../types/Maintenance";

const MaintenancePage: React.FC = () => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMaintenances = async () => {
      try {
        const data = await fetchMaintenances();
        setMaintenances(data);
        toast.success("Entretiens chargés avec succès !");
      } catch (error) {
        toast.error("Erreur lors du chargement des entretiens.");
      } finally {
        setLoading(false);
      }
    };

    loadMaintenances();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Gestion des entretiens</h1>
        <button
          onClick={() => (window.location.href = "/maintenances/add")}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
        >
          Planifier un entretien
        </button>
      </div>{" "}
      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <MaintenanceTable maintenances={maintenances} />
      )}
    </div>
  );
};

export default MaintenancePage;
