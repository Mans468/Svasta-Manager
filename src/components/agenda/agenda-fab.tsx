"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

const OPTIONS = [
    { icon: "airport_shuttle", label: "Navette", href: "/navettes" },
    { icon: "co_present", label: "Réunion", href: "/reunions" },
    { icon: "family_link", label: "Activité", href: "/activites" },
    { icon: "calendar_month", label: "Rendez-vous", href: "/rendez-vous" },
    { icon: "help", label: "Autres", href: "#" },
] as const;

export function AgendaFab() {
    const [ouvert, setOuvert] = useState(false);
    const router = useRouter();

    return (
        <div className="fixed bottom-6 right-6 z-10 flex flex-col items-end gap-3">
            {ouvert &&
                OPTIONS.map((option) => (
                    <button
                        key={option.label}
                        type="button"
                        onClick={() => {
                            setOuvert(false);
                            router.push(option.href);
                        }}
                        className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition hover:bg-zinc-800"
                    >
                        <span
                            className="material-symbols-rounded"
                            style={{ fontSize: 18 }}
                        >
                            {option.icon}
                        </span>
                        {option.label}
                    </button>
                ))}

            <button
                type="button"
                onClick={() => setOuvert((v) => !v)}
                className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition",
                    ouvert
                        ? "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
                        : "bg-zinc-900 text-white hover:bg-zinc-800",
                )}
            >
                <span className="material-symbols-rounded" style={{ fontSize: 28 }}>
                    {ouvert ? "close" : "add"}
                </span>
            </button>
        </div>
    );
}
