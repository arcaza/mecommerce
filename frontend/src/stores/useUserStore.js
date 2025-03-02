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
            console.log('Attempting to sign up user:', { name, email });
            const res = await axios.post("/auth/signup", { name, email, password });
            console.log('Signup response:', res.data);
            set({ user: res.data, loading: false });
        } catch (error) {
            console.error('Signup error:', error);
            console.error('Error response:', error.response);
            set({ loading: false });
            toast.error(error.response?.data?.message || "An error occurred");
        }
    },
}));