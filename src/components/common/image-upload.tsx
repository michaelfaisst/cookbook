import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";

import Image from "next/image";

interface Props {
    value: string | null;
    onChange: (image: string | null) => void;
}

const ImageUpload = ({ value, onChange }: Props) => {
    const resizeFile = (file?: File): Promise<string | undefined> => {
        if (!file) {
            return Promise.resolve(undefined);
        }

        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                1920,
                1920,
                "WEBP",
                90,
                0,
                (uri) => {
                    resolve(uri as string);
                },
                "base64"
            );
        });
    };

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            if (acceptedFiles.length == 0) {
                return;
            }

            const resizedImage = await resizeFile(acceptedFiles[0]);

            onChange(resizedImage ?? null);
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
