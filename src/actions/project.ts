"use server";

import { prisma } from "@/lib/db";
import ogs from "open-graph-scraper";
import { revalidatePath } from "next/cache";

export async function fetchOgData(url: string) {
    try {
        const { result } = await ogs({ url });
        return {
            title: result.ogTitle || result.twitterTitle || "",
            description: result.ogDescription || result.twitterDescription || "",
            imageUrl: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || "",
        };
    } catch (e) {
        console.error("Failed to fetch OG data", e);
        return { title: "", description: "", imageUrl: "" };
    }
}

export async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { order: "asc" }
    });
}

export async function createProject(formData: FormData) {
    const url = formData.get("url") as string;
    let title = formData.get("title") as string;
    let description = "";
    let imageUrl = "";

    if (url) {
        const ogData = await fetchOgData(url);
        if (!title) title = ogData.title;
        description = ogData.description;
        imageUrl = ogData.imageUrl;
    }

    // Get max order
    const maxOrder = await prisma.project.aggregate({
        _max: { order: true }
    });

    const project = await prisma.project.create({
        data: {
            title: title || "Untitled Project",
            url,
            description,
            imageUrl,
            order: (maxOrder._max.order ?? -1) + 1,
        }
    });

    revalidatePath("/cms/projects");
    revalidatePath("/");
    revalidatePath("/projects");
}

export async function updateProject(id: string, data: any) {
    await prisma.project.update({
        where: { id },
        data
    });
    revalidatePath("/cms/projects");
    revalidatePath("/");
    revalidatePath("/projects");
}

export async function deleteProject(id: string) {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/cms/projects");
    revalidatePath("/");
    revalidatePath("/projects");
}

export async function reorderProjects(ids: string[]) {
    const transactions = ids.map((id, index) => 
        prisma.project.update({
            where: { id },
            data: { order: index }
        })
    );

    await prisma.$transaction(transactions);
    
    revalidatePath("/cms/projects");
    revalidatePath("/");
    revalidatePath("/projects");
}
