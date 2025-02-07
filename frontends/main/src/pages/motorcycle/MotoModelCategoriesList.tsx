import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMotoModelCategories,
  deleteMotoModelCategory,
} from "../../services/motoModelCategoryService";
import { MotoModelCategory } from "../../types/Motorcycle";

const MotoModelCategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<MotoModelCategory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCategories(fetchMotoModelCategories());
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Gestion des catégories de modèles
      </h1>

      <div className="bg-white shadow-md rounded-lg p-4">
        <button
          onClick={() => navigate("/moto-model-categories/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Ajouter une catégorie
        </button>
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Nom de la catégorie</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="border px-4 py-2">{category.label}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(`/moto-model-categories/edit/${category.id}`)
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-500"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => deleteMotoModelCategory(category.id)}
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

export default MotoModelCategoriesList;
