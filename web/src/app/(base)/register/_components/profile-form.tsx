"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type ProfileFormValues,
  profileSchema,
} from "@/schemas/profile-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { nome: "" },
  });

  const onSubmit = (values: ProfileFormValues) => {
    console.log(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-sm"
    >
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Nome
        </label>
        <Input placeholder="Nome do perfil" {...register("nome")} />
        {errors.nome && (
          <p className="text-sm text-red-500">{errors.nome.message}</p>
        )}
      </div>

      <Button variant="default" type="submit" className="w-full">
        Salvar Perfil
      </Button>
    </form>
  );
}
