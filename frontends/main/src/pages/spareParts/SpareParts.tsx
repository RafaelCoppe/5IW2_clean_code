import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SparePart {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  threshold: number;
}

const SparePartsListPage: React.FC = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const navigate = useNavigate();

  // Simuler des données pour la liste des pièces
  useEffect(() => {
    const fetchSpareParts = () => {
      const simulatedData: SparePart[] = [
        {
          id: 1,
          name: "Filtre à huile",
          description: "Filtre pour moteur",
          price: 25,
          stock: 15,
          threshold: 5,
        },
        {
          id: 2,
          name: "Bougie d'allumage",
          description: "Compatible Tiger 800",
          price: 12,
          stock: 8,
          threshold: 3,
        },
      ];
      setSpareParts(simulatedData);
    };

    fetchSpareParts();
  }, []);

  // Fonction pour supprimer une pièce
  const handleDelete = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette pièce ?")) {
      setSpareParts(spareParts.filter((part) => part.id !== id)); // Supprimer localement
    }
  };

  // Fonction pour éditer une pièce (redirige vers la page d'édition)
  const handleEdit = (id: number) => {
    navigate(`/spare-parts/edit/${id}`); // Redirige vers la page de modification
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Liste des pièces détachées</h1>

      {/* Bouton pour aller à la page de formulaire */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/spare-parts/add")} // Redirige vers la page formulaire
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Ajouter une pièce
        </button>
      </div>

      {/* Liste des pièces */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des pièces</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Prix (€)</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Seuil critique</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spareParts.map((part) => (
              <tr key={part.id}>
                <td className="border px-4 py-2">{part.name}</td>
                <td className="border px-4 py-2">{part.description || "-"}</td>
                <td className="border px-4 py-2">{part.price} €</td>
                <td
                  className={`border px-4 py-2 ${
                    part.stock <= part.threshold ? "text-red-600" : ""
                  }`}
                >
                  {part.stock}
                </td>
                <td className="border px-4 py-2">{part.threshold}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(part.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-500"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => handleDelete(part.id)}
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

export default SparePartsListPage;
