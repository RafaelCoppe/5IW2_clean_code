import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMotoModels,
  deleteMotoModel,
} from "../../services/motoModelService";
import { MotoModel } from "../../types/Motorcycle";

const MotoModelsListPage: React.FC = () => {
  const [motoModels, setMotoModels] = useState<MotoModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMotoModels(fetchMotoModels());
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Listes des modèles </h1>

      <div className="bg-white shadow-md rounded-lg p-4">
        <button
          onClick={() => navigate("/moto-models/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Ajouter un modèle
        </button>
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Modèle</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {motoModels.map((model) => (
              <tr key={model.id}>
                <td className="border px-4 py-2">{model.label}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => navigate(`/moto-models/edit/${model.id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-500"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/moto-models/services/${model.id}`)
                    }
                    className="bg-gray-900 text-white px-3 py-1 rounded mr-2 hover:bg-gray-700"
                  >
                    Voir Forfaits
                  </button>
                  <button
                    onClick={() => deleteMotoModel(model.id)}
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
    </div>
  );
};

export default MotoModelsListPage;
