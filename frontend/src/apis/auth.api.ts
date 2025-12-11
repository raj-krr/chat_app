import { axiosInstance } from "./axios";

export const loginApi = (data:{ identifier: string, password: string }) => {
  return axiosInstance.post("auth/login", data);
};

export const registerApi = (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return axiosInstance.post("auth/register", data);
};


export const verifyEmailApi = (data: { email:string; otp: string }) => {
  return axiosInstance.post("auth/verify-email", data);
};

export const resendVerificationOtpApi = (email: string) => {
  return axiosInstance.post("auth/resendverificationcode", { email });
};

export const checkAuthApi = () => {
  return axiosInstance.get("auth/check");
};


export const forgotPasswordApi = (identifier: string) => {
  return axiosInstance.post("auth/forgotpassword", { identifier });
};

export const resetPasswordApi = (data: {
  identifier: string;
  otp: string;
  newPassword: string;
}) => {
  return axiosInstance.post("auth/updatepassword", data);
};

export const logoutApi = () => {
  return axiosInstance.post("auth/logout");
};
