import React from "react";

interface Maintenance {
  id: number;
  motoId: number;
  date: string;
  type: "preventive" | "curative";
  cost?: number;
  notes?: string;
}

interface MaintenanceTableProps {
  maintenances: Maintenance[];
  motoId?: number; // Prop optionnelle pour filtrer par moto
}

const MaintenanceTable: React.FC<MaintenanceTableProps> = ({
  maintenances,
  motoId,
}) => {
  // Fonction pour calculer le statut
  const getStatus = (date: string) => {
    const today = new Date();
    const maintenanceDate = new Date(date);
    return maintenanceDate < today ? "Effectué" : "Planifié";
  };

  // Filtrer les entretiens pour une moto spécifique
  const filteredMaintenances = motoId
    ? maintenances.filter((item) => item.motoId === motoId)
    : maintenances;

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Moto ID</th>
          <th className="border px-4 py-2">Type</th>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Coût</th>
          <th className="border px-4 py-2">Notes</th>
          <th className="border px-4 py-2">Statut</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredMaintenances.map((item) => (
          <tr key={item.id} className="text-center">
            <td className="border px-4 py-2">{item.motoId}</td>
            <td className="border px-4 py-2">
              {item.type === "preventive" ? "Préventif" : "Curatif"}
            </td>
            <td className="border px-4 py-2">{item.date}</td>
            <td className="border px-4 py-2">
              {item.cost ? `${item.cost} €` : "-"}
            </td>
            <td className="border px-4 py-2">{item.notes || "-"}</td>
            <td className="border px-4 py-2">{getStatus(item.date)}</td>
            <td className="border px-4 py-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() =>
                  (window.location.href = `/maintenances/${item.id}`)
                }
              >
                Voir détails
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MaintenanceTable;
