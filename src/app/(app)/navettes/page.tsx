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

// TODO: remplacer par un vrai fetch une fois le backend branché
const navettes = [
    { id: "1", depart: "Centre Svasta", arrivee: "Parc Astérix", heureDepart: "13:55", dateDepart: "16/11/2025", heureArrivee: "", dateArrivee: "", chauffeur: "Natasha Smart", vehicule: "BMW 330i", terminee: false },
    { id: "2", depart: "Centre Svasta", arrivee: "Parc Astérix", heureDepart: "13:55", dateDepart: "25 Nov", heureArrivee: "14:30", dateArrivee: "25 Nov", chauffeur: "Natasha Smart", vehicule: "BMW 330i", terminee: true },
];

export default function Page() {
    const [dialogOuvert, setDialogOuvert] = useState(false);

    return (
        <>
            <PageHeader
                title="Navettes"
                toolbar={
                    <div className="flex items-center justify-between gap-3">
                        <div className="relative w-full max-w-sm">
                            <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ fontSize: 18 }}>
                                search
                            </span>
                            <Input placeholder="Rechercher..." className="pl-9" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="secondary">Prévus</Button>
                            <Button variant="ghost">Terminés</Button>
                            <Button variant="ghost">Voir tout</Button>
                            <Button variant="outline">
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>tune</span>
                                Filtres
                            </Button>
                            <Button onClick={() => setDialogOuvert(true)}>
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                                Ajouter
                            </Button>
                        </div>
                    </div>
                }
            />

            <div className="flex-1 overflow-auto px-6 pb-6">
                <div className="flex flex-col">
                    {navettes.map((navette, i) => (
                        <div
                            key={navette.id}
                            className={`flex items-center justify-between py-4 ${i > 0 ? "border-t" : ""}`}
                        >
                            <div className="flex flex-col gap-1 text-sm">
                                <span className="flex items-center gap-2">
                                    <span
                                        className={`material-symbols-rounded ${navette.terminee ? "text-emerald-600" : "text-muted-foreground"}`}
                                        style={{ fontSize: 16 }}
                                    >
                                        {navette.terminee ? "check_circle" : "location_on"}
                                    </span>
                                    {navette.depart}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span
                                        className={`material-symbols-rounded ${navette.terminee ? "text-emerald-600" : "text-muted-foreground"}`}
                                        style={{ fontSize: 16 }}
                                    >
                                        {navette.terminee ? "check_circle" : "location_on"}
                                    </span>
                                    {navette.arrivee}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>near_me</span>
                                    {navette.heureDepart} {navette.dateDepart && <span>{navette.dateDepart}</span>}
                                </span>
                                {navette.heureArrivee && (
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>flag</span>
                                        {navette.heureArrivee} {navette.dateArrivee}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>person</span>
                                    {navette.chauffeur}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>directions_car</span>
                                    {navette.vehicule}
                                </span>
                            </div>

                            <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white"
                            >
                                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_forward</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={dialogOuvert} onOpenChange={setDialogOuvert}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nouvelle navette</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="date">Date / heure</Label>
                            <Input id="date" type="datetime-local" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="chauffeur">Chauffeur</Label>
                            <Input id="chauffeur" placeholder="Employé existant ou saisie libre" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="motif">Motif</Label>
                            <Input id="motif" placeholder="Motif de la navette" />
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
