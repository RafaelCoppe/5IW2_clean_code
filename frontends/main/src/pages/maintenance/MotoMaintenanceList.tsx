import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAllMaintenances,
  deleteMotoMaintenance,
} from "../../services/motoMaintenanceService";
import { MotoMaintenance } from "../../types/Motorcycle";

const MotoMaintenanceList: React.FC = () => {
  const navigate = useNavigate();
  const [maintenances, setMaintenances] = useState<MotoMaintenance[]>([]);

  useEffect(() => {
    setMaintenances(fetchAllMaintenances());
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Liste des maintenances</h1>

      <button
        onClick={() => navigate(`/maintenances/add`)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 mb-4"
      >
        Ajouter une maintenance
      </button>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Modèle</th>
            <th className="border px-4 py-2">Kilométrage</th>
            <th className="border px-4 py-2">Coût (€)</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {maintenances.map((maintenance) => (
            <tr key={maintenance.id}>
              <td className="border px-4 py-2">{maintenance.modelName}</td>
              <td className="border px-4 py-2">{maintenance.mileage} km</td>
              <td className="border px-4 py-2">{maintenance.cost} €</td>
              <td className="border px-4 py-2">{maintenance.date}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => navigate(`/maintenances/${maintenance.id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-500"
                >
                  Voir
                </button>
                <button
                  onClick={() => deleteMotoMaintenance(maintenance.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MotoMaintenanceList;
