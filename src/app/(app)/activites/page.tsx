"use client";

import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// TODO: remplacer par un vrai fetch une fois le backend branché
const stats = { prevues: 3, enAttente: 1, terminees: 24, budget: 2000 };

const groupes = [
    {
        jour: "Aujourd'hui",
        items: [
            { id: "1", titre: "Parc Astérix", lieu: "Les Arènes Romaines, 601...", date: "28/01/2026", residents: 19, educateurs: 4, navette: "Navettes", budget: 1250, heure: "13:55-18:30", statut: "confirmee" },
        ],
    },
    {
        jour: "Plus d'une semaine",
        items: [
            { id: "2", titre: "Uno", lieu: "Centre Svasta, Réfectoire", date: "12/02/2026", residents: 24, educateurs: 4, navette: null, budget: 0, heure: "11:00-13:00", statut: "confirmee" },
            { id: "3", titre: "Camping Les Murets", lieu: "Chem. d'Enonck 75, 4130...", date: "13/02/2026 - 15/02/2026", residents: 4, educateurs: 1, navette: "BMW 330i", budget: 450, heure: "08:30-...", statut: "en_attente" },
        ],
    },
];

export default function Page() {
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="Activités"
                toolbar={
                    <>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="rounded-xl bg-emerald-50 px-5 py-3">
                                <span className="text-sm text-emerald-700">
                                    Activités prévues
                                </span>
                                <p className="text-2xl font-semibold text-emerald-700">
                                    {stats.prevues}
                                </p>
                            </div>
                            <div className="rounded-xl bg-amber-50 px-5 py-3">
                                <span className="text-sm text-amber-700">
                                    Activités en attente
                                </span>
                                <p className="text-2xl font-semibold text-amber-700">
                                    {stats.enAttente}
                                </p>
                            </div>
                            <div className="rounded-xl border px-5 py-3">
                                <span className="text-sm text-muted-foreground">
                                    Activités terminées
                                </span>
                                <p className="text-2xl font-semibold">
                                    {stats.terminees}
                                </p>
                            </div>
                            <div className="rounded-xl border px-5 py-3">
                                <span className="text-sm text-muted-foreground">
                                    Budget activités
                                </span>
                                <p className="text-2xl font-semibold">
                                    {stats.budget} €
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline">
                                <span
                                    className="material-symbols-rounded"
                                    style={{ fontSize: 16 }}
                                >
                                    history
                                </span>
                                Historique des activités
                            </Button>
                            <Button>
                                <span
                                    className="material-symbols-rounded"
                                    style={{ fontSize: 16 }}
                                >
                                    add
                                </span>
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
                            <span className="text-sm text-muted-foreground">
                                {groupe.jour}
                            </span>
                            <div className="h-px flex-1 bg-border" />
                        </div>

                        <div className="flex flex-col gap-2">
                            {groupe.items.map((activite) => (
                                <div
                                    key={activite.id}
                                    className={`flex items-center justify-between rounded-lg border p-3 ${
                                        activite.statut === "en_attente"
                                            ? "border-amber-300"
                                            : ""
                                    }`}
                                >
                                    <div
                                        className="flex cursor-pointer flex-col"
                                        onClick={() =>
                                            router.push(
                                                `/activites/${activite.id}`,
                                            )
                                        }
                                    >
                                        <span className="flex items-center gap-2 font-medium">
                                            {activite.titre}
                                            {activite.statut ===
                                                "en_attente" && (
                                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                                                    En attente
                                                </Badge>
                                            )}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {activite.lieu}
                                        </span>
                                    </div>

                                    <span className="text-sm text-muted-foreground">
                                        {activite.date}
                                    </span>
                                    <span className="text-sm underline">
                                        {activite.residents} résidents
                                    </span>
                                    <span className="text-sm underline">
                                        {activite.educateurs} éducateurs
                                    </span>
                                    <span className="text-sm underline">
                                        {activite.navette ?? "-"}
                                    </span>
                                    <span className="text-sm">
                                        {activite.budget} €
                                    </span>

                                    {activite.statut === "en_attente" ? (
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                Refuser
                                            </Button>
                                            <Button size="sm">Accepter</Button>
                                        </div>
                                    ) : (
                                        <Badge variant="secondary">
                                            {activite.heure}
                                        </Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
