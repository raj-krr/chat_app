import {axiosInstance } from "./axios";

export const getChatListApi = () =>
  axiosInstance.get("/message/chats");

export const getMessagesApi = (id: string) =>
  axiosInstance.get(`/message/chat/${id}`);

export const sendMessageApi = (id: string, data: FormData) =>
  axiosInstance.post(`/message/send/${id}`, data);

export const markReadApi = (id: string) =>
  axiosInstance.post(`/message/read/${id}`);
