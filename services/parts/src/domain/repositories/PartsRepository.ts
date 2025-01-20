import { SequelizeParts } from "../../infrastructure/database/models/Parts";
import { GetAllPartsRepository } from "../services/GetAllPartsService";

export class PartsRepository implements GetAllPartsRepository {
  async getAll(): Promise<SequelizeParts[]> {
    const allParts = await SequelizeParts.findAll();

    return allParts;
  }
}