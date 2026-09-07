"use client";

import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
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

// TODO: remplacer par un vrai fetch une fois le backend branché
const rdvAdmin = [
    { id: "1", resident: "Diallo Awa", categorie: "Avocat", date: "2026-09-05" },
    { id: "2", resident: "Nazari Reza", categorie: "Tribunal", date: "2026-09-10" },
];

export default function Page() {
    const [dialogOuvert, setDialogOuvert] = useState(false);

    return (
        <>
            <PageHeader
                title="Rendez-vous juridiques / administratifs"
                toolbar={
                    <div className="flex justify-end">
                        {/* Assistant */}
                        <Button onClick={() => setDialogOuvert(true)}>
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                            Ajouter
                        </Button>
                    </div>
                }
            />

            <div className="flex-1 overflow-auto px-6 pb-6">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-muted-foreground">
                            <th className="py-2 font-normal">Résident</th>
                            <th className="py-2 font-normal">Catégorie</th>
                            <th className="py-2 font-normal">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rdvAdmin.map((rdv) => (
                            <tr key={rdv.id} className="border-t">
                                <td className="py-3">{rdv.resident}</td>
                                <td className="py-3">
                                    <Badge variant="secondary">{rdv.categorie}</Badge>
                                </td>
                                <td className="py-3">{rdv.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={dialogOuvert} onOpenChange={setDialogOuvert}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nouveau rendez-vous</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="resident">Résident</Label>
                            <Input id="resident" placeholder="Rechercher un résident" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="categorie">Catégorie</Label>
                            <Input id="categorie" placeholder="Avocat / Tribunal / Administratif / Autre" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="date">Date / heure</Label>
                            <Input id="date" type="datetime-local" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lieu">Lieu</Label>
                            <Input id="lieu" placeholder="Lieu du rendez-vous" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOuvert(false)}>Annuler</Button>
                        <Button onClick={() => setDialogOuvert(false)}>Créer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
