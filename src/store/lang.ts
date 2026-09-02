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
        'nav.about': 'Tentang Saya',
        'nav.skills': 'Keahlian QA',
        'nav.experience': 'Pengalaman',
        'nav.projects': 'Portofolio Proyek',
        'nav.education': 'Pendidikan',
        'nav.organization': 'Organisasi',
        'nav.contact': 'Kontak',
        'nav.downloadCv': 'Unduh CV',
        'nav.login': 'Masuk Admin',
        'nav.dashboard': 'Dasbor',
        
        'hero.badge': 'Quality Assurance Engineer (Manual Testing)',
        'hero.greeting': 'Halo, Saya',
        'hero.title': 'Quality Assurance Engineer',
        'hero.subtitle': 'Lulusan S1 Teknik Informatika UNIKOM (IPK 3.46) dengan passion tinggi pada Quality Assurance & Manual Testing untuk menjamin mutu, fungsionalitas, dan pengalaman pengguna aplikasi.',
        'hero.viewProjects': 'Lihat Portofolio Proyek',
        'hero.contactMe': 'Hubungi Saya',
        'hero.downloadCv': 'Unduh CV',

        'auth.loginTitle': 'Selamat Datang Kembali',
        'auth.loginSubtitle': 'Silakan masuk ke akun admin Anda',
        'auth.email': 'Alamat Email',
        'auth.password': 'Kata Sandi',
        'auth.loginBtn': 'Masuk',
        'auth.backHome': 'Kembali ke Beranda',
        
        'section.about': 'Tentang Saya',
        'section.about.subtitle': 'Profil & Dedikasi QA',
        'section.about.desc': 'Mengenal lebih dekat latar belakang akademis, keahlian manual testing, serta dedikasi dalam menjaga kualitas perangkat lunak.',
        
        'section.skills': 'Keahlian & Spesialisasi QA',
        'section.skills.subtitle': 'Testing Competencies',
        'section.skills.desc': 'Metodologi pengujian perangkat lunak, penyusunan test case, alat uji API, dan verifikasi kualitas sistem.',

        'section.experience': 'Rekam Jejak Karir',
        'section.experience.subtitle': 'Career Milestones & QA Verification',
        'section.experience.desc': 'Rekam jejak karir profesional, pengujian manual platform digital, serta audit kualitas fungsionalitas sistem.',

        'section.projects': 'Portofolio Proyek Web & Aplikasi',
        'section.projects.subtitle': 'Featured Projects Showcase',
        'section.projects.desc': 'Showcase proyek pengembangan web, aplikasi digital, dan pengujian kualitas sistem yang telah dibangun.',
        'projects.viewDetail': 'Detail Proyek',
        'projects.liveDemo': 'Demo Aplikasi',
        'projects.github': 'Kode Sumber',
        'projects.problem': 'Tantangan Kualitas / Fitur Utama',
        'projects.solution': 'Solusi Pengembangan & Pengujian',
        'projects.techStack': 'Teknologi & Tools',
        'projects.role': 'Peran Proyek',
        'projects.features': 'Fitur Utama Proyek',
        'projects.back': 'Kembali ke Portofolio',

        'section.education': 'Latar Belakang Pendidikan',
        'section.education.subtitle': 'Akademik UNIKOM',
        'section.education.desc': 'Pendidikan formal S1 Teknik Informatika Universitas Komputer Indonesia dengan IPK 3.46.',

        'section.org': 'Pengalaman Organisasi & Kepemimpinan',
        'section.org.subtitle': 'Kolaborasi & Koordinasi',
        'section.org.desc': 'Pengalaman berorganisasi dan mengordinasikan tim secara efektif dalam kegiatan teknologi.',

        'section.contact': 'Hubungi Saya',
        'section.contact.subtitle': 'Get In Touch',
        'section.contact.desc': 'Saat ini saya terbuka untuk peluang baru. Baik Anda memiliki proyek atau sekadar ingin terhubung, jangan ragu untuk menghubungi!',
        'contact.getInTouch': 'Hubungi Saya',
        'contact.letsWorkTogether': 'Mari Bekerja Sama',
        'contact.workDesc': 'Saya adalah Quality Assurance Engineer & Developer yang berdedikasi menciptakan pengalaman digital terbaik. Jika Anda mencari seseorang untuk mewujudkan ide Anda atau menguji kualitas perangkat lunak, saya siap membantu.',
        'contact.location': 'Lokasi',
        'contact.locationVal': 'Indonesia',
        'contact.labelName': 'Nama',
        'contact.labelEmail': 'Email',
        'contact.labelMessage': 'Pesan',
        'contact.name': 'Nama Lengkap',
        'contact.email': 'Email',
        'contact.subject': 'Subjek / Topik',
        'contact.message': 'Pesan',
        'contact.placeholderName': 'Nama Anda',
        'contact.placeholderEmail': 'anda@email.com',
        'contact.placeholderMessage': 'Pesan Anda...',
        'contact.send': 'Kirim Pesan',
        'contact.sending': 'Mengirim...',
        'contact.success': 'Pesan berhasil terkirim! Terima kasih telah menghubungi.',
        'contact.error': 'Gagal mengirim pesan. Silakan coba lagi.',
        
        'footer.copyright': 'Hak Cipta Dilindungi Undang-Undang.',
        'footer.designedBy': 'Dirancang & Dikembangkan oleh',

        'legal.close': 'Tutup',
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'QA Skills',
        'nav.experience': 'Experience',
        'nav.projects': 'Featured Projects',
        'nav.education': 'Education',
        'nav.organization': 'Organization',
        'nav.contact': 'Contact',
        'nav.downloadCv': 'Download CV',
        'nav.login': 'Admin Login',
        'nav.dashboard': 'Dashboard',
        
        'hero.badge': 'Quality Assurance Engineer & Web Developer',
        'hero.greeting': "Hi, I'm",
        'hero.title': 'Quality Assurance Engineer',
        'hero.subtitle': 'Informatics Engineering Graduate from UNIKOM (GPA 3.46) specializing in Quality Assurance, Manual Testing, and Web Development.',
        'hero.viewProjects': 'View Featured Projects',
        'hero.contactMe': 'Contact Me',
        'hero.downloadCv': 'Download CV',

        'auth.loginTitle': 'Welcome Back',
        'auth.loginSubtitle': 'Please sign in to your admin account',
        'auth.email': 'Email Address',
        'auth.password': 'Password',
        'auth.loginBtn': 'Sign In',
        'auth.backHome': 'Back to Home',
        
        'section.about': 'About Me',
        'section.about.subtitle': 'Profile & Passion',
        'section.about.desc': 'Get to know my academic background, manual testing skills, and web development experience.',
        
        'section.skills': 'Skills & Expertise',
        'section.skills.subtitle': 'Technical Competencies',
        'section.skills.desc': 'Software testing methodologies, test case design, web development technologies, and system verification.',

        'section.experience': 'Career Track Record',
        'section.experience.subtitle': 'Career Milestones & Achievements',
        'section.experience.desc': 'Proven track record of professional roles, digital platform manual testing, and web development projects.',

        'section.projects': 'Featured Web & App Projects',
        'section.projects.subtitle': 'Featured Projects',
        'section.projects.desc': 'Showcase of web development projects, digital applications, and software quality assurance work completed.',
        'projects.viewDetail': 'Project Details',
        'projects.liveDemo': 'Live App',
        'projects.github': 'Source Code',
        'projects.problem': 'Project Challenge & Objective',
        'projects.solution': 'Development & QA Solution',
        'projects.techStack': 'Technologies & Tools',
        'projects.role': 'Project Role',
        'projects.features': 'Key Features',
        'projects.back': 'Back to Projects',

        'section.education': 'Educational Background',
        'section.education.subtitle': 'Academic UNIKOM',
        'section.education.desc': 'Formal Bachelor of Informatics Engineering degree from Universitas Komputer Indonesia with GPA 3.46.',

        'section.org': 'Organizational & Leadership Experience',
        'section.org.subtitle': 'Collaboration & Teamwork',
        'section.org.desc': 'Active leadership involvement and experience coordinating team members in tech initiatives.',

        'section.contact': 'Get In Touch',
        'section.contact.subtitle': 'Contact',
        'section.contact.desc': "I'm currently open to new opportunities. Whether you have a project in mind or just want to connect, feel free to reach out!",
        'contact.getInTouch': 'Get In Touch',
        'contact.letsWorkTogether': "Let's work together",
        'contact.workDesc': "I'm a fullstack developer & QA Engineer passionate about building exceptional digital experiences. If you're looking for someone to help bring your ideas to life, I'd love to hear from you.",
        'contact.location': 'Location',
        'contact.locationVal': 'Indonesia',
        'contact.labelName': 'Name',
        'contact.labelEmail': 'Email',
        'contact.labelMessage': 'Message',
        'contact.name': 'Full Name',
        'contact.email': 'Email',
        'contact.subject': 'Subject / Topic',
        'contact.message': 'Message',
        'contact.placeholderName': 'Your name',
        'contact.placeholderEmail': 'your@email.com',
        'contact.placeholderMessage': 'Your message...',
        'contact.send': 'Send Message',
        'contact.sending': 'Sending...',
        'contact.success': 'Message sent successfully! Thank you for reaching out.',
        'contact.error': 'Failed to send message. Please try again.',
        
        'footer.copyright': 'All Rights Reserved.',
        'footer.designedBy': 'Designed & Developed by',

        'legal.close': 'Close',
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
