"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { FilterField, FiltersPopover } from "@/components/shared/filters-popover";
import { PersonLink } from "@/components/shared/person-link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { mockCaravanes, mockEmployes, mockResidents, nomComplet, type MockCaravane } from "@/lib/mock-data";

const FILTER_FIELDS: FilterField[] = [
    { key: "statut", label: "Statut", options: [{ value: "Disponible", label: "Disponible" }, { value: "Non-disponible", label: "Non-disponible" }] },
];

// À remplacer par l'utilisateur connecté une fois Clerk branché
const EMPLOYE_COURANT_ID = "3";

export default function Page() {
    const router = useRouter();
    const [caravanes, setCaravanes] = useState<MockCaravane[]>(mockCaravanes);
    const [onglet, setOnglet] = useState<"mes" | "toutes">("mes");
    const [recherche, setRecherche] = useState("");
    const [filtres, setFiltres] = useState<Record<string, string>>({});
    const [dialogAjout, setDialogAjout] = useState(false);
    const [dialogSignalement, setDialogSignalement] = useState<string | null>(null);
    const [nom, setNom] = useState("");
    const [capacite, setCapacite] = useState("");
    const [descriptionProbleme, setDescriptionProbleme] = useState("");

    const visibles = useMemo(() => {
        return caravanes.filter((c) => {
            if (onglet === "mes" && !c.responsableIds.includes(EMPLOYE_COURANT_ID)) return false;
            if (filtres.statut && c.statut !== filtres.statut) return false;
            if (recherche && !c.nom.toLowerCase().includes(recherche.toLowerCase())) return false;
            return true;
        });
    }, [caravanes, onglet, filtres, recherche]);

    function ajouterCaravane() {
        if (!nom) return;
        setCaravanes((prev) => [
            ...prev,
            { id: String(prev.length + 1), nom, capaciteMax: Number(capacite) || 5, statut: "Disponible", responsableIds: [] },
        ]);
        setNom("");
        setCapacite("");
        setDialogAjout(false);
    }

    function signaler() {
        // TODO: les signalements sont gérés par caravane dans la sidesheet - ici on
        // se contente de rediriger vers la fiche pour compléter le formulaire complet.
        if (!dialogSignalement) return;
        router.push(`/caravanes/${dialogSignalement}`);
        setDialogSignalement(null);
    }

    return (
        <>
            <PageHeader
                title="Caravanes"
                toolbar={
                    <div className="flex items-center justify-between gap-3">
                        <div className="relative w-full max-w-sm">
                            <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ fontSize: 18 }}>search</span>
                            <Input placeholder="Rechercher..." className="pl-9" value={recherche} onChange={(e) => setRecherche(e.target.value)} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant={onglet === "mes" ? "secondary" : "ghost"} onClick={() => setOnglet("mes")}>Mes caravanes</Button>
                            <Button variant={onglet === "toutes" ? "secondary" : "ghost"} onClick={() => setOnglet("toutes")}>Voir tout</Button>
                            <FiltersPopover fields={FILTER_FIELDS} values={filtres} onChange={(key, value) => setFiltres((f) => ({ ...f, [key]: value }))} onReset={() => setFiltres({})} />
                            <Button onClick={() => setDialogAjout(true)}>
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                                Ajouter
                            </Button>
                        </div>
                    </div>
                }
            />

            <div className="flex-1 overflow-auto p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visibles.map((caravane) => {
                        const residents = mockResidents.filter((r) => r.caravaneId === caravane.id);
                        const responsables = mockEmployes.filter((e) => caravane.responsableIds.includes(e.id));

                        return (
                            <div
                                key={caravane.id}
                                className="flex cursor-pointer flex-col gap-3 rounded-xl border p-4"
                                onClick={() => router.push(`/caravanes/${caravane.id}`)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold">{caravane.nom}</h3>
                                        <span className="text-xs text-muted-foreground">{residents.length}/{caravane.capaciteMax}</span>
                                    </div>
                                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            type="button"
                                            onClick={() => setDialogSignalement(caravane.id)}
                                            className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-200"
                                        >
                                            Signaler
                                        </button>
                                        <button type="button" onClick={() => router.push(`/caravanes/${caravane.id}`)} title="Modifier">
                                            <span className="material-symbols-rounded text-muted-foreground" style={{ fontSize: 18 }}>edit</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
                                    {residents.length === 0 && <span className="text-sm text-muted-foreground">Aucun résident</span>}
                                    {residents.map((resident) => (
                                        <PersonLink
                                            key={resident.id}
                                            id={resident.id}
                                            nom={nomComplet(resident)}
                                            type="resident"
                                            className="truncate rounded-lg border px-3 py-1.5 text-sm no-underline hover:bg-muted"
                                        />
                                    ))}
                                </div>

                                {caravane.statut === "Non-disponible" && (
                                    <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                                        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>warning</span>
                                        {caravane.raisonIndisponibilite ?? "Non disponible"}
                                    </div>
                                )}

                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex -space-x-2">
                                        {responsables.map((responsable) => (
                                            <Avatar key={responsable.id} className="h-6 w-6 border-2 border-background">
                                                <AvatarFallback className="text-[10px]">
                                                    {nomComplet(responsable).split(" ").map((p) => p[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                        ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {responsables.length === 0 ? "Aucun responsable" : (
                                            responsables.map((r, i) => (
                                                <span key={r.id}>
                                                    <PersonLink id={r.id} nom={nomComplet(r)} type="employe" className="no-underline hover:underline" />
                                                    {i < responsables.length - 1 && ", "}
                                                </span>
                                            ))
                                        )}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {visibles.length === 0 && (
                    <p className="py-12 text-center text-sm text-muted-foreground">Aucune caravane ne correspond à ces filtres.</p>
                )}
            </div>

            <Dialog open={dialogAjout} onOpenChange={setDialogAjout}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Nouvelle caravane</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="nom">Nom</Label>
                            <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex. A05" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="capacite">Capacité max</Label>
                            <Input id="capacite" type="number" value={capacite} onChange={(e) => setCapacite(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogAjout(false)}>Annuler</Button>
                        <Button onClick={ajouterCaravane}>Créer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={dialogSignalement !== null} onOpenChange={(o) => !o && setDialogSignalement(null)}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Signaler un problème</DialogTitle></DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        Le détail du signalement se complète sur la fiche de la caravane.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogSignalement(null)}>Annuler</Button>
                        <Button onClick={signaler}>Continuer sur la fiche</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
