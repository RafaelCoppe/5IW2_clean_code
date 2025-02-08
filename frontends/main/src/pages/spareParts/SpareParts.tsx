import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiContext";

interface SparePart {
  id: number;
  label: string;
  description: string; // Y a pas 
  price: number; // Y a pas 
  stock: number; // Y a pas 
  threshold: number; // Y a pas 
}

const SparePartsListPage: React.FC = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    api.get("spare_part", { credentials: 'include' })
        .then((data) => setSpareParts(data))
        .catch(console.error);
  }, [api]);

  // Function to delete a spare part
  const handleDelete = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette pièce ?")) {
      setSpareParts(spareParts.filter((part) => part.id !== id)); // Delete locally
    }
  };

  // Function to edit a spare part (redirects to the edit page)
  const handleEdit = (id: number) => {
    navigate(`/spare-parts/edit/${id}`); // Redirect to the edit page
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Liste des pièces détachées</h1>

      {/* Button to go to the form page */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/spare-parts/add")} // Redirect to the form page
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Ajouter une pièce
        </button>
      </div>

      {/* List of spare parts */}
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
                <td className="border px-4 py-2">{part.label}</td>
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
                    Modifier
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