import { getBusinessSectors } from "@/actions/business-sector";
import { BusinessSectorSectionClient } from "./business-sector-section-client";

export async function BusinessSectorSection() {
    const sectors = await getBusinessSectors();
    const activeSectors = sectors.filter((s: any) => s.isActive);

    if (activeSectors.length === 0) return null;

    return <BusinessSectorSectionClient sectors={activeSectors as any} />;
}
