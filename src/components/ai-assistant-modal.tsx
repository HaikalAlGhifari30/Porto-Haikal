"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, RotateCcw, Mail } from "lucide-react";
import { FaWhatsapp as FaWhatsappIcon } from "react-icons/fa6";
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
  const emailUrl = `mailto:${emailAddress}?subject=Portfolio%20Inquiry`;

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
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-24 z-[60] flex flex-col items-end pointer-events-auto ai-assistant-modal-container"
        ref={modalRef}
        onWheel={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        
        {/* ── Chat Panel Window ── */}
        {isOpen && (
          <div
            data-no-scene-scroll="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="fixed top-1/2 -translate-y-1/2 left-4 right-4 mx-auto sm:top-auto sm:translate-y-0 sm:left-auto sm:right-24 sm:bottom-22 z-[60] w-[calc(100vw-2rem)] max-w-[380px] sm:w-[390px] h-[510px] max-h-[80vh] sm:max-h-[70vh] bg-slate-900/95 dark:bg-[#070e20]/95 backdrop-blur-2xl border border-cyan-500/30 text-white rounded-3xl shadow-2xl shadow-cyan-950/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-5 duration-300"
          >
          
          {/* Top Header */}
          <div className="p-4 border-b border-slate-800 dark:border-cyan-500/20 bg-slate-950/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-md shadow-cyan-500/30 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                  Brokal Assistant
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">AI</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  {isEn ? "Virtual Assistant" : "Asisten Virtual"} • <span className="text-emerald-400">Online</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                title={isEn ? "Reset chat" : "Reset percakapan"}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isEn ? "Tutup Brokal AI" : "Tutup Brokal AI"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-none hide-scrollbar text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col gap-1.5 max-w-[88%]",
                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "p-3.5 rounded-2xl whitespace-pre-line leading-relaxed shadow-sm",
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 text-white rounded-tr-xs font-medium"
                      : "bg-slate-800/90 dark:bg-slate-900/90 border border-slate-700/80 dark:border-cyan-500/25 text-slate-100 rounded-tl-xs"
                  )}
                >
                  {msg.text}
                </div>

                {/* Contact Buttons Triggered by Contact or Fallback intents */}
                {msg.showContactButtons && (
                  <div className="flex flex-wrap gap-2 mt-1 w-full">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.02] cursor-pointer"
                    >
                      <FaWhatsappIcon className="w-3.5 h-3.5 text-white" />
                      <span>{isEn ? "Contact via WhatsApp" : "Chat WhatsApp"}</span>
                    </a>
                    <a
                      href={emailUrl}
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-cyan-300 text-xs font-bold rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                    >
                      <span>{isEn ? "Send Email" : "Kirim Email"}</span>
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 max-w-[80%] mr-auto">
                <div className="p-3.5 rounded-2xl rounded-tl-xs bg-slate-800/90 border border-slate-700/80 text-slate-400 flex items-center gap-2 text-xs">
                  <span className="font-semibold text-cyan-400">Typing</span>
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Chips Area */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/70 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-0.5">
              {isEn ? "Suggested Questions" : "Pertanyaan Rekomendasi"}
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[130px] overflow-y-auto scrollbar-none hide-scrollbar">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isTyping}
                  className="text-[11px] font-medium py-1.5 px-3 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 border border-slate-700/80 dark:border-cyan-500/30 text-cyan-300 hover:text-white transition-all cursor-pointer disabled:opacity-50 text-left leading-snug"
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
            className="p-3 border-t border-slate-800 dark:border-cyan-500/20 bg-slate-950/90 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isEn ? "Ask about experience, skills..." : "Tanya pengalaman, skill..."}
              className="flex-1 bg-slate-900 border border-slate-700 dark:border-cyan-500/30 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white disabled:opacity-40 disabled:hover:scale-100 transition-all cursor-pointer shadow-md shadow-cyan-500/20 active:scale-95 flex items-center justify-center shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>

        </div>
      )}

      {/* ── Floating AI Orb Trigger Button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-12 h-12 sm:w-13 sm:h-13 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center relative group cursor-pointer",
          isOpen
            ? "bg-slate-900 border-2 border-cyan-500 text-cyan-400 shadow-cyan-500/30"
            : "bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 hover:scale-110 active:scale-95 shadow-[0_0_25px_rgba(34,211,238,0.45)] border border-cyan-300/40"
        )}
        aria-label="Ask Brokal AI"
        title="Ask Brokal AI"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-25 pointer-events-none" />
        )}

        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300" />
        ) : (
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10 animate-pulse" />
        )}

        {/* Hover Tooltip Label ("Ask Brokal AI") */}
        {!isOpen && (
          <span className="absolute bottom-full mb-2.5 left-0 sm:left-auto sm:right-0 px-3 py-1.5 bg-slate-900/95 dark:bg-[#070e20]/95 border border-slate-700 dark:border-cyan-500/30 text-cyan-300 text-xs font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
            Ask Brokal AI ✨
          </span>
        )}
      </button>

    </div>
    </>
  );
}
