"use client";

import { PersonCombobox, type PersonOption } from "@/components/shared/person-combobox";
import { SearchSelect } from "@/components/shared/search-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockEmployes, mockResidents } from "@/lib/mock-data";
import type { MockNavette } from "@/lib/mock-navettes";

export interface NavetteFormValues {
    depart: string;
    arrivee: string;
    date: string;
    vehicule: string;
    saisieLibre: boolean;
    chauffeur: PersonOption | null;
    chauffeurTexte: string;
    passagers: PersonOption[];
}

export function valeursNavetteVides(): NavetteFormValues {
    return {
        depart: "Centre Svasta", arrivee: "", date: "", vehicule: "",
        saisieLibre: false, chauffeur: null, chauffeurTexte: "", passagers: [],
    };
}

export function valeursDepuisNavette(navette: MockNavette): NavetteFormValues {
    const [jour, mois, annee] = navette.date.split("/");
    const dateISO = annee ? `${annee}-${mois}-${jour}T${navette.heureDepart || "00:00"}` : "";
    return {
        depart: navette.depart,
        arrivee: navette.arrivee,
        date: dateISO,
        vehicule: navette.vehicule,
        saisieLibre: !navette.chauffeurEmployeId && !!navette.chauffeurExterne,
        chauffeur: mockEmployes.find((e) => e.id === navette.chauffeurEmployeId) ?? null,
        chauffeurTexte: navette.chauffeurExterne ?? "",
        passagers: mockResidents.filter((r) => navette.residentIds.includes(r.id)).map((r) => ({ id: r.id, nom: `${r.prenom} ${r.nom}` })),
    };
}

interface NavetteFormProps {
    values: NavetteFormValues;
    onChange: (values: NavetteFormValues) => void;
}

// Utilisé par NavetteFormDialog (création) et la sidesheet navette (édition).
export function NavetteForm({ values, onChange }: NavetteFormProps) {
    function set<K extends keyof NavetteFormValues>(key: K, value: NavetteFormValues[K]) {
        onChange({ ...values, [key]: value });
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="depart">Départ</Label>
                    <Input id="depart" value={values.depart} onChange={(e) => set("depart", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="arrivee">Arrivée</Label>
                    <Input id="arrivee" value={values.arrivee} onChange={(e) => set("arrivee", e.target.value)} placeholder="Lieu d'arrivée" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="date">Date / heure</Label>
                    <Input id="date" type="datetime-local" value={values.date} onChange={(e) => set("date", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="vehicule">Véhicule</Label>
                    <Input id="vehicule" value={values.vehicule} onChange={(e) => set("vehicule", e.target.value)} placeholder="Ex. BMW 330i" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <Label>Chauffeur</Label>
                    <div className="flex items-center gap-2">
                        <Checkbox id="saisie-libre" checked={values.saisieLibre} onCheckedChange={(c) => set("saisieLibre", c === true)} />
                        <Label htmlFor="saisie-libre" className="text-xs font-normal text-muted-foreground">Saisie libre (chauffeur externe)</Label>
                    </div>
                </div>
                {values.saisieLibre ? (
                    <Input value={values.chauffeurTexte} onChange={(e) => set("chauffeurTexte", e.target.value)} placeholder="Nom du chauffeur externe" />
                ) : (
                    <SearchSelect
                        options={mockEmployes}
                        value={values.chauffeur}
                        onValueChange={(c) => set("chauffeur", c)}
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
                    value={values.passagers}
                    onValueChange={(p) => set("passagers", p)}
                    placeholder="Ajouter des résidents"
                />
            </div>
        </div>
    );
}
