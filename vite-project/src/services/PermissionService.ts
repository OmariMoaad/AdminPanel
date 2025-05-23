import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const PermissionService = {
  async list() {
    const res = await axios.get(`${API_BASE_URL}/permission`);
    return res.data;
  },

  async create(data: { userId: number; applicationId: number; role: string }) {
    const res = await axios.post(`${API_BASE_URL}/permission`, data);
    return res.data;
  },

  async update(
    id: number,
    data: { userId: number; applicationId: number; role: string }
  ) {
    const res = await axios.patch(`${API_BASE_URL}/permission/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    await axios.delete(`${API_BASE_URL}/permission/${id}`);
  },
};
