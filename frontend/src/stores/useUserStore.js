import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      console.log("Attempting to sign up user:", { name, email });
      const res = await axios.post("/auth/signup", { name, email, password });
      console.log("Signup response:", res.data);
      set({ user: res.data, loading: false });
    } catch (error) {
      console.error("Signup error:", error);
      console.error("Error response:", error.response);
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      console.log("Attempting to login user:", { email });
      const res = await axios.post("/auth/login", { email, password });
      console.log("Login response:", res.data);
      set({ user: res.data, loading: false });
    } catch (error) {
      console.error("Login error:", error);
      console.error("Error response:", error.response);
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      console.log(error.message);
      set({ checkingAuth: false, user: null });
    }
  },
}));
