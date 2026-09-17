"use client";

import { useEffect, useState } from "react";

import { PersonCombobox, type PersonOption } from "@/components/shared/person-combobox";
import { SearchSelect } from "@/components/shared/search-select";
import { NavetteFormDialog } from "@/components/navettes/navette-form-dialog";
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
import { mockEmployes, mockMedecins, mockResidents, nomComplet, type MockMedecin } from "@/lib/mock-data";
import { MOCK_NAVETTES, type MockNavette } from "@/lib/mock-navettes";
import { LABEL_PAR_TYPE, type CalendarEvent, type EvenementType } from "@/lib/agenda/types";

const residentOptions: PersonOption[] = mockResidents.map((r) => ({ id: r.id, nom: nomComplet(r) }));
const employeOptions: PersonOption[] = mockEmployes.map((e) => ({ id: e.id, nom: nomComplet(e) }));

interface CreateEventDialogProps {
    type: EvenementType | null;
    evenementExistant?: CalendarEvent | null;
    onClose: () => void;
    onCreate: (event: CalendarEvent) => void;
}

// Formulaire générique création/édition, utilisé pour Activité/Réunion/Rendez-vous/Autre.
export function CreateEventDialog({ type, evenementExistant, onClose, onCreate }: CreateEventDialogProps) {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [lieu, setLieu] = useState("");
    const [date, setDate] = useState("");
    const [heureDebut, setHeureDebut] = useState("");
    const [heureFin, setHeureFin] = useState("");
    const [residents, setResidents] = useState<PersonOption[]>([]);
    const [employes, setEmployes] = useState<PersonOption[]>([]);
    const [medecin, setMedecin] = useState<MockMedecin | null>(null);
    const [navette, setNavette] = useState<MockNavette | null>(null);
    const [navettes, setNavettes] = useState<MockNavette[]>(MOCK_NAVETTES);
    const [dialogNavetteOuvert, setDialogNavetteOuvert] = useState(false);

    useEffect(() => {
        if (!type) return;
        if (evenementExistant) {
            setTitre(evenementExistant.titre);
            setDescription(evenementExistant.description ?? "");
            setLieu(evenementExistant.lieu ?? "");
            setDate(evenementExistant.start.slice(0, 10));
            setHeureDebut(evenementExistant.start.slice(11, 16));
            setHeureFin(evenementExistant.end.slice(11, 16));
            setResidents(mockResidents.filter((r) => evenementExistant.residentIds.includes(r.id)).map((r) => ({ id: r.id, nom: nomComplet(r) })));
            setEmployes(mockEmployes.filter((e) => evenementExistant.employeIds.includes(e.id)).map((e) => ({ id: e.id, nom: nomComplet(e) })));
            setMedecin(mockMedecins.find((m) => m.id === evenementExistant.medecinId) ?? null);
            setNavette(navettes.find((n) => n.id === evenementExistant.navetteId) ?? null);
            return;
        }
        setTitre("");
        setDescription("");
        setLieu("");
        setDate("");
        setHeureDebut("");
        setHeureFin("");
        setResidents([]);
        setEmployes([]);
        setMedecin(null);
        setNavette(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, evenementExistant]);

    if (!type) return null;

    function navetteCreee(nouvelle: MockNavette) {
        setNavettes((prev) => [nouvelle, ...prev]);
        setNavette(nouvelle);
        setDialogNavetteOuvert(false);
    }

    function creer() {
        if (!type || !titre || !date || !heureDebut) return;

        onCreate({
            id: evenementExistant?.id ?? `${type}-${crypto.randomUUID()}`,
            type,
            titre,
            description,
            lieu,
            medecinId: type === "rendez-vous" ? medecin?.id : undefined,
            navetteId: navette?.id,
            start: `${date}T${heureDebut}:00`,
            end: `${date}T${heureFin || heureDebut}:00`,
            residentIds: residents.map((r) => r.id),
            employeIds: employes.map((e) => e.id),
        });
        onClose();
    }

    return (
        <>
        <Dialog open={!dialogNavetteOuvert} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{evenementExistant ? "Modifier" : "Nouveau"} : {LABEL_PAR_TYPE[type]}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="titre">Titre</Label>
                        <Input id="titre" value={titre} onChange={(e) => setTitre(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="lieu">Lieu</Label>
                        <Input id="lieu" value={lieu} onChange={(e) => setLieu(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="heureDebut">Début</Label>
                            <Input id="heureDebut" type="time" value={heureDebut} onChange={(e) => setHeureDebut(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="heureFin">Fin</Label>
                            <Input id="heureFin" type="time" value={heureFin} onChange={(e) => setHeureFin(e.target.value)} />
                        </div>
                    </div>

                    {type === "rendez-vous" && (
                        <div className="flex flex-col gap-2">
                            <Label>Médecin</Label>
                            <SearchSelect
                                options={mockMedecins}
                                value={medecin}
                                onValueChange={setMedecin}
                                getId={(m) => m.id}
                                getLabel={(m) => `${m.prenom} ${m.nom} - ${m.specialisation}`}
                                placeholder="Rechercher un médecin..."
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Label>Navette</Label>
                            <Button type="button" variant="ghost" size="sm" onClick={() => setDialogNavetteOuvert(true)}>
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                                Nouvelle navette
                            </Button>
                        </div>
                        <SearchSelect
                            options={navettes}
                            value={navette}
                            onValueChange={setNavette}
                            getId={(n) => n.id}
                            getLabel={(n) => `${n.depart} -> ${n.arrivee}`}
                            placeholder="Aucune navette liée"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Résidents concernés</Label>
                        <PersonCombobox options={residentOptions} value={residents} onValueChange={setResidents} placeholder="Ajouter des résidents" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Employés concernés</Label>
                        <PersonCombobox options={employeOptions} value={employes} onValueChange={setEmployes} placeholder="Ajouter des employés" />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button onClick={creer}>{evenementExistant ? "Enregistrer" : "Créer"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <NavetteFormDialog
            open={dialogNavetteOuvert}
            onClose={() => setDialogNavetteOuvert(false)}
            onCreate={navetteCreee}
        />
        </>
    );
}
