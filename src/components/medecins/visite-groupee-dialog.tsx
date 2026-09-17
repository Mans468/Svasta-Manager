"use client";

import { useState } from "react";

import { SearchSelect } from "@/components/shared/search-select";
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
import { mockResidents, nomComplet, type MockMedecin, type MockResident } from "@/lib/mock-data";
import type { MockRdvMedical } from "@/lib/mock-rdv-medicaux";

interface LigneVisite {
    resident: MockResident | null;
    heure: string;
}

interface VisiteGroupeeDialogProps {
    medecin: MockMedecin | null;
    onClose: () => void;
    onCreate: (rdvs: MockRdvMedical[]) => void;
}

/**
 * "Jour d'arrivée groupée d'un spécialiste au centre" (cahier des charges 4.11) :
 * même médecin/date/lieu/motif, mais un créneau horaire par résident.
 */
export function VisiteGroupeeDialog({ medecin, onClose, onCreate }: VisiteGroupeeDialogProps) {
    const [motif, setMotif] = useState("");
    const [date, setDate] = useState("");
    const [lieu, setLieu] = useState("Centre Svasta, salle de soins");
    const [lignes, setLignes] = useState<LigneVisite[]>([{ resident: null, heure: "" }]);

    function reinitialiser() {
        setMotif(""); setDate(""); setLieu("Centre Svasta, salle de soins"); setLignes([{ resident: null, heure: "" }]);
    }

    function majLigne(index: number, patch: Partial<LigneVisite>) {
        setLignes((prev) => prev.map((l, i) => (i === index ? { ...l, ...patch } : l)));
    }

    function creer() {
        if (!medecin || !motif || !date) return;
        const lignesValides = lignes.filter((l) => l.resident && l.heure);
        if (lignesValides.length === 0) return;

        const visiteGroupeeId = `v-${Date.now()}`;
        const rdvs: MockRdvMedical[] = lignesValides.map((l, i) => ({
            id: `${visiteGroupeeId}-${i}`,
            medecinId: medecin.id,
            motif,
            date,
            heure: l.heure,
            lieu,
            residentId: l.resident!.id,
            visiteGroupeeId,
        }));
        onCreate(rdvs);
        reinitialiser();
        onClose();
    }

    return (
        <Dialog open={medecin !== null} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Visite groupée - {medecin && nomComplet(medecin)}</DialogTitle>
                </DialogHeader>

                <div className="flex max-h-[65vh] flex-col gap-4 overflow-y-auto pr-1">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="motif">Motif</Label>
                        <Input id="motif" value={motif} onChange={(e) => setMotif(e.target.value)} placeholder="Ex. Arrivée groupée kiné" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lieu">Lieu</Label>
                            <Input id="lieu" value={lieu} onChange={(e) => setLieu(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Résidents et créneaux</Label>
                        {lignes.map((ligne, i) => (
                            <div key={i} className="flex flex-col gap-2 rounded-lg border p-2 sm:flex-row sm:items-end sm:border-none sm:p-0">
                                <div className="flex-1">
                                    <SearchSelect
                                        options={mockResidents}
                                        value={ligne.resident}
                                        onValueChange={(r) => majLigne(i, { resident: r })}
                                        getId={(r) => r.id}
                                        getLabel={(r) => nomComplet(r)}
                                        placeholder="Résident..."
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="time"
                                        className="w-28"
                                        value={ligne.heure}
                                        onChange={(e) => majLigne(i, { heure: e.target.value })}
                                    />
                                    {lignes.length > 1 && (
                                        <button type="button" onClick={() => setLignes((prev) => prev.filter((_, idx) => idx !== i))}>
                                            <span className="material-symbols-rounded text-muted-foreground" style={{ fontSize: 18 }}>close</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <Button variant="ghost" size="sm" className="w-fit" onClick={() => setLignes((prev) => [...prev, { resident: null, heure: "" }])}>
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                            Ajouter un résident
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button onClick={creer}>Créer la visite ({lignes.filter((l) => l.resident && l.heure).length} RDV)</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
