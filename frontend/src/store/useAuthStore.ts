import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface User {
    userId: string;
    email: string;
}

interface AuthState {
    authUser: User | null;
    isCheckingAuth: boolean;
    isSigningUp: boolean;
    checkAuth: () => Promise<void>;
    signup: (formData: any) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isSigningUp: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("auth/check");
            set({ authUser: res.data.user });
        } catch (error) {
            console.log("Auth check error:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (formData: any) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("auth/register", formData);

            set({ authUser: res.data.user });

            toast.success("Account created successfully");
        } catch (error: any) {
            console.log("Signup error:", error);

            toast.error(
                error.response?.data?.message ||
                "Signup failed, please try again"
            );

            set({ authUser: null });
        } finally {
            set({ isSigningUp: false });
        }
    },
}));
