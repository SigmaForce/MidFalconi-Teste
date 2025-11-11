import { CoverSection } from "@/components/cover-section";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="lg:col-span-3 col-span-12 flex flex-col items-center justify-center p-4">
        {children}
      </div>
      <CoverSection />
    </div>
  );
}
