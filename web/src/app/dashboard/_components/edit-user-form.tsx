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
import { useProfiles } from "@/hooks/profile/useProfiles";
import { useUpdateUser } from "@/hooks/users/useUpdateUser";
import { Profile } from "@/http/types/profile.type";

import { type UserFormValues, userSchema } from "@/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditUserFormProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileId: string;
}

export function EditUserForm({
  email,
  firstName,
  lastName,
  profileId,
  id,
}: EditUserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      profileId: profileId,
    },
  });

  const { data: profiles, isLoading: isLoadingProfiles } = useProfiles();
  const updateUser = useUpdateUser();

  const onSubmit = async (values: UserFormValues) => {
    try {
      const user = await updateUser.mutateAsync({ id: id, data: values });

      toast.success("Usuário atualizado com sucesso!", {
        description: `ID: ${user.id}`,
      });
      reset();
    } catch (error: any) {
      toast.error("Erro ao criar o usuário");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 w-full max-w-sm"
    >
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Nome
        </label>
        <Input placeholder="Nome" {...register("firstName")} />
        {errors.firstName && (
          <p className="text-sm text-red-500">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Sobrenome
        </label>
        <Input placeholder="Sobrenome" {...register("lastName")} />
        {errors.lastName && (
          <p className="text-sm text-red-500">{errors.lastName.message}</p>
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
        <Select
          defaultValue={profileId}
          onValueChange={(value) => setValue("profileId", value)}
          disabled={isLoadingProfiles}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                isLoadingProfiles
                  ? "Carregando perfis..."
                  : "Selecione um perfil"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {profiles?.map((profile: Profile) => (
              <SelectItem key={profile.id} value={profile.id}>
                {profile.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.profileId && (
          <p className="text-sm text-red-500">{errors.profileId.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="dark"
        className="w-full"
        disabled={updateUser.isPending}
      >
        {updateUser.isPending ? "Salvando..." : "Salvar Usuário"}
      </Button>
    </form>
  );
}
