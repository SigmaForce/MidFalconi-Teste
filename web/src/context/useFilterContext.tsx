"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface UsersFilterContextType {
  searchId: string;
  setSearchId: (value: string) => void;
  selectedProfile: string;
  setSelectedProfile: (value: string) => void;
  statusFilter: "all" | "active" | "inactive";
  setStatusFilter: (value: "all" | "active" | "inactive") => void;
  clearFilters: () => void;
  activeFiltersCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

const UsersFilterContext = createContext<UsersFilterContextType | undefined>(
  undefined
);

export function UsersFilterProvider({ children }: { children: ReactNode }) {
  const [searchId, setSearchId] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const clearFilters = () => {
    setSearchId("");
    setSelectedProfile("all");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const activeFiltersCount = [
    searchId !== "",
    selectedProfile !== "all",
    statusFilter !== "all",
  ].filter(Boolean).length;

  return (
    <UsersFilterContext.Provider
      value={{
        searchId,
        setSearchId,
        selectedProfile,
        setSelectedProfile,
        statusFilter,
        setStatusFilter,
        clearFilters,
        activeFiltersCount,
        currentPage,
        setCurrentPage,
        itemsPerPage,
      }}
    >
      {children}
    </UsersFilterContext.Provider>
  );
}

export function useUsersFilter() {
  const context = useContext(UsersFilterContext);
  if (!context) {
    throw new Error("useUsersFilter must be used within UsersFilterProvider");
  }
  return context;
}
