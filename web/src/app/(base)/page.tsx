import { UserIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Image src="/logo.png" alt="Logo Falconi" width={300} height={210} />
        <h1 className="text-4xl font-bold mb-4">Acesse sua conta</h1>
      </div>
      <div className="flex flex-col gap-4">
        <Input icon={<UserIcon size={20} />} placeholder="Informe seu ID" />
        <Button variant="default">Entrar</Button>
        <span>
          Não possui uma conta?{" "}
          <a href="#" className="text-primary">
            Registre-se
          </a>
        </span>
      </div>
    </div>
  );
}
