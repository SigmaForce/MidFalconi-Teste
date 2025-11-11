import { profileHTTP } from "@/http/profile";
import { useQuery } from "@tanstack/react-query";

export const profileKeys = {
  all: ["profiles"] as const,
  detail: (id: string) => ["profiles", id] as const,
};

export function useProfiles() {
  return useQuery({
    queryKey: profileKeys.all,
    queryFn: profileHTTP.getAll,
  });
}
