import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MaintenanceTable from "../../components/maintenance/MaintenanceTable";
import { fetchMaintenances } from "../../services/maintenanceService";
import { Maintenance } from "../../types/Maintenance";

const MaintenancePage: React.FC = () => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleEdit = (id: number) => {
    navigate(`/maintenances/${id}/edit`);
  };

  const handleAdd = () => {
    navigate(`/maintenances/add`);
  };

  const handleDeleteAll = () => {
    if (window.confirm("Voulez-vous vraiment supprimer tous les entretiens ?")) {
      setMaintenances([]); // Delete all locally
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gestion des entretiens</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
        >
          Planifier un entretien
        </button>
        <button
          onClick={handleDeleteAll}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 ml-2"
        >
          Supprimer tous les entretiens
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des entretiens</h2>
        {loading ? (
          <p>Chargement des données...</p>
        ) : (
          <MaintenanceTable maintenances={maintenances} />
        )}
      </div>
    </div>
  );
};

export default MaintenancePage;