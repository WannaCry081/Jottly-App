import { axiosInstance } from "@/config/axios.config";

// Types
import type { UrlRequest } from "@/types/url";

export const urlService = {
  list: (ownerId: string) => axiosInstance.get(`/shorten?ownerId=${ownerId}`),
  retrieve: (code: string) => axiosInstance.get(`/shorten?code=${code}`),
  partialUpdate: (code: string) => axiosInstance.patch(`/shorten?code=${code}`),
  create: (request: UrlRequest) => axiosInstance.post("/shorten", request),
};
