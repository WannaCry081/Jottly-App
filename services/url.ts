import { axiosInstance } from "@/config/axios.config";

// Types
import type { UrlRequest } from "@/types/url";

export const urlService = {
  retrieve: async (code: string) => axiosInstance.get(`/${code}`),
  create: async (request: UrlRequest) =>
    axiosInstance.post("/shorten", request),
};
