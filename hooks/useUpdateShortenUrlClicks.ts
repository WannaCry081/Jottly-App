import { useTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Components
import { toast } from "sonner";

// Services
import { urlService } from "@/services";

export const useUpdateShortenUrlClicks = () => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { mutate: updateShortenUrlClicks } = useMutation({
    mutationFn: async (code: string) => await urlService.partialUpdate(code),
    onSuccess: () => {
      startTransition(() => {
        queryClient.invalidateQueries({
          queryKey: ["shortenUrl"],
          exact: true,
        });
      });
      // Display success message
      toast.success("Shortened URL created successfully");
    },

    onError: (error) => {
      // Display error message
      toast.error("An error occurred in creating the shortened URL");
    },
  });

  return { isPending, updateShortenUrlClicks };
};
