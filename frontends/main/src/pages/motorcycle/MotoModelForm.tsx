import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchMotoModelById,
  addMotoModel,
  updateMotoModel,
} from "../../services/motoModelService";
import { fetchMotoModelCategories } from "../../services/motoModelCategoryService";
import { MotoModelCategory } from "../../types/Motorcycle";

const MotoModelForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID du modèle à modifier (si existant)
  const navigate = useNavigate();

  const [model, setModel] = useState({ label: "", categoryId: 0 });
  const [categories, setCategories] = useState<MotoModelCategory[]>([]);

  // Charger les catégories et les données si édition
  useEffect(() => {
    setCategories(fetchMotoModelCategories());

    if (id) {
      const modelData = fetchMotoModelById(Number(id));
      if (modelData) setModel(modelData);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateMotoModel(Number(id), model);
    } else {
      addMotoModel(model);
    }
    navigate("/moto-models");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {id ? "Modifier un modèle" : "Ajouter un modèle"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom du modèle */}
          <div>
            <label className="block font-medium mb-1">Nom du modèle</label>
            <input
              type="text"
              value={model.label}
              onChange={(e) => setModel({ ...model, label: e.target.value })}
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Catégorie du modèle */}
          <div>
            <label className="block font-medium mb-1">Catégorie</label>
            <select
              value={model.categoryId}
              onChange={(e) =>
                setModel({ ...model, categoryId: Number(e.target.value) })
              }
              className="w-full border p-3 rounded-md"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Boutons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/moto-models")}
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

export default MotoModelForm;
