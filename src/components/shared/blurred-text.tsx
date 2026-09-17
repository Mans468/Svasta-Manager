"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface BlurredTextProps {
    value: string;
    className?: string;
}

/** Donnée sensible (ex. numéro de registre national) : floutée par défaut, clic pour révéler/re-flouter. */
export function BlurredText({ value, className }: BlurredTextProps) {
    const [revele, setRevele] = useState(false);

    return (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                setRevele((r) => !r);
            }}
            title={revele ? "Masquer" : "Afficher"}
            className={cn("inline-flex items-center gap-1.5", className)}
        >
            <span className={cn(!revele && "blur-sm select-none")}>{value}</span>
            <span className="material-symbols-rounded text-muted-foreground" style={{ fontSize: 16 }}>
                {revele ? "visibility_off" : "visibility"}
            </span>
        </button>
    );
}
