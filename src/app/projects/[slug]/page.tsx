import { getProjectBySlug } from "@/actions/project";
import { getSettings } from "@/actions/settings";
import { ProjectDetailClient } from "./project-detail-client";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    getSettings()
  ]);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} settings={settings} />;
}
