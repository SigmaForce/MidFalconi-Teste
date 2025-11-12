"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateProfile } from "@/hooks/profile/useCreateProfile";
import {
  type ProfileFormValues,
  profileSchema,
} from "@/schemas/profile-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProfileFormProps {
  onSuccess?: () => void;
}

export function ProfileForm({ onSuccess }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "" },
  });

  const createProfile = useCreateProfile();

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await createProfile.mutateAsync(values);
      toast.success("Perfil criado com sucesso!");
      reset();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.message ?? "Erro ao criar o perfil");
    }
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
        <Input placeholder="Nome do perfil" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <Button
        variant="dark"
        type="submit"
        className="w-full"
        disabled={createProfile.isPending}
      >
        {createProfile.isPending ? "Salvando..." : "Salvar Perfil"}
      </Button>
    </form>
  );
}
