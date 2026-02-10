import api from "../api";

export default {
  async getAll() {
    const res = await api.get("/materials");
    return res.data;
  },

  async add(item) {
    const res = await api.post("/materials", item);
    return res.data;
  },

  async update(id, updates) {
    await api.patch(`/materials/${id}`, updates);
  },

  async remove(id) {
    await api.delete(`/materials/${id}`);
  },

  async clear() {
    await api.delete("/materials");
  },
};
