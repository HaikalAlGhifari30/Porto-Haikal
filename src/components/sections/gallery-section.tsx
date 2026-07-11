import { getGalleryItems } from "@/actions/gallery";
import { GallerySectionClient } from "./gallery-section-client";

export async function GallerySection() {
    const items = await getGalleryItems();
    
    const visibleItems = items.filter(item => item.isVisible);

    return <GallerySectionClient items={visibleItems} />;
}
