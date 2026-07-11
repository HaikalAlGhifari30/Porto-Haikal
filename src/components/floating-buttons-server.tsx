import { getWhatsAppAdmins } from "@/actions/whatsapp-admin";
import { FloatingButtons } from "./floating-buttons";

export async function FloatingButtonsServer() {
    const admins = await getWhatsAppAdmins();
    return <FloatingButtons admins={admins} />;
}
