import { userHTTP } from "@/http/user";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "./useUsers";

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userHTTP.getById(id),
    enabled: !!id,
  });
}
