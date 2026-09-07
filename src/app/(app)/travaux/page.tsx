"use client";

import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

// TODO: remplacer par un vrai fetch une fois le backend branché
const stats = { prevus: 5, termines: 37, budget: 150 };

const groupes = [
    {
        jour: "Aujourd'hui",
        items: [
            { id: "1", titre: "Nettoyer Réfectoire", lieu: "Réfectoire", date: "28/01/2026", residents: "2 résidents", montant: 40, heure: "14:00-18:00" },
        ],
    },
    {
        jour: "Plus d'une semaine",
        items: [
            { id: "2", titre: "Jardinage", lieu: "Jardin", date: "15/02/2026", residents: "Jean Malik", montant: 50, heure: "11:00-13:00" },
            { id: "3", titre: "Préparer l'activité", lieu: "Centre Svasta", date: "16/02/2026", residents: "2 résidents", montant: 10, heure: "08:30-9:30" },
        ],
    },
];

export default function Page() {
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="Travaux rémunerés"
                toolbar={
                    <>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <div className="rounded-xl bg-emerald-50 px-5 py-3">
                                <span className="text-sm text-emerald-700">Travaux prévus</span>
                                <p className="text-2xl font-semibold text-emerald-700">{stats.prevus}</p>
                            </div>
                            <div className="rounded-xl border px-5 py-3">
                                <span className="text-sm text-muted-foreground">Travaux terminées</span>
                                <p className="text-2xl font-semibold">{stats.termines}</p>
                            </div>
                            <div className="rounded-xl border px-5 py-3">
                                <span className="text-sm text-muted-foreground">Budget travaux</span>
                                <p className="text-2xl font-semibold">{stats.budget} €</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline">
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>history</span>
                                Historique des travaux
                            </Button>
                            <Button>
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                                Ajouter
                            </Button>
                        </div>
                    </>
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
                            {groupe.items.map((travail) => (
                                <div
                                    key={travail.id}
                                    className="flex cursor-pointer items-center justify-between rounded-lg border p-3"
                                    onClick={() => router.push(`/travaux/${travail.id}`)}
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium">{travail.titre}</span>
                                        <span className="text-sm text-muted-foreground">{travail.lieu}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{travail.date}</span>
                                    <span className="text-sm underline">{travail.residents}</span>
                                    <span className="text-sm">{travail.montant} €</span>
                                    <span className="rounded-full border px-3 py-1 text-sm">
                                        {travail.heure}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
