import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { User } from "@/http/types/user.type";
import { Edit2 } from "lucide-react";
import { EditUserForm } from "./edit-user-form";

interface EditUserDialogProps {
  user: User;
}

export function EditUserDialog({ user }: EditUserDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton
          size="md"
          className="bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          icon={<Edit2 className="w-5 h-5" />}
          title="Editar"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditUserForm
          id={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          profileId={user.profileId}
        />
      </DialogContent>
    </Dialog>
  );
}
