"use client";

import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// TODO: remplacer par un vrai fetch (regroupé par date) une fois le backend branché
const joursDuJournal = [
    {
        date: "16 Janvier 2026",
        entrees: [
            "Petit incident au réfectoire, résolu calmement.",
            "RAS journée calme.",
        ],
    },
    {
        date: "17 Janvier 2026",
        entrees: [
            "Petit incident au réfectoire, résolu calmement.",
            "RAS journée calme.",
        ],
    },
    {
        date: "18 Janvier 2026",
        entrees: [
            "Petit incident au réfectoire, résolu calmement.",
            "RAS journée calme.",
        ],
    },
];

export default function Page() {
    const [dialogOuvert, setDialogOuvert] = useState(false);

    return (
        <>
            <PageHeader
                title="Journal"
                toolbar={
                    <div className="flex justify-end">
                        <Button onClick={() => setDialogOuvert(true)}>
                            <span
                                className="material-symbols-rounded"
                                style={{ fontSize: 16 }}
                            >
                                add
                            </span>
                            Ajouter
                        </Button>
                    </div>
                }
            />

            <div className="flex-1 overflow-auto px-6 py-6">
                <div className="flex flex-col">
                    {joursDuJournal.map((jour, i) => (
                        <div key={jour.date}>
                            {i > 0 && <div className="my-6 border-t" />}
                            <h2 className="mb-3 text-base font-semibold">
                                {jour.date}
                            </h2>
                            <div className="flex flex-col gap-2">
                                {jour.entrees.map((texte, j) => (
                                    <p key={j} className="text-sm text-muted-foreground">
                                        {texte}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={dialogOuvert} onOpenChange={setDialogOuvert}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nouvelle entrée de journal</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="texte">Note</Label>
                            <Textarea
                                id="texte"
                                rows={5}
                                placeholder="Décrire l'incident/événement..."
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="residents">Résidents tagués</Label>
                            <Input id="residents" placeholder="Rechercher des résidents..." />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOuvert(false)}>
                            Annuler
                        </Button>
                        <Button onClick={() => setDialogOuvert(false)}>Publier</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
