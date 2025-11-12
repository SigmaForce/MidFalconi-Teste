import { IconButton } from "@/components/ui/icon-button";
import { useUpdateUser } from "@/hooks/users/useUpdateUser";

import { User } from "@/http/types/user.type";
import { Power } from "lucide-react";

interface ToggleStatusButtonProps {
  user: User;
}

export function ToggleStatusButton({ user }: ToggleStatusButtonProps) {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleToggleStatus = () => {
    updateUser({
      id: user.id,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileId: user.profileId,
        isActive: !user.isActive,
      },
    });
  };

  return (
    <IconButton
      size="md"
      onClick={handleToggleStatus}
      disabled={isPending}
      className={`${
        user.isActive
          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
          : "bg-green-100 text-green-700 hover:bg-green-200"
      }`}
      icon={<Power className="w-5 h-5" />}
      title={user.isActive ? "Desativar" : "Ativar"}
    />
  );
}
