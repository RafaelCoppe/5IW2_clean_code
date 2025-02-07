import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchMotorcycles,
  deleteMotorcycle,
} from "../../services/MotorcycleServices";
import { fetchMotoModels } from "../../services/motoModelService";
import { MotoModel, Motorcycle } from "../../types/Motorcycle";

export const Motorcycles: React.FC<{ userRole: string }> = ({ userRole }) => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [motoModels, setMotoModels] = useState<MotoModel[]>([]);
  const navigate = useNavigate();

  // ✅ Charger les motos et les modèles de motos
  useEffect(() => {
    setMotorcycles(fetchMotorcycles());
    setMotoModels(fetchMotoModels());
  }, []);

  // ✅ Trouver le label du modèle via son ID
  const getModelLabel = (modelId: number) => {
    return motoModels.find((model) => model.id === modelId)?.label || "Inconnu";
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Gestion des motos</h1>

      {/* Barre d'actions en haut */}
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={() => navigate("/moto-models")}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
        >
          Gérer les modèles
        </button>
        <button
          onClick={() => navigate("/moto-model-categories")}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500"
        >
          Gérer les catégories
        </button>
        {userRole === "admin" && (
          <Link
            to="/motorcycles/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
          >
            Ajouter une moto
          </Link>
        )}
      </div>

      {/* Tableau des motos */}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Modèle</th>
            <th className="border px-4 py-2">Numéro de série</th>
            <th className="border px-4 py-2">Propriétaire</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {motorcycles.map((moto) => (
            <tr key={moto.id}>
              <td className="border px-4 py-2">
                {getModelLabel(moto.modelId)}
              </td>
              <td className="border px-4 py-2">{moto.serialNumber}</td>
              <td className="border px-4 py-2">{moto.owner}</td>
              <td className="border px-4 py-2">
                <div className="flex justify-center space-x-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-400 cursor-pointer"
                    onClick={() => navigate(`/motorcycles/${moto.id}`)}
                  >
                    Voir
                  </button>
                  {(userRole === "admin" || userRole === "dealer") && (
                    <button
                      className="bg-gray-900 hover:bg-gray-700 text-white px-3 py-1 rounded"
                      onClick={() => navigate(`/motorcycles/edit/${moto.id}`)}
                    >
                      Éditer
                    </button>
                  )}
                  {userRole === "admin" && (
                    <>
                      {" | "}
                      <button
                        onClick={() =>
                          setMotorcycles(
                            motorcycles.filter((m) => m.id !== moto.id)
                          )
                        }
                        className="text-red-600 hover:underline"
                      >
                        Supprimer
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
