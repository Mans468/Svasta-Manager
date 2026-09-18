"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { NavetteDetailContent } from "@/components/navettes/navette-detail-content";
import { NavetteForm, valeursDepuisNavette, type NavetteFormValues } from "@/components/navettes/navette-form";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { MOCK_NAVETTES } from "@/lib/mock-navettes";

export default function NavetteSheet({
    params,
}: {
    params: Promise<{ navetteId: string }>;
}) {
    const { navetteId } = use(params);
    const router = useRouter();
    const navette = MOCK_NAVETTES.find((n) => n.id === navetteId);

    const [modeEdition, setModeEdition] = useState(false);
    const [values, setValues] = useState<NavetteFormValues | null>(null);

    function ouvrirEdition() {
        if (!navette) return;
        setValues(valeursDepuisNavette(navette));
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
                    <SheetTitle className="truncate">{navette ? `${navette.depart} → ${navette.arrivee}` : "Navette"}</SheetTitle>
                    <div className="flex shrink-0 items-center gap-2">
                        {navette && !modeEdition && (
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
                    {!navette ? (
                        <p className="text-sm text-muted-foreground">Navette introuvable ({navetteId}).</p>
                    ) : modeEdition && values ? (
                        <div className="flex flex-col gap-4">
                            <NavetteForm values={values} onChange={setValues} />
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setModeEdition(false)}>Annuler</Button>
                                <Button onClick={enregistrer}>Enregistrer</Button>
                            </div>
                        </div>
                    ) : (
                        <NavetteDetailContent navette={navette} />
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
