import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMotoModelById } from "../../services/motoModelService";
import { fetchMotoModelServices } from "../../services/motoModelServiceService";
import { MotoModelService } from "../../types/Motorcycle";

const MotoModelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupérer l'ID du modèle
  const navigate = useNavigate();
  const [model, setModel] = useState<{ label: string } | null>(null);
  const [services, setServices] = useState<MotoModelService[]>([]);

  useEffect(() => {
    if (id) {
      const modelData = fetchMotoModelById(Number(id));
      if (modelData) setModel(modelData);

      setServices(fetchMotoModelServices(Number(id))); // Charger les forfaits
    }
  }, [id]);

  if (!model) {
    return <div>Chargement des détails du modèle...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{model.label}</h1>

      {/* Section Forfaits */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Forfaits d'entretien</h2>
        <button
          onClick={() => navigate(`/moto-models/${id}/services/add`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Ajouter un forfait
        </button>

        {services.length > 0 ? (
          <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Distance (km)</th>
                <th className="border px-4 py-2">Durée (mois)</th>
                <th className="border px-4 py-2">Prix (€)</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.distanceInterval}>
                  <td className="border px-4 py-2">
                    {service.distanceInterval}
                  </td>
                  <td className="border px-4 py-2">
                    {service.timeInterval || "N/A"}
                  </td>
                  <td className="border px-4 py-2">{service.price} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4">Aucun forfait d'entretien disponible.</p>
        )}
      </div>
    </div>
  );
};

export default MotoModelDetails;
