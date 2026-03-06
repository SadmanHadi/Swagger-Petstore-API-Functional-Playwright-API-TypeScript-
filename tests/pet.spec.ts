import { test, expect } from '@playwright/test';
import { PetClient } from '../helpers/PetClient';

test.describe('Petstore API - Pet Operations', () => {
  let petClient: PetClient;
  const petId = Math.floor(Math.random() * 1000000) + 7000000;
  const petData = {
    id: petId,
    name: 'PlaywrightBuddy',
    category: { id: 1, name: 'Dogs' },
    status: 'available'
  };

  test.beforeEach(async ({ request }) => {
    petClient = new PetClient(request);
  });

  test('Happy Path: Create, Update, and Get Pet', async () => {
    // 1. Create Pet
    const createResponse = await petClient.addPet(petData);
    expect(createResponse.status()).toBe(200);
    const createdPet = await createResponse.json();
    expect(createdPet.name).toBe(petData.name);
    expect(createdPet.id).toBe(petId);

    // 2. Update Pet Status
    const updateData = { ...petData, status: 'sold' };
    const updateResponse = await petClient.updatePet(updateData);
    expect(updateResponse.status()).toBe(200);
    expect((await updateResponse.json()).status).toBe('sold');

    // 3. Get Pet by ID
    const getResponse = await petClient.getPetById(petId);
    expect(getResponse.status()).toBe(200);
    const pet = await getResponse.json();
    expect(pet.id).toBe(petId);
    expect(pet.name).toBe(petData.name);
    expect(pet.status).toBe('sold');
    
    // Cleanup
    const deleteResponse = await petClient.deletePet(petId);
    expect(deleteResponse.status()).toBe(200);
  });

  test('Negative Case: Get Non-Existent Pet', async () => {
    const invalidId = 999999999;
    const response = await petClient.getPetById(invalidId);
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body.type).toBe('error');
    expect(body.message).toBe('Pet not found');
  });

  test('Boundary Case: Invalid ID format', async () => {
    const response = await petClient.getPetById('invalid-id-string');
    // Swagger Petstore usually returns 404 or 405 for type mismatch in path
    expect([404, 405, 400]).toContain(response.status());
  });
});
