import { useTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { urlService } from "@/services";

export const useCreateShortenUrl = (url: string) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { mutateAsync } = useMutation({
    mutationFn: async () => await urlService.create(url),
    onSuccess: (data) => {
      startTransition(() => {
        queryClient.invalidateQueries({
          queryKey: ["shortenUrl"],
          exact: true,
        });
      });

      // Display success message
    },

    onError: (error) => {
      // Display error message
    },
  });

  return { isPending, mutateAsync };
};
