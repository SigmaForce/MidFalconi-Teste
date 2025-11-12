import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsersFilter } from "@/context/useFilterContext";
import { useProfiles } from "@/hooks/profile/useProfiles";
import { Filter, X } from "lucide-react";
import { useState } from "react";

export function FiltersDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: profiles } = useProfiles();
  const {
    searchId,
    setSearchId,
    selectedProfile,
    setSelectedProfile,
    statusFilter,
    setStatusFilter,
    clearFilters,
    activeFiltersCount,
  } = useUsersFilter();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={`relative h-10  ${
            activeFiltersCount > 0
              ? "bg-blue-100 text-blue-700 border-2 border-blue-300 hover:bg-blue-200 "
              : ""
          }`}
        >
          <Filter className="w-5 h-5 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Filtrar Usuários</DialogTitle>
          <DialogDescription>
            Aplique filtros para encontrar usuários específicos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Perfil
            </label>
            <Select value={selectedProfile} onValueChange={setSelectedProfile}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os perfis</SelectItem>
                {profiles?.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Status
            </label>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as any)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Apenas Ativos</SelectItem>
                <SelectItem value="inactive">Apenas Inativos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {activeFiltersCount > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900">
                  Filtros ativos: {activeFiltersCount}
                </span>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Limpar tudo
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {searchId && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    Busca: {searchId}
                    <button
                      onClick={() => setSearchId("")}
                      className="hover:bg-blue-100 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedProfile !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    Perfil:{" "}
                    {profiles?.find((p) => p.id === selectedProfile)?.name}
                    <button
                      onClick={() => setSelectedProfile("all")}
                      className="hover:bg-blue-100 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {statusFilter !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    Status: {statusFilter === "active" ? "Ativos" : "Inativos"}
                    <button
                      onClick={() => setStatusFilter("all")}
                      className="hover:bg-blue-100 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={clearFilters} variant="default" className="flex-1">
            Limpar Filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
