import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMotoCategories,
  fetchMotoModelsByCategory,
  fetchMotoModelServices,
  addMotoMaintenance,
} from "../../services/motoMaintenanceService";
import {
  MotoModel,
  MotoModelCategory,
  MotoModelService,
} from "../../types/Motorcycle";

const AddMotoMaintenance: React.FC = () => {
  const navigate = useNavigate();

  // États pour les sélections
  const [categories, setCategories] = useState<MotoModelCategory[]>([]);
  const [models, setModels] = useState<MotoModel[]>([]);
  const [services, setServices] = useState<MotoModelService[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [mileage, setMileage] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [appointmentDate, setAppointmentDate] = useState<string>(""); // ✅ Date du rendez-vous
  const [note, setNote] = useState<string>(""); // ✅ Note de la maintenance

  useEffect(() => {
    setCategories(fetchMotoCategories());
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setModels(fetchMotoModelsByCategory(selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedModel) {
      setServices(fetchMotoModelServices(selectedModel));
    }
  }, [selectedModel]);

  useEffect(() => {
    if (services.length > 0 && mileage > 0) {
      const closestService = services.reduce((prev, curr) =>
        Math.abs(curr.distanceInterval - mileage) <
        Math.abs(prev.distanceInterval - mileage)
          ? curr
          : prev
      );
      setPrice(closestService.price);
    }
  }, [mileage, services]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedModel) {
      addMotoMaintenance({
        modelId: selectedModel,
        mileage,
        cost: price,
        date: new Date().toISOString().split("T")[0], // Date de la maintenance = aujourd’hui
        appointmentDate, // ✅ Date du rendez-vous
        note, // ✅ Note
      });
      navigate("/maintenances");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="text-2xl font-bold mb-6">Ajouter une maintenance</h1>

        {/* Sélection de la catégorie */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Catégorie</label>
          <select
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sélection du modèle */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Modèle</label>
          <select
            value={selectedModel || ""}
            onChange={(e) => setSelectedModel(Number(e.target.value))}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Sélectionner un modèle</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.label}
              </option>
            ))}
          </select>
        </div>

        {/* Kilométrage */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Kilométrage</label>
          <input
            type="number"
            min="0"
            value={mileage}
            onChange={(e) => setMileage(Number(e.target.value))}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Prix généré automatiquement */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Prix (€)</label>
          <input
            type="number"
            value={price}
            className="w-full border p-2 rounded-md bg-gray-200"
            readOnly
          />
        </div>

        {/* Date de rendez-vous */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Date du rendez-vous</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* Boutons */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMotoMaintenance;
