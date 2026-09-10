export interface AIResponse {
  text: string;
  showContactButtons?: boolean;
  intent: string;
}

export const SUGGESTED_QUESTIONS_EN = [
  "What does Haikal do?",
  "Tell me about his experience",
  "What are his QA skills?",
  "What projects has he worked on?",
  "Where did he study?",
  "How can I contact Haikal?",
];

export const SUGGESTED_QUESTIONS_ID = [
  "Apa saja peran & pekerjaan Haikal?",
  "Ceritakan tentang pengalamannya",
  "Apa saja keahlian QA Haikal?",
  "Proyek apa yang pernah dikerjakan?",
  "Di mana Haikal berkuliah?",
  "Bagaimana cara menghubungi Haikal?",
];

const INTENTS = [
  {
    intent: "greeting",
    keywords: ["hi", "hello", "halo", "hei", "hey", "pagi", "siang", "sore", "malam", "greetings"],
    responseEn: "Hello! 👋 I'm Brokal, Haikal's virtual assistant. How can I help you today? Feel free to ask about Haikal's experience, QA skills, projects, education, or how to reach him!",
    responseId: "Halo! 👋 Saya Brokal, asisten virtual Haikal. Ada yang bisa saya bantu? Silakan tanya mengenai pengalaman, keahlian QA, proyek, pendidikan, atau cara menghubungi Haikal!",
  },
  {
    intent: "about",
    keywords: ["who", "about", "haikal", "do", "role", "tentang", "siapa", "profil", "summary", "pekerjaan", "apakah"],
    responseEn: "Haikal is a Quality Assurance professional with experience in manual testing for web and mobile applications. He is also familiar with web development and has worked on several client-based digital projects.",
    responseId: "Haikal adalah seorang Quality Assurance Engineer berdedikasi yang berpengalaman dalam pengujian manual (manual testing) web & mobile. Ia juga menguasai web development dan telah mengerjakan berbagai proyek digital klien.",
  },
  {
    intent: "skills",
    keywords: ["skill", "testing", "qa", "quality assurance", "keahlian", "tools", "manual", "automation", "uat", "bug", "test", "kemampuan"],
    responseEn: "Haikal has experience in manual testing, functional testing, UI testing, regression testing, UAT, bug identification, feature validation, and communicating findings with development and clients.",
    responseId: "Haikal berpengalaman dalam pengujian manual (manual testing), uji fungsional, UI testing, uji regresi, UAT, verifikasi alur pengguna end-to-end, pemodelan sistem, serta komunikasi penemuan bug dengan tim pengembang.",
  },
  {
    intent: "experience",
    keywords: ["experience", "work", "job", "career", "pengalaman", "como", "kerja", "kantor", "company", "perusahaan", "spesialis"],
    responseEn: "Haikal is currently active as a Quality Assurance Specialist at COMO 107 (Global Media Visual). He performs manual web & mobile testing, end-to-end user flow verification, regression testing, and system modeling with high analytical precision.",
    responseId: "Haikal saat ini aktif bekerja sebagai Quality Assurance Specialist di COMO 107 (Global Media Visual). Berpengalaman dalam pengujian manual web & mobile, verifikasi alur pengguna end-to-end, uji regresi, serta pemodelan sistem.",
  },
  {
    intent: "projects",
    keywords: ["project", "portfolio", "website", "built", "proyek", "portofolio", "aplikasi", "app", "sistem", "cms", "karya"],
    responseEn: "Haikal has worked on several web-based projects, including company profile CMS platforms, finance tracking applications, auction management systems, and other client-based digital projects.",
    responseId: "Haikal telah mengerjakan berbagai proyek berbasis web, termasuk platform CMS profil perusahaan, aplikasi pelacak keuangan, sistem manajemen lelang, serta proyek-proyek digital klien lainnya.",
  },
  {
    intent: "education",
    keywords: ["study", "education", "university", "college", "pendidikan", "sekolah", "kuliah", "stmik", "sarjana", "degree", "jurusan", "almamater"],
    responseEn: "Haikal holds a Bachelor's degree (S.Kom) in Informatics Engineering. He possesses a solid foundation in software engineering concepts, quality assurance methodologies, and modern web application development.",
    responseId: "Haikal merupakan Sarjana Komputer (S.Kom) lulusan Teknik Informatika. Memiliki fondasi analitis kuat dalam rekayasa perangkat lunak, metodologi QA, dan pengembangan aplikasi web modern.",
  },
  {
    intent: "organization",
    keywords: ["organization", "organisasi", "himpunan", "komunitas", "volunteer", "kepemimpinan", "organisational"],
    responseEn: "Haikal actively participated in student council organizations and event committees during his studies, developing leadership, teamwork, analytical problem solving, and project coordination skills.",
    responseId: "Haikal memiliki pengalaman berorganisasi dan kepemimpinan yang adaptif, mengasah keahlian analisis tinggi, manajemen tim, serta komunikasi antar divisi selama masa studinya.",
  },
  {
    intent: "contact",
    keywords: ["contact", "email", "whatsapp", "wa", "reach", "hire", "hubungi", "kontak", "pesan", "telepon", "phone"],
    responseEn: "You can contact Haikal directly through WhatsApp or email.",
    responseId: "Anda dapat menghubungi Haikal secara langsung melalui WhatsApp atau email.",
    showContactButtons: true,
  },
];

export function getAIResponse(userQuestion: string, isEn: boolean = false): AIResponse {
  const query = userQuestion.toLowerCase().trim();

  if (!query) {
    return {
      text: isEn
        ? "Please feel free to ask any question about Haikal!"
        : "Silakan tanyakan hal apa saja mengenai Haikal!",
      intent: "greeting",
    };
  }

  // Check intent keywords
  for (const item of INTENTS) {
    const matched = item.keywords.some((kw) => {
      if (kw.length <= 3) {
        const regex = new RegExp(`\\b${kw}\\b`, "i");
        return regex.test(query);
      }
      return query.includes(kw);
    });

    if (matched) {
      return {
        text: isEn ? item.responseEn : item.responseId,
        showContactButtons: item.showContactButtons,
        intent: item.intent,
      };
    }
  }

  // Fallback response if no intent matched
  return {
    text: isEn
      ? "I’m not sure I have the answer to that yet.\n\nYou can ask me about Haikal's:\n• Experience\n• QA Skills\n• Projects\n• Education\n• Background\n\nOr you can contact Haikal directly."
      : "Saya belum memiliki jawaban pasti untuk pertanyaan tersebut.\n\nAnda dapat menanyakan tentang:\n• Pengalaman Kerja\n• Keahlian QA\n• Proyek Digital\n• Pendidikan\n• Latar Belakang\n\nAtau Anda dapat langsung menghubungi Haikal.",
    showContactButtons: true,
    intent: "fallback",
  };
}
