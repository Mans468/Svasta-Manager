"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface PersonLinkProps {
    id: string;
    nom: string;
    type: "resident" | "employe";
    className?: string;
}

const ROUTE: Record<PersonLinkProps["type"], string> = {
    resident: "/residents",
    employe: "/employes",
};

/** Nom cliquable renvoyant vers la fiche résident/employé, utilisé partout où on référence une personne. */
export function PersonLink({ id, nom, type, className }: PersonLinkProps) {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                router.push(`${ROUTE[type]}/${id}`);
            }}
            className={cn("underline decoration-dotted underline-offset-2 hover:decoration-solid", className)}
        >
            {nom}
        </button>
    );
}
