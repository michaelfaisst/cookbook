import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag and drop some files here, or click to select files</p>
            )}
            <img src={value} />
        </div>
    );
};

export default ImageUpload;
