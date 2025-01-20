import { SequelizeParts } from "../../infrastructure/database/models/Parts";

export interface GetAllPartsRepository {
    getAll(): Promise<SequelizeParts[]> // List of Parts elements
}

export class GetAllPartsService {
  constructor(
    private repository: GetAllPartsRepository
  ){}

  async getAll(email: string, password: string, role: string) {
    const allParts = await this.repository.getAll();

    return allParts;
  }
}