import { getSettings } from "@/actions/settings";
import { getProjects } from "@/actions/project";
import { getCertificates } from "@/actions/certificate";
import { prisma } from "@/lib/db";
import { PortfolioSceneContainer } from "@/components/portfolio-scene-container";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
    const [settings, projects, skills, experiences, educations, organizations, certificates] = await Promise.all([
        getSettings(),
        getProjects(),
        prisma.skill.findMany({ orderBy: { order: "asc" } }),
        prisma.experience.findMany({ orderBy: { order: "asc" } }),
        prisma.education.findMany({ orderBy: { order: "asc" } }),
        prisma.organization.findMany({ orderBy: { order: "asc" } }),
        getCertificates(),
    ]);

    const visibleProjects = projects.filter(p => p.isVisible);

    return (
        <PortfolioSceneContainer
            settings={settings}
            projects={visibleProjects as any}
            skills={skills as any}
            experiences={experiences as any}
            educations={educations as any}
            organizations={organizations as any}
            certificates={certificates as any}
        />
    );
}