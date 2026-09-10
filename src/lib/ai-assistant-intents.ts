export interface AIResponse {
  text: string;
  showContactButtons?: boolean;
  intent: string;
}

export const SUGGESTED_QUESTIONS = [
  "What does Haikal do?",
  "Tell me about his experience",
  "What are his QA skills?",
  "What projects has he worked on?",
  "Where did he study?",
  "How can I contact Haikal?",
];

const INTENTS = [
  {
    intent: "greeting",
    keywords: ["hi", "hello", "halo", "hei", "hey", "pagi", "siang", "sore", "malam", "greetings"],
    response: "Hello! 👋 I'm Brokal, Haikal's virtual assistant. How can I help you today? Feel free to ask about Haikal's experience, QA skills, projects, education, or how to reach him!",
  },
  {
    intent: "about",
    keywords: ["who", "about", "haikal", "do", "role", "tentang", "siapa", "profil", "summary", "pekerjaan"],
    response: "Haikal is a Quality Assurance professional with experience in manual testing for web and mobile applications. He is also familiar with web development and has worked on several client-based digital projects.",
  },
  {
    intent: "skills",
    keywords: ["skill", "testing", "qa", "quality assurance", "keahlian", "tools", "manual", "automation", "uat", "bug", "test", "kemampuan"],
    response: "Haikal has experience in manual testing, functional testing, UI testing, regression testing, UAT, bug identification, feature validation, and communicating findings with development and clients.",
  },
  {
    intent: "experience",
    keywords: ["experience", "work", "job", "career", "pengalaman", "como", "kerja", "kantor", "company", "perusahaan", "spesialis"],
    response: "Haikal is currently active as a Quality Assurance Specialist at COMO 107 (Global Media Visual). He performs manual web & mobile testing, end-to-end user flow verification, regression testing, and system modeling with high analytical precision.",
  },
  {
    intent: "projects",
    keywords: ["project", "portfolio", "website", "built", "proyek", "portofolio", "aplikasi", "app", "sistem", "cms", "karya"],
    response: "Haikal has worked on several web-based projects, including company profile CMS platforms, finance tracking applications, auction management systems, and other client-based digital projects.",
  },
  {
    intent: "education",
    keywords: ["study", "education", "university", "college", "pendidikan", "sekolah", "kuliah", "stmik", "sarjana", "degree", "jurusan", "almamater"],
    response: "Haikal holds a Bachelor's degree (S.Kom) in Informatics Engineering. He possesses a solid foundation in software engineering concepts, quality assurance methodologies, and modern web application development.",
  },
  {
    intent: "organization",
    keywords: ["organization", "organisasi", "himpunan", "komunitas", "volunteer", "kepemimpinan", "organisational"],
    response: "Haikal actively participated in student council organizations and event committees during his studies, developing leadership, teamwork, analytical problem solving, and project coordination skills.",
  },
  {
    intent: "contact",
    keywords: ["contact", "email", "whatsapp", "wa", "reach", "hire", "hubungi", "kontak", "pesan", "telepon", "phone"],
    response: "You can contact Haikal directly through WhatsApp or email.",
    showContactButtons: true,
  },
];

export function getAIResponse(userQuestion: string): AIResponse {
  const query = userQuestion.toLowerCase().trim();

  if (!query) {
    return {
      text: "Please feel free to ask any question about Haikal!",
      intent: "greeting",
    };
  }

  // Check intent keywords
  for (const item of INTENTS) {
    const matched = item.keywords.some((kw) => {
      // Use regex word boundary check or inclusion for multi-word
      if (kw.length <= 3) {
        const regex = new RegExp(`\\b${kw}\\b`, "i");
        return regex.test(query);
      }
      return query.includes(kw);
    });

    if (matched) {
      return {
        text: item.response,
        showContactButtons: item.showContactButtons,
        intent: item.intent,
      };
    }
  }

  // Fallback response if no intent matched
  return {
    text: "I’m not sure I have the answer to that yet.\n\nYou can ask me about Haikal's:\n• Experience\n• QA Skills\n• Projects\n• Education\n• Background\n\nOr you can contact Haikal directly.",
    showContactButtons: true,
    intent: "fallback",
  };
}
