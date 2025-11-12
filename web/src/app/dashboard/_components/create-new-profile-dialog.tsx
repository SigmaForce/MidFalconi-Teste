import { ProfileForm } from "@/app/(base)/register/_components/profile-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { useState } from "react";

export function CreateNewProfileDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="dark"
          className="gap-2 text-nowrap h-10 w-fit"
          title="Criar"
        >
          <Plus className="w-5 h-5" />
          Novo Perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Perfil</DialogTitle>
          <DialogDescription>
            Crie um novo perfil de acesso para os usuários do sistema.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
