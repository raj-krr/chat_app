import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface User{
    userId: string,
    email:string,
};

interface AuthState {
    authUser: User | null;
    isCheckingAuth: boolean;
    isSigningUp: boolean;
    checkAuth: () => Promise<void>;
    signup: (formData:any) => Promise<void>;
}


export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingin: false,
    isUpdatingProfile: false,
    
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data})
        } catch (error) {
            console.log("error", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        };
    },

    signup: async (FormData:any) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", FormData);
            set({ authUser: res.data });
            toast.success("Account created successfully");
    
        } catch (error:any) {
            toast.error(error.Response.data.message)
            console.log("error", error);
            set({ authUser: null });
        } finally {
            set({ isSigningUp: false });
        }
    },
}));