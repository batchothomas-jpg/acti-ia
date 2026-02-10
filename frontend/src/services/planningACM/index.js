import local from "./planningACM.local.js";

// façade future-proof
const planningService = {
  async get() {
    return local.get();
  },
  async set(data) {
    return local.set(data);
  },
  async clear() {
    return local.clear();
  },

  // pour plus tard (backend)
  useRemote() {
    console.warn("Remote mode not implemented yet, using local.");
  },

  useLocal() {
    console.log("Using local planning storage.");
  }
};

export default planningService;
