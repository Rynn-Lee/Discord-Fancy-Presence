const storage = {
  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item) return JSON.parse(item) as T;
      return null;
    } catch {
      return null;
    }
  },
};

export default storage;
