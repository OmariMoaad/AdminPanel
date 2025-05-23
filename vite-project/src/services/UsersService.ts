import type { User } from "@/pages/UsersPage";

export class UsersService {
  private static usersUrl = 'http://localhost:3000/user';

  async findAll(): Promise<User[]> {
    const res = await fetch(UsersService.usersUrl);
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    return res.json();
  }

  async findOne(id: number): Promise<User | null> {
    const res = await fetch(`${UsersService.usersUrl}/${id}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  }

  static async create(data: User): Promise<User> {
    const res = await fetch(this.usersUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error('Failed to create user');
    }
    return res.json();
  }

  async update(id: number, data: User): Promise<User> {
    const res = await fetch(`${UsersService.usersUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error('Failed to update user');
    }
    return res.json();
  }

  async delete(id: number): Promise<User> {
    const res = await fetch(`${UsersService.usersUrl}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error('Failed to delete user');
    }
    return res.json();
  }
}
