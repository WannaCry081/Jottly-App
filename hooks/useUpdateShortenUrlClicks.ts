import { useTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    },
  });

  return { isPending, updateShortenUrlClicks };
};
