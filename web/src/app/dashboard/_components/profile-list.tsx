"use client";
import { CopyButton } from "@/components/ui/copy-button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { useCreateProfile } from "@/hooks/profile/useCreateProfile";
import { useDeleteProfile } from "@/hooks/profile/useDeleteProfile";
import { useProfiles } from "@/hooks/profile/useProfiles";
import { Search, Shield, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { CreateNewProfileDialog } from "./create-new-profile-dialog";

export function ProfilesList() {
  const { data: profiles, isLoading, error } = useProfiles();
  const deleteProfile = useDeleteProfile();
  const createProfile = useCreateProfile();

  const [searchName, setSearchName] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileDescription, setNewProfileDescription] = useState("");

  const filteredProfiles = useMemo(() => {
    if (!profiles) return [];

    return profiles.filter((profile) =>
      profile.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [profiles, searchName]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Deseja realmente deletar o perfil "${name}"?`)) return;

    try {
      await deleteProfile.mutateAsync(id);
    } catch (error) {
      alert("Erro ao deletar perfil");
    }
  };

  const handleCreate = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!newProfileName.trim()) {
      alert("Por favor, preencha o nome do perfil");
      return;
    }

    try {
      await createProfile.mutateAsync({
        name: newProfileName,
      });
      setNewProfileName("");
      setNewProfileDescription("");
      setIsCreateDialogOpen(false);
    } catch (error) {
      alert("Erro ao criar perfil");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando perfis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-50 rounded-lg">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold text-lg mb-2">
            Erro ao carregar
          </h3>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gerenciamento de Perfis
        </h1>
        <p className="text-gray-600">Gerencie os perfis de acesso do sistema</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Buscar perfil por nome..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full "
          icon={<Search className="size-5" />}
        />

        <CreateNewProfileDialog />
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Exibindo{" "}
        <span className="font-semibold text-gray-900">
          {filteredProfiles.length}
        </span>{" "}
        de{" "}
        <span className="font-semibold text-gray-900">
          {profiles?.length || 0}
        </span>{" "}
        perfis
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredProfiles.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum perfil encontrado
              </h3>
              <p className="text-gray-600">
                {searchName
                  ? "Tente ajustar sua busca"
                  : "Clique em 'Novo Perfil' para começar"}
              </p>
            </div>
          ) : (
            filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {profile.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex gap-2 items-center">
                        ID: {profile.id}
                        <CopyButton textToCopy={profile.id} />
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <IconButton
                      icon={<Trash2 className="w-5 h-5" />}
                      onClick={() => handleDelete(profile.id, profile.name)}
                      disabled={deleteProfile.isPending}
                      className="bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50"
                      title="Deletar perfil"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
