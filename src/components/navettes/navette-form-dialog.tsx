"use client";

import { useState } from "react";

import { NavetteForm, valeursNavetteVides } from "@/components/navettes/navette-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { MockNavette } from "@/lib/mock-navettes";

interface NavetteFormDialogProps {
    open: boolean;
    onClose: () => void;
    onCreate: (navette: MockNavette) => void;
}

// Utilisé sur /navettes et en modale imbriquée depuis une activité ou un rdv.
export function NavetteFormDialog({ open, onClose, onCreate }: NavetteFormDialogProps) {
    const [values, setValues] = useState(valeursNavetteVides());

    function creer() {
        if (!values.arrivee || !values.date) return;
        onCreate({
            id: `navette-${Date.now()}`,
            depart: values.depart,
            arrivee: values.arrivee,
            date: values.date,
            heureDepart: "",
            heureArrivee: "",
            vehicule: values.vehicule,
            statut: "Prévue",
            chauffeurEmployeId: values.saisieLibre ? null : (values.chauffeur?.id ?? null),
            chauffeurExterne: values.saisieLibre ? values.chauffeurTexte : null,
            residentIds: values.passagers.map((p) => p.id),
        });
        setValues(valeursNavetteVides());
        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={(o) => { if (!o) { setValues(valeursNavetteVides()); onClose(); } }}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Nouvelle navette</DialogTitle>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto pr-1">
                    <NavetteForm values={values} onChange={setValues} />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => { setValues(valeursNavetteVides()); onClose(); }}>Annuler</Button>
                    <Button onClick={creer}>Créer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
