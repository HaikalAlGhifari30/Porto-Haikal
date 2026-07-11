import { getBusinessSectors } from "@/actions/business-sector";
import { BusinessSectorsClient } from "@/components/cms/business-sectors-client";
import { Lightbulb } from "lucide-react";

export default async function BusinessSectorsPage() {
    const sectors = await getBusinessSectors();

    return (
        <div className="space-y-6">
            <BusinessSectorsClient initialSectors={sectors as any} />
        </div>
    );
}
