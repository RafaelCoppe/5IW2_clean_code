// import React, { useState, useEffect } from "react";
// import { MotoModelService } from "../../types/Maintenance";

// const PlanMaintenance: React.FC = () => {
//   const [models, setModels] = useState<MotoModelService[]>([]);
//   const [selectedModel, setSelectedModel] = useState<number | null>(null);
//   const [lastServiceDate, setLastServiceDate] = useState("");
//   const [lastDistance, setLastDistance] = useState<number>(0);
//   const [nextServiceDate, setNextServiceDate] = useState<string>("");
//   const [nextDistance, setNextDistance] = useState<number | null>(null);

//   // Charger les modèles et leurs intervalles
//   useEffect(() => {
//     const fetchModels = async () => {
//       // Simule un appel API
//       const data = [
//         { id: 1, distanceInterval: 10000, timeInterval: 12, price: 200 },
//         { id: 2, distanceInterval: 16000, timeInterval: 24, price: 300 },
//       ];
//       setModels(data);
//     };

//     fetchModels();
//   }, []);

//   // Calcul de la prochaine date et distance d'entretien
//   useEffect(() => {
//     if (selectedModel !== null) {
//       const model = models.find((m) => m.id === selectedModel);
//       if (model && lastServiceDate) {
//         const nextDate = new Date(lastServiceDate);
//         nextDate.setMonth(nextDate.getMonth() + model.timeInterval);
//         setNextServiceDate(nextDate.toISOString().split("T")[0]);
//         setNextDistance(lastDistance + model.distanceInterval);
//       }
//     }
//   }, [selectedModel, lastServiceDate, lastDistance, models]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({
//       modelId: selectedModel,
//       nextServiceDate,
//       nextDistance,
//     });
//     alert("Entretien planifié avec succès !");
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">Planifier un entretien</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Modèle de moto
//           </label>
//           <select
//             className="w-full border p-2 rounded-md"
//             value={selectedModel || ""}
//             onChange={(e) => setSelectedModel(Number(e.target.value))}
//           >
//             <option value="" disabled>
//               Choisir un modèle
//             </option>
//             {models.map((model) => (
//               <option key={model.id} value={model.id}>
//                 Modèle {model.id} (Intervalle : {model.distanceInterval} km,{" "}
//                 {model.timeInterval} mois)
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Date du dernier entretien
//           </label>
//           <input
//             type="date"
//             className="w-full border p-2 rounded-md"
//             value={lastServiceDate}
//             onChange={(e) => setLastServiceDate(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Kilométrage actuel
//           </label>
//           <input
//             type="number"
//             className="w-full border p-2 rounded-md"
//             value={lastDistance}
//             onChange={(e) => setLastDistance(Number(e.target.value))}
//           />
//         </div>
//         {nextServiceDate && nextDistance && (
//           <div className="mt-4 bg-gray-100 p-4 rounded-md">
//             <p>Prochaine date d'entretien : {nextServiceDate}</p>
//             <p>Prochain kilométrage d'entretien : {nextDistance} km</p>
//           </div>
//         )}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500"
//         >
//           Planifier l'entretien
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PlanMaintenance;
