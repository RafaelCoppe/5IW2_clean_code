import { MotoModel } from "../types/Motorcycle";

// ✅ Données simulées pour les modèles de motos
const motoModelsData: MotoModel[] = [
  { id: 1, label: "Model Street Triple", categoryId: 1 },
  { id: 2, label: "Model Tiger Sport 660", categoryId: 2 },
];

// ✅ Récupérer tous les modèles
export const fetchMotoModels = (): MotoModel[] => {
  return motoModelsData;
};

// ✅ Récupérer un modèle spécifique
export const fetchMotoModelById = (id: number): MotoModel | undefined => {
  return motoModelsData.find((model) => model.id === id);
};

// ✅ Ajouter un nouveau modèle
export const addMotoModel = (model: Omit<MotoModel, "id">) => {
  console.log("Modèle ajouté :", model);
};

// ✅ Modifier un modèle existant
export const updateMotoModel = (id: number, model: Partial<MotoModel>) => {
  console.log("Modèle mis à jour :", { id, ...model });
};

// ✅ Supprimer un modèle
export const deleteMotoModel = (id: number) => {
  console.log("Modèle supprimé avec l'ID :", id);
};
