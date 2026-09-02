import { getSettings } from "@/actions/settings";
import { AboutSectionClient } from "./about-section-client";

export async function AboutSection() {
    const settings = await getSettings();
    return <AboutSectionClient settings={settings} />;
}
