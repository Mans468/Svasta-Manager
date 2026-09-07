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

export default function ActiviteSheet({
    params,
}: {
    params: Promise<{ activiteId: string }>;
}) {
    const { activiteId } = use(params);
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
                    <SheetTitle>Activité {activiteId}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="titre">Titre</Label>
                        <Input id="titre" placeholder="Titre de l'activité" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" rows={4} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="budget">Budget (€)</Label>
                        <Input id="budget" type="number" placeholder="0" />
                    </div>

                    {/* Directeur uniquement, si statut "En attente" */}
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                            Refuser
                        </Button>
                        <Button className="flex-1">Accepter</Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
