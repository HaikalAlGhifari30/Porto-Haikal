import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { MemberProfileView } from "@/components/member-profile-view";

export default async function MemberProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const member = await prisma.member.findUnique({
        where: { slug: slug },
        include: {
            team: true,
            position: true
        }
    });

    if (!member || !member.isActive) {
        notFound();
    }

    return <MemberProfileView member={member} />;
}
