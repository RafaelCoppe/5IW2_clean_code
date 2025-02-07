import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchMotoModelServices,
  deleteMotoModelService,
} from "../../services/motoModelServiceService";
import { MotoModelService, MotoModel } from "../../types/Motorcycle";
import { fetchMotoModelById } from "../../services/motoModelService";

const MotoModelServicesList: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>(); // ID du modèle
  const navigate = useNavigate();
  const [services, setServices] = useState<MotoModelService[]>([]);
  const [motoModel, setMotoModel] = useState<MotoModel | null>(null); // 🔥 Stocke le modèle

  useEffect(() => {
    if (modelId) {
      setServices(fetchMotoModelServices(Number(modelId)));

      // 🔥 Récupérer le modèle pour afficher son nom
      const modelData = fetchMotoModelById(Number(modelId));
      if (modelData) setMotoModel(modelData);
    }
  }, [modelId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 🔥 Afficher le nom du modèle */}
      <h1 className="text-3xl font-bold mb-6">
        Forfaits d'entretien pour{" "}
        {motoModel ? motoModel.label : "Modèle inconnu"}
      </h1>

      <button
        onClick={() => navigate(`/moto-models/${modelId}/services/add`)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
      >
        Ajouter un forfait
      </button>

      <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Distance (km)</th>
            <th className="border px-4 py-2">Durée (mois)</th>
            <th className="border px-4 py-2">Prix (€)</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.distanceInterval}>
              <td className="border px-4 py-2">{service.distanceInterval}</td>
              <td className="border px-4 py-2">
                {service.timeInterval || "N/A"}
              </td>
              <td className="border px-4 py-2">{service.price} €</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() =>
                    navigate(
                      `/moto-models/${modelId}/services/edit/${service.distanceInterval}`
                    )
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-500"
                >
                  Éditer
                </button>
                <button
                  onClick={() =>
                    deleteMotoModelService(
                      Number(modelId),
                      service.distanceInterval
                    )
                  }
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 Bouton Retour */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500"
      >
        ⬅ Retour
      </button>
    </div>
  );
};

export default MotoModelServicesList;
