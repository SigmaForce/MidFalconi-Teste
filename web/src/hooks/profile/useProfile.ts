import { profileHTTP } from "@/http/profile";
import { useQuery } from "@tanstack/react-query";
import { profileKeys } from "./useProfiles";

export function useProfile(id: string) {
  return useQuery({
    queryKey: profileKeys.detail(id),
    queryFn: () => profileHTTP.getById(id),
    enabled: !!id,
  });
}
