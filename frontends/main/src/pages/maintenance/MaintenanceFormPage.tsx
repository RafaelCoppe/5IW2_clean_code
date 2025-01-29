import React, { useState } from "react";
import { toast } from "react-toastify";
import { createMaintenance } from "../../services/maintenanceService";

const MaintenanceFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    motoId: "",
    date: "",
    type: "preventive", // Par défaut
    cost: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMaintenance({
        motoId: parseInt(formData.motoId),
        date: formData.date,
        type: formData.type as "preventive" | "curative",
        cost: formData.cost ? parseFloat(formData.cost) : undefined,
        notes: formData.notes,
      });
      toast.success("Entretien planifié avec succès !");
      setFormData({
        motoId: "",
        date: "",
        type: "preventive",
        cost: "",
        notes: "",
      });
    } catch (error) {
      toast.error("Erreur lors de la planification de l’entretien.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Planifier un nouvel entretien</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Moto ID */}
        <div>
          <label className="block text-sm font-medium mb-1">
            ID de la moto
          </label>
          <input
            type="number"
            name="motoId"
            value={formData.motoId}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Ex : 1"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        {/* Type d’entretien */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Type d’entretien
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="preventive">Préventif</option>
            <option value="curative">Curatif</option>
          </select>
        </div>

        {/* Coût */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Coût (optionnel)
          </label>
          <input
            type="number"
            step="0.01"
            name="cost"
            value={formData.cost}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Ex : 150.00"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Notes (optionnel)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
            rows={4}
            placeholder="Ex : Changement d’huile et vérification générale"
          />
        </div>

        {/* Bouton Soumettre */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Planifier l’entretien
        </button>
      </form>
    </div>
  );
};

export default MaintenanceFormPage;
