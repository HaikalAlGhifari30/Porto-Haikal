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
      <div className="flex flex-wrap justify-between items-center pb-4 border-b border-slate-200 dark:border-zinc-800 gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            Pesan Masuk (Inbox)
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500 text-white text-xs font-extrabold shadow-sm animate-pulse">
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
          <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl">
            <Mail className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-50" />
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
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                  msg.isRead
                    ? "bg-white dark:bg-[#070e20]/60 border-slate-200 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700 opacity-90"
                    : "bg-cyan-500/5 dark:bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-400 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.isRead ? "bg-slate-100 dark:bg-zinc-800 text-slate-500" : "bg-cyan-500 text-white shadow-md"
                  }`}>
                    {msg.isRead ? <MailOpen className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">{msg.name}</h4>
                      <span className="text-xs font-medium text-cyan-500 dark:text-cyan-400 font-mono">({msg.email})</span>
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500 text-white uppercase tracking-wider">
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
                    <Clock className="w-3 h-3" /> {dateStr}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingId(msg.id);
                    }}
                    className="rounded-xl h-8 px-3 text-xs"
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
        <DialogContent className="sm:max-w-[550px] bg-white dark:bg-[#070e20] border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6">
          {selectedMessage && (
            <>
              <DialogHeader className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedMessage.subject || "Pesan Kontak Umum"}
                  </DialogTitle>
                  <span className="text-xs text-slate-400 font-mono">
                    {new Date(selectedMessage.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" /> {selectedMessage.name}
                  </p>
                  <p className="text-xs text-cyan-400 font-mono flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> {selectedMessage.email}
                  </p>
                </div>
              </DialogHeader>

              <div className="py-4">
                <Label className="text-xs font-bold uppercase text-slate-400">Isi Pesan:</Label>
                <div className="mt-2 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 text-sm text-slate-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              <DialogFooter className="flex flex-wrap gap-2 justify-between items-center pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Balasan Portofolio QA')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Balas via Email
                </a>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedMessage(null)} className="rounded-xl text-xs">
                    Tutup
                  </Button>
                  <Button variant="destructive" onClick={() => setDeletingId(selectedMessage.id)} className="rounded-xl text-xs font-bold">
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
        <DialogContent className="sm:max-w-[400px] bg-white dark:bg-[#070e20] border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600">Hapus Pesan</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-600 dark:text-zinc-300 py-2">Apakah Anda yakin ingin menghapus pesan ini?</p>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setDeletingId(null)} disabled={isProcessing} className="rounded-xl">Batal</Button>
            <Button variant="destructive" onClick={() => deletingId && handleDelete(deletingId)} disabled={isProcessing} className="rounded-xl font-bold">
              {isProcessing ? "Menghapus..." : "Hapus Pesan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
