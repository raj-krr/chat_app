import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { data } from "react-router-dom";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
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

    signup: async (data:any) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);
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