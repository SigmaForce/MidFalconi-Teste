"use client";
import { CreateNewUserDialog } from "@/app/dashboard/_components/create-new-user-dialog";
import { EditUserDialog } from "@/app/dashboard/_components/edit-user-dialog";
import { ToggleStatusButton } from "@/app/dashboard/_components/toggle-status-button";
import { useProfiles } from "@/hooks/profile/useProfiles";
import { useDeleteUser } from "@/hooks/users/useDeleteUser";
import { useUsers } from "@/hooks/users/useUsers";
import { Search, Trash2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { IconButton } from "../../../components/ui/icon-button";

import { FiltersDialog } from "@/app/dashboard/_components/filters-dialog";

import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { useUsersFilter } from "@/context/useFilterContext";
import { getInitials } from "@/lib/utils";
import { Pagination } from "./pagination";

export function UsersList() {
  const { data: users, isLoading, error } = useUsers();
  const { data: profiles } = useProfiles();
  const deleteUser = useDeleteUser();

  const {
    searchId,
    setSearchId,
    selectedProfile,
    statusFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  } = useUsersFilter();

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      if (searchId && !user.id.toLowerCase().includes(searchId.toLowerCase())) {
        return false;
      }

      if (selectedProfile !== "all" && user.profileId !== selectedProfile) {
        return false;
      }

      if (statusFilter === "active" && !user.isActive) return false;
      if (statusFilter === "inactive" && user.isActive) return false;

      return true;
    });
  }, [users, searchId, selectedProfile, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredUsers.length, currentPage, totalPages, setCurrentPage]);

  const handleDelete = async (id: string) => {
    if (!confirm("Deseja realmente deletar este usuário?")) return;

    try {
      await deleteUser.mutateAsync(id);
    } catch (error) {
      alert("Erro ao deletar usuário");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
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
          Gerenciamento de Usuários
        </h1>
        <p className="text-gray-600">
          Gerencie usuários e permissões do sistema
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 ">
          <Input
            type="text"
            placeholder="Buscar por ID do usuário..."
            value={searchId}
            onChange={(e) => {
              setSearchId(e.target.value);
              setCurrentPage(1);
            }}
            icon={<Search className="w-5 h-5" />}
            className=""
          />
        </div>

        <div className="flex gap-2">
          <FiltersDialog />
          <CreateNewUserDialog />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {paginatedUsers.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum usuário encontrado
              </h3>
              <p className="text-gray-600">
                {searchId || selectedProfile !== "all" || statusFilter !== "all"
                  ? "Tente ajustar os filtros de busca"
                  : "Clique em 'Novo Usuário' para começar"}
              </p>
            </div>
          ) : (
            paginatedUsers.map((user) => (
              <div
                key={user.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {getInitials(user.firstName + " " + user.lastName)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex flex-col flex-wrap gap-2 w-fit">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex gap-2 items-center">
                        ID: {user.id}
                        <CopyButton textToCopy={user.id} />
                      </span>
                      <div className="flex gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            user.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              user.isActive ? "bg-green-600" : "bg-gray-600"
                            }`}
                          />
                          {user.isActive ? "Ativo" : "Inativo"}
                        </span>
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {profiles?.find((p) => p.id === user.profileId)
                            ?.name || "Perfil"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <ToggleStatusButton user={user} />
                    <EditUserDialog user={user} />
                    <IconButton
                      size="md"
                      onClick={() => handleDelete(user.id)}
                      disabled={deleteUser.isPending}
                      className="bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50"
                      icon={<Trash2 className="w-5 h-5" />}
                      title="Deletar"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredUsers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
}
