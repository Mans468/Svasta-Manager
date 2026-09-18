"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { ResidentDetailContent } from "@/components/residents/resident-detail-content";
import { ResidentForm, valeursDepuisResident, type ResidentFormValues } from "@/components/residents/resident-form";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { mockResidents, nomComplet } from "@/lib/mock-data";

export default function ResidentSheet({
    params,
}: {
    params: Promise<{ residentId: string }>;
}) {
    const { residentId } = use(params);
    const router = useRouter();
    const resident = mockResidents.find((r) => r.id === residentId);

    const [modeEdition, setModeEdition] = useState(false);
    const [values, setValues] = useState<ResidentFormValues | null>(null);

    function ouvrirEdition() {
        if (!resident) return;
        setValues(valeursDepuisResident(resident));
        setModeEdition(true);
    }

    function enregistrer() {
        // TODO: mutation Prisma une fois le backend branché
        setModeEdition(false);
    }

    return (
        <Sheet open onOpenChange={(open) => !open && router.back()}>
            <SheetContent side="right" showCloseButton={false} className="flex w-full flex-col gap-0 sm:max-w-lg">
                <SheetHeader className="flex-row items-center justify-between gap-3 border-b px-6 py-4">
                    <SheetTitle className="truncate">{resident ? nomComplet(resident) : "Résident"}</SheetTitle>
                    <div className="flex shrink-0 items-center gap-2">
                        {resident && !modeEdition && (
                            <Button variant="outline" size="sm" onClick={ouvrirEdition}>
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>edit</span>
                                Modifier
                            </Button>
                        )}
                        <SheetClose
                            render={<button type="button" title="Fermer" />}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
                        >
                            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>close</span>
                        </SheetClose>
                    </div>
                </SheetHeader>

                <div className="overflow-y-auto px-6 py-4">
                    {!resident ? (
                        <p className="text-sm text-muted-foreground">Résident introuvable ({residentId}).</p>
                    ) : modeEdition && values ? (
                        <div className="flex flex-col gap-4">
                            <ResidentForm values={values} onChange={setValues} showNumeroRegistre />
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setModeEdition(false)}>Annuler</Button>
                                <Button onClick={enregistrer}>Enregistrer</Button>
                            </div>
                        </div>
                    ) : (
                        <ResidentDetailContent resident={resident} />
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
