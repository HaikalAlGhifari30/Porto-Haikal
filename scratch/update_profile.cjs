const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const settings = await prisma.settings.findFirst();
    
    const defaultCoreValues = [
        { title: "Integritas", description: "Bertindak jujur dan dapat dipercaya dalam setiap kesepakatan bisnis." },
        { title: "Kompeten", description: "Bekerja dengan ahli dan profesional di bidangnya." },
        { title: "Inovatif", description: "Terus berinovasi untuk memberikan solusi terbaik bagi konsumen." },
        { title: "Kolaboratif", description: "Membangun kerja sama yang kuat dengan seluruh pemangku kepentingan." }
    ];

    if (settings) {
        await prisma.settings.update({
            where: { id: settings.id },
            data: {
                aboutText: settings.aboutText || "PT Rizky Rijaya Karya adalah perusahaan dibawah hukum negara kesatuan republik Indonesia yang didirikan secara resmi pada 05 september 2023 yang bergerak di bidang Perdagangan, Industri dan Jasa.",
                visionText: settings.visionText || "Menjadi Perusahaan berskala Nasional yang mampu melayani Kebutuhan Publik secara professional yang bertumpu pada Nilai Integritas, Kepuasan pelanggan, dan Sumber Daya Manusia.",
                missionText: settings.missionText || "Menyediakan Barang dan Jasa dengan Harga kompetitif sesuai standar yang ditetapkan\nMemberikan Pelayanan Prima dan Solusi yang bernilai tambah kepada seluruh Konsumen.\nMenciptakan kondisi terbaik sebagai tempat kebanggaan untuk berkarya dan berprestasi.",
                coreValues: settings.coreValues || defaultCoreValues
            }
        });
        console.log("Company profile settings injected successfully!");
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
