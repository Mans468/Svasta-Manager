"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface CopyableTextProps {
    value: string;
    className?: string;
}

/**
 * Texte cliquable pour copier (adresse, email, téléphone). Retour visuel
 * bref (icône -> coche) plutôt qu'un système de toast complet.
 */
export function CopyableText({ value, className }: CopyableTextProps) {
    const [copie, setCopie] = useState(false);

    async function copier(e: React.MouseEvent) {
        e.stopPropagation();
        await navigator.clipboard.writeText(value);
        setCopie(true);
        setTimeout(() => setCopie(false), 1500);
    }

    return (
        <button
            type="button"
            onClick={copier}
            title="Copier"
            className={cn(
                "group/copy inline-flex items-center gap-1 underline decoration-dotted underline-offset-2 hover:decoration-solid",
                className,
            )}
        >
            {value}
            <span
                className="material-symbols-rounded text-muted-foreground opacity-0 group-hover/copy:opacity-100"
                style={{ fontSize: 14 }}
            >
                {copie ? "check" : "content_copy"}
            </span>
        </button>
    );
}
