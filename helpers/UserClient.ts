import { APIRequestContext } from '@playwright/test';

export class UserClient {
  constructor(private request: APIRequestContext) {}

  async createUser(user: any) {
    return await this.request.post('user', { data: user });
  }

  async deleteUser(username: string) {
    return await this.request.delete(`user/${username}`);
  }

  async getUser(username: string) {
    return await this.request.get(`user/${username}`);
  }
}
