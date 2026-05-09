import cloudinary from "./cloudinary";

export async function uploadFile(file: File, folder: string): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: `baroedak-como/${folder}`,
                resource_type: "auto",
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    reject(error);
                } else {
                    resolve(result?.secure_url || "");
                }
            }
        );

        uploadStream.end(buffer);
    });
}
