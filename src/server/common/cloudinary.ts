import { env } from "@/env/server.mjs";
import cloudinary from "cloudinary";
import sharp from "sharp";

cloudinary.v2.config({
    cloud_name: env.CLOUDINARY_CLOUD_KEY,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
});

export interface IUploadResult {
    id: string;
    url: string;
}

const resizeImageAndConvertImage = async (imageString: string) => {
    const uri = imageString.split(";base64,").pop();

    if (!uri) {
        return undefined;
    }

    const imageBuffer = Buffer.from(uri, "base64");

    const resizedImageBuffer = await sharp(imageBuffer)
        .resize({
            width: 1920,
            height: 1920,
            withoutEnlargement: true
        })
        .webp({ quality: 90 })
        .toBuffer();

    return `data:image/webp;base64,${resizedImageBuffer.toString("base64")}`;
};

export const uploadImage = async (imageString: string | null) => {
    if (!imageString || !imageString.startsWith("data:image/")) {
        return undefined;
    }

    const resizedBase64 = await resizeImageAndConvertImage(imageString);

    if (!resizedBase64) {
        return undefined;
    }

    const imageUploadResponse = await cloudinary.v2.uploader.upload(
        resizedBase64
    );
    return { id: imageUploadResponse.public_id, url: imageUploadResponse.url };
};

export const deleteImage = async (imageId: string) => {
    await cloudinary.v2.uploader.destroy(imageId);
};

export default cloudinary.v2;
