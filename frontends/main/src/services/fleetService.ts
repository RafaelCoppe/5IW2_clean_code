// // src/services/fleetService.ts
// import { FleetItem } from "../types/Fleet";

// //appel de l'API méthode fetchFleet pour récupérer la liste des motos
// export const fetchFleet = async (): Promise<FleetItem[]> => {
//   return [
//     {
//       id: 1,
//       model: "Tiger Sport 660",
//       owner: "Concessionnaire A",
//       lastService: "2024-12-10",
//       nextService: "2025-06-10",
//       mileage: 8000,
//     },
//     {
//       id: 2,
//       model: "Street Triple",
//       owner: "Partenaire B",
//       lastService: "2024-10-01",
//       nextService: "2025-04-01",
//       mileage: 12000,
//     },
//     {
//       id: 3,
//       model: "Tiger Explorer",
//       owner: "Concessionnaire A",
//       lastService: "2024-08-20",
//       nextService: "2025-02-20",
//       mileage: 5000,
//     },
//   ];
// };

// //appel de l'API meéthode fetchFleetDetails pour récupérer les détails d'une moto
// export const fetchFleetDetails = async (id: number) => {
//   return {
//     id,
//     model: "Tiger Sport 660",
//     owner: "Concessionnaire A",
//     lastService: "2024-12-10",
//     nextService: "2025-06-10",
//     mileage: 8000,
//     serviceHistory: [
//       {
//         date: "2024-12-10",
//         cost: 150,
//         notes: "Changement d’huile et filtre",
//       },
//     ],
//     breakdowns: [],
//   };
// };
