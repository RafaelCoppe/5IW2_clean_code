import axios from "axios";
import { Motorcycle } from "../types/Motorcycle";

// Définir le type TypeScript des motos

// ✅ Récupérer toutes les motos
// export const fetchMotorcycles = async (): Promise<Motorcycle[]> => {
//   const response = await axios.get("/api/motorcycles"); // Modifier avec ton URL API réelle
//   return response.data;
// };

// // ✅ Récupérer une moto par ID
// export const fetchMotorcycleById = async (id: number): Promise<Motorcycle> => {
//   const response = await axios.get(`/api/motorcycles/${id}`);
//   return response.data;
// };

// // ✅ Ajouter une nouvelle moto
// export const addMotorcycle = async (moto: Omit<Motorcycle, "id">) => {
//   const response = await axios.post("/api/motorcycles", moto);
//   return response.data;
// };

// // ✅ Modifier une moto existante
// export const updateMotorcycle = async (
//   id: number,
//   moto: Partial<Motorcycle>
// ) => {
//   const response = await axios.put(`/api/motorcycles/${id}`, moto);
//   return response.data;
// };

// // ✅ Supprimer une moto
// export const deleteMotorcycle = async (id: number) => {
//   await axios.delete(`/api/motorcycles/${id}`);
// };
const motorcyclesData: Motorcycle[] = [
  {
    id: 1,
    modelId: 1,
    serialNumber: "STR12345",
    owner: "Partenaire A",
    color: "Black",
    capacity: 765,
    year: 2023,
    lastService: "2024-12-01",
    nextService: "2025-12-01",
    maintenanceHistory: [
      { date: "2024-06-10", details: "Changement d'huile" },
      { date: "2023-12-01", details: "Remplacement des feux" },
    ],
    testDrives: [
      { driver: "John Doe", date: "2024-06-15" },
      { driver: "Jane Smith", date: "2024-07-02" },
    ],
  },
  {
    id: 2,
    modelId: 2,
    serialNumber: "TSP98765",
    owner: "Concenssionnaire B",
    color: "Red",
    capacity: 660,
    year: 2022,
    lastService: "2024-10-15",
    nextService: "2025-10-15",
    maintenanceHistory: [],
    testDrives: [],
  },
];

// ✅ Fonction pour récupérer toutes les motos
export const fetchMotorcycles = (): Motorcycle[] => {
  return motorcyclesData;
};

// ✅ Fonction pour récupérer une moto par ID
export const fetchMotorcycleById = (id: number): Motorcycle | undefined => {
  return motorcyclesData.find((moto) => moto.id === id);
};

// ✅ Fonction pour supprimer une moto
export const deleteMotorcycle = (id: number): Motorcycle[] => {
  return motorcyclesData.filter((moto) => moto.id !== id);
};

export const addMotorcycle = (moto: Omit<Motorcycle, "id">) => {
  console.log("Moto ajoutée :", moto);
};

// ✅ Modifier une moto
export const updateMotorcycle = (id: number, moto: Partial<Motorcycle>) => {
  console.log("Moto mise à jour :", { id, ...moto });
};
