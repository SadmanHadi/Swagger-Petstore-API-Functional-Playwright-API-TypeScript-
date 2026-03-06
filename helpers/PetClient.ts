import { APIRequestContext } from '@playwright/test';

export class PetClient {
  constructor(private request: APIRequestContext) {}

  async addPet(pet: any) {
    return await this.request.post('pet', { data: pet });
  }

  async updatePet(pet: any) {
    return await this.request.put('pet', { data: pet });
  }

  async getPetById(id: number | string) {
    return await this.request.get(`pet/${id}`);
  }

  async deletePet(id: number | string) {
    return await this.request.delete(`pet/${id}`);
  }

  async findPetsByStatus(status: 'available' | 'pending' | 'sold') {
    return await this.request.get(`pet/findByStatus`, {
      params: { status }
    });
  }
}
