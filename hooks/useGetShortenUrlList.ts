import { useQuery } from "@tanstack/react-query";

// Services
import { urlService } from "@/services";

// Types
import type { Response } from "@/types/response";
import type { Url } from "@/types/url";

// Constants
import { URL_KEY } from "@/constants/query";

export const useGetShortenUrlList = (ownerId: string) => {
  const { data, error, isLoading, isError } = useQuery<Response<Url[]>, Error>({
    queryKey: [URL_KEY],
    queryFn: async () => {
      const response = await urlService.list(ownerId);
      return response.data;
    },
    enabled: !!ownerId,
  });

  return { data, error, isLoading, isError };
};
