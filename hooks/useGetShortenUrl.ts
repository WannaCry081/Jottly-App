import { useQuery } from "@tanstack/react-query";
import { urlService } from "@/services";

export const useGetShortenUrl = (code: string) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["shortenUrl", code],
    queryFn: async () => await urlService.retrieve(code),
    select: (data) => data.data,
    enabled: !!code,
  });

  return { data, error, isLoading, isError };
};
