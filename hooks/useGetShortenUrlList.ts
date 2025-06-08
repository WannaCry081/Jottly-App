import { useQuery } from "@tanstack/react-query";
import { urlService } from "@/services";

export const useGetShortenUrlList = (ownerId: string) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["shortenUrl"],
    queryFn: async () => await urlService.list(ownerId),
    select: (data) => data.data,
    enabled: !!ownerId,
  });

  return { data, error, isLoading, isError };
};
