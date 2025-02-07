export interface SparePart {
  id: number;
  label: string;
  pictureLink: string;
}

export interface SparePartStock {
  partId: number;
  companyId: number;
  stock: number;
}

export interface SparePartCommand {
  id: number;
  partId: number;
  companyId: number;
  remainingQuantity: number;
  orderedQuantity: number;
  totalPrice: number;
  dateOrder: string;
  dateReceived: string;
}

// ✅ Données simulées pour les pièces détachées
const sparePartsData: SparePart[] = [
  {
    id: 1,
    label: "Filtre à huile",
    pictureLink: "https://example.com/filtre.jpg",
  },
  {
    id: 2,
    label: "Bougie d'allumage",
    pictureLink: "https://example.com/bougie.jpg",
  },
];

// ✅ Données simulées pour le stock des entreprises
const sparePartsStockData: SparePartStock[] = [
  { partId: 1, companyId: 1, stock: 15 },
  { partId: 2, companyId: 1, stock: 8 },
];

// ✅ Données simulées pour les commandes de pièces
const sparePartsCommandData: SparePartCommand[] = [
  {
    id: 1,
    partId: 1,
    companyId: 1,
    remainingQuantity: 5,
    orderedQuantity: 10,
    totalPrice: 250,
    dateOrder: "2024-02-01",
    dateReceived: "2024-02-05",
  },
];

// ✅ Récupérer toutes les pièces détachées
export const fetchSpareParts = (): SparePart[] => {
  return sparePartsData;
};

// ✅ Récupérer une pièce détachée par ID
export const fetchSparePartById = (id: number): SparePart | undefined => {
  return sparePartsData.find((part) => part.id === id);
};

// ✅ Récupérer le stock d'une pièce pour une entreprise donnée
export const fetchSparePartStock = (
  partId: number,
  companyId: number
): SparePartStock | undefined => {
  return sparePartsStockData.find(
    (stock) => stock.partId === partId && stock.companyId === companyId
  );
};

// ✅ Récupérer les commandes d'une pièce pour une entreprise donnée
export const fetchSparePartCommands = (
  partId: number,
  companyId: number
): SparePartCommand[] => {
  return sparePartsCommandData.filter(
    (command) => command.partId === partId && command.companyId === companyId
  );
};

// ✅ Ajouter une nouvelle pièce
// export const addSparePart = (part: Omit<SparePart, "id">) => {
//   console.log("Pièce ajoutée :", part);
// };
export const addSparePart = (
  part: Omit<SparePart, "id">,
  companyId: number,
  initialStock: number,
  price: number
) => {
  // Simulation d'ajout avec ID auto-incrémenté
  const newId = sparePartsData.length + 1;
  const newPart: SparePart = { id: newId, ...part };
  sparePartsData.push(newPart);

  // Ajouter le stock initial pour cette entreprise
  sparePartsStockData.push({
    partId: newId,
    companyId,
    stock: initialStock,
  });

  // Ajouter une commande fictive pour simuler un réapprovisionnement
  sparePartsCommandData.push({
    id: sparePartsCommandData.length + 1,
    partId: newId,
    companyId,
    orderedQuantity: initialStock,
    remainingQuantity: initialStock,
    totalPrice: price * initialStock,
    dateOrder: new Date().toISOString(),
    dateReceived: new Date().toISOString(),
  });

  console.log("Pièce ajoutée :", newPart);
  console.log("Stock initial ajouté :", sparePartsStockData);
  console.log("Commande simulée :", sparePartsCommandData);
};

// ✅ Modifier une pièce existante
export const updateSparePart = (
  id: number,
  part: Partial<SparePart>,
  companyId: number,
  price: number
) => {
  console.log("Pièce mise à jour :", { id, ...part, companyId, price });
};

// ✅ Supprimer une pièce détachée
export const deleteSparePart = (id: number) => {
  console.log("Pièce supprimée avec l'ID :", id);
};
