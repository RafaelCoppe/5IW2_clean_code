import React, { useState } from "react";

interface SparePartFormProps {
  onPartAdded: (newPart: any) => void; // Callback pour informer la liste qu'une pièce a été ajoutée
}

export const SparePartForm: React.FC<SparePartFormProps> = ({
  onPartAdded,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    threshold: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/spare-parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newPart = await response.json();
        onPartAdded(newPart); // Appeler le callback pour mettre à jour la liste
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          threshold: "",
        }); // Réinitialiser le formulaire
      } else {
        alert("Erreur lors de l'ajout de la pièce.");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 space-y-4 bg-white shadow-md rounded-lg p-4"
    >
      <h2 className="text-xl font-bold mb-4">Ajouter une pièce détachée</h2>
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
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full border p-2 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Stock initial</label>
        <input
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          className="w-full border p-2 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Seuil critique</label>
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
        Ajouter
      </button>
    </form>
  );
};
