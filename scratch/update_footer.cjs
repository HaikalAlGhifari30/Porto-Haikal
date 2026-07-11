const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const settings = await prisma.settings.findFirst();
    if (settings) {
        await prisma.settings.update({
            where: { id: settings.id },
            data: {
                footerAbout: "PT RIZKY RIJAYA KARYA didirikan pada 5 September 2023 dengan cita-cita melayani masyarakat melalui jalur ekonomi multi bisnis. Perusahaan kami berfokus pada bidang perdagangan umum, industri, dan jasa untuk memenuhi kebutuhan pemerintah, swasta, dan masyarakat.",
                address: "Adiwikarta No. 7 Bandung",
                phone: "+6281229999909",
                email: "rizkyrijayakarya@gmail.com",
                instagram: "",
                linkedin: ""
            }
        });
        console.log("Footer settings updated successfully!");
    } else {
        console.log("Settings not found!");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
