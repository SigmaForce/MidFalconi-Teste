import { CreateUser, UpdateUser, User } from "@/http/types/user.type";
import { api } from "../lib/axios";

export const userHTTP = {
  getAll: async (profileId = ""): Promise<User[]> => {
    const { data } = await api.get<User[]>("/users", {
      params: { profileId },
    });
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  create: async (userData: CreateUser): Promise<User> => {
    const { data } = await api.post<User>("/users", userData);
    return data;
  },

  update: async (id: string, userData: UpdateUser): Promise<User> => {
    const { data } = await api.patch<User>(`/users/${id}`, userData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
