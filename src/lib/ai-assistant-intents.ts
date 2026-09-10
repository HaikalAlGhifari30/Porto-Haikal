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

// Explicit mapping for suggested question indices to ensure 100% accurate responses
const SUGGESTED_INTENT_MAP: Array<{ intent: string; responseEn: string; responseId: string; showContactButtons?: boolean }> = [
  // 0: About / Role
  {
    intent: "about",
    responseId: "Haikal Al Ghifari adalah seorang Quality Assurance Specialist & Informatics Engineer yang berfokus pada pengujian kualitas aplikasi web dan mobile. Berpengalaman memastikan alur sistem bebas dari masalah (bug-free), memenuhi standar fungsionalitas terbaik, serta mendukung pengembangan web modern.",
    responseEn: "Haikal Al Ghifari is a Quality Assurance Specialist & Informatics Engineer focused on web and mobile application testing. He ensures digital products meet high functional standards, stay bug-free, and deliver seamless user experiences.",
  },
  // 1: Experience
  {
    intent: "experience",
    responseId: "Haikal saat ini bekerja sebagai Quality Assurance Specialist di COMO 107 (Global Media Visual). Berpengalaman dalam pengujian manual web & mobile, verifikasi alur pengguna end-to-end, uji regresi, smoke testing, UAT, serta penelusuran bug pada berbagai platform digital.",
    responseEn: "Haikal is currently working as a Quality Assurance Specialist at COMO 107 (Global Media Visual). He specializes in manual web & mobile testing, end-to-end user flow verification, regression testing, smoke testing, UAT, and bug tracking across digital platforms.",
  },
  // 2: Skills
  {
    intent: "skills",
    responseId: "Keahlian utama Haikal meliputi:\n\n• QA & Testing: Manual Testing (Web & Mobile), Regression Testing, Smoke Testing, UAT, Bug Tracking & Reporting, Feature Validation.\n• Web Development: Next.js, React, TypeScript, Node.js, Express, Python, TailwindCSS, PostgreSQL, REST API.",
    responseEn: "Haikal's core technical skills include:\n\n• QA & Testing: Manual Testing (Web & Mobile), Regression Testing, Smoke Testing, UAT, Bug Tracking & Reporting, Feature Validation.\n• Web Development: Next.js, React, TypeScript, Node.js, Express, Python, TailwindCSS, PostgreSQL, REST API.",
  },
  // 3: Projects
  {
    intent: "projects",
    responseId: "Haikal telah mengerjakan beberapa proyek digital utama:\n\n1. Baroedak COMO — Fan Identity Web Portal (Platform komunitas suporter Como 107).\n2. FinTrack — Personal Finance Management (Dashboard keuangan interaktif).\n3. Company Profile CMS & System Management.\n\nAnda dapat melihat detail proyek di bagian Proyek portfolio ini!",
    responseEn: "Haikal has worked on several featured digital projects:\n\n1. Baroedak COMO — Fan Identity Web Portal (Como 107 supporter platform).\n2. FinTrack — Personal Finance Management (Interactive financial dashboard).\n3. Company Profile CMS & System Management.\n\nYou can view full project details in the Projects section of this portfolio!",
  },
  // 4: Education
  {
    intent: "education",
    responseId: "Haikal merupakan Sarjana Komputer (S.Kom) lulusan Teknik Informatika. Memiliki pemahaman mendalam dalam rekayasa perangkat lunak, metodologi Quality Assurance, algoritma, serta pengembangan aplikasi digital modern.",
    responseEn: "Haikal holds a Bachelor's Degree (S.Kom) in Informatics Engineering. He has a strong foundation in software engineering principles, Quality Assurance methodologies, algorithms, and modern web application development.",
  },
  // 5: Contact
  {
    intent: "contact",
    responseId: "Anda dapat menghubungi Haikal secara langsung melalui WhatsApp atau Email:\n\n• WhatsApp: +62 813-8805-8331\n• Email: haikal.alghifari300602@gmail.com\n• Lokasi: Jakarta, Indonesia",
    responseEn: "You can reach Haikal directly via WhatsApp or Email:\n\n• WhatsApp: +62 813-8805-8331\n• Email: haikal.alghifari300602@gmail.com\n• Location: Jakarta, Indonesia",
    showContactButtons: true,
  },
];

// Ordered intent list for keyword search (prioritizing specific intents before general about)
const INTENT_KEYWORDS = [
  {
    intent: "contact",
    keywords: ["contact", "hubungi", "kontak", "email", "whatsapp", "wa", "reach", "hire", "telepon", "phone", "pesan", "message"],
    item: SUGGESTED_INTENT_MAP[5],
  },
  {
    intent: "experience",
    keywords: ["experience", "pengalaman", "work", "job", "career", "karir", "como", "efm", "artistik", "perusahaan", "kantor", "bekerja"],
    item: SUGGESTED_INTENT_MAP[1],
  },
  {
    intent: "skills",
    keywords: ["skill", "keahlian", "testing", "qa", "quality assurance", "manual testing", "uat", "regression", "smoke", "bug", "tools", "kemampuan"],
    item: SUGGESTED_INTENT_MAP[2],
  },
  {
    intent: "projects",
    keywords: ["project", "proyek", "portfolio", "portofolio", "website", "built", "aplikasi", "app", "baroedak", "fintrack", "cms", "karya"],
    item: SUGGESTED_INTENT_MAP[3],
  },
  {
    intent: "education",
    keywords: ["study", "education", "pendidikan", "kuliah", "sekolah", "university", "college", "stmik", "sarjana", "s.kom", "teknik informatika", "jurusan", "almamater", "berkuliah"],
    item: SUGGESTED_INTENT_MAP[4],
  },
  {
    intent: "organization",
    keywords: ["organization", "organisasi", "himpunan", "hima", "komunitas", "volunteer", "kepemimpinan", "organisational"],
    item: {
      intent: "organization",
      responseId: "Selama masa studi, Haikal aktif dalam himpunan mahasiswa (HIMA) dan kepanitiaan kampus. Pengalaman ini mengasah kemampuan kepemimpinan, komunikasi lintas tim, analisis masalah, serta manajemen proyek.",
      responseEn: "During his studies, Haikal actively participated in student council organizations and campus committees, honing his leadership, cross-team communication, analytical problem solving, and project management skills.",
    },
  },
  {
    intent: "greeting",
    keywords: ["hi", "hello", "halo", "hei", "hey", "pagi", "siang", "sore", "malam", "greetings"],
    item: {
      intent: "greeting",
      responseId: "Halo! 👋 Saya Brokal, asisten virtual Haikal. Silakan tanyakan seputar pengalaman kerja, keahlian QA, proyek, pendidikan, atau cara menghubungi Haikal!",
      responseEn: "Hello! 👋 I'm Brokal, Haikal's virtual assistant. Feel free to ask about Haikal's work experience, QA skills, projects, education, or contact details!",
    },
  },
  {
    intent: "about",
    keywords: ["who", "about", "role", "profil", "summary", "ringkasan", "peran", "tugas"],
    item: SUGGESTED_INTENT_MAP[0],
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

  // 1. Direct match for suggested questions in both EN and ID
  const idxId = SUGGESTED_QUESTIONS_ID.findIndex((q) => q.toLowerCase() === query);
  if (idxId !== -1 && SUGGESTED_INTENT_MAP[idxId]) {
    const matchedItem = SUGGESTED_INTENT_MAP[idxId];
    return {
      text: isEn ? matchedItem.responseEn : matchedItem.responseId,
      showContactButtons: matchedItem.showContactButtons,
      intent: matchedItem.intent,
    };
  }

  const idxEn = SUGGESTED_QUESTIONS_EN.findIndex((q) => q.toLowerCase() === query);
  if (idxEn !== -1 && SUGGESTED_INTENT_MAP[idxEn]) {
    const matchedItem = SUGGESTED_INTENT_MAP[idxEn];
    return {
      text: isEn ? matchedItem.responseEn : matchedItem.responseId,
      showContactButtons: matchedItem.showContactButtons,
      intent: matchedItem.intent,
    };
  }

  // 2. Ordered keyword search for custom user queries
  for (const group of INTENT_KEYWORDS) {
    const matched = group.keywords.some((kw) => {
      if (kw.length <= 3) {
        const regex = new RegExp(`\\b${kw}\\b`, "i");
        return regex.test(query);
      }
      return query.includes(kw);
    });

    if (matched) {
      return {
        text: isEn ? group.item.responseEn : group.item.responseId,
        showContactButtons: (group.item as any).showContactButtons,
        intent: group.intent,
      };
    }
  }

  // 3. Fallback response if no intent matched
  return {
    text: isEn
      ? "I’m not sure I have the exact answer for that query.\n\nYou can ask me about Haikal's:\n• Experience\n• QA Skills\n• Featured Projects\n• Education\n• Background\n\nOr you can contact Haikal directly below!"
      : "Saya belum memiliki jawaban spesifik untuk pertanyaan tersebut.\n\nAnda dapat menanyakan tentang:\n• Pengalaman Kerja\n• Keahlian QA\n• Proyek Digital\n• Pendidikan\n• Latar Belakang\n\nAtau Anda dapat langsung menghubungi Haikal di bawah ini!",
    showContactButtons: true,
    intent: "fallback",
  };
}
