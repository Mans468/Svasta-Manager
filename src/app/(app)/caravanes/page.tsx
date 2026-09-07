"use client";

import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// TODO: remplacer par un vrai fetch une fois le backend branché
const caravanes = [
    {
        id: "1",
        nom: "A01",
        residents: [
            "Dupont Jean",
            "Marc Farceur",
            "Marc Farceur",
            "Marc Farceur",
            "Marc Farceur",
        ],
        probleme: "Fuite d'eau signalé",
    },
    {
        id: "2",
        nom: "A02",
        residents: [
            "Dupont Jean",
            "Marc Farceur",
            "Marc Farceur",
            "Marc Farceur",
            "Marc Farceur",
        ],
    },
    {
        id: "3",
        nom: "A03",
        residents: [
            "Dupont Jean",
            "Marc Farceur",
            "Marc Farceur",
            "Marc Farceur",
            "Marc Farceur",
        ],
    },
    {
        id: "4",
        nom: "A04",
        residents: [
            "Dupont Jean",
            "Marc Farceur",
            "Marc Farceur",
            "Marc Farceur",
            "Marc Farceur",
        ],
    },
];

export default function Page() {
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="Caravanes"
                toolbar={
                    <div className="flex items-center justify-between gap-3">
                        <div className="relative w-full max-w-sm">
                            <span
                                className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                style={{ fontSize: 18 }}
                            >
                                search
                            </span>
                            <Input
                                placeholder="Rechercher..."
                                className="pl-9"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="secondary">Mes caravanes</Button>
                            <Button variant="ghost">Voir tout</Button>
                            <Button variant="outline">
                                <span
                                    className="material-symbols-rounded"
                                    style={{ fontSize: 16 }}
                                >
                                    tune
                                </span>
                                Filtres
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
                    </div>
                }
            />

            <div className="flex-1 overflow-auto p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {caravanes.map((caravane) => (
                        <div
                            key={caravane.id}
                            className="flex cursor-pointer flex-col gap-3 rounded-xl border p-4"
                            onClick={() =>
                                router.push(`/caravanes/${caravane.id}`)
                            }
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">
                                    {caravane.nom}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                                        Signaler
                                    </span>
                                    <span
                                        className="material-symbols-rounded text-muted-foreground"
                                        style={{ fontSize: 18 }}
                                    >
                                        edit
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {caravane.residents.map((nom, i) => (
                                    <span
                                        key={i}
                                        className="truncate rounded-lg border px-3 py-1.5 text-sm"
                                    >
                                        {nom}
                                    </span>
                                ))}
                            </div>

                            {caravane.probleme && (
                                <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                                    <span
                                        className="material-symbols-rounded"
                                        style={{ fontSize: 16 }}
                                    >
                                        warning
                                    </span>
                                    {caravane.probleme}
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {caravane.residents
                                        .slice(0, 2)
                                        .map((nom, i) => (
                                            <Avatar
                                                key={i}
                                                className="h-6 w-6 border-2 border-background"
                                            >
                                                <AvatarFallback className="text-[10px]">
                                                    {nom
                                                        .split(" ")
                                                        .map((p) => p[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                        ))}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {caravane.residents.slice(0, 2).join(", ")}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
