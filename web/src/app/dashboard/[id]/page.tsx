import { UsersList } from "@/app/dashboard/_components/users-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UsersFilterProvider } from "@/context/useFilterContext";
import { ProfilesList } from "../_components/profile-list";

export default function Dashboard() {
  return (
    <UsersFilterProvider>
      <Tabs defaultValue="users">
        <TabsList className=" gap-2">
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="profiles">Perfis</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UsersList />
        </TabsContent>
        <TabsContent value="profiles">
          <ProfilesList />
        </TabsContent>
      </Tabs>
    </UsersFilterProvider>
  );
}
