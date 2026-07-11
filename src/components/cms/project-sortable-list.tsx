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
} from "@dnd-kit/sortable";
import { ProjectCard } from "./project-card";
import { reorderProjects } from "@/actions/project";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Save, Search as SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectStatsCMS } from "./project-stats-cms";
import { Project } from "@prisma/client";

export function ProjectSortableList({ initialProjects }: { initialProjects: Project[] }) {
    const [projects, setProjects] = useState(initialProjects);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDirty, setIsDirty] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setProjects(initialProjects);
    }, [initialProjects]);

    const filteredProjects = projects.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setProjects((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                
                const newOrder = arrayMove(items, oldIndex, newIndex);
                setIsDirty(true);
                return newOrder;
            });
        }
    }

    const handleSaveOrder = async () => {
        setIsSaving(true);
        try {
            await reorderProjects(projects.map((p) => p.id));
            toast.success("Urutan berhasil disimpan!");
            setIsDirty(false);
        } catch (error) {
            toast.error("Gagal menyimpan urutan.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <ProjectStatsCMS 
                totalProjects={projects.length} 
                onSearch={setSearchQuery} 
            />

            <AnimatePresence>
                {isDirty && !searchQuery && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-end"
                    >
                        <Button 
                            onClick={handleSaveOrder} 
                            disabled={isSaving}
                            className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {isSaving ? "Menyimpan..." : "Simpan Urutan Proyek"}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {searchQuery && (
                <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest pl-2">
                    <SearchIcon className="w-3 h-3" />
                    Menampilkan hasil pencarian untuk: "{searchQuery}"
                </div>
            )}

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={filteredProjects.map((p) => p.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {filteredProjects.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-[3rem] bg-slate-50/50 dark:bg-zinc-900/20 text-center">
                    <SearchIcon className="w-12 h-12 text-slate-200 dark:text-zinc-800 mb-4" />
                    <p className="text-slate-400 dark:text-zinc-500 font-medium">
                        {searchQuery ? "Proyek tidak ditemukan." : "Belum ada proyek yang ditambahkan."}
                    </p>
                </div>
            )}
        </div>
    );
}
