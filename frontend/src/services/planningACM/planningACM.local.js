const STORAGE_KEY = "acti-ia-planning-acm";

function load() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default {
  get() {
    return Promise.resolve(load());
  },
  set(planning) {
    save(planning);
    return Promise.resolve();
  },
  clear() {
    localStorage.removeItem(STORAGE_KEY);
    return Promise.resolve();
  },
};
