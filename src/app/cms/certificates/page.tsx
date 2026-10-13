import { getCertificates } from "@/actions/certificate";
import { CertificatesCmsClient } from "@/components/cms/certificates-cms-client";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Award } from "lucide-react";

export const metadata = {
  title: "Sertifikasi & Lisensi | CMS",
};

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-500 dark:text-[#FACC15]" />
            Sertifikasi & Lisensi (Certificates)
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 font-medium">
            Kelola sertifikasi profesi (BNSP, Cisco, dll), pelatihan, dan lisensi kompetensi Anda.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-4">
        <div className="flex-1 flex items-center gap-4 p-5 rounded-2xl bg-yellow-400/10 border-2 border-black dark:border-white shadow-retro-xs">
          <div className="p-2.5 bg-[#FACC15] text-black border border-black shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <p className="text-[11px] md:text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
            <span className="font-bold text-amber-600 dark:text-[#FACC15] mr-1 uppercase tracking-widest">Panduan:</span>
            Perubahan data sertifikasi di sini akan langsung diperbarui pada seksi <strong className="text-slate-900 dark:text-slate-200">Sertifikasi & Lisensi (Certificates)</strong> di Landing Page.
          </p>
        </div>
      </div>

      <Card className="bg-white dark:bg-[#151B22] border-2 border-black dark:border-white rounded-2xl overflow-hidden shadow-retro-sm">
        <CardContent className="p-6">
          <CertificatesCmsClient initialItems={certificates} />
        </CardContent>
      </Card>
    </div>
  );
}
