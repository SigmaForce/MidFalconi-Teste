import { userHTTP } from "@/http/user";
import { useQuery } from "@tanstack/react-query";

export const userKeys = {
  all: (profileId?: string) => ["users", { profileId }] as const,
  detail: (id: string) => ["users", id] as const,
};

export function useUsers(profileId?: string) {
  return useQuery({
    queryKey: userKeys.all(profileId),
    queryFn: () => userHTTP.getAll(profileId),
  });
}
