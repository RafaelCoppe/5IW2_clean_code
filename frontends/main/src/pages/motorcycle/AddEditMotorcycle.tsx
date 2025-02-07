import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchMotorcycleById,
  addMotorcycle,
  updateMotorcycle,
} from "../../services/MotorcycleServices";
import { fetchMotoModels } from "../../services/motoModelService";
import { MotoModel, Motorcycle } from "../../types/Motorcycle";

const AddEditMotorcycle: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID de la moto
  const navigate = useNavigate();

  // ✅ États
  const [motorcycle, setMotorcycle] = useState<Omit<Motorcycle, "id">>({
    modelId: 0,
    serialNumber: "",
    owner: "",
    color: "",
    capacity: 0,
    year: new Date().getFullYear(),
    lastService: "",
    nextService: "",
    maintenanceHistory: [],
    testDrives: [],
  });

  const [motoModels, setMotoModels] = useState<MotoModel[]>([]);

  // ✅ Charger les modèles et les données en mode édition
  useEffect(() => {
    setMotoModels(fetchMotoModels()); // Charger la liste des modèles

    if (id) {
      const moto = fetchMotorcycleById(Number(id));
      if (moto) setMotorcycle(moto);
    }
  }, [id]);

  // ✅ Gestion de la soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateMotorcycle(Number(id), motorcycle);
    } else {
      addMotorcycle(motorcycle);
    }
    navigate("/motorcycles");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {id ? "Modifier une moto" : "Ajouter une moto"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Sélection du modèle */}
          <div>
            <label className="block font-medium mb-1">Modèle</label>
            <select
              value={motorcycle.modelId}
              onChange={(e) =>
                setMotorcycle({
                  ...motorcycle,
                  modelId: Number(e.target.value),
                })
              }
              className="w-full border p-3 rounded-md"
              required
            >
              <option value="">Sélectionner un modèle</option>
              {motoModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.label}
                </option>
              ))}
            </select>
          </div>

          {/* Numéro de série */}
          <div>
            <label className="block font-medium mb-1">Numéro de série</label>
            <input
              type="text"
              value={motorcycle.serialNumber}
              onChange={(e) =>
                setMotorcycle({ ...motorcycle, serialNumber: e.target.value })
              }
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Propriétaire */}
          <div>
            <label className="block font-medium mb-1">Propriétaire</label>
            <input
              type="text"
              value={motorcycle.owner}
              onChange={(e) =>
                setMotorcycle({ ...motorcycle, owner: e.target.value })
              }
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Couleur */}
          <div>
            <label className="block font-medium mb-1">Couleur</label>
            <input
              type="text"
              value={motorcycle.color}
              onChange={(e) =>
                setMotorcycle({ ...motorcycle, color: e.target.value })
              }
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Capacité */}
          <div>
            <label className="block font-medium mb-1">Capacité (cc)</label>
            <input
              type="number"
              value={motorcycle.capacity}
              onChange={(e) =>
                setMotorcycle({
                  ...motorcycle,
                  capacity: Number(e.target.value),
                })
              }
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Année */}
          <div>
            <label className="block font-medium mb-1">Année</label>
            <input
              type="number"
              value={motorcycle.year}
              onChange={(e) =>
                setMotorcycle({
                  ...motorcycle,
                  year: Number(e.target.value),
                })
              }
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Dernier entretien */}
          <div>
            <label className="block font-medium mb-1">Dernier entretien</label>
            <input
              type="date"
              value={motorcycle.lastService}
              onChange={(e) =>
                setMotorcycle({
                  ...motorcycle,
                  lastService: e.target.value,
                })
              }
              className="w-full border p-3 rounded-md"
            />
          </div>

          {/* Prochain entretien */}
          <div>
            <label className="block font-medium mb-1">Prochain entretien</label>
            <input
              type="date"
              value={motorcycle.nextService}
              onChange={(e) =>
                setMotorcycle({
                  ...motorcycle,
                  nextService: e.target.value,
                })
              }
              className="w-full border p-3 rounded-md"
            />
          </div>

          {/* Boutons */}
          <div className="col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/motorcycles")}
              className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition"
            >
              {id ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditMotorcycle;
