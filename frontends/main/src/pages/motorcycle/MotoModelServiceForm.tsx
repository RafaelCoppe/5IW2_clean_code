import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchMotoModelServiceById,
  addMotoModelService,
  updateMotoModelService,
} from "../../services/motoModelServiceService";

const MotoModelServiceForm: React.FC = () => {
  const { modelId, distanceInterval } = useParams<{
    modelId: string;
    distanceInterval?: string;
  }>();
  const navigate = useNavigate();

  const [service, setService] = useState<{
    distanceInterval: number;
    timeInterval?: number | null;
    price: number;
    order: number;
  }>({
    distanceInterval: 0,
    timeInterval: null,
    price: 0,
    order: 1,
  });

  useEffect(() => {
    if (modelId && distanceInterval) {
      const serviceData = fetchMotoModelServiceById(
        Number(modelId),
        Number(distanceInterval)
      );
      if (serviceData) setService(serviceData);
    }
  }, [modelId, distanceInterval]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!service.distanceInterval || service.distanceInterval < 0) {
      alert("La distance doit être un nombre positif.");
      return;
    }

    if (!service.price || service.price < 0) {
      alert("Le prix doit être un nombre positif.");
      return;
    }

    if (modelId) {
      if (distanceInterval) {
        updateMotoModelService(
          Number(modelId),
          Number(distanceInterval),
          service
        );
      } else {
        addMotoModelService({ ...service, modelId: Number(modelId) });
      }
    }
    navigate(`/moto-models/services/${modelId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          {distanceInterval ? "Modifier" : "Ajouter"} un forfait d'entretien
        </h1>

        {/* 📌 Champ Distance */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Distance (km)
          </label>
          <input
            type="number"
            value={service.distanceInterval}
            onChange={(e) =>
              setService({
                ...service,
                distanceInterval: Number(e.target.value),
              })
            }
            required
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* 📌 Champ Durée */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Durée (mois)
          </label>
          <input
            type="number"
            value={service.timeInterval || ""}
            onChange={(e) =>
              setService({
                ...service,
                timeInterval: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* 📌 Champ Prix */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Prix (€)
          </label>
          <input
            type="number"
            value={service.price}
            onChange={(e) =>
              setService({ ...service, price: Number(e.target.value) })
            }
            required
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* 📌 Boutons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            ⬅ Retour
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default MotoModelServiceForm;
