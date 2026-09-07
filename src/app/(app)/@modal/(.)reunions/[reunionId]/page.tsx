"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

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

export default function ReunionSheet({
    params,
}: {
    params: Promise<{ reunionId: string }>;
}) {
    const { reunionId } = use(params);
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
                    <SheetTitle>Réunion {reunionId}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="titre">Titre</Label>
                        <Input id="titre" placeholder="Titre de la réunion" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            placeholder="Notes prises en réunion..."
                            rows={8}
                        />
                    </div>

                    <Button>Enregistrer</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
