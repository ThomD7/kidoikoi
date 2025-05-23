import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./ui/button";
import React from "react";
import { t } from "i18next";

export default function DarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains("dark")) {
            htmlElement.classList.remove("dark");
            setIsDarkMode(false);
            localStorage.setItem("darkMode", "false");
        } else {
            htmlElement.classList.add("dark");
            setIsDarkMode(true);
            localStorage.setItem("darkMode", "true");
        }
    };

    useEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode");
        if (savedDarkMode === "true") {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        } else if (savedDarkMode === "false") {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
                document.documentElement.classList.add("dark");
                setIsDarkMode(true);
            } else {
                document.documentElement.classList.remove("dark");
                setIsDarkMode(false);
            }
        }
    }, []);

    return (
        <div className="w-13">
            <Button
                label={t("dark-mode")}
                onClick={toggleDarkMode}
                className="items-center"
            >
                {isDarkMode ? (
                    <Sun className="w-8 h-8 mx-auto" />
                ) : (
                    <Moon className="w-8 h-8 mx-auto" />
                )}
            </Button>
        </div>
    );
}