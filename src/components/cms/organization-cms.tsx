"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateTeamMemberOrder, createTeamMember, deleteTeamMember, updateTeamMember } from "@/actions/team-member";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Save, Search, GripVertical, Trash2, Edit2, Plus, Loader2, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface TeamMember {
    id: string;
    name: string;
    position: string;
    order: number;
}

// Sub-component for Sortable Item
function SortableMemberItem({ member, onEdit, onDelete }: { member: TeamMember, onEdit: (m: TeamMember) => void, onDelete: (id: string) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: member.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style}
            className={`flex items-center justify-between p-4 mb-3 rounded-xl border ${isDragging ? 'bg-blue-50/80 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-lg' : 'bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-sm'} transition-colors`}
        >
            <div className="flex items-center gap-4">
                <div 
                    {...attributes} 
                    {...listeners}
                    className="p-2 cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                    <GripVertical className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{member.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">{member.position}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(member)}>
                    <Edit2 className="w-4 h-4 text-blue-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(member.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>
        </div>
    );
}

export function OrganizationCms({ initialMembers }: { initialMembers: TeamMember[] }) {
    const [members, setMembers] = useState(initialMembers);
    const [isDirty, setIsDirty] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [formData, setFormData] = useState({ name: "", position: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setMembers(initialMembers);
    }, [initialMembers]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setMembers((items) => {
                const oldIndex = items.findIndex(i => i.id === active.id);
                const newIndex = items.findIndex(i => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
            setIsDirty(true);
        }
    };

    const handleSaveOrder = async () => {
        setIsSaving(true);
        try {
            const updates = members.map((m, index) => ({ id: m.id, order: index + 1 }));
            await updateTeamMemberOrder(updates);
            toast.success("Urutan berhasil disimpan");
            setIsDirty(false);
        } catch (error) {
            toast.error("Gagal menyimpan urutan");
        } finally {
            setIsSaving(false);
        }
    };

    const handleOpenAdd = () => {
        setEditingMember(null);
        setFormData({ name: "", position: "" });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (member: TeamMember) => {
        setEditingMember(member);
        setFormData({ name: member.name, position: member.position });
        setIsModalOpen(true);
    };

    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        const targetId = deleteId;
        setDeleteId(null);
        try {
            await deleteTeamMember(targetId);
            setMembers(members.filter(m => m.id !== targetId));
            toast.success("Anggota berhasil dihapus");
        } catch {
            toast.error("Gagal menghapus anggota");
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const fd = new FormData();
            fd.append("name", formData.name);
            fd.append("position", formData.position);
            
            if (editingMember) {
                await updateTeamMember(editingMember.id, fd);
                toast.success("Anggota berhasil diperbarui");
            } else {
                fd.append("order", (members.length + 1).toString());
                await createTeamMember(fd);
                toast.success("Anggota berhasil ditambahkan");
            }
            setIsModalOpen(false);
            
            // Reload the page to get fresh data is handled by revalidatePath in Server Action
            // But we can just rely on the server action redirecting/refreshing or router.refresh()
            // Using window.location.reload() for simplicity to sync state
            window.location.reload();
        } catch (error) {
            toast.error("Terjadi kesalahan saat menyimpan data");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Jabatan
                </Button>

                {isDirty && (
                    <Button 
                        onClick={handleSaveOrder} 
                        disabled={isSaving}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl animate-in fade-in"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Simpan Urutan
                    </Button>
                )}
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={members.map(m => m.id)} strategy={rectSortingStrategy}>
                    <div className="space-y-2">
                        {members.map((member) => (
                            <SortableMemberItem 
                                key={member.id} 
                                member={member} 
                                onEdit={handleOpenEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                        {members.length === 0 && (
                            <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl">
                                <p className="text-slate-500 dark:text-zinc-400">Belum ada anggota tim. Klik Tambah Jabatan untuk memulai.</p>
                            </div>
                        )}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Modal Form */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-slate-900 dark:text-white text-xl font-bold">
                            {editingMember ? "Edit Jabatan" : "Tambah Jabatan"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} className="space-y-6 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input 
                                id="name" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Contoh: Budi Santoso"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="position">Posisi / Jabatan</Label>
                            <Input 
                                id="position" 
                                value={formData.position}
                                onChange={(e) => setFormData({...formData, position: e.target.value})}
                                placeholder="Contoh: Direktur Utama"
                                required
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
                                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent className="sm:max-w-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-zinc-800 rounded-[3rem] p-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-[2rem] bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-8 text-red-500 border-2 border-red-500/20 shadow-xl shadow-red-500/5">
                        <AlertTriangle className="w-12 h-12" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white mb-3">Hapus Anggota?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mb-10 leading-relaxed font-medium">
                        Apakah Anda yakin ingin menghapus anggota ini? Tindakan ini permanen.
                    </p>
                    <div className="flex w-full gap-4">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-14 rounded-2xl border-slate-200 dark:border-zinc-800 font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all"
                            onClick={() => setDeleteId(null)}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-14 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest shadow-xl shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-1 transition-all"
                            onClick={confirmDelete}
                        >
                            Hapus
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
