import { Maintenance } from "../types/Maintenance";

export const fetchMaintenances = async (): Promise<Maintenance[]> => {
  return [
    {
      id: 1,
      motoId: 1,
      date: "2025-01-15",
      type: "preventive",
      cost: 150,
      notes: "Changement d’huile et vérification générale",
    },
    {
      id: 2,
      motoId: 2,
      date: "2025-02-01",
      type: "curative",
      cost: 300,
      notes: "Réparation du système de freinage",
    },
  ];
};

export const fetchMaintenanceDetails = async (
  id: number
): Promise<Maintenance> => {
  return {
    id,
    motoId: 1,
    date: "2025-01-15",
    type: "preventive",
    cost: 150,
    notes: "Changement d’huile et vérification générale",
    partsUsed: [
      { partId: 1, name: "Filtre à huile", cost: 50 },
      { partId: 2, name: "Huile moteur", cost: 100 },
    ],
  };
};

export const createMaintenance = async (
  data: Omit<Maintenance, "id">
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Entretien planifié :", data);
      resolve(); // Simule un succès
    }, 1000);
  });
};
