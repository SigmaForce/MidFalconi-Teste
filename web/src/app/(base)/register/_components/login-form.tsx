"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/users/useUser";
import { LoginFormValues, loginSchema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { id: "" },
  });

  const { data, isLoading, error, isError } = useUser(userId);

  useEffect(() => {
    if (data) {
      router.push(`/dashboard/${data.id}`);
    }
  }, [data, router]);

  const onSubmit = (values: LoginFormValues) => {
    setUserId(values.id);
  };

  const errorMessage =
    isError && (error as any)?.response?.status === 404
      ? "Usuário não encontrado."
      : isError
      ? "Erro ao buscar usuário. Tente novamente."
      : null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-sm"
    >
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          ID
        </label>
        <Input placeholder="Id" {...register("id")} />
        {errors.id && (
          <p className="text-xs text-red-500">{errors.id.message}</p>
        )}
      </div>

      <Button
        variant="dark"
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Carregando..." : "Entrar"}
      </Button>

      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </form>
  );
}
