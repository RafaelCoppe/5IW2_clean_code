import { MotoModelCategory } from "../types/Motorcycle";

// ✅ Données simulées pour les catégories
const categoriesData: MotoModelCategory[] = [
  { id: 1, label: "Adventure" },
  { id: 2, label: "Sport" },
  { id: 3, label: "MotoCross" },
];

// ✅ Récupérer toutes les catégories
export const fetchMotoModelCategories = (): MotoModelCategory[] => {
  return categoriesData;
};

// ✅ Récupérer une catégorie par ID
export const fetchMotoModelCategoryById = (
  id: number
): MotoModelCategory | undefined => {
  return categoriesData.find((category) => category.id === id);
};

// ✅ Ajouter une nouvelle catégorie
export const addMotoModelCategory = (
  category: Omit<MotoModelCategory, "id">
) => {
  const newId = categoriesData.length + 1;
  categoriesData.push({ id: newId, ...category });
  console.log("Catégorie ajoutée :", { id: newId, ...category });
};

// ✅ Modifier une catégorie existante
export const updateMotoModelCategory = (
  id: number,
  category: Partial<MotoModelCategory>
) => {
  const index = categoriesData.findIndex((c) => c.id === id);
  if (index !== -1) {
    categoriesData[index] = { ...categoriesData[index], ...category };
    console.log("Catégorie mise à jour :", categoriesData[index]);
  }
};

// ✅ Supprimer une catégorie
export const deleteMotoModelCategory = (id: number) => {
  const index = categoriesData.findIndex((c) => c.id === id);
  if (index !== -1) {
    categoriesData.splice(index, 1);
    console.log("Catégorie supprimée avec l'ID :", id);
  }
};
