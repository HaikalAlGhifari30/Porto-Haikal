"use client";

import { useSafeLang } from "@/store/lang";

import { useEffect, useState } from "react";

interface TranslatedContentProps {
    idText: string;
    enText?: string | null;
}

export function TranslatedContent({ idText, enText }: TranslatedContentProps) {
    const { lang } = useSafeLang();
    
    return <>{lang === 'en' && enText ? enText : idText}</>;
}
