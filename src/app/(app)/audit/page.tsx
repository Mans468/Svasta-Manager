import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 20;

// TODO: remplacer par un vrai fetch paginé, groupé par jour, une fois le backend branché
const groupes = [
    {
        jour: "Aujourd'hui",
        entrees: [
            { id: "1", heure: "12:12", acteur: "John Doe", action: "a créé l'activité", tag: "Parc Astérix" },
            { id: "2", heure: "11:42", acteur: "Sarah Malik", action: "a déplacé", tag: "Jean Mahmoud", suite: "de la caravane A21 à A22" },
            { id: "3", heure: "10:12", acteur: "Jean Luc", action: "a mis à jour le rendez-vous", tag: "Dr. Schmit" },
        ],
    },
    {
        jour: "Hier",
        entrees: [
            { id: "4", heure: "12:12", acteur: "John Doe", action: "a créé l'activité", tag: "Parc Astérix" },
            { id: "5", heure: "11:42", acteur: "Sarah Malik", action: "a déplacé", tag: "Jean Mahmoud", suite: "de la caravane A21 à A22" },
        ],
    },
];

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const pageActuelle = Math.max(1, Number(page) || 1);
    const nbPages = 3; // TODO: calculer depuis le vrai total

    return (
        <>
            <PageHeader title="Audit" />

            <div className="flex-1 overflow-auto px-6 py-6">
                {groupes.map((groupe) => (
                    <div key={groupe.jour} className="mb-6">
                        <div className="mb-2 flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{groupe.jour}</span>
                            <div className="h-px flex-1 bg-border" />
                        </div>

                        <div className="flex flex-col gap-2 text-sm">
                            {groupe.entrees.map((entree) => (
                                <div key={entree.id} className="flex gap-3">
                                    <span className="w-12 shrink-0 text-muted-foreground">
                                        {entree.heure}
                                    </span>
                                    <span>
                                        <span className="font-medium underline">{entree.acteur}</span>{" "}
                                        {entree.action}{" "}
                                        <Badge variant="secondary">{entree.tag}</Badge>{" "}
                                        {entree.suite}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="flex items-center justify-between pt-4">
                    {pageActuelle > 1 ? (
                        <Link
                            href={`/audit?page=${pageActuelle - 1}`}
                            className={cn(buttonVariants({ variant: "outline" }))}
                        >
                            Précédent
                        </Link>
                    ) : (
                        <span
                            className={cn(buttonVariants({ variant: "outline" }), "pointer-events-none opacity-50")}
                        >
                            Précédent
                        </span>
                    )}

                    <span className="text-sm text-muted-foreground">
                        Page {pageActuelle} / {nbPages}
                    </span>

                    {pageActuelle < nbPages ? (
                        <Link
                            href={`/audit?page=${pageActuelle + 1}`}
                            className={cn(buttonVariants({ variant: "outline" }))}
                        >
                            Suivant
                        </Link>
                    ) : (
                        <span
                            className={cn(buttonVariants({ variant: "outline" }), "pointer-events-none opacity-50")}
                        >
                            Suivant
                        </span>
                    )}
                </div>
            </div>
        </>
    );
}
