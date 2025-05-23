export const AppService = {
  async create(data: { name: string; description: string }) {
    const res = await fetch("http://localhost:3000/application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async update(id: number, data: { name: string; description: string }) {
    const res = await fetch(`http://localhost:3000/application/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
