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
            className={`flex items-center justify-between p-4 mb-3 rounded-none border-2 border-black dark:border-white ${isDragging ? 'bg-[#FACC15]/20 shadow-retro-sm' : 'bg-[#FAF6ED] dark:bg-[#151B22] shadow-retro-xs'} transition-all`}
        >
            <div className="flex items-center gap-4">
                <div 
                    {...attributes} 
                    {...listeners}
                    className="p-2 cursor-grab active:cursor-grabbing text-slate-500 hover:text-black dark:hover:text-white transition-colors"
                >
                    <GripVertical className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-black text-slate-900 dark:text-white uppercase">{member.name}</h4>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 font-bold">{member.position}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(member)} className="w-8 h-8 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#FACC15] dark:hover:bg-[#FACC15] hover:text-black shadow-retro-xs">
                    <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(member.id)} className="w-8 h-8 rounded-none bg-red-500 border-2 border-black dark:border-white text-white hover:bg-red-600 shadow-retro-xs">
                    <Trash2 className="w-4 h-4" />
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
                <Button onClick={handleOpenAdd} className="bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white rounded-none font-black uppercase text-xs h-11 px-6 shadow-retro-xs">
                    <Plus className="w-4 h-4 mr-2 stroke-[3]" />
                    Tambah Jabatan
                </Button>

                {isDirty && (
                    <Button 
                        onClick={handleSaveOrder} 
                        disabled={isSaving}
                        className="bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-none font-black uppercase text-xs h-11 px-6 shadow-retro-xs animate-in fade-in"
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
                            <div className="p-12 text-center border-2 border-dashed border-black dark:border-white rounded-none bg-[#FAF6ED] dark:bg-[#151B22]">
                                <p className="text-slate-600 dark:text-zinc-300 font-bold">Belum ada anggota tim. Klik Tambah Jabatan untuk memulai.</p>
                            </div>
                        )}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Modal Form */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px] bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none shadow-retro-md p-6">
                    <DialogHeader>
                        <DialogTitle className="text-slate-900 dark:text-white text-xl font-black uppercase">
                            {editingMember ? "Edit Jabatan" : "Tambah Jabatan"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} className="space-y-6 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-black uppercase">Nama Lengkap</Label>
                            <Input 
                                id="name" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Contoh: Haikal Al Ghifari"
                                required
                                className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none font-bold text-sm h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="position" className="text-xs font-black uppercase">Posisi / Jabatan</Label>
                            <Input 
                                id="position" 
                                value={formData.position}
                                onChange={(e) => setFormData({...formData, position: e.target.value})}
                                placeholder="Contoh: QA Lead Specialist"
                                required
                                className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none font-bold text-sm h-11"
                            />
                        </div>
                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-none border-2 border-black dark:border-white font-black uppercase">
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white rounded-none font-black uppercase shadow-retro-xs">
                                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent className="sm:max-w-sm bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-8 flex flex-col items-center text-center shadow-retro-md">
                    <div className="w-16 h-16 rounded-none bg-red-500 flex items-center justify-center mb-6 text-white border-2 border-black dark:border-white shadow-retro-xs">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">Hapus Anggota?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-600 dark:text-zinc-300 mb-6 font-bold">
                        Apakah Anda yakin ingin menghapus anggota ini? Tindakan ini permanen.
                    </p>
                    <div className="flex w-full gap-3">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-11 rounded-none border-2 border-black dark:border-white font-black uppercase hover:bg-slate-200 dark:hover:bg-zinc-800"
                            onClick={() => setDeleteId(null)}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-11 rounded-none bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider border-2 border-black dark:border-white shadow-retro-xs"
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
