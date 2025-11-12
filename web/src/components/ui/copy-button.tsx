import { Copy } from "lucide-react";
import { toast } from "sonner";
import { IconButton } from "./icon-button";

export function CopyButton({ textToCopy }: { textToCopy: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    toast.success("Copiado");
  };

  return (
    <IconButton
      icon={<Copy className="w-5 h-5" />}
      title="Copy to clipboard"
      className="cursor-pointer"
      onClick={handleCopy}
    />
  );
}
