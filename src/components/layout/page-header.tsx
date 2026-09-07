import type { ReactNode } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";

interface PageHeaderProps {
    title: string;
    /** Barre d'outils (recherche, filtres, bouton Ajouter...) affichée sous le titre */
    toolbar?: ReactNode;
}

export function PageHeader({ title, toolbar }: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 border-b p-6">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-semibold">{title}</h1>
            </div>

            {toolbar}
        </div>
    );
}
