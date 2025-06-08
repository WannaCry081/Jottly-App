import { useTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Components
import { toast } from "sonner";

// Services
import { urlService } from "@/services";

// Types
import { UrlRequest } from "@/types/url";

export const useCreateShortenUrl = () => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { mutate: createShortenUrl } = useMutation({
    mutationFn: async (request: UrlRequest) => await urlService.create(request),
    onSuccess: () => {
      startTransition(() => {
        queryClient.invalidateQueries({
          queryKey: ["shortenUrl"],
          exact: true,
        });
      });
      // Display success message
      toast.success("Shortened URL created successfully", {
        description: "You can now share your shortened link!",
      });
    },

    onError: (error) => {
      // Display error message
      toast.error("An error occurred in creating the shortened URL", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    },
  });

  return { isPending, createShortenUrl };
};
