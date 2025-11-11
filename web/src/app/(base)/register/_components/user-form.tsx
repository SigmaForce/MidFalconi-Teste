"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type UserFormValues, userSchema } from "@/schemas/user-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      perfil: "",
    },
  });

  const onSubmit = (values: UserFormValues) => {
    console.log(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 w-full max-w-sm"
    >
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Nome
        </label>
        <Input placeholder="Nome" {...register("nome")} />
        {errors.nome && (
          <p className="text-sm text-red-500">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Sobrenome
        </label>
        <Input placeholder="Sobrenome" {...register("sobrenome")} />
        {errors.sobrenome && (
          <p className="text-sm text-red-500">{errors.sobrenome.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Email
        </label>
        <Input
          type="email"
          placeholder="email@exemplo.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Perfil
        </label>
        <Select onValueChange={(value) => setValue("perfil", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um perfil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="user">Usuário</SelectItem>
            <SelectItem value="guest">Convidado</SelectItem>
          </SelectContent>
        </Select>
        {errors.perfil && (
          <p className="text-sm text-red-500">{errors.perfil.message}</p>
        )}
      </div>

      <Button type="submit" variant="default" className="w-full">
        Salvar Usuário
      </Button>
    </form>
  );
}
