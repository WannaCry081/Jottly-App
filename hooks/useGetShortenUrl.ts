import { useQuery } from "@tanstack/react-query";

// Services
import { urlService } from "@/services";

// Types
import type { Response } from "@/types/response";
import type { URL } from "@/types/url";

// Constants
import { URL_KEY } from "@/constants/query";

type GetShortenUrlListReturnType = {
  data?: Response<URL>;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
};

export const useGetShortenUrl = (code: string): GetShortenUrlListReturnType => {
  const { data, error, isLoading, isError } = useQuery<Response<URL>, Error>({
    queryKey: [URL_KEY, code],
    queryFn: async () => {
      const response = await urlService.retrieve(code);
      return response.data;
    },
    enabled: !!code,
  });

  return { data, error, isLoading, isError };
};
