"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import { ACTIVITES_INITIALES } from "@/app/(app)/activites/page";
import { ActiviteDetailContent } from "@/components/activites/activite-detail-content";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

export default function ActiviteSheet({
    params,
}: {
    params: Promise<{ activiteId: string }>;
}) {
    const { activiteId } = use(params);
    const router = useRouter();
    const activite = ACTIVITES_INITIALES.find((a) => a.id === activiteId);

    return (
        <Sheet open onOpenChange={(open) => !open && router.back()}>
            <SheetContent side="right" className="w-full gap-6 sm:max-w-lg">
                <SheetHeader className="flex-row items-center justify-between">
                    <SheetTitle>{activite?.titre ?? "Activité"}</SheetTitle>
                    {activite && (
                        <Button variant="outline" size="sm" onClick={() => router.push(`/activites?modifier=${activite.id}`)}>
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>edit</span>
                            Modifier
                        </Button>
                    )}
                </SheetHeader>
                <div className="px-4">
                    {activite ? (
                        <ActiviteDetailContent activite={activite} />
                    ) : (
                        <p className="text-sm text-muted-foreground">Activité introuvable ({activiteId}).</p>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
