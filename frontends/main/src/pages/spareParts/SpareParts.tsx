import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchSpareParts,
  fetchSparePartStock,
  deleteSparePart,
  SparePart,
} from "../../services/sparePartService";

const COMPANY_ID = 1; // Simule l'entreprise actuelle

const SparePartsListPage: React.FC = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [stocks, setStocks] = useState<Record<number, number>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const parts = fetchSpareParts();
    setSpareParts(parts);

    // Charger les stocks pour chaque pièce
    const stockData: Record<number, number> = {};
    parts.forEach((part) => {
      const stockInfo = fetchSparePartStock(part.id, COMPANY_ID);
      stockData[part.id] = stockInfo ? stockInfo.stock : 0;
    });
    setStocks(stockData);
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette pièce ?")) {
      deleteSparePart(id);
      setSpareParts(spareParts.filter((part) => part.id !== id));
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Liste des pièces détachées</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/spare-parts/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Ajouter une pièce
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des pièces</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spareParts.map((part) => (
              <tr key={part.id}>
                <td className="border px-4 py-2">{part.label}</td>
                <td
                  className={`border px-4 py-2 ${
                    stocks[part.id] <= 5 ? "text-red-600" : ""
                  }`}
                >
                  {stocks[part.id]}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => navigate(`/spare-parts/edit/${part.id}`)}
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
