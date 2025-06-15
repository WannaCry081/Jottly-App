import { useQuery } from "@tanstack/react-query";
import { urlService } from "@/services";

import { Response } from "@/types/response";
import { Url } from "@/types/url";

export const useGetShortenUrlList = (ownerId: string) => {
  const { data, error, isLoading, isError } = useQuery<Response<Url[]>, Error>({
    queryKey: ["shortenUrl", ownerId],
    queryFn: async () => {
      const response = await urlService.list(ownerId);
      return response.data;
    },
    enabled: !!ownerId,
  });

  return { data, error, isLoading, isError };
};
