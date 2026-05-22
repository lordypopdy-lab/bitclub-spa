import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.clear();
    set({ user: null });
  },

  fetchUser: async () => {
    try {
      const email = localStorage.getItem("email");
      const pin = localStorage.getItem("pin");

      if (!email || !pin) {
        set({ loading: false });
        return;
      }

      const { data } = await axios.post("/profile", { email, pin });

      if (data.error) {
        console.log(data.error);
        localStorage.clear();
        set({ user: null, loading: false });
      } else {
        set({ user: data, loading: false });
      }
    } catch (error) {
      console.log(error.message);
      localStorage.clear();
      set({ user: null, loading: false });
    }
  },
}));