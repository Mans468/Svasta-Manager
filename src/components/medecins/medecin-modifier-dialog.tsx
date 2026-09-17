"use client";

import { useEffect, useState } from "react";

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
import type { MockMedecin } from "@/lib/mock-data";

interface MedecinModifierDialogProps {
    medecin: MockMedecin | null;
    onClose: () => void;
    onSave: (medecin: MockMedecin) => void;
}

export function MedecinModifierDialog({ medecin, onClose, onSave }: MedecinModifierDialogProps) {
    const [form, setForm] = useState<MockMedecin | null>(null);

    useEffect(() => setForm(medecin), [medecin]);

    if (!form) return null;

    return (
        <Dialog open={medecin !== null} onOpenChange={(o) => !o && onClose()}>
            <DialogContent>
                <DialogHeader><DialogTitle>Modifier la fiche</DialogTitle></DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="nom">Nom</Label>
                            <Input id="nom" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="prenom">Prénom</Label>
                            <Input id="prenom" value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="specialisation">Spécialisation</Label>
                        <Input id="specialisation" value={form.specialisation} onChange={(e) => setForm({ ...form, specialisation: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="telephone">Téléphone</Label>
                        <Input id="telephone" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="adresse">Adresse du cabinet</Label>
                        <Input id="adresse" value={form.adresseCabinet} onChange={(e) => setForm({ ...form, adresseCabinet: e.target.value })} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button onClick={() => { onSave(form); onClose(); }}>Enregistrer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
