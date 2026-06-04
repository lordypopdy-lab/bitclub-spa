import { useEffect, useState } from "react";

const KEY = "lov_favorites_v1";

export default function useFavorites() {
  const [favs, setFavs] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(favs));
    } catch {}
  }, [favs]);

  const toggle = (id) =>
    setFavs((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const has = (id) => favs.includes(id);
  return { favs, toggle, has };
}
