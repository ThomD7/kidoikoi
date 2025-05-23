import DarkMode from "../dark-mode";
import LanguageSwitcher from "../language";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-screen flex flex-col items-center bg-seasalt dark:bg-onyx sm:p-0 p-10">
            <div className="flex flex-row justify-around items-center sm:w-1/2 w-full">
                <DarkMode />
                <button className='hover:cursor-pointer' onClick={() => window.location.href = '/'}>
                    <img width="70px" height="70px" src="./kidoikoi.webp" loading="lazy" alt="Kidoikoi" title="Kidoikoi" className="w-32" />
                </button>
                <LanguageSwitcher />
            </div>
            <div className="sm:w-1/2 w-full">
                {children}
            </div>
        </div>
    )
};