import { promises as fs } from 'fs';
import path from 'path';

export async function uploadFile(file: File, folder: string): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const originalName = file.name || 'file';
    const ext = path.extname(originalName) || '';
    const nameWithoutExt = path.basename(originalName, ext).replace(/[^a-zA-Z0-9]/g, '');
    const fileName = `${uniqueSuffix}-${nameWithoutExt}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);

    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    // Return the public URL path
    return `/uploads/${folder}/${fileName}`;
}
