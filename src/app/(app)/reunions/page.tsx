"use client";

import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// TODO: remplacer par un vrai fetch une fois le backend branché
const groupes = [
    {
        jour: "Aujourd'hui",
        reunions: [
            { id: "1", titre: "Réunion quotidienne", lieu: "Salle de réunion", heure: "9:00-10:00", urgent: false },
            { id: "2", titre: "Incident Jean Malik", lieu: "Réfectoire", heure: "17:00-18:00", urgent: false },
        ],
    },
    {
        jour: "Demain",
        reunions: [
            { id: "3", titre: "Réunion quotidienne", lieu: "Salle de réunion", heure: "9:00-10:00", urgent: false },
            { id: "4", titre: "Réunion urgente", lieu: "Réfectoire", heure: "17:00-18:00", urgent: true },
            { id: "5", titre: "Incident Jean Malik", lieu: "Réfectoire", heure: "18:00-19:00", urgent: false },
        ],
    },
];

export default function Page() {
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="Réunions"
                toolbar={
                    <div className="flex justify-end">
                        <Button>
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                            Ajouter
                        </Button>
                    </div>
                }
            />

            <div className="flex-1 overflow-auto px-6 py-6">
                {groupes.map((groupe) => (
                    <div key={groupe.jour} className="mb-6">
                        <div className="mb-2 flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{groupe.jour}</span>
                            <div className="h-px flex-1 bg-border" />
                        </div>

                        <div className="flex flex-col gap-2">
                            {groupe.reunions.map((reunion) => (
                                <div
                                    key={reunion.id}
                                    onClick={() => router.push(`/reunions/${reunion.id}`)}
                                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 ${
                                        reunion.urgent ? "border-rose-300" : ""
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{reunion.titre}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {reunion.lieu}
                                            </span>
                                        </div>
                                        {reunion.urgent && (
                                            <Badge
                                                variant="secondary"
                                                className="bg-rose-100 text-rose-700 hover:bg-rose-100"
                                            >
                                                <span
                                                    className="material-symbols-rounded"
                                                    style={{ fontSize: 14 }}
                                                >
                                                    warning
                                                </span>
                                                Présence obligatoire
                                            </Badge>
                                        )}
                                    </div>
                                    <Badge variant="secondary">{reunion.heure}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
