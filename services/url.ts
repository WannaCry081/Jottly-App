import { axiosInstance } from "@/config/axios.config";

// Types
import type { UrlRequest } from "@/types/url";

export const urlService = {
  list: async (ownerId: string) =>
    axiosInstance.get(`/shorten?ownerId=${ownerId}`),
  retrieve: async (code: string) => axiosInstance.get(`/shorten?code=${code}`),
  partialUpdate: async (code: string) =>
    axiosInstance.patch(`/shorten?code=${code}`),
  create: async (request: UrlRequest) =>
    axiosInstance.post("/shorten", request),
};
