export interface MotoModelCategory {
  id: number;
  label: string;
}

export interface MotoModel {
  id: number;
  label: string;
  categoryId: number;
}

export interface MotoModelService {
  modelId: number;
  distanceInterval: number;
  timeInterval?: number | null; // Peut être null
  price: number;
  order: number;
}

export interface MotoMaintenance {
  id: number;
  modelId: number;
  modelName?: string;
  mileage: number;
  cost: number;
  date: string;
  appointmentDate: string;
  note: string;
}

export interface TestDrive {
  driver: string;
  date: string;
}

export interface MaintenanceHistory {
  date: string;
  details: string;
}

export interface Motorcycle {
  id: number;
  modelId: number;
  serialNumber: string;
  owner: string;
  color: string;
  capacity: number;
  year: number;
  lastService: string;
  nextService: string;
  maintenanceHistory: MaintenanceHistory[];
  testDrives: TestDrive[];
}
