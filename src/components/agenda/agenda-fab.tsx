"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { EvenementType } from "@/lib/agenda/types";

const OPTIONS: { icon: string; label: string; value: EvenementType | "navette" }[] = [
    { icon: "airport_shuttle", label: "Navette", value: "navette" },
    { icon: "co_present", label: "Réunion", value: "reunion" },
    { icon: "family_link", label: "Activité", value: "activite" },
    { icon: "calendar_month", label: "Rendez-vous", value: "rendez-vous" },
    { icon: "help", label: "Autres", value: "autre" },
];

interface AgendaFabProps {
    /** "navette" redirige vers /navettes (sa propre page a déjà un formulaire de création),
     *  les autres types ouvrent le formulaire de création générique de l'agenda. */
    onSelect: (type: EvenementType | "navette") => void;
}

export function AgendaFab({ onSelect }: AgendaFabProps) {
    const [ouvert, setOuvert] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-10 flex flex-col items-end gap-3">
            {ouvert &&
                OPTIONS.map((option) => (
                    <button
                        key={option.label}
                        type="button"
                        onClick={() => {
                            setOuvert(false);
                            onSelect(option.value);
                        }}
                        className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition hover:bg-zinc-800"
                    >
                        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
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
