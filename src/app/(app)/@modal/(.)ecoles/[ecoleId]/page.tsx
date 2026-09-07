"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

// TODO: remplacer par un vrai fetch
const residentsInscrits = [
    { id: "1", nom: "Diallo Awa" },
    { id: "2", nom: "Haile Sara" },
];

export default function EcoleSheet({
    params,
}: {
    params: Promise<{ ecoleId: string }>;
}) {
    const { ecoleId } = use(params);
    const router = useRouter();

    return (
        <Sheet
            open
            onOpenChange={(open) => {
                if (!open) router.back();
            }}
        >
            <SheetContent side="right" className="w-full gap-6 sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>École {ecoleId}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="nom">Nom</Label>
                        <Input id="nom" defaultValue="" placeholder="Nom de l'école" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="coordonnees">Coordonnées</Label>
                        <Input id="coordonnees" placeholder="Adresse / téléphone" />
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium">Résidents inscrits</h3>
                        {residentsInscrits.map((resident) => (
                            <div
                                key={resident.id}
                                className="rounded-md border p-2 text-sm"
                            >
                                {resident.nom}
                            </div>
                        ))}
                    </div>

                    <Button>Enregistrer</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
