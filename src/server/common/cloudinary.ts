import { env } from "@/env/server.mjs";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: env.CLOUDINARY_CLOUD_KEY,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (imageString: string | null) => {
    if (!imageString || !imageString.startsWith("data:image/")) {
        return Promise.resolve(undefined);
    }

    const imageUploadResponse = await cloudinary.v2.uploader.upload(
        imageString
    );
    return { id: imageUploadResponse.public_id, url: imageUploadResponse.url };
};

export const deleteImage = async (imageId: string) => {
    await cloudinary.v2.uploader.destroy(imageId);
};

export default cloudinary.v2;
