import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { ProfileForm } from "./_components/profile-form";
import { UserForm } from "./_components/user-form";

export default function Register() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Image src="/logo.png" alt="Logo Falconi" width={300} height={210} />
        <h1 className="text-4xl font-bold mb-2">Crie sua conta</h1>
        <span className="text-sm text-zinc-600">
          Por favor, insira suas informações para criar sua conta.
        </span>
      </div>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="w-full gap-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserForm />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
