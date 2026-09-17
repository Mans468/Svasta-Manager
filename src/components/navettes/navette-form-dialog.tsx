"use client";

import { useState } from "react";

import { PersonCombobox, type PersonOption } from "@/components/shared/person-combobox";
import { SearchSelect } from "@/components/shared/search-select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockEmployes, mockResidents } from "@/lib/mock-data";
import type { MockNavette } from "@/lib/mock-navettes";

interface NavetteFormDialogProps {
    open: boolean;
    onClose: () => void;
    onCreate: (navette: MockNavette) => void;
}

// Utilisé sur /navettes et en modale imbriquée depuis une activité ou un rdv.
export function NavetteFormDialog({ open, onClose, onCreate }: NavetteFormDialogProps) {
    const [depart, setDepart] = useState("Centre Svasta");
    const [arrivee, setArrivee] = useState("");
    const [date, setDate] = useState("");
    const [vehicule, setVehicule] = useState("");
    const [saisieLibre, setSaisieLibre] = useState(false);
    const [chauffeur, setChauffeur] = useState<PersonOption | null>(null);
    const [chauffeurTexte, setChauffeurTexte] = useState("");
    const [passagers, setPassagers] = useState<PersonOption[]>([]);

    function reinitialiser() {
        setDepart("Centre Svasta");
        setArrivee("");
        setDate("");
        setVehicule("");
        setSaisieLibre(false);
        setChauffeur(null);
        setChauffeurTexte("");
        setPassagers([]);
    }

    function creer() {
        if (!arrivee || !date) return;
        onCreate({
            id: `navette-${Date.now()}`,
            depart,
            arrivee,
            date,
            heureDepart: "",
            heureArrivee: "",
            vehicule,
            statut: "Prévue",
            chauffeurEmployeId: saisieLibre ? null : (chauffeur?.id ?? null),
            chauffeurExterne: saisieLibre ? chauffeurTexte : null,
            residentIds: passagers.map((p) => p.id),
        });
        reinitialiser();
        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={(o) => { if (!o) { reinitialiser(); onClose(); } }}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Nouvelle navette</DialogTitle>
                </DialogHeader>
                <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="depart">Départ</Label>
                            <Input id="depart" value={depart} onChange={(e) => setDepart(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="arrivee">Arrivée</Label>
                            <Input id="arrivee" value={arrivee} onChange={(e) => setArrivee(e.target.value)} placeholder="Lieu d'arrivée" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="date">Date / heure</Label>
                            <Input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="vehicule">Véhicule</Label>
                            <Input id="vehicule" value={vehicule} onChange={(e) => setVehicule(e.target.value)} placeholder="Ex. BMW 330i" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Label>Chauffeur</Label>
                            <div className="flex items-center gap-2">
                                <Checkbox id="saisie-libre" checked={saisieLibre} onCheckedChange={(c) => setSaisieLibre(c === true)} />
                                <Label htmlFor="saisie-libre" className="text-xs font-normal text-muted-foreground">Saisie libre (chauffeur externe)</Label>
                            </div>
                        </div>
                        {saisieLibre ? (
                            <Input value={chauffeurTexte} onChange={(e) => setChauffeurTexte(e.target.value)} placeholder="Nom du chauffeur externe" />
                        ) : (
                            <SearchSelect
                                options={mockEmployes}
                                value={chauffeur}
                                onValueChange={setChauffeur}
                                getId={(e) => e.id}
                                getLabel={(e) => `${e.prenom} ${e.nom}`}
                                placeholder="Rechercher un employé..."
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Passagers</Label>
                        <PersonCombobox
                            options={mockResidents.map((r) => ({ id: r.id, nom: `${r.prenom} ${r.nom}` }))}
                            value={passagers}
                            onValueChange={setPassagers}
                            placeholder="Ajouter des résidents"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => { reinitialiser(); onClose(); }}>Annuler</Button>
                    <Button onClick={creer}>Créer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
