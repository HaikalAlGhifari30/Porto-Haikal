import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useState, useEffect } from 'react';

type Language = 'id' | 'en';

interface LangState {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string) => string;
}

// Simple dictionary for static texts
const dictionary: Record<Language, Record<string, string>> = {
    id: {
        'nav.home': 'Beranda',
        'nav.about': 'Tentang Kami',
        'nav.organization': 'Organisasi',
        'nav.projects': 'Proyek',
        'nav.gallery': 'Galeri',
        'nav.divisions': 'Divisi',
        'nav.login': 'Masuk',
        'nav.dashboard': 'Dasbor',
        
        'hero.viewProjects': 'Lihat Proyek',
        'hero.contactUs': 'Hubungi Kami',
        'hero.badge': 'Inovasi & Kualitas',

        'auth.loginTitle': 'Selamat Datang Kembali',
        'auth.loginSubtitle': 'Silakan masuk ke akun Anda',
        'auth.email': 'Alamat Email',
        'auth.password': 'Kata Sandi',
        'auth.loginBtn': 'Masuk',
        'auth.backHome': 'Kembali ke Beranda',
        
        'section.about': 'Profil Perusahaan',
        'section.about.desc': 'Mengenal lebih dekat visi, misi, dan nilai-nilai yang menjadi landasan utama PT Rizky Rijaya Karya dalam setiap pelayanannya.',
        
        'section.org': 'Struktur Organisasi',
        
        'about.tab.about': 'Tentang Perusahaan',
        'about.tab.vision': 'Visi & Misi',
        'about.whoWeAre': 'Siapa Kami',
        'about.vision': 'Visi Kami',
        'about.mission': 'Misi Kami',
        'about.coreValues': 'Nilai-Nilai Perusahaan',
        
        'section.projects': 'Proyek Kami',
        'section.projects.subtitle': 'Portofolio',
        'section.projects.desc': 'Koleksi proyek terbaik kami dalam kolaborasi dan transformasi identitas digital.',
        
        'section.teams': 'Divisi Kami',
        'section.teams.subtitle': 'Tim Kami',
        'section.teams.desc': 'Kenali tim-tim spesialis yang menggerakkan keunggulan di setiap aspek ekosistem PT Rizky Rijaya Karya.',
        
        'section.sectors': 'Bidang Usaha',
        'section.sectors.subtitle': 'Fokus Bisnis',
        'section.sectors.desc': 'Bidang-bidang usaha unggulan yang kami tekuni untuk melayani kebutuhan klien secara profesional dan terpercaya.',
        
        'section.gallery': 'Galeri Proyek',
        'section.gallery.title1': 'Dokumentasi Karya ',
        'section.gallery.title2': 'Terbaik',
        'section.gallery.title3': ' Kami',
        'section.gallery.desc': 'Jelajahi momen-momen penting dan hasil eksekusi dari berbagai proyek unggulan yang telah kami selesaikan.',
        'gallery.empty': 'Belum ada foto',
        'gallery.emptyDesc': 'Dokumentasi proyek akan segera ditambahkan di sini.',
        
        'footer.company': 'Perusahaan',
        'footer.services': 'Layanan',
        'footer.contact': 'Hubungi Kami',
        'footer.terms': 'Syarat & Ketentuan',
        'footer.privacy': 'Kebijakan Privasi',
        'footer.copyright': 'Hak Cipta Dilindungi Undang-Undang.',
        
        'chat.title': 'Hubungi Kami',
        'chat.desc': 'Silakan pilih layanan admin yang ingin Anda hubungi:',
        'chat.noAdmin': 'Belum ada admin yang aktif.',
        'chat.tooltip': 'Chat dengan kami',

        'legal.close': 'Tutup',
        'legal.terms.title': 'Syarat & Ketentuan',
        'legal.privacy.title': 'Kebijakan Privasi',
        'team.back': 'Kembali ke Divisi',
        'team.members': 'Anggota',
        'team.empty': 'Belum ada anggota di divisi ini.',
        'team.noDesc': 'Divisi ini belum memiliki deskripsi.',
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.organization': 'Organization',
        'nav.projects': 'Projects',
        'nav.gallery': 'Gallery',
        'nav.divisions': 'Divisions',
        'nav.login': 'Login',
        'nav.dashboard': 'Dashboard',
        
        'hero.viewProjects': 'View Projects',
        'hero.contactUs': 'Contact Us',
        'hero.badge': 'Innovation & Quality',

        'auth.loginTitle': 'Welcome Back',
        'auth.loginSubtitle': 'Please sign in to your account',
        'auth.email': 'Email Address',
        'auth.password': 'Password',
        'auth.loginBtn': 'Sign In',
        'auth.backHome': 'Back to Home',
        
        'section.about': 'Company Profile',
        'section.about.desc': 'Get to know the vision, mission, and core values that serve as the main foundation of PT Rizky Rijaya Karya in every service.',
        
        'section.org': 'Organizational Structure',
        
        'about.tab.about': 'About Company',
        'about.tab.vision': 'Vision & Mission',
        'about.whoWeAre': 'Who We Are',
        'about.vision': 'Our Vision',
        'about.mission': 'Our Mission',
        'about.coreValues': 'Company Values',
        
        'section.projects': 'Our Projects',
        'section.projects.subtitle': 'Portfolio',
        'section.projects.desc': 'A collection of our best projects in collaboration and digital identity transformation.',
        
        'section.teams': 'Our Divisions',
        'section.teams.subtitle': 'Our Teams',
        'section.teams.desc': 'Meet the specialized teams that drive excellence in every aspect of the PT Rizky Rijaya Karya ecosystem.',
        
        'section.sectors': 'Business Sectors',
        'section.sectors.subtitle': 'Our Focus',
        'section.sectors.desc': 'Our core business sectors that we excel in to serve client needs professionally and reliably.',
        
        'section.gallery': 'Project Gallery',
        'section.gallery.title1': 'Our ',
        'section.gallery.title2': 'Best',
        'section.gallery.title3': ' Documentation',
        'section.gallery.desc': 'Explore the important moments and execution results of various flagship projects we have completed.',
        'gallery.empty': 'No photos yet',
        'gallery.emptyDesc': 'Project documentation will be added here soon.',
        
        'footer.company': 'Company',
        'footer.services': 'Services',
        'footer.contact': 'Contact Us',
        'footer.terms': 'Terms & Conditions',
        'footer.privacy': 'Privacy Policy',
        'footer.copyright': 'All Rights Reserved.',
        
        'chat.title': 'Contact Us',
        'chat.desc': 'Please select the admin service you wish to contact:',
        'chat.noAdmin': 'No active admins available.',
        'chat.tooltip': 'Chat with us',

        'legal.close': 'Close',
        'legal.terms.title': 'Terms & Conditions',
        'legal.privacy.title': 'Privacy Policy',
        'team.back': 'Back to Divisions',
        'team.members': 'Members',
        'team.empty': 'No members in this division yet.',
        'team.noDesc': 'This division has no description yet.',
    }
};

export const useLang = create<LangState>()(
    persist(
        (set, get) => ({
            lang: 'id',
            setLang: (lang) => set({ lang }),
            t: (key: string) => {
                const state = get();
                return dictionary[state.lang][key] || key;
            }
        }),
        {
            name: 'rrk-lang-storage',
        }
    )
);

/**
 * useSafeLang â€” hydration-safe version of useLang.
 * Always renders with 'id' on the server and during first client render,
 * then switches to the persisted language after mount.
 * Use this in any Client Component that reads lang/t() to avoid hydration mismatch.
 */
export function useSafeLang() {
    const { lang, t, setLang } = useLang();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const safeLang = mounted ? lang : 'id';

    const safet = (key: string, fallback?: string): string => {
        if (!mounted) return fallback ?? dictionary['id'][key] ?? key;
        return t(key);
    };

    return { lang: safeLang, t: safet, setLang, mounted };
}
