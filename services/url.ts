import { axiosInstance } from "@/config/axios.config";

export const urlService = {
  retrieve: async (code: string) => axiosInstance.get(`/${code}`),
  create: async (url: string) => axiosInstance.post("/shorten", { url }),
};
