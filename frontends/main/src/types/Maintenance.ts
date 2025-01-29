export interface Maintenance {
  id: number;
  motoId: number;
  date: string;
  type: "preventive" | "curative";
  cost?: number;
  notes?: string;
  partsUsed?: { partId: number; name: string; cost: number }[]; // Pièces utilisées
}

export interface MotoModelService {
  id: number;
  distanceInterval: number;
  timeInterval: number;
  price: number;
}
