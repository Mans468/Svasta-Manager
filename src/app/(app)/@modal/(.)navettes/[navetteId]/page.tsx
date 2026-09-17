"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import { NavetteDetailContent } from "@/components/navettes/navette-detail-content";
import {
    Sheet,
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

    return (
        <Sheet open onOpenChange={(open) => !open && router.back()}>
            <SheetContent side="right" className="w-full gap-6 sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>{navette ? `${navette.depart} → ${navette.arrivee}` : "Navette"}</SheetTitle>
                </SheetHeader>
                <div className="px-4">
                    {navette ? (
                        <NavetteDetailContent navette={navette} />
                    ) : (
                        <p className="text-sm text-muted-foreground">Navette introuvable ({navetteId}).</p>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
