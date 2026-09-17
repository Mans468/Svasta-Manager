"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { PersonLink } from "@/components/shared/person-link";
import { SearchSelect } from "@/components/shared/search-select";
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
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { mockCaravanes, mockEmployes, mockResidents, nomComplet, type MockEmploye, type MockResident } from "@/lib/mock-data";

// TODO: remplacer par un vrai fetch (caravane + résidents + signalements)
const SIGNALEMENTS_INITIAUX = [
    { id: "1", description: "Fuite d'eau salle de bain", statut: "Ouvert" },
    { id: "2", description: "Chauffage HS", statut: "Résolu" },
];

export default function CaravaneSheet({
    params,
}: {
    params: Promise<{ caravaneId: string }>;
}) {
    const { caravaneId } = use(params);
    const router = useRouter();
    const caravane = mockCaravanes.find((c) => c.id === caravaneId);

    const [horsService, setHorsService] = useState(caravane?.statut === "Non-disponible");
    const [signalements, setSignalements] = useState(SIGNALEMENTS_INITIAUX);
    const [residentsAssignes, setResidentsAssignes] = useState<MockResident[]>(
        mockResidents.filter((r) => r.caravaneId === caravaneId),
    );
    const [responsables, setResponsables] = useState<MockEmploye[]>(
        mockEmployes.filter((e) => caravane?.responsableIds.includes(e.id)),
    );
    const [dialogSignalement, setDialogSignalement] = useState(false);
    const [description, setDescription] = useState("");
    const [dialogAjoutResident, setDialogAjoutResident] = useState(false);
    const [residentAAjouter, setResidentAAjouter] = useState<MockResident | null>(null);
    const [dialogAjoutResponsable, setDialogAjoutResponsable] = useState(false);
    const [responsableAAjouter, setResponsableAAjouter] = useState<MockEmploye | null>(null);

    if (!caravane) {
        return (
            <Sheet open onOpenChange={(o) => !o && router.back()}>
                <SheetContent>
                    <SheetHeader><SheetTitle>Caravane introuvable</SheetTitle></SheetHeader>
                </SheetContent>
            </Sheet>
        );
    }

    function toggleStatut(id: string) {
        setSignalements((prev) => prev.map((s) => (s.id === id ? { ...s, statut: s.statut === "Ouvert" ? "Résolu" : "Ouvert" } : s)));
    }

    function ajouterSignalement() {
        if (!description) return;
        setSignalements((prev) => [...prev, { id: String(prev.length + 1), description, statut: "Ouvert" }]);
        setDescription("");
        setDialogSignalement(false);
    }

    function ajouterResident() {
        if (!residentAAjouter) return;
        setResidentsAssignes((prev) => (prev.some((r) => r.id === residentAAjouter.id) ? prev : [...prev, residentAAjouter]));
        setResidentAAjouter(null);
        setDialogAjoutResident(false);
    }

    function ajouterResponsable() {
        if (!responsableAAjouter) return;
        setResponsables((prev) => (prev.some((e) => e.id === responsableAAjouter.id) ? prev : [...prev, responsableAAjouter]));
        setResponsableAAjouter(null);
        setDialogAjoutResponsable(false);
    }

    return (
        <Sheet open onOpenChange={(open) => !open && router.back()}>
            <SheetContent side="right" className="w-full gap-6 sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Caravane {caravane.nom}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-4">
                    {/* Directeur uniquement */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Hors-service</span>
                        <Switch checked={horsService} onCheckedChange={setHorsService} />
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Signalements</h3>
                            <Button size="sm" variant="outline" onClick={() => setDialogSignalement(true)}>+ Signaler</Button>
                        </div>
                        {signalements.map((signalement) => (
                            <div key={signalement.id} className="flex items-center justify-between rounded-md border p-2 text-sm">
                                <span>{signalement.description}</span>
                                <button type="button" onClick={() => toggleStatut(signalement.id)}>
                                    <Badge variant={signalement.statut === "Ouvert" ? "destructive" : "secondary"}>{signalement.statut}</Badge>
                                </button>
                            </div>
                        ))}
                        {signalements.length === 0 && <span className="text-sm text-muted-foreground">Aucun signalement.</span>}
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Résidents assignés</h3>
                            {/* Directeur ou éducateur responsable */}
                            <Button size="sm" variant="outline" onClick={() => setDialogAjoutResident(true)}>+ Ajouter</Button>
                        </div>
                        {residentsAssignes.map((resident) => (
                            <div key={resident.id} className="flex items-center justify-between rounded-md border p-2 text-sm">
                                <PersonLink id={resident.id} nom={nomComplet(resident)} type="resident" />
                                <Button size="sm" variant="ghost" onClick={() => setResidentsAssignes((prev) => prev.filter((r) => r.id !== resident.id))}>Retirer</Button>
                            </div>
                        ))}
                        {residentsAssignes.length === 0 && <span className="text-sm text-muted-foreground">Aucun résident.</span>}
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Éducateurs responsables</h3>
                            {/* Directeur uniquement */}
                            <Button size="sm" variant="outline" onClick={() => setDialogAjoutResponsable(true)}>+ Ajouter</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {responsables.map((responsable) => (
                                <Badge key={responsable.id} variant="secondary" className="gap-1">
                                    <PersonLink id={responsable.id} nom={nomComplet(responsable)} type="employe" />
                                    <button type="button" onClick={() => setResponsables((prev) => prev.filter((r) => r.id !== responsable.id))}>
                                        <span className="material-symbols-rounded" style={{ fontSize: 14 }}>close</span>
                                    </button>
                                </Badge>
                            ))}
                            {responsables.length === 0 && <span className="text-sm text-muted-foreground">Aucun responsable.</span>}
                        </div>
                    </div>
                </div>
            </SheetContent>

            <Dialog open={dialogSignalement} onOpenChange={setDialogSignalement}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Signaler un problème</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogSignalement(false)}>Annuler</Button>
                        <Button onClick={ajouterSignalement}>Signaler</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={dialogAjoutResident} onOpenChange={setDialogAjoutResident}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Ajouter un résident</DialogTitle></DialogHeader>
                    <SearchSelect
                        options={mockResidents.filter((r) => !residentsAssignes.some((a) => a.id === r.id))}
                        value={residentAAjouter}
                        onValueChange={setResidentAAjouter}
                        getId={(r) => r.id}
                        getLabel={(r) => nomComplet(r)}
                        placeholder="Rechercher un résident..."
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogAjoutResident(false)}>Annuler</Button>
                        <Button onClick={ajouterResident}>Ajouter</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={dialogAjoutResponsable} onOpenChange={setDialogAjoutResponsable}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Ajouter un éducateur responsable</DialogTitle></DialogHeader>
                    <SearchSelect
                        options={mockEmployes.filter((e) => !responsables.some((r) => r.id === e.id))}
                        value={responsableAAjouter}
                        onValueChange={setResponsableAAjouter}
                        getId={(e) => e.id}
                        getLabel={(e) => nomComplet(e)}
                        placeholder="Rechercher un employé..."
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogAjoutResponsable(false)}>Annuler</Button>
                        <Button onClick={ajouterResponsable}>Ajouter</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Sheet>
    );
}
