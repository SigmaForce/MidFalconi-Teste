import { getInitials } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface HeaderProps {
  username: string;
}

export function Header({ username }: HeaderProps) {
  return (
    <header className="p-4 border-b border-gray-200 bg-primary ">
      <div className="container flex justify-between mx-auto">
        <Image src="/logo.svg" width={64} height={30} alt="Logo mid falconi" />
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src="" alt="User" />
            <AvatarFallback>{getInitials(username)}</AvatarFallback>
          </Avatar>
          <span className="text-background">{username}</span>
        </div>
      </div>
    </header>
  );
}
