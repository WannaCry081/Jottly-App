import { useQuery } from "@tanstack/react-query";

// Services
import { urlService } from "@/services";

// Types
import type { Response } from "@/types/response";
import type { URL } from "@/types/url";

// Constants
import { URL_KEY } from "@/constants/query";

type GetShortenUrlListReturnType = {
  data?: Response<URL[]>;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
};

export const useGetShortenUrlList = (
  ownerId: string,
): GetShortenUrlListReturnType => {
  const { data, error, isLoading, isError } = useQuery<Response<URL[]>, Error>({
    queryKey: [URL_KEY],
    queryFn: async () => {
      const response = await urlService.list(ownerId);
      return response.data;
    },
    enabled: !!ownerId,
  });

  return { data, error, isLoading, isError };
};
