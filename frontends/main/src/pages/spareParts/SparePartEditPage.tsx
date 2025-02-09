import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../../services/store";

const SparePartEditPage: React.FC = () => {
  const id = useSelector((state: RootState) => state.auth.user?.company?.id); // Récupère l'ID de l'entreprise
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    threshold: "",
  });

  // Charger les données existantes (simulation)
  useEffect(() => {
    // Simule les données existantes
    const simulatedPart = {
      id: id,
      name: "Filtre à huile",
      description: "Filtre pour moteur",
      price: "25",
      stock: "15",
      threshold: "5",
    };
    setFormData(simulatedPart);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Modifications sauvegardées :", formData);
    navigate("/spare-parts"); // Redirige vers la liste après la sauvegarde
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Modifier une pièce détachée</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md rounded-lg p-4"
      >
        <div>
          <label className="block text-sm font-medium mb-2">Nom</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border p-2 rounded-md"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Prix (€)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Stock initial
          </label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Seuil critique
          </label>
          <input
            type="number"
            value={formData.threshold}
            onChange={(e) =>
              setFormData({ ...formData, threshold: e.target.value })
            }
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-500"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default SparePartEditPage;
