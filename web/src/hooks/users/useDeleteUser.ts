import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userHTTP } from "@/http/user";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userHTTP.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
