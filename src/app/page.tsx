import { getSettings } from "@/actions/settings";
import { getProjects } from "@/actions/project";
import { prisma } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSectionClient } from "@/components/sections/about-section-client";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { EducationSection } from "@/components/sections/education-section";
import { OrganizationsSection } from "@/components/sections/organizations-section";
import { ContactSection } from "@/components/sections/contact-section";
import { AnimatedBackground } from "@/components/ui/animated-background";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
    const [settings, projects, skills, experiences, educations, organizations] = await Promise.all([
        getSettings(),
        getProjects(),
        prisma.skill.findMany({ orderBy: { order: "asc" } }),
        prisma.experience.findMany({ orderBy: { order: "asc" } }),
        prisma.education.findMany({ orderBy: { order: "asc" } }),
        prisma.organization.findMany({ orderBy: { order: "asc" } }),
    ]);

    const visibleProjects = projects.filter(p => p.isVisible);

    return (
        <div className="bg-[#030712] text-white min-h-screen w-full flex flex-col transition-colors duration-300 relative overflow-x-hidden">
            {/* Animated Cosmic Starfield Background (Like Yofi's Portfolio) */}
            <AnimatedBackground />

            {/* Main Interactive Interface Layer */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-1">
                    {/* Hero Section */}
                    <HeroSection settings={settings} />

                    {/* About Section */}
                    <AboutSectionClient settings={settings} />

                    {/* Skills Section */}
                    <SkillsSection skills={skills as any} />

                    {/* Experience Section */}
                    <ExperienceSection experiences={experiences as any} />

                    {/* Projects Showcase Section */}
                    <ProjectsSection projects={visibleProjects as any} />

                    {/* Education Section */}
                    <EducationSection educations={educations as any} />

                    {/* Organizations Section */}
                    <OrganizationsSection organizations={organizations as any} />

                    {/* Contact Section */}
                    <ContactSection settings={settings} />
                </main>

                <Footer />
            </div>
        </div>
    );
}