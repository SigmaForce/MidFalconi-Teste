import {
  CreateProfile,
  Profile,
  UpdateProfile,
} from "@/http/types/profile.type";
import { api } from "../lib/axios";

export const profileHTTP = {
  getAll: async (): Promise<Profile[]> => {
    const { data } = await api.get<Profile[]>("/profiles");
    return data;
  },

  getById: async (id: string): Promise<Profile> => {
    const { data } = await api.get<Profile>(`/profiles/${id}`);
    return data;
  },

  create: async (profileData: CreateProfile): Promise<Profile> => {
    const { data } = await api.post<Profile>("/profiles", profileData);
    return data;
  },

  update: async (id: string, profileData: UpdateProfile): Promise<Profile> => {
    const { data } = await api.patch<Profile>(`/profiles/${id}`, profileData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/profiles/${id}`);
  },
};
