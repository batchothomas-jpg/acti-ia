import local from "./planningACM/planningACM.local";

let mode = "local";

const api = {
  async get() {
    return local.get();
  },
  async set(planning) {
    return local.set(planning);
  },
  async clear() {
    return local.clear();
  },
  useLocal() {
    mode = "local";
  },
  useRemote() {
    mode = "remote";
  },
};

export default api;
