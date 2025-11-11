import { profileHTTP } from "@/http/profile";
import { CreateProfile } from "@/http/types/profile.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileKeys } from "./useProfiles";

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProfile) => profileHTTP.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });
}
