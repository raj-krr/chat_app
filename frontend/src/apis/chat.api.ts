import {axiosInstance } from "./axios";

export const getChatListApi = () =>
  axiosInstance.get("/message/chats");

export const getMessagesApi = (
  id: string,
  params?: { skip?: number; limit?: number }
) =>
  axiosInstance.get(`/message/chat/${id}`, {
    params,
  });

export const sendMessageApi = (id: string, data: FormData) =>
  axiosInstance.post(`/message/send/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });


export const markReadApi = (id: string) =>
  axiosInstance.post(`/message/read/${id}`);

export const deleteMessageForEveryoneApi = (id: string) =>
  axiosInstance.delete(`/message/${id}`);

export const deleteMessageForMeApi = (id: string) =>
  axiosInstance.delete(`/message/me/${id}`);


