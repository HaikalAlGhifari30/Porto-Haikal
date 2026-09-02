"use client";

import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "dark",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "dark",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useIsomorphicLayoutEffect(() => {
        const stored = localStorage.getItem("ui-theme") as Theme | null;
        if (stored) {
            setTheme(stored);
        } else {
            setTheme(defaultTheme);
        }
    }, [defaultTheme]);

    useIsomorphicLayoutEffect(() => {
        const root = window.document.documentElement;
        
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            localStorage.setItem("ui-theme", newTheme);
            if (!document.startViewTransition) {
                setTheme(newTheme);
            } else {
                try {
                    document.startViewTransition(() => {
                        flushSync(() => {
                            setTheme(newTheme);
                        });
                    });
                } catch (err) {
                    setTheme(newTheme);
                }
            }
        },
    };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
