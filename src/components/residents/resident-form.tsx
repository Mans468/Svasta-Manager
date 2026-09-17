"use client";

import { SearchSelect } from "@/components/shared/search-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { mockCaravanes, mockEcoles, type MockCaravane, type MockEcole } from "@/lib/mock-data";

export const STATUTS_PROCEDURE = [
    "En procédure (annexe 26)",
    "Recours en cours",
    "Protection subsidiaire",
    "Statut de réfugié reconnu",
    "22bis",
    "Sortie - Naturalisé",
    "Sortie - Changement de centre",
    "Sortie - Refus",
];

export interface ResidentFormValues {
    nom: string;
    prenom: string;
    dateNaissance: string;
    paysOrigine: string;
    langues: string;
    raisonRefuge: string;
    statutProcedure: string;
    statutResidence: "Présent" | "Parti";
    caravane: MockCaravane | null;
    ecole: MockEcole | null;
    occupation: string;
    email: string;
    telephone: string;
    numeroRegistre: string;
}

export function valeursResidentVides(): ResidentFormValues {
    return {
        nom: "", prenom: "", dateNaissance: "", paysOrigine: "", langues: "", raisonRefuge: "",
        statutProcedure: STATUTS_PROCEDURE[0], statutResidence: "Présent", caravane: null, ecole: null,
        occupation: "", email: "", telephone: "", numeroRegistre: "",
    };
}

interface ResidentFormProps {
    values: ResidentFormValues;
    onChange: (values: ResidentFormValues) => void;
    /** La modification du numéro de registre est réservée à la page Modifier complète. */
    showNumeroRegistre?: boolean;
}

/** Formulaire résident complet, réutilisé par "Ajouter" (dialog) et la page Modifier. */
export function ResidentForm({ values, onChange, showNumeroRegistre = false }: ResidentFormProps) {
    function set<K extends keyof ResidentFormValues>(key: K, value: ResidentFormValues[K]) {
        onChange({ ...values, [key]: value });
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" value={values.nom} onChange={(e) => set("nom", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input id="prenom" value={values.prenom} onChange={(e) => set("prenom", e.target.value)} />
                </div>
            </div>

            {showNumeroRegistre && (
                <div className="flex flex-col gap-2">
                    <Label htmlFor="numeroRegistre">Numéro de registre national</Label>
                    <Input id="numeroRegistre" value={values.numeroRegistre} onChange={(e) => set("numeroRegistre", e.target.value)} />
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="dateNaissance">Date de naissance</Label>
                    <Input id="dateNaissance" type="date" value={values.dateNaissance} onChange={(e) => set("dateNaissance", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="paysOrigine">Pays d&apos;origine</Label>
                    <Input id="paysOrigine" value={values.paysOrigine} onChange={(e) => set("paysOrigine", e.target.value)} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="langues">Langues parlées</Label>
                <Input id="langues" value={values.langues} onChange={(e) => set("langues", e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="raisonRefuge">Raison du refuge</Label>
                <Input id="raisonRefuge" value={values.raisonRefuge} onChange={(e) => set("raisonRefuge", e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <Label>Statut de procédure</Label>
                    <Select value={values.statutProcedure} onValueChange={(v) => set("statutProcedure", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {STATUTS_PROCEDURE.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Statut de résidence</Label>
                    <Select value={values.statutResidence} onValueChange={(v) => set("statutResidence", v as "Présent" | "Parti")}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Présent">Présent</SelectItem>
                            <SelectItem value="Parti">Parti</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label>Caravane</Label>
                <SearchSelect
                    options={mockCaravanes}
                    value={values.caravane}
                    onValueChange={(c) => set("caravane", c)}
                    getId={(c) => c.id}
                    getLabel={(c) => c.nom}
                    placeholder="Assigner une caravane..."
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="occupation">Occupation / profession</Label>
                <Input id="occupation" value={values.occupation} onChange={(e) => set("occupation", e.target.value)} placeholder="Ex. Étudiant, EVS, Sans profession déclarée..." />
            </div>

            <div className="flex flex-col gap-2">
                <Label>École (si étudiant)</Label>
                <SearchSelect
                    options={mockEcoles}
                    value={values.ecole}
                    onValueChange={(e) => set("ecole", e)}
                    getId={(e) => e.id}
                    getLabel={(e) => e.nom}
                    placeholder="Assigner une école..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={values.email} onChange={(e) => set("email", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input id="telephone" value={values.telephone} onChange={(e) => set("telephone", e.target.value)} />
                </div>
            </div>
        </div>
    );
}
