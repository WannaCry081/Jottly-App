import { axiosInstance } from "@/config/axios.config";

// Types
import type { URLRequest } from "@/types/url";

export const urlService = {
  list: (ownerId: string) => axiosInstance.get(`/shorten?ownerId=${ownerId}`),
  retrieve: (code: string) => axiosInstance.get(`/shorten?code=${code}`),
  partialUpdate: (code: string) => axiosInstance.patch(`/shorten?code=${code}`),
  create: (request: URLRequest) => axiosInstance.post("/shorten", request),
};
