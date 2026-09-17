"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { REUNIONS_INITIALES } from "@/lib/mock-reunions";
import { ReunionDetailContent } from "@/components/reunions/reunion-detail-content";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

export default function ReunionSheet({
    params,
}: {
    params: Promise<{ reunionId: string }>;
}) {
    const { reunionId } = use(params);
    const router = useRouter();
    const reunion = REUNIONS_INITIALES.find((r) => r.id === reunionId);
    const [notes, setNotes] = useState("");

    return (
        <Sheet open onOpenChange={(open) => !open && router.back()}>
            <SheetContent side="right" className="w-full gap-6 sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>{reunion?.titre ?? "Réunion"}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-4">
                    {reunion ? (
                        <>
                            <ReunionDetailContent reunion={reunion} />
                            <Separator />
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-medium">Notes de réunion</span>
                                <Textarea
                                    rows={8}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Notes prises en réunion..."
                                />
                                <Button className="w-fit">Enregistrer</Button>
                            </div>
                        </>
                    ) : (
                        <p className="text-sm text-muted-foreground">Réunion introuvable ({reunionId}).</p>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
