import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchMotoModelCategoryById,
  addMotoModelCategory,
  updateMotoModelCategory,
} from "../../services/motoModelCategoryService";

const MotoModelCategoryForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID de la catégorie
  const navigate = useNavigate();

  const [category, setCategory] = useState({ label: "" });

  useEffect(() => {
    if (id) {
      const categoryData = fetchMotoModelCategoryById(Number(id));
      if (categoryData) setCategory(categoryData);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateMotoModelCategory(Number(id), category);
    } else {
      addMotoModelCategory(category);
    }
    navigate("/moto-model-categories");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {id ? "Modifier la catégorie" : "Ajouter une catégorie"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom de la catégorie */}
          <div>
            <label className="block font-medium mb-1">
              Nom de la catégorie
            </label>
            <input
              type="text"
              value={category.label}
              onChange={(e) =>
                setCategory({ ...category, label: e.target.value })
              }
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/moto-model-categories")}
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

export default MotoModelCategoryForm;
