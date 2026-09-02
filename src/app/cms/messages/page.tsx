import { getContactMessages } from "@/actions/contact";
import { MessagesCmsClient } from "@/components/cms/messages-cms-client";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Pesan Masuk | CMS",
};

export default async function MessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-cyan-400" />
            Pesan Masuk (Contact Messages)
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 font-medium">
            Kotak masuk formulir kontak publik & pertanyaan pengunjung dari Landing Page.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-4">
        <div className="flex-1 flex items-center gap-4 p-5 rounded-[1.5rem] bg-cyan-500/[0.04] border border-cyan-500/20">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <p className="text-[11px] md:text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
            <span className="font-bold text-cyan-400 mr-1 uppercase tracking-widest">Informasi:</span>
            Ketika pengunjung mengisi formulir pada seksi <strong className="text-slate-900 dark:text-slate-200">Hubungi Saya (Contact)</strong> di Landing Page, rincian pesan (Nama, Email, dan Isi Pesan) akan langsung tersimpan dan dapat Anda baca di halaman ini.
          </p>
        </div>
      </div>

      <Card className="bg-white dark:bg-[#070e20]/90 border-slate-200 dark:border-cyan-500/20 rounded-3xl overflow-hidden shadow-sm">
        <CardContent className="p-6">
          <MessagesCmsClient initialItems={messages} />
        </CardContent>
      </Card>
    </div>
  );
}
