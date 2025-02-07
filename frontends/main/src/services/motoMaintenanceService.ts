import { MotoMaintenance } from "../types/Motorcycle";

// ✅ Simuler les données de maintenance
let motoMaintenances: MotoMaintenance[] = [
  {
    id: 1,
    modelId: 1,
    modelName: "Street Triple",
    mileage: 10000,
    cost: 150,
    date: "2025-01-15",
    appointmentDate: "2025-01-10",
    note: "Changement d'huile et vérification des freins.",
  },
  {
    id: 2,
    modelId: 2,
    modelName: "Tiger Sport 660",
    mileage: 16000,
    cost: 250,
    date: "2025-02-01",
    appointmentDate: "2025-01-28",
    note: "Révision complète avec remplacement des plaquettes de frein.",
  },
];

// ✅ Simuler les catégories de moto
const motoCategories = [
  { id: 1, label: "Adventure" },
  { id: 2, label: "Sport" },
  { id: 3, label: "Touring" },
];

// ✅ Simuler les modèles de moto
const motoModels = [
  { id: 1, label: "Street Triple", categoryId: 2 },
  { id: 2, label: "Tiger Sport 660", categoryId: 1 },
];

// ✅ Simuler les forfaits (services) par modèle
const motoModelServices = [
  { modelId: 1, distanceInterval: 10000, price: 150, order: 1 },
  { modelId: 1, distanceInterval: 20000, price: 250, order: 2 },
  { modelId: 2, distanceInterval: 16000, price: 250, order: 1 },
  { modelId: 2, distanceInterval: 32000, price: 400, order: 2 },
];

// 📌 Récupérer toutes les maintenances
export const fetchAllMaintenances = (): MotoMaintenance[] => {
  return motoMaintenances;
};

// 📌 Récupérer une maintenance par ID
export const fetchMotoMaintenanceById = (
  id: number
): MotoMaintenance | undefined => {
  return motoMaintenances.find((m) => m.id === id);
};

// 📌 Ajouter une maintenance
export const addMotoMaintenance = (
  maintenance: Omit<MotoMaintenance, "id">
): void => {
  const newMaintenance = { ...maintenance, id: Date.now() };
  motoMaintenances.push(newMaintenance);
};

// 📌 Supprimer une maintenance
export const deleteMotoMaintenance = (id: number): void => {
  motoMaintenances = motoMaintenances.filter((m) => m.id !== id);
};

// 📌 Récupérer toutes les catégories de moto
export const fetchMotoCategories = () => {
  return motoCategories;
};

// 📌 Récupérer les modèles d'une catégorie spécifique
export const fetchMotoModelsByCategory = (categoryId: number) => {
  return motoModels.filter((model) => model.categoryId === categoryId);
};

// 📌 Récupérer les forfaits d'un modèle spécifique
export const fetchMotoModelServices = (modelId: number) => {
  return motoModelServices.filter((service) => service.modelId === modelId);
};
