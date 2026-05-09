"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { uploadFile } from "@/lib/upload";

export async function getMembers() {
    return await prisma.member.findMany({
        include: {
            team: true,
            position: true
        },
        orderBy: { createdAt: "desc" }
    });
}

export async function generateMemberQR(memberId: string, slug: string) {
    const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/people/${slug}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "qr");
    
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `${slug}-${Date.now()}.png`;
    const filepath = path.join(uploadsDir, filename);

    await QRCode.toFile(filepath, profileUrl, {
        color: {
            dark: '#000000',
            light: '#ffffff'
        },
        width: 400,
        margin: 2
    });

    const qrCodeUrl = `/uploads/qr/${filename}`;

    await prisma.member.update({
        where: { id: memberId },
        data: { qrCodeUrl }
    });

    revalidatePath("/cms/members");
    revalidatePath(`/people/${slug}`);
    return qrCodeUrl;
}

export async function createMember(formData: FormData) {
    const name = formData.get("name") as string;
    
    // Auto-generate slug from name
    const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const photoFile = formData.get("photo") as File;
    let photo = null;
    if (photoFile && photoFile.size > 0) {
        photo = await uploadFile(photoFile, "members/photos");
    }

    const data = {
        name: formData.get("name") as string,
        slug: slug,
        bio: formData.get("bio") as string,
        email: formData.get("email") as string,
        instagram: formData.get("instagram") as string,
        facebook: formData.get("facebook") as string,
        linkedin: formData.get("linkedin") as string,
        website: formData.get("website") as string,
        teamId: formData.get("teamId") as string,
        positionId: formData.get("positionId") as string,
        photo: photo,
        isActive: true,
    };
    const member = await prisma.member.create({ data });
    await generateMemberQR(member.id, member.slug);
    
    revalidatePath("/cms/teams");
    revalidatePath(`/cms/teams/${formData.get("teamId")}`);
    revalidatePath("/");
    revalidatePath("/teams");
}

export async function updateMember(formData: FormData) {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    
    // Auto-generate slug from name
    const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const photoFile = formData.get("photo") as File;
    const updateData: any = {
        name: formData.get("name") as string,
        slug: slug,
        bio: formData.get("bio") as string,
        email: formData.get("email") as string,
        instagram: formData.get("instagram") as string,
        facebook: formData.get("facebook") as string,
        linkedin: formData.get("linkedin") as string,
        website: formData.get("website") as string,
        positionId: formData.get("positionId") as string,
    };

    if (photoFile && photoFile.size > 0) {
        updateData.photo = await uploadFile(photoFile, "members/photos");
    }

    const member = await prisma.member.update({ 
        where: { id }, 
        data: updateData 
    });

    // Re-generate QR if slug changed
    await generateMemberQR(member.id, member.slug);

    revalidatePath("/cms/teams");
    revalidatePath(`/cms/teams/${member.teamId}`);
    revalidatePath(`/people/${member.slug}`);
}

export async function deleteMember(formData: FormData | string) {
    const id = typeof formData === "string" ? formData : formData.get("id") as string;
    if (!id) return;

    const member = await prisma.member.findUnique({ where: { id } });
    if (!member) return;

    await prisma.member.delete({ where: { id } });
    
    revalidatePath("/cms/teams");
    revalidatePath(`/cms/teams/${member.teamId}`);
    revalidatePath("/");
    revalidatePath("/teams");
}

export async function toggleMemberStatusAction(memberId: string) {
    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member) throw new Error("Member not found");

    const updated = await prisma.member.update({
        where: { id: memberId },
        data: { isActive: !member.isActive }
    });

    revalidatePath("/cms/teams");
    revalidatePath(`/cms/teams/${updated.teamId}`);
    revalidatePath("/");
    revalidatePath("/teams");
    revalidatePath(`/people/${updated.slug}`);
    
    return updated;
}
