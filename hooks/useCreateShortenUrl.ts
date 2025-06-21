import { useMutation, useQueryClient } from "@tanstack/react-query";

// UI Components
import { toast } from "sonner";

// Services
import { urlService } from "@/services";

// Types
import type { Response } from "@/types/response";
import type { URL, URLRequest } from "@/types/url";

// Constants
import { URL_KEY } from "@/constants/query";

export const useCreateShortenUrl = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Response<URL>, Error, URLRequest>(
    async (request) => {
      const response = await urlService.create(request);
      return response.data;
    },
    {
      onSuccess: (data) => {
        const { code } = data.data;

        queryClient.invalidateQueries({ queryKey: [URL_KEY] });
        queryClient.invalidateQueries({
          queryKey: [URL_KEY, code],
          exact: true,
        });

        toast.success("URL shortened successfully", {
          description: "Your shortened link is ready to share.",
        });
      },
      onError: (error) => {
        toast.error("Failed to create shortened URL", {
          description: error.message,
        });
      },
    }
  );

  return {
    createShortenUrl: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    data: mutation.data,
    error: mutation.error,
  };
};
