"use client";

import { useSafeLang } from "@/store/lang";

import { useEffect, useState } from "react";

interface TranslatedTextProps {
    id: string;
    fallback?: string;
}

export function TranslatedText({ id, fallback }: TranslatedTextProps) {
    const { t } = useSafeLang();
    
    return <>{t(id, fallback) || fallback}</>;
}
