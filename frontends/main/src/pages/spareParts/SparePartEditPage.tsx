import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSparePartById,
  updateSparePart,
  fetchSparePartStock,
  SparePart,
} from "../../services/sparePartService";

const COMPANY_ID = 1; // Simule l'ID de l'entreprise actuelle

const SparePartEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupération de l'ID
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<SparePart, "id">>({
    label: "",
    pictureLink: "",
  });

  const [stock, setStock] = useState<number | null>(null);
  const [price, setPrice] = useState<number>(0);

  // ✅ Charger les données si on est en mode édition
  useEffect(() => {
    if (id) {
      const part = fetchSparePartById(Number(id));
      if (part) {
        setFormData(part);
        const stockInfo = fetchSparePartStock(Number(id), COMPANY_ID);
        setStock(stockInfo ? stockInfo.stock : null);
      }
    }
  }, [id]);

  // ✅ Gestion de la soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateSparePart(Number(id), formData, COMPANY_ID, price);
    }
    navigate("/spare-parts");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Modifier une pièce détachée
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Nom */}
          <div>
            <label className="block font-medium mb-1">Nom de la pièce</label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) =>
                setFormData({ ...formData, label: e.target.value })
              }
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Lien image */}
          <div>
            <label className="block font-medium mb-1">Lien de l'image</label>
            <input
              type="text"
              value={formData.pictureLink}
              onChange={(e) =>
                setFormData({ ...formData, pictureLink: e.target.value })
              }
              className="w-full border p-3 rounded-md"
            />
          </div>

          {/* Prix */}
          <div>
            <label className="block font-medium mb-1">Prix (€)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Stock actuel */}
          {id && stock !== null && (
            <div className="col-span-2 p-4 bg-gray-50 border rounded-md">
              <span className="font-medium">Stock actuel :</span> {stock} unités
            </div>
          )}

          {/* Boutons */}
          <div className="col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/spare-parts")}
              className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SparePartEditPage;
