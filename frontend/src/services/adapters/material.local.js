const STORAGE_KEY = "acti-ia-materials";

function load() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default {
  getAll() {
    return Promise.resolve(load());
  },

  add(item) {
    const data = load();
    data.push(item);
    save(data);
    return Promise.resolve(item);
  },

  update(id, updates) {
    const data = load();
    const updated = data.map(m => {
      if (m.id === id) {
        return { ...m, ...updates };
      }
      return m;
    });
    save(updated); // ⭐ C’EST CE QUI MANQUAIT
    return Promise.resolve();
  },

  remove(id) {
    const data = load();
    save(data.filter(m => m.id !== id));
    return Promise.resolve();
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
    return Promise.resolve();
  },
};
