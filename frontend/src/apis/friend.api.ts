import {axiosInstance} from "./axios";

export const getMyFriendsApi = () =>
  axiosInstance.get("/friends");

export const getAllUsersApi = () =>
  axiosInstance.get("/friends/allusers");

export const sendFriendRequestApi = (identifier: string) =>
  axiosInstance.post(`/friends/request`, { identifier});

export const cancelFriendRequestApi = (id: string) =>
  axiosInstance.delete(`/friends/request/${id}`);

export const getFriendRequestsApi = () =>
  axiosInstance.get("/friends/requests");

export const acceptFriendRequestApi = (requestId: string) =>
  axiosInstance.post(`/friends/accept/${requestId}`);

export const rejectFriendRequestApi = (requestId: string) =>
  axiosInstance.post(`/friends/reject/${requestId}`);
