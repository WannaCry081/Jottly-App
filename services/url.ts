import type { AxiosResponse } from "axios";

// Configs
import { axiosInstance } from "@/config/axios.config";

// Types
import type { Response } from "@/types/response";
import type { URLRequest, URL } from "@/types/url";

type URLResponse<T> = Promise<AxiosResponse<Response<T>>>;

export const urlService = {
  list: (ownerId: string): URLResponse<URL[]> =>
    axiosInstance.get(`/shorten?ownerId=${ownerId}`),
  retrieve: (code: string): URLResponse<URL> =>
    axiosInstance.get(`/shorten?code=${code}`),
  partialUpdate: (code: string): URLResponse<URL> =>
    axiosInstance.patch(`/shorten?code=${code}`),
  create: (request: URLRequest): URLResponse<URL> =>
    axiosInstance.post("/shorten", request),
};
