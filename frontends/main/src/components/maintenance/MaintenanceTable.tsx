import React from "react";

interface Services {
  "id": number,
  "date": string,
  "cost": number,
  "note": string,
  "fk_parts": [],
}

interface MaintenanceTableProps {
  services: Services[];
  company_type: string;
}

const MaintenanceTable: React.FC<MaintenanceTableProps> = ({
  services,
  company_type
}) => {
  // Fonction pour calculer le statut
  const getStatus = (date: string) => {
    const today = new Date();
    const maintenanceDate = new Date(date);
    return maintenanceDate < today ? "Effectué" : "Planifié";
  };

  return (
    services.length === 0 ? (
      <p className="text-xl mb-4">Aucun entretien</p>
    ) : (
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Coût</th>
            <th className="border px-4 py-2">Note</th>
            <th className="border px-4 py-2">Pièces détachées</th>
            {company_type == 'Concessionnaire' && <th className="border px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {services.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border px-4 py-2">{item.date}</td>
              <td className="border px-4 py-2">
                {item.cost ? `${item.cost} €` : "-"}
              </td>
              <td className="border px-4 py-2">{item.note}</td>
              <td className="border px-4 py-2">
                {item.fk_parts.length > 0
                  ? (
                    <ul className="list-disc list-inside">
                      {item.fk_parts.map((part: object) => (
                        <li key={part.id}>{part.label}</li>
                      ))}
                    </ul>
                  )
                  : "-"}
              </td>
              {company_type == 'Concessionnaire' && (<td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() =>
                    (window.location.href = `/maintenances/${item.id}`)
                  }
                >
                  Voir détails
                </button>
              </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

export default MaintenanceTable;
