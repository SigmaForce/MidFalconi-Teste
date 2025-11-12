import { UserForm } from "@/app/(base)/register/_components/user-form";
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

export function CreateNewUserDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="dark"
          className=" gap-2 text-nowrap  h-10"
          title="Criar"
        >
          <Plus className="w-5 h-5" />
          Novo Usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar novo usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo usuário e clique em salvar.
          </DialogDescription>
        </DialogHeader>
        <UserForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
