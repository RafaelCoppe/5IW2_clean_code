import { MotoModelService } from "../types/Motorcycle";

// ✅ Données simulées pour les forfaits
const modelServicesData: MotoModelService[] = [
  {
    modelId: 1,
    distanceInterval: 10000,
    timeInterval: 12,
    price: 150,
    order: 1,
  },
  {
    modelId: 1,
    distanceInterval: 20000,
    timeInterval: 24,
    price: 250,
    order: 2,
  },
  {
    modelId: 2,
    distanceInterval: 16000,
    timeInterval: 18,
    price: 200,
    order: 1,
  },
];

// ✅ Récupérer tous les forfaits d'un modèle
export const fetchMotoModelServices = (modelId: number): MotoModelService[] => {
  return modelServicesData.filter((service) => service.modelId === modelId);
};

// ✅ Récupérer un forfait spécifique
export const fetchMotoModelServiceById = (
  modelId: number,
  distanceInterval: number
): MotoModelService | undefined => {
  return modelServicesData.find(
    (service) =>
      service.modelId === modelId &&
      service.distanceInterval === distanceInterval
  );
};

// ✅ Ajouter un forfait
export const addMotoModelService = (service: MotoModelService) => {
  modelServicesData.push(service);
  console.log("Forfait ajouté :", service);
};

// ✅ Modifier un forfait
export const updateMotoModelService = (
  modelId: number,
  distanceInterval: number,
  updatedData: Partial<MotoModelService>
) => {
  const index = modelServicesData.findIndex(
    (s) => s.modelId === modelId && s.distanceInterval === distanceInterval
  );
  if (index !== -1) {
    modelServicesData[index] = { ...modelServicesData[index], ...updatedData };
    console.log("Forfait mis à jour :", modelServicesData[index]);
  }
};

// ✅ Supprimer un forfait
export const deleteMotoModelService = (
  modelId: number,
  distanceInterval: number
) => {
  const index = modelServicesData.findIndex(
    (s) => s.modelId === modelId && s.distanceInterval === distanceInterval
  );
  if (index !== -1) {
    modelServicesData.splice(index, 1);
    console.log("Forfait supprimé :", { modelId, distanceInterval });
  }
};
