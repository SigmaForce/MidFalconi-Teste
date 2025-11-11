import Image from "next/image";

export function CoverSection() {
  return (
    <div className="lg:col-span-9 col-span-0 lg:flex flex-col items-center justify-center  hidden">
      <div className="relative flex-1 w-full justify-center items-center min-h-dvh hidden md:flex shadow">
        <Image
          src="/cover.jpg"
          alt="Imagem de fundo"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
