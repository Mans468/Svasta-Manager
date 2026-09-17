"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import { ResidentDetailContent } from "@/components/residents/resident-detail-content";
import { Button } from "@/components/ui/button";
import {
    Sheet,
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

    return (
        <Sheet open onOpenChange={(open) => !open && router.back()}>
            <SheetContent side="bottom" className="mx-auto flex h-[92vh] max-w-2xl flex-col gap-0 rounded-t-2xl">
                <SheetHeader className="flex-row items-center justify-between border-b pb-4">
                    <SheetTitle className="text-xl">
                        {resident ? nomComplet(resident) : "Résident"}
                    </SheetTitle>
                    {resident && (
                        <Button variant="outline" size="sm" onClick={() => router.push(`/residents/${resident.id}/modifier`)}>
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>edit</span>
                            Modifier
                        </Button>
                    )}
                </SheetHeader>

                <div className="overflow-y-auto px-1 py-4">
                    {resident ? (
                        <ResidentDetailContent resident={resident} />
                    ) : (
                        <p className="text-sm text-muted-foreground">Résident introuvable ({residentId}).</p>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
