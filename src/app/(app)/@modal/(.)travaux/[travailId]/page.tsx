"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

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

export default function TravailSheet({
    params,
}: {
    params: Promise<{ travailId: string }>;
}) {
    const { travailId } = use(params);
    const router = useRouter();
    // TODO: initialiser depuis les vraies données
    const [statutPaye, setStatutPaye] = useState(false);

    return (
        <Sheet
            open
            onOpenChange={(open) => {
                if (!open) router.back();
            }}
        >
            <SheetContent side="right" className="w-full gap-6 sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Travail {travailId}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="titre">Titre</Label>
                        <Input id="titre" placeholder="Titre du travail" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Description du travail à réaliser..."
                            rows={5}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="montant">Montant (€)</Label>
                        <Input id="montant" type="number" placeholder="0" />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Payé</span>
                        <Button
                            variant={statutPaye ? "secondary" : "default"}
                            size="sm"
                            onClick={() => setStatutPaye((v) => !v)}
                        >
                            {statutPaye ? "Payé" : "À payer"}
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <Button className="flex-1">Enregistrer</Button>
                        <Button variant="destructive">Supprimer</Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
