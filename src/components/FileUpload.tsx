import { useRef } from "react";
import { UploadCloud } from "lucide-react";

interface Props {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export default function FileUpload({ onFileSelect, selectedFile }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:bg-muted/30 transition"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".vcf"
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
      />

      <UploadCloud className="mx-auto mb-3 w-8 h-8 text-muted-foreground" />

      {selectedFile ? (
        <p className="text-sm font-medium text-foreground">
          ✅ {selectedFile.name}
        </p>
      ) : (
        <>
          <p className="text-sm font-medium text-foreground">
            Drag & drop VCF file here
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            or click to browse
          </p>
        </>
      )}
    </div>
  );
}
