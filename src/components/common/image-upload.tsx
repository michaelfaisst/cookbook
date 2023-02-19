import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import Image from "next/image";

interface Props {
    value: string | null;
    onChange: (image: string | null) => void;
}

const ImageUpload = ({ value, onChange }: Props) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            console.log(acceptedFiles);
            if (acceptedFiles.length == 0) {
                return;
            }

            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target) {
                    onChange(e.target.result as string);
                }
            };

            reader.readAsDataURL(acceptedFiles[0] as Blob);
        },
        [onChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        maxFiles: 1
    });

    return (
        <div
            {...getRootProps()}
            className="relative flex h-64 w-full items-center justify-center border border-dashed border-rose-200 bg-slate-50"
        >
            <input {...getInputProps()} />
            {value ? (
                <Image
                    src={value}
                    fill
                    className="object-contain p-8"
                    alt="Recipe image"
                />
            ) : (
                <p className="p-4 text-sm font-medium text-gray-600">
                    {isDragActive
                        ? "Drop the files here..."
                        : "Drag and drop some files here, or click to select files"}
                </p>
            )}
        </div>
    );
};

export default ImageUpload;
