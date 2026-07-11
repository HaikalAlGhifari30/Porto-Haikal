"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export const ICONS = [
    "Briefcase", "Building", "Building2", "Users", "UserCheck", "BarChart", "BarChart2", 
    "BarChart3", "PieChart", "LineChart", "Globe", "Globe2", "Laptop", "Laptop2", 
    "Target", "Rocket", "Shield", "ShieldCheck", "Settings", "Settings2", "Wrench", 
    "Tool", "PenTool", "Hammer", "HardHat", "Truck", "Package", "Box", "Archive", 
    "Layers", "Database", "Server", "Cpu", "Monitor", "Smartphone", "Tablet", 
    "Headphones", "Camera", "Video", "Mic", "Music", "Play", "Pause", "StopCircle", 
    "Code", "Code2", "Terminal", "TerminalSquare", "FileCode", "FileCode2", "Coffee", 
    "CupSoda", "Utensils", "UtensilsCrossed", "Pizza", "Heart", "Star", "Award", 
    "Trophy", "Medal", "Crown", "Gem", "Lightbulb", "Zap", "Flame", "Droplet", 
    "Cloud", "CloudRain", "CloudSnow", "CloudLightning", "Sun", "Moon", "StarHalf", 
    "Book", "BookOpen", "Bookmark", "GraduationCap", "School", "Library", "Pencil", 
    "Pen", "Highlighter", "Brush", "Palette", "Scissors", "Clip", "Paperclip", 
    "Folder", "FolderOpen", "FolderClosed", "File", "FileText", "FileSpreadsheet", 
    "FileImage", "FileAudio", "FileVideo", "FileArchive", "Map", "MapPin", "Compass", 
    "Navigation", "Navigation2", "Car", "Bus", "Train", "Plane", "Ship", "Anchor", 
    "Bike", "ShoppingCart", "ShoppingBag", "ShoppingBasket", "CreditCard", "Wallet", 
    "Banknote", "Coins", "PiggyBank", "Receipt", "Ticket", "Tag", "Tags", "Store", 
    "Factory", "Warehouse", "Hospital", "Cross", "Stethoscope", "Syringe", "Pill", 
    "FlaskConical", "Microscope", "Dna", "Activity", "HeartPulse", "Thermometer", 
    "Droplets", "Wind", "Leaf", "Trees", "Flower", "Flower2", "Bug", "Bird", "Dog", 
    "Cat", "Fish", "Rabbit", "Turtle", "Snail", "BugPlay"
];

interface IconSelectorProps {
    value?: string | null;
    onChange: (value: string) => void;
    className?: string;
}

export function IconSelector({ value, onChange, className }: IconSelectorProps) {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const filteredIcons = ICONS.filter(icon => 
        icon.toLowerCase().includes(search.toLowerCase())
    );

    const SelectedIcon = value ? (Icons as any)[value] : null;

    return (
        <div className={cn("relative", className)}>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 cursor-pointer hover:border-blue-500/50 transition-all"
            >
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 flex items-center justify-center text-slate-700 dark:text-zinc-300 shadow-sm">
                    {SelectedIcon ? <SelectedIcon className="w-5 h-5" /> : <Icons.HelpCircle className="w-5 h-5 opacity-30" />}
                </div>
                <div className="flex-1 flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {value ? value : "Pilih Ikon"}
                    </span>
                    <span className="text-[10px] text-slate-500">
                        {value ? "Ikon aktif" : "Ikon akan tampil jika gambar kosong"}
                    </span>
                </div>
                <Icons.ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isOpen && "rotate-180")} />
            </div>

            {isOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full p-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl z-[60] animate-in fade-in zoom-in-95 duration-200">
                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Cari ikon..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>
                    
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
                        {filteredIcons.map(iconName => {
                            const IconComponent = (Icons as any)[iconName];
                            if (!IconComponent) return null;
                            
                            const isSelected = value === iconName;
                            
                            return (
                                <button
                                    key={iconName}
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onChange(iconName);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "aspect-square rounded-lg flex items-center justify-center transition-all hover:scale-110",
                                        isSelected 
                                            ? "bg-blue-500 text-white shadow-md shadow-blue-500/20" 
                                            : "bg-slate-50 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-700"
                                    )}
                                    title={iconName}
                                >
                                    <IconComponent className="w-5 h-5" />
                                </button>
                            );
                        })}
                        {filteredIcons.length === 0 && (
                            <div className="col-span-full py-4 text-center text-sm text-slate-500">
                                Ikon tidak ditemukan
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* Hidden overlay to close dropdown */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-50"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
