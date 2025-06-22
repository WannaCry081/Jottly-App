import { useMutation, useQueryClient } from "@tanstack/react-query";

// UI Components
import { toast } from "sonner";

// Services
import { urlService } from "@/services";

// Types
import type { Response } from "@/types/response";
import type { URL } from "@/types/url";

// Constants
import { URL_KEY } from "@/constants/query";

type UpdateShortenUrlClicksReturnType = {
  isLoading: boolean;
  isError: boolean;
  error?: Error;
  updateClicks: (code: string) => void;
};

export const useUpdateShortenUrlClicks =
  (): UpdateShortenUrlClicksReturnType => {
    const queryClient = useQueryClient();

    const mutate = useMutation<Response<URL>, Error, string>(
      async (code: string) => {
        const response = await urlService.partialUpdate(code);
        return response.data;
      },
      {
        onSuccess: (data) => {
          const { code } = data.data;

          queryClient.invalidateQueries({
            queryKey: [URL_KEY, code],
            exact: true,
          });
        },
        onError: (error) => {
          toast.error("Failed to update clicks", {
            description: error.message,
          });
        },
      },
    );

    return {
      isLoading: mutate.isLoading,
      isError: mutate.isError,
      error: mutate.error ?? undefined,
      updateClicks: mutate.mutate,
    };
  };
