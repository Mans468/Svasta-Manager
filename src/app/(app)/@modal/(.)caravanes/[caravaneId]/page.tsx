"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

// TODO: remplacer par un vrai fetch (caravane + résidents + signalements)
const signalements = [
    { id: "1", description: "Fuite d'eau salle de bain", statut: "Ouvert" },
    { id: "2", description: "Chauffage HS", statut: "Résolu" },
];

const residentsAssignes = [
    { id: "1", nom: "Diallo Awa" },
    { id: "2", nom: "Nazari Reza" },
];

export default function CaravaneSheet({
    params,
}: {
    params: Promise<{ caravaneId: string }>;
}) {
    const { caravaneId } = use(params);
    const router = useRouter();
    const [horsService, setHorsService] = useState(false);

    return (
        <Sheet
            open
            onOpenChange={(open) => {
                if (!open) router.back();
            }}
        >
            <SheetContent side="right" className="w-full gap-6 sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Caravane {caravaneId}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-4">
                    {/* Directeur uniquement */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Hors-service</span>
                        <Switch
                            checked={horsService}
                            onCheckedChange={setHorsService}
                        />
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Signalements</h3>
                            <Button size="sm" variant="outline">
                                + Signaler
                            </Button>
                        </div>
                        {signalements.map((signalement) => (
                            <div
                                key={signalement.id}
                                className="flex items-center justify-between rounded-md border p-2 text-sm"
                            >
                                <span>{signalement.description}</span>
                                <Badge
                                    variant={
                                        signalement.statut === "Ouvert"
                                            ? "destructive"
                                            : "secondary"
                                    }
                                >
                                    {signalement.statut}
                                </Badge>
                            </div>
                        ))}
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Résidents assignés</h3>
                            <Button size="sm" variant="outline">
                                + Ajouter
                            </Button>
                        </div>
                        {residentsAssignes.map((resident) => (
                            <div
                                key={resident.id}
                                className="flex items-center justify-between rounded-md border p-2 text-sm"
                            >
                                <span>{resident.nom}</span>
                                <Button size="sm" variant="ghost">
                                    Retirer
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
