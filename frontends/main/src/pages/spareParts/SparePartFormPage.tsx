import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSparePart } from "../../services/sparePartService";

const COMPANY_ID = 1; // Simule l'ID de l'entreprise actuelle

const SparePartAddPage: React.FC = () => {
  const navigate = useNavigate();

  // ✅ État initial du formulaire
  const [formData, setFormData] = useState({
    label: "",
    description: "",
    price: "",
    stock: "",
    threshold: "",
    pictureLink: "",
  });

  // ✅ Gestion de la soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addSparePart(
      {
        label: formData.label,
        pictureLink: formData.pictureLink,
      },
      COMPANY_ID,
      Number(formData.stock),
      Number(formData.price)
    );

    console.log("Nouvelle pièce ajoutée :", formData);
    navigate("/spare-parts");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Ajouter une pièce détachée
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Nom de la pièce */}
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

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border p-3 rounded-md"
            ></textarea>
          </div>

          {/* Prix */}
          <div>
            <label className="block font-medium mb-1">Prix (€)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Stock initial */}
          <div>
            <label className="block font-medium mb-1">Stock initial</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Seuil critique */}
          <div>
            <label className="block font-medium mb-1">Seuil critique</label>
            <input
              type="number"
              value={formData.threshold}
              onChange={(e) =>
                setFormData({ ...formData, threshold: e.target.value })
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
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SparePartAddPage;
