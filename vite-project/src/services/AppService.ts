import { getHeaders } from "@/utils/auth";

type AppData = {
  name: string;
  description: string;
};

export const AppService = {
  async getAll() {
    const res = await fetch("http://localhost:3000/application", {
      headers: getHeaders(),
    });
    return res.json();
  },

  async create(data: AppData) {
    const res = await fetch("http://localhost:3000/application", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async update(id: number, data: AppData) {
    const res = await fetch(`http://localhost:3000/application/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async delete(id: number) {
    await fetch(`http://localhost:3000/application/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
  },
};
