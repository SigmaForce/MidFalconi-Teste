import { Header } from "@/components/ui/header";
import { userHTTP } from "@/http/user";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { id } = await params;

  if (!id) {
    redirect("/");
  }

  try {
    const user = await userHTTP.getById(id);
    if (!user || !user.id) {
      redirect("/");
    }

    return (
      <div className="min-h-screen">
        <Header username={user.firstName + " " + user.lastName} />
        <div className="container mx-auto py-6">{children}</div>
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    redirect("/");
  }
}
