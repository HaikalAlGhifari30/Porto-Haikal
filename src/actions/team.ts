"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getTeams() {
    return await prisma.team.findMany({
        include: {
            positions: {
                orderBy: { hierarchyLevel: "asc" }
            },
            members: true
        },
        orderBy: { createdAt: "asc" }
    });
}

export async function getTeamById(id: string) {
    return await prisma.team.findUnique({
        where: { id },
        include: {
            positions: {
                orderBy: { hierarchyLevel: "asc" },
                include: { members: true }
            },
            members: {
                include: { position: true }
            }
        }
    });
}

import { uploadFile } from "@/lib/upload";

export async function createTeam(formData: FormData) {
    const name = formData.get("name") as string;
    const nameEn = (formData.get("nameEn") as string) || null;
    const description = formData.get("description") as string;
    const descriptionEn = (formData.get("descriptionEn") as string) || null;
    const icon = (formData.get("icon") as string) || null;
    const coverFile = formData.get("coverImage") as File;
    const logoFile = formData.get("logoUrl") as File;
    
    // Auto-generate slug from name
    const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    let coverImage = null;
    if (coverFile && coverFile.size > 0) {
        coverImage = await uploadFile(coverFile, "teams/covers");
        console.log("Uploaded Cover:", coverImage);
    }

    let logoUrl = null;
    if (logoFile && logoFile.size > 0) {
        logoUrl = await uploadFile(logoFile, "teams/logos");
        console.log("Uploaded Logo:", logoUrl);
    }

    await prisma.team.create({ 
        data: { 
            name, 
            nameEn,
            slug, 
            description,
            descriptionEn,
            icon,
            coverImage,
            logoUrl
        } 
    });

    revalidatePath("/cms/teams");
    revalidatePath("/");
    revalidatePath("/teams");
}

export async function updateTeamAction(formData: FormData) {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const nameEn = (formData.get("nameEn") as string) || null;
    const description = formData.get("description") as string;
    const descriptionEn = (formData.get("descriptionEn") as string) || null;
    const icon = (formData.get("icon") as string) || null;
    const coverFile = formData.get("coverImage") as File;
    const logoFile = formData.get("logoUrl") as File;
    
    // Auto-generate slug from name
    const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const updateData: any = { name, nameEn, slug, description, descriptionEn, icon };

    if (coverFile && coverFile.size > 0) {
        updateData.coverImage = await uploadFile(coverFile, "teams/covers");
        console.log("Updated Cover:", updateData.coverImage);
    }

    if (logoFile && logoFile.size > 0) {
        updateData.logoUrl = await uploadFile(logoFile, "teams/logos");
        console.log("Updated Logo:", updateData.logoUrl);
    }

    await prisma.team.update({ 
        where: { id },
        data: updateData
    });

    revalidatePath("/cms/teams");
    revalidatePath("/");
    revalidatePath("/teams");
    revalidatePath(`/teams/${slug}`);
}

export async function deleteTeam(formData: FormData | string) {
    const id = typeof formData === "string" ? formData : formData.get("id") as string;
    if (!id) return;

    await prisma.team.delete({ where: { id } });
    revalidatePath("/cms/teams");
    revalidatePath("/");
    revalidatePath("/teams");
}

export async function createPosition(formData: FormData) {
    const name = formData.get("name") as string;
    const hierarchyLevel = parseInt(formData.get("hierarchyLevel") as string, 10);
    const teamId = formData.get("teamId") as string;
    await prisma.position.create({ data: { name, hierarchyLevel, teamId } });
    revalidatePath("/cms/teams");
}

export async function updatePositionAction(formData: FormData) {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const hierarchyLevel = parseInt(formData.get("hierarchyLevel") as string, 10);
    const teamId = formData.get("teamId") as string;
    
    await prisma.position.update({ 
        where: { id }, 
        data: { name, hierarchyLevel } 
    });
    
    revalidatePath(`/cms/teams/${teamId}`);
    revalidatePath("/cms/teams");
}

export async function deletePosition(formData: FormData | string) {
    const id = typeof formData === "string" ? formData : formData.get("id") as string;
    if (!id) return;

    await prisma.position.delete({ where: { id } });
    revalidatePath("/cms/teams");
}
