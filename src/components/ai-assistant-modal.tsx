"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, RotateCcw, Mail } from "lucide-react";
import { PixelWhatsAppIcon } from "@/components/ui/pixel-whatsapp-icon";
import { cn } from "@/lib/utils";
import { getAIResponse, SUGGESTED_QUESTIONS_EN, SUGGESTED_QUESTIONS_ID, AIResponse } from "@/lib/ai-assistant-intents";
import { useSafeLang } from "@/store/lang";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  showContactButtons?: boolean;
}

interface AIAssistantModalProps {
  settings?: any;
}

export function AIAssistantModal({ settings }: AIAssistantModalProps) {
  const { lang } = useSafeLang();
  const isEn = lang === "en";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const suggestedQuestions = isEn ? SUGGESTED_QUESTIONS_EN : SUGGESTED_QUESTIONS_ID;

  // Initialize initial opening message
  useEffect(() => {
    setMessages([
      {
        id: "initial-msg",
        sender: "bot",
        text: isEn
          ? "Hi! I'm Brokal, Haikal's virtual assistant 👋\nWhat would you like to know about Haikal?"
          : "Halo! Saya Brokal, asisten virtual Haikal 👋\nApa yang ingin Anda ketahui tentang Haikal?",
      },
    ]);
  }, [isEn]);

  // Auto scroll message area to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    // Simulated natural AI typing response delay (600ms)
    setTimeout(() => {
      const response: AIResponse = getAIResponse(query, isEn);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        showContactButtons: response.showContactButtons,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: `initial-msg-${Date.now()}`,
        sender: "bot",
        text: isEn
          ? "Hi! I'm Brokal, Haikal's virtual assistant 👋\nWhat would you like to know about Haikal?"
          : "Halo! Saya Brokal, asisten virtual Haikal 👋\nApa yang ingin Anda ketahui tentang Haikal?",
      },
    ]);
  };

  // WhatsApp & Email destination links
  const whatsappPhone = settings?.whatsapp?.replace(/\D/g, "") || "6281388058331";
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    isEn
      ? "Halo Haikal, I'm interested in your portfolio!"
      : "Halo Haikal, saya tertarik dengan portofolio Anda!"
  )}`;
  const emailAddress = settings?.email || "alghifaribahren03@gmail.com";
  const emailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent("Portfolio Inquiry")}`;

  return (
    <>
      {/* ── Fullscreen Blurred Backdrop Overlay (Mobile Only) ── */}
      {isOpen && (
        <div
          data-no-scene-scroll="true"
          onClick={() => setIsOpen(false)}
          onWheel={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 animate-in fade-in duration-300 pointer-events-auto sm:hidden"
        />
      )}

      <div
        data-no-scene-scroll="true"
        className="fixed bottom-3.5 right-3.5 sm:right-6 sm:bottom-6 z-[60] flex flex-col items-end pointer-events-auto ai-assistant-modal-container"
        ref={modalRef}
        onWheel={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >

        {/* ── Chat Panel Window (8-Bit Retro Game Dialog) ── */}
        {isOpen && (
          <div
            data-no-scene-scroll="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="fixed top-1/2 -translate-y-1/2 left-4 right-4 mx-auto sm:top-auto sm:translate-y-0 sm:left-auto sm:right-6 sm:bottom-20 z-[60] w-[calc(100vw-2rem)] max-w-[390px] h-[520px] max-h-[82dvh] sm:max-h-[70vh] bg-[#FAF6ED] dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro-lg flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >

            {/* Top Header */}
            <div className="p-3 bg-[#FACC15] border-b-2 border-black dark:border-white flex items-center justify-between text-black">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-black text-[#FACC15] border-2 border-black flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-pixel text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                    BROKAL AI
                    <span className="text-[9px] px-1 bg-black text-white font-mono">v1.0</span>
                  </h3>
                  <p className="font-pixel text-[8px] text-zinc-800 uppercase">
                    NPC ASSISTANT // ONLINE
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-1.5 border-2 border-black bg-white hover:bg-yellow-100 text-black shadow-retro-xs btn-retro transition-colors cursor-pointer"
                  title={isEn ? "Reset chat" : "Reset percakapan"}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 border-2 border-black bg-white hover:bg-red-200 text-black shadow-retro-xs btn-retro transition-colors cursor-pointer"
                  title={isEn ? "Close Brokal AI" : "Tutup Brokal AI"}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 scrollbar-none hide-scrollbar text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col gap-1 max-w-[90%]",
                    msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "p-3 border-2 border-black dark:border-white whitespace-pre-line leading-relaxed shadow-retro-xs font-mono text-xs font-medium",
                      msg.sender === "user"
                        ? "bg-[#FACC15] text-black font-bold"
                        : "bg-white dark:bg-[#0E1217] text-black dark:text-white"
                    )}
                  >
                    {msg.text}
                  </div>

                  {/* Contact Buttons */}
                  {msg.showContactButtons && (
                    <div className="flex flex-wrap gap-2 mt-1 w-full">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 py-1.5 px-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-pixel text-[10px] uppercase font-bold border-2 border-black shadow-retro-xs btn-retro cursor-pointer"
                      >
                        <PixelWhatsAppIcon className="w-3.5 h-3.5 text-white" />
                        <span>WHATSAPP</span>
                      </a>
                      <a
                        href={emailUrl}
                        className="inline-flex items-center gap-1.5 py-1.5 px-2.5 bg-white dark:bg-[#0E1217] hover:bg-yellow-100 text-black dark:text-white font-pixel text-[10px] uppercase font-bold border-2 border-black dark:border-white shadow-retro-xs btn-retro cursor-pointer"
                      >
                        <Mail className="w-3 h-3" />
                        <span>EMAIL</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 max-w-[80%] mr-auto">
                  <div className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-black dark:text-white flex items-center gap-2 text-xs font-mono font-bold shadow-retro-xs">
                    <span className="font-pixel text-[10px]">THINKING...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Chips Area */}
            <div className="p-2.5 border-t-2 border-black dark:border-white bg-white dark:bg-[#0E1217] flex flex-col gap-1.5">
              <span className="font-pixel text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider px-0.5">
                {isEn ? "QUICK PROMPTS" : "PILIHAN PERTANYAAN"}
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto scrollbar-none hide-scrollbar">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    disabled={isTyping}
                    className="font-mono text-[11px] font-bold py-1 px-2.5 bg-[#FAF6ED] dark:bg-[#151B22] hover:bg-[#FACC15] dark:hover:bg-[#FACC15] hover:text-black dark:hover:text-black border-2 border-black dark:border-white text-black dark:text-white shadow-retro-xs btn-retro transition-all cursor-pointer disabled:opacity-50 text-left leading-snug"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Box Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-2.5 border-t-2 border-black dark:border-white bg-[#FAF6ED] dark:bg-[#151B22] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isEn ? "Ask something..." : "Tanya sesuatu..."}
                className="flex-1 h-9 bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white px-3 font-mono text-xs font-bold text-black dark:text-white placeholder:text-zinc-500 shadow-retro-xs outline-none"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="h-9 px-3 bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white shadow-retro-xs btn-retro disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center shrink-0 font-pixel text-xs font-bold"
                title="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        )}

        {/* ── Floating AI Orb Trigger Button (8-Bit Retro Box) ── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-10 h-10 sm:w-12 sm:h-12 border-2 sm:border-3 border-black dark:border-white shadow-retro btn-retro flex items-center justify-center relative group cursor-pointer transition-transform",
            isOpen
              ? "bg-black text-[#FACC15]"
              : "bg-[#FACC15] text-black hover:bg-yellow-300"
          )}
          aria-label="Ask Brokal AI"
          title="Ask Brokal AI"
        >
          {isOpen ? (
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              <span className="font-pixel text-[6px] sm:text-[7px] font-black uppercase tracking-tighter">AI</span>
            </div>
          )}

          {/* Hover Tooltip Label */}
          {!isOpen && (
            <span className="absolute right-full mr-2.5 sm:mr-3 px-2 py-1 bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-black dark:text-white font-pixel text-[9px] uppercase font-bold shadow-retro-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap">
              BROKAL AI
            </span>
          )}
        </button>

      </div>
    </>
  );
}
