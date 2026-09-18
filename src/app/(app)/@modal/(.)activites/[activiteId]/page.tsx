"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import { ACTIVITES_INITIALES } from "@/app/(app)/activites/page";
import { ActiviteDetailContent } from "@/components/activites/activite-detail-content";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
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
            <SheetContent side="right" showCloseButton={false} className="flex w-full flex-col gap-0 sm:max-w-lg">
                <SheetHeader className="flex-row items-center justify-between gap-3 border-b px-6 py-4">
                    <SheetTitle className="truncate">{activite?.titre ?? "Activité"}</SheetTitle>
                    <div className="flex shrink-0 items-center gap-2">
                        {activite && (
                            <Button variant="outline" size="sm" onClick={() => router.push(`/activites?modifier=${activite.id}`)}>
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
