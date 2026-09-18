"use client";

import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { heuresDepuis } from "@/lib/date-utils";
import { mockEmployes, nomComplet } from "@/lib/mock-data";

interface JournalEntree {
    id: string;
    date: string;
    creeLe: string; // ISO - sert à la règle des 24h, distinct de "date" (affichage groupé par jour)
    auteurId: string;
    titre: string;
    description: string;
}

const DELAI_SUPPRESSION_HEURES = 24;

// TODO: remplacer par un vrai fetch une fois le backend branché
const ENTREES_INITIALES: JournalEntree[] = [
    { id: "1", date: "16 janvier 2026", creeLe: "2026-01-16T09:00:00", auteurId: "3", titre: "Incident réfectoire", description: "Petit incident au réfectoire, résolu calmement." },
    { id: "2", date: "16 janvier 2026", creeLe: "2026-01-16T18:00:00", auteurId: "4", titre: "RAS", description: "Journée calme, rien à signaler." },
    { id: "3", date: "17 janvier 2026", creeLe: "2026-01-17T09:00:00", auteurId: "3", titre: "Incident réfectoire", description: "Petit incident au réfectoire, résolu calmement." },
    { id: "4", date: "18 janvier 2026", creeLe: "2026-01-18T09:00:00", auteurId: "4", titre: "RAS", description: "Journée calme, rien à signaler." },
];

function EntreeForm({
    titre, description, onTitreChange, onDescriptionChange,
}: {
    titre: string;
    description: string;
    onTitreChange: (v: string) => void;
    onDescriptionChange: (v: string) => void;
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="titre">Titre</Label>
                <Input id="titre" value={titre} onChange={(e) => onTitreChange(e.target.value)} placeholder="Ex. Incident réfectoire" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={5} value={description} onChange={(e) => onDescriptionChange(e.target.value)} />
            </div>
        </div>
    );
}

export default function Page() {
    const [entrees, setEntrees] = useState(ENTREES_INITIALES);
    const [entreeOuverte, setEntreeOuverte] = useState<JournalEntree | null>(null);
    const [modeEdition, setModeEdition] = useState(false);
    const [titreEdition, setTitreEdition] = useState("");
    const [descriptionEdition, setDescriptionEdition] = useState("");
    const [confirmSuppression, setConfirmSuppression] = useState(false);

    const [dialogCreation, setDialogCreation] = useState(false);
    const [nouveauTitre, setNouveauTitre] = useState("");
    const [nouvelleDescription, setNouvelleDescription] = useState("");

    const dates = Array.from(new Set(entrees.map((e) => e.date)));

    function ouvrir(entree: JournalEntree) {
        setEntreeOuverte(entree);
        setTitreEdition(entree.titre);
        setDescriptionEdition(entree.description);
        setModeEdition(false);
    }

    function enregistrer() {
        if (!entreeOuverte) return;
        setEntrees((prev) => prev.map((e) => (e.id === entreeOuverte.id ? { ...e, titre: titreEdition, description: descriptionEdition } : e)));
        setEntreeOuverte((e) => e && { ...e, titre: titreEdition, description: descriptionEdition });
        setModeEdition(false);
    }

    function supprimer() {
        if (!entreeOuverte) return;
        setEntrees((prev) => prev.filter((e) => e.id !== entreeOuverte.id));
        setConfirmSuppression(false);
        setEntreeOuverte(null);
    }

    function publier() {
        if (!nouveauTitre) return;
        const maintenant = new Date();
        setEntrees((prev) => [
            {
                id: String(prev.length + 1),
                date: maintenant.toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" }),
                creeLe: maintenant.toISOString(),
                auteurId: "2",
                titre: nouveauTitre,
                description: nouvelleDescription,
            },
            ...prev,
        ]);
        setNouveauTitre("");
        setNouvelleDescription("");
        setDialogCreation(false);
    }

    const peutSupprimer = entreeOuverte ? heuresDepuis(entreeOuverte.creeLe) < DELAI_SUPPRESSION_HEURES : false;

    return (
        <>
            <PageHeader
                title="Journal"
                toolbar={
                    <div className="flex justify-end">
                        <Button onClick={() => setDialogCreation(true)}>
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                            Ajouter
                        </Button>
                    </div>
                }
            />

            <div className="flex-1 overflow-auto px-6 pb-6">
                <div className="flex flex-col">
                    {dates.map((date, i) => (
                        <div key={date}>
                            {i > 0 && <div className="my-6 border-t" />}
                            <h2 className="mb-3 text-base font-semibold">{date}</h2>

                            <div className="flex flex-col gap-2">
                                {entrees.filter((e) => e.date === date).map((entree) => {
                                    const auteur = mockEmployes.find((e) => e.id === entree.auteurId);
                                    return (
                                        <button
                                            key={entree.id}
                                            onClick={() => ouvrir(entree)}
                                            className="flex flex-col gap-1 rounded-lg border p-3 text-left hover:bg-muted/50"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-5 w-5">
                                                    <AvatarFallback className="text-[10px]">
                                                        {auteur ? nomComplet(auteur).split(" ").map((p) => p[0]).join("") : "?"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium">{auteur ? nomComplet(auteur) : "Inconnu"}</span>
                                            </div>
                                            <p className="font-medium">{entree.titre}</p>
                                            <p className="line-clamp-1 text-sm text-muted-foreground">{entree.description}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={entreeOuverte !== null} onOpenChange={(o) => !o && setEntreeOuverte(null)}>
                <DialogContent showCloseButton={false}>
                    <DialogHeader className="flex-row items-center justify-between gap-3">
                        <DialogTitle className="truncate">{modeEdition ? "Modifier la note" : entreeOuverte?.titre}</DialogTitle>
                        <div className="flex shrink-0 items-center gap-1">
                            {!modeEdition && (
                                <>
                                    <Button variant="ghost" size="sm" onClick={() => setModeEdition(true)}>
                                        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>edit</span>
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive"
                                        disabled={!peutSupprimer}
                                        title={!peutSupprimer ? "Une note ne peut être supprimée que dans les 24h suivant sa création." : undefined}
                                        onClick={() => setConfirmSuppression(true)}
                                    >
                                        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>delete</span>
                                        Supprimer
                                    </Button>
                                </>
                            )}
                            <DialogClose
                                render={<button type="button" title="Fermer" />}
                                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
                            >
                                <span className="material-symbols-rounded" style={{ fontSize: 20 }}>close</span>
                            </DialogClose>
                        </div>
                    </DialogHeader>

                    {modeEdition ? (
                        <>
                            <EntreeForm titre={titreEdition} description={descriptionEdition} onTitreChange={setTitreEdition} onDescriptionChange={setDescriptionEdition} />
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setModeEdition(false)}>Annuler</Button>
                                <Button onClick={enregistrer}>Enregistrer</Button>
                            </DialogFooter>
                        </>
                    ) : (
                        entreeOuverte && (
                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-muted-foreground">
                                    {mockEmployes.find((e) => e.id === entreeOuverte.auteurId) && nomComplet(mockEmployes.find((e) => e.id === entreeOuverte.auteurId)!)} · {entreeOuverte.date}
                                </span>
                                <p className="whitespace-pre-wrap text-sm">{entreeOuverte.description}</p>
                                {!peutSupprimer && (
                                    <p className="text-xs text-muted-foreground">
                                        Cette note a plus de {DELAI_SUPPRESSION_HEURES}h : elle ne peut plus être supprimée.
                                    </p>
                                )}
                            </div>
                        )
                    )}
                </DialogContent>
            </Dialog>

            <AlertDialog open={confirmSuppression} onOpenChange={setConfirmSuppression}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer cette note ?</AlertDialogTitle>
                        <AlertDialogDescription>Cette action est définitive et ne peut pas être annulée.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={supprimer}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={dialogCreation} onOpenChange={(o) => { setDialogCreation(o); if (!o) { setNouveauTitre(""); setNouvelleDescription(""); } }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nouvelle entrée de journal</DialogTitle>
                    </DialogHeader>
                    <EntreeForm titre={nouveauTitre} description={nouvelleDescription} onTitreChange={setNouveauTitre} onDescriptionChange={setNouvelleDescription} />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogCreation(false)}>Annuler</Button>
                        <Button onClick={publier}>Publier</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
