"use client";

import { PageHeader } from "@/components/layout/page-header";
import { PersonLink } from "@/components/shared/person-link";
import { paginate, TablePagination } from "@/components/shared/table-pagination";
import { mockEmployes, mockResidents, nomComplet } from "@/lib/mock-data";
import { useState } from "react";

type EntiteType = "activite" | "resident" | "caravane" | "rendez-vous" | "reunion";

const ROUTE_PAR_ENTITE: Record<EntiteType, string> = {
    activite: "/activites",
    resident: "/residents",
    caravane: "/caravanes",
    "rendez-vous": "/rendez-vous",
    reunion: "/reunions",
};

interface LogEntry {
    id: string;
    heure: string;
    acteurId: string;
    action: string;
    entite?: { id: string; nom: string; type: EntiteType };
    suite?: string;
}

// TODO: remplacer par un vrai fetch paginé (AuditLog) une fois le backend branché
const GROUPES: { jour: string; entrees: LogEntry[] }[] = [
    {
        jour: "Aujourd'hui",
        entrees: [
            { id: "1", heure: "12:12", acteurId: "1", action: "a créé l'activité", entite: { id: "1", nom: "Parc Astérix", type: "activite" } },
            { id: "2", heure: "11:42", acteurId: "3", action: "a déplacé", entite: { id: "4", nom: "Malik Jean", type: "resident" }, suite: "de la caravane A21 à A22" },
            { id: "3", heure: "10:12", acteurId: "2", action: "a mis à jour le rendez-vous de", entite: { id: "4", nom: "Malik Jean", type: "resident" } },
        ],
    },
    {
        jour: "Hier",
        entrees: [
            { id: "4", heure: "12:12", acteurId: "1", action: "a créé l'activité", entite: { id: "2", nom: "Uno", type: "activite" } },
            { id: "5", heure: "09:15", acteurId: "3", action: "a signalé un problème sur", entite: { id: "1", nom: "A01", type: "caravane" } },
        ],
    },
];

const PAGE_SIZE = 20;
const TOUTES_LES_ENTREES = GROUPES.flatMap((g) => g.entrees.map((e) => ({ ...e, jour: g.jour })));

export default function Page() {
    const [page, setPage] = useState(1);
    const { items, totalPages, currentPage } = paginate(TOUTES_LES_ENTREES, page, PAGE_SIZE);

    const jours = Array.from(new Set(items.map((e) => e.jour)));

    return (
        <>
            <PageHeader title="Audit" />

            <div className="flex-1 overflow-auto px-6 pb-6">
                {jours.map((jour) => (
                    <div key={jour} className="mb-6">
                        <div className="mb-2 flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{jour}</span>
                            <div className="h-px flex-1 bg-border" />
                        </div>

                        <div className="flex flex-col gap-2 text-sm">
                            {items
                                .filter((e) => e.jour === jour)
                                .map((entree) => {
                                    const acteur = mockEmployes.find((e) => e.id === entree.acteurId);
                                    return (
                                        <div key={entree.id} className="flex gap-3">
                                            <span className="w-12 shrink-0 text-muted-foreground">{entree.heure}</span>
                                            <span>
                                                {acteur && (
                                                    <PersonLink id={acteur.id} nom={nomComplet(acteur)} type="employe" className="font-medium" />
                                                )}{" "}
                                                {entree.action}{" "}
                                                {entree.entite && (
                                                    <EntiteLink entite={entree.entite} />
                                                )}{" "}
                                                {entree.suite}
                                            </span>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                ))}

                <TablePagination page={currentPage} totalPages={totalPages} basePath="/audit" />
            </div>
        </>
    );
}

function EntiteLink({ entite }: { entite: NonNullable<LogEntry["entite"]> }) {
    if (entite.type === "resident") {
        const resident = mockResidents.find((r) => r.id === entite.id);
        if (resident) return <PersonLink id={resident.id} nom={nomComplet(resident)} type="resident" className="font-medium" />;
    }

    return (
        <a
            href={`${ROUTE_PAR_ENTITE[entite.type]}/${entite.id}`}
            className="font-medium underline decoration-dotted underline-offset-2 hover:decoration-solid"
        >
            {entite.nom}
        </a>
    );
}
