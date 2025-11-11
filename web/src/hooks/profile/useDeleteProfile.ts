import { profileHTTP } from "@/http/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileKeys } from "./useProfiles";

export function useDeleteProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => profileHTTP.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });
}
