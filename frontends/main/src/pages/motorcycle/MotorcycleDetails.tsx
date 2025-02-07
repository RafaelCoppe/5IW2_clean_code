import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MotoModel, Motorcycle } from "../../types/Motorcycle";
import { fetchMotorcycleById } from "../../services/MotorcycleServices";
import { ArrowLeft } from "lucide-react";
import { fetchMotoModels } from "../../services/motoModelService";

const MotorcycleDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [motoModels, setMotoModels] = useState<MotoModel[]>([]);

  useEffect(() => {
    if (id) {
      const moto = fetchMotorcycleById(Number(id));
      setMotorcycle(moto || null);
      setMotoModels(fetchMotoModels());
    }
  }, [id]);

  if (!motorcycle) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">
          Chargement des détails de la moto...
        </p>
      </div>
    );
  }

  // ✅ Trouver le label du modèle via son ID
  const getModelLabel = (modelId: number) => {
    return motoModels.find((model) => model.id === modelId)?.label || "Inconnu";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Détails de la moto</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft size={18} />
          Retour
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Modèle :</span>
          <span className="text-gray-900">
            {getModelLabel(motorcycle.modelId)}
          </span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Numéro de série :</span>
          <span className="text-gray-900">{motorcycle.serialNumber}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Propriétaire :</span>
          <span className="text-gray-900">{motorcycle.owner}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Couleur :</span>
          <span className="text-gray-900">{motorcycle.color}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Capacité :</span>
          <span className="text-gray-900">{motorcycle.capacity} cc</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Année :</span>
          <span className="text-gray-900">{motorcycle.year}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">
            Dernier entretien :
          </span>
          <span className="text-gray-900">{motorcycle.lastService}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">
            Prochain entretien :
          </span>
          <span className="text-gray-900">{motorcycle.nextService}</span>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Historique des entretiens
        </h2>
        {motorcycle.maintenanceHistory.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {motorcycle.maintenanceHistory.map((service, index) => (
              <li key={index} className="border p-3 rounded-md shadow-sm">
                <span className="font-semibold">Date :</span> {service.date}{" "}
                <br />
                <span className="font-semibold">Détails :</span>{" "}
                {service.details}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            Aucun historique d’entretien disponible.
          </p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Essais moto
        </h2>
        {motorcycle.testDrives.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {motorcycle.testDrives.map((testDrive, index) => (
              <li key={index} className="border p-3 rounded-md shadow-sm">
                <span className="font-semibold">Conducteur :</span>{" "}
                {testDrive.driver} <br />
                <span className="font-semibold">Date :</span> {testDrive.date}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun essai enregistré.</p>
        )}
      </div>
    </div>
  );
};

export default MotorcycleDetails;
