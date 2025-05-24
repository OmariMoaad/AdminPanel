export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer";
  isActive: boolean;
  createdAt: string;
  password?: string;
};

export class UsersService {
  private static usersUrl = "http://localhost:3000/user";

  private getHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  static async findAll(): Promise<User[]> {
    const token = localStorage.getItem("token");
    const res = await fetch(this.usersUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    return res.json();
  }

  async findOne(id: number): Promise<User | null> {
    const res = await fetch(`${UsersService.usersUrl}/${id}`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  }

  static async create(data: Partial<User>): Promise<User> {
    const token = localStorage.getItem("token");
    const res = await fetch(this.usersUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to create user");
    }
    return res.json();
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const res = await fetch(`${UsersService.usersUrl}/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to update user");
    }
    return res.json();
  }

  async delete(id: number): Promise<void> {
    const res = await fetch(`${UsersService.usersUrl}/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      throw new Error("Failed to delete user");
    }
  }
}
