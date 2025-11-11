import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./register/_components/login-form";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Image src="/logo.png" alt="Logo Falconi" width={300} height={210} />
        <h1 className="text-4xl font-bold mb-4">Acesse sua conta</h1>
      </div>
      <div className="flex flex-col gap-4">
        <LoginForm />
        <Link href="/register" className="text-sm text-zinc-600 cursor-pointer">
          Não possui uma conta?{" "}
          <span className="text-primary">Registre-se</span>
        </Link>
      </div>
    </div>
  );
}
