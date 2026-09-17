"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { PersonLink } from "@/components/shared/person-link";
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
import { mockResidents, nomComplet } from "@/lib/mock-data";

export interface Reunion {
    id: string;
    titre: string;
    type: "Quotidienne" | "Hebdomadaire" | "Spéciale";
    lieu: string;
    jour: string;
    heure: string;
    presenceObligatoire: boolean;
    residentConcerneId?: string;
}

// TODO: remplacer par un vrai fetch une fois le backend branché
export const REUNIONS_INITIALES: Reunion[] = [
    { id: "1", titre: "Réunion quotidienne", type: "Quotidienne", lieu: "Salle de réunion", jour: "Aujourd'hui", heure: "9:00-10:00", presenceObligatoire: false },
    { id: "2", titre: "Suivi Jean Malik", type: "Spéciale", lieu: "Bureau du Directeur", jour: "Aujourd'hui", heure: "17:00-18:00", presenceObligatoire: false, residentConcerneId: "4" },
    { id: "3", titre: "Réunion quotidienne", type: "Quotidienne", lieu: "Salle de réunion", jour: "Demain", heure: "9:00-10:00", presenceObligatoire: false },
    { id: "4", titre: "Point équipe hebdomadaire", type: "Hebdomadaire", lieu: "Réfectoire", jour: "Demain", heure: "17:00-18:00", presenceObligatoire: true },
];

const TYPE_STYLE: Record<Reunion["type"], string> = {
    Quotidienne: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    Hebdomadaire: "bg-violet-100 text-violet-700 hover:bg-violet-100",
    Spéciale: "bg-amber-100 text-amber-700 hover:bg-amber-100",
};

export default function Page() {
    const router = useRouter();
    const [reunions, setReunions] = useState(REUNIONS_INITIALES);
    const [dialogOuvert, setDialogOuvert] = useState(false);
    const [titre, setTitre] = useState("");
    const [lieu, setLieu] = useState("");
    const [date, setDate] = useState("");

    const groupes = Array.from(new Set(reunions.map((r) => r.jour))).map((jour) => ({
        jour,
        reunions: reunions.filter((r) => r.jour === jour),
    }));

    function creer() {
        if (!titre || !date) return;
        setReunions((prev) => [
            ...prev,
            {
                id: String(prev.length + 1),
                titre,
                type: "Spéciale",
                lieu: lieu || "À définir",
                jour: date,
                heure: "",
                presenceObligatoire: false,
            },
        ]);
        setTitre("");
        setLieu("");
        setDate("");
        setDialogOuvert(false);
    }

    return (
        <>
            <PageHeader
                title="Réunions"
                toolbar={
                    <div className="flex justify-end">
                        <Button onClick={() => setDialogOuvert(true)}>
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                            Ajouter
                        </Button>
                    </div>
                }
            />

            <div className="flex-1 overflow-auto px-6 pb-6">
                {groupes.map((groupe) => (
                    <div key={groupe.jour} className="mb-6">
                        <div className="mb-2 flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{groupe.jour}</span>
                            <div className="h-px flex-1 bg-border" />
                        </div>

                        <div className="flex flex-col gap-2">
                            {groupe.reunions.map((reunion) => {
                                const residentConcerne = mockResidents.find((r) => r.id === reunion.residentConcerneId);
                                return (
                                    <div
                                        key={reunion.id}
                                        onClick={() => router.push(`/reunions/${reunion.id}`)}
                                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-muted/50 ${
                                            reunion.presenceObligatoire ? "border-rose-300" : ""
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Badge className={TYPE_STYLE[reunion.type]}>{reunion.type}</Badge>
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {reunion.titre}
                                                    {residentConcerne && (
                                                        <span className="ml-1 font-normal text-muted-foreground">
                                                            —{" "}
                                                            <PersonLink id={residentConcerne.id} nom={nomComplet(residentConcerne)} type="resident" />
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="text-sm text-muted-foreground">{reunion.lieu}</span>
                                            </div>
                                            {reunion.presenceObligatoire && (
                                                <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">
                                                    <span className="material-symbols-rounded" style={{ fontSize: 14 }}>warning</span>
                                                    Présence obligatoire
                                                </Badge>
                                            )}
                                        </div>
                                        <Badge variant="secondary">{reunion.heure || "Heure à définir"}</Badge>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={dialogOuvert} onOpenChange={setDialogOuvert}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nouvelle réunion</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="titre">Titre</Label>
                            <Input id="titre" value={titre} onChange={(e) => setTitre(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lieu">Lieu</Label>
                            <Input id="lieu" value={lieu} onChange={(e) => setLieu(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="date">Date / heure</Label>
                            <Input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOuvert(false)}>Annuler</Button>
                        <Button onClick={creer}>Créer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
