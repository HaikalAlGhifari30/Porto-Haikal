/**
 * Client-side image compressor utility.
 * Downscales images to suitable web dimensions and compresses to JPEG/WebP
 * to ensure fast uploads, zero payload crashes, and optimal performance on mobile.
 */
export async function compressImage(
  file: File,
  maxWidth = 1600,
  maxHeight = 2000,
  quality = 0.85
): Promise<File> {
  // If file is already small (under 400KB), no need to compress
  if (file.size <= 400 * 1024 && (file.type === "image/webp" || file.type === "image/jpeg" || file.type === "image/png")) {
    return file;
  }

  // Only compress images
  if (!file.type.startsWith("image/")) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to blob
        const outputType = file.type === "image/png" ? "image/jpeg" : file.type;
        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              resolve(file);
              return;
            }
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
              type: outputType,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          outputType,
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
