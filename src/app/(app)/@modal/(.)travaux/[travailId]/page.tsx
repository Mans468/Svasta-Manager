"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { TRAVAUX_INITIAUX } from "@/app/(app)/travaux/page";
import { PersonLink } from "@/components/shared/person-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { mockResidents, nomComplet } from "@/lib/mock-data";

export default function TravailSheet({
    params,
}: {
    params: Promise<{ travailId: string }>;
}) {
    const { travailId } = use(params);
    const router = useRouter();
    const travail = TRAVAUX_INITIAUX.find((t) => t.id === travailId);
    const resident = travail ? mockResidents.find((r) => r.id === travail.residentId) : null;
    const [statutPaye, setStatutPaye] = useState(travail?.statut === "Payé");

    return (
        <Sheet open onOpenChange={(open) => !open && router.back()}>
            <SheetContent side="right" className="w-full gap-6 sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>{travail?.titre ?? "Travail"}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-4">
                    {travail ? (
                        <>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="titre">Titre</Label>
                                <Input id="titre" defaultValue={travail.titre} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" rows={4} placeholder="Description du travail à réaliser..." />
                            </div>

                            <div className="flex flex-col gap-2 text-sm">
                                <span className="text-muted-foreground">Résident</span>
                                {resident && <PersonLink id={resident.id} nom={nomComplet(resident)} type="resident" />}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="montant">Montant (€)</Label>
                                <Input id="montant" type="number" defaultValue={travail.montant} />
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Statut</span>
                                <Button variant={statutPaye ? "secondary" : "default"} size="sm" onClick={() => setStatutPaye((v) => !v)}>
                                    {statutPaye ? "Payé" : "À payer"}
                                </Button>
                            </div>

                            <div className="flex gap-2">
                                <Button className="flex-1">Enregistrer</Button>
                                <Button variant="destructive">Supprimer</Button>
                            </div>
                        </>
                    ) : (
                        <p className="text-sm text-muted-foreground">Travail introuvable ({travailId}).</p>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
