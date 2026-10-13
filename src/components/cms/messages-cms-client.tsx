"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { markMessageAsRead, deleteContactMessage } from "@/actions/contact";
import { toast } from "sonner";
import { Mail, MailOpen, Trash2, Calendar, User, Clock, CheckCircle2, MessageSquare, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface MessagesCmsClientProps {
  initialItems: any[];
}

export function MessagesCmsClient({ initialItems }: MessagesCmsClientProps) {
  const [items, setItems] = useState(initialItems);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpenMessage = async (msg: any) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      try {
        await markMessageAsRead(msg.id);
        setItems(items.map((i) => (i.id === msg.id ? { ...i, isRead: true } : i)));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (id: string) => {
    setIsProcessing(true);
    try {
      await deleteContactMessage(id);
      setItems(items.filter((i) => i.id !== id));
      toast.success("Pesan berhasil dihapus!");
      setDeletingId(null);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus pesan");
    } finally {
      setIsProcessing(false);
    }
  };

  const unreadCount = items.filter((i) => !i.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap justify-between items-center pb-4 border-b-2 border-black dark:border-white gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            Pesan Masuk (Inbox)
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-none bg-[#FACC15] text-black text-xs font-black border-2 border-black dark:border-white shadow-retro-xs">
                {unreadCount} Pesan Baru
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Seluruh pesan dan formulir pertanyaan publik yang dikirim pengunjung melalui seksi Hubungi Saya di Landing Page.
          </p>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-black dark:border-white rounded-2xl bg-[#FAF6ED] dark:bg-[#151B22]">
            <Mail className="w-12 h-12 mx-auto text-amber-500 dark:text-[#FACC15] mb-3 opacity-50" />
            <p className="text-sm font-bold text-slate-600 dark:text-zinc-400">Belum ada pesan yang masuk.</p>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
              Saat pengunjung mengirimkan pesan melalui form &quot;Hubungi Saya&quot; di Landing Page, pesan akan langsung muncul di sini.
            </p>
          </div>
        ) : (
          items.map((msg) => {
            const dateStr = new Date(msg.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={msg.id}
                onClick={() => handleOpenMessage(msg)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                  msg.isRead
                    ? "bg-white dark:bg-[#0E1217] border-black/40 dark:border-white/40 hover:border-black dark:hover:border-white opacity-80 hover:opacity-100"
                    : "bg-[#FAF6ED] dark:bg-[#151B22] border-black dark:border-white shadow-retro-xs hover:shadow-retro-sm"
                }`}
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-none border-2 border-black flex items-center justify-center shrink-0 shadow-retro-xs ${
                    msg.isRead ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400" : "bg-[#FACC15] text-black"
                  }`}>
                    {msg.isRead ? <MailOpen className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">{msg.name}</h4>
                      <span className="text-xs font-bold text-amber-600 dark:text-[#FACC15] font-mono">({msg.email})</span>
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 text-[9px] font-black rounded-none bg-[#FACC15] text-black border border-black uppercase tracking-wider">
                          Baru
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-700 dark:text-zinc-300 truncate">
                      {msg.subject || "Pesan Kontak Umum"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1">
                      {msg.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <span className="text-[11px] text-slate-400 dark:text-zinc-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500 dark:text-[#FACC15]" /> {dateStr}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingId(msg.id);
                    }}
                    className="rounded-none border-2 border-black h-8 px-3 text-xs shadow-retro-xs btn-retro"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-[550px] bg-white dark:bg-[#151B22] border-2 border-black dark:border-white rounded-2xl p-6 shadow-retro-md">
          {selectedMessage && (
            <>
              <DialogHeader className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <DialogTitle className="text-xl font-black text-slate-900 dark:text-white uppercase">
                    {selectedMessage.subject || "Pesan Kontak Umum"}
                  </DialogTitle>
                  <span className="text-xs text-slate-400 font-mono">
                    {new Date(selectedMessage.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white space-y-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-500 dark:text-[#FACC15]" /> {selectedMessage.name}
                  </p>
                  <p className="text-xs text-amber-600 dark:text-[#FACC15] font-mono flex items-center gap-1.5 font-bold">
                    <Mail className="w-3.5 h-3.5" /> {selectedMessage.email}
                  </p>
                </div>
              </DialogHeader>

              <div className="py-4">
                <Label className="text-xs font-black uppercase text-slate-600 dark:text-zinc-300">Isi Pesan:</Label>
                <div className="mt-2 p-4 rounded-xl bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white text-sm text-slate-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed font-mono">
                  {selectedMessage.message}
                </div>
              </div>

              <DialogFooter className="flex flex-wrap gap-2 justify-between items-center pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Balasan Portofolio QA')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black font-black text-xs border-2 border-black dark:border-white shadow-retro-xs btn-retro"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Balas via Email
                </a>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedMessage(null)} className="rounded-none border-2 border-black dark:border-white text-xs font-bold btn-retro">
                    Tutup
                  </Button>
                  <Button variant="destructive" onClick={() => setDeletingId(selectedMessage.id)} className="rounded-none border-2 border-black text-xs font-bold shadow-retro-xs btn-retro">
                    Hapus
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <DialogContent className="sm:max-w-[400px] bg-white dark:bg-[#151B22] border-2 border-black dark:border-white rounded-2xl p-6 shadow-retro-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-red-600 uppercase">Hapus Pesan</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-600 dark:text-zinc-300 py-2">Apakah Anda yakin ingin menghapus pesan ini?</p>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setDeletingId(null)} disabled={isProcessing} className="rounded-none border-2 border-black dark:border-white btn-retro">Batal</Button>
            <Button variant="destructive" onClick={() => deletingId && handleDelete(deletingId)} disabled={isProcessing} className="rounded-none border-2 border-black font-bold shadow-retro-xs btn-retro">
              {isProcessing ? "Menghapus..." : "Hapus Pesan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
