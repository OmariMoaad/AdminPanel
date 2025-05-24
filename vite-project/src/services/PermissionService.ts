import { getHeaders } from "@/utils/auth";

const API_BASE_URL = "http://localhost:3000";

export const PermissionService = {
  async list() {
    const res = await fetch(`${API_BASE_URL}/permission`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async create(data: { userId: number; applicationId: number; role: string }) {
    const res = await fetch(`${API_BASE_URL}/permission`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async update(
    id: number,
    data: { userId: number; applicationId: number; role: string }
  ) {
    const res = await fetch(`${API_BASE_URL}/permission/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async delete(id: number) {
    await fetch(`${API_BASE_URL}/permission/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
  },
};
