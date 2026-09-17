"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { NavetteFormDialog } from "@/components/navettes/navette-form-dialog";
import { PersonCombobox, type PersonOption } from "@/components/shared/person-combobox";
import { RowActions } from "@/components/shared/row-actions";
import { SearchSelect } from "@/components/shared/search-select";
import { StatCard, StatCardGroup } from "@/components/shared/stat-card";
import { paginate, TablePagination } from "@/components/shared/table-pagination";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { estPasse, formatDateFr } from "@/lib/date-utils";
import { mockEmployes, mockResidents, nomComplet } from "@/lib/mock-data";
import { MOCK_NAVETTES, type MockNavette } from "@/lib/mock-navettes";

export interface Activite {
    id: string;
    titre: string;
    description: string;
    lieu: string;
    date: string; // ISO
    heure: string;
    budget: number;
    navetteId: string | null;
    residentIds: string[];
    educateurIds: string[];
}

// TODO: remplacer par un vrai fetch une fois le backend branché
export const ACTIVITES_INITIALES: Activite[] = [
    { id: "1", titre: "Parc Astérix", description: "Sortie encadrée, transport en navette.", lieu: "Parc Astérix, Plailly", date: "2026-09-28", heure: "13:55-18:30", budget: 1250, navetteId: "1", residentIds: ["1", "2", "3"], educateurIds: ["3", "4"] },
    { id: "2", titre: "Uno", description: "Après-midi jeux de société au réfectoire.", lieu: "Centre Svasta, Réfectoire", date: "2026-10-12", heure: "11:00-13:00", budget: 0, navetteId: null, residentIds: ["1", "4"], educateurIds: ["3"] },
    { id: "3", titre: "Camping Les Murets", description: "Week-end camping, encadrement renforcé.", lieu: "Chemin d'Enonck 75, 4130 Esneux", date: "2026-06-13", heure: "08:30-...", budget: 450, navetteId: null, residentIds: ["2"], educateurIds: ["4"] },
];

const PAGE_SIZE = 10;

const RESIDENT_OPTIONS: PersonOption[] = mockResidents.map((r) => ({ id: r.id, nom: nomComplet(r) }));
const EDUCATEUR_OPTIONS: PersonOption[] = mockEmployes.map((e) => ({ id: e.id, nom: nomComplet(e) }));

function ActiviteForm({
    titre, description, lieu, date, budget, residents, educateurs, navette, navettes,
    onTitreChange, onDescriptionChange, onLieuChange, onDateChange, onBudgetChange, onResidentsChange, onEducateursChange, onNavetteChange, onNouvelleNavette,
}: {
    titre: string; description: string; lieu: string; date: string; budget: string;
    residents: PersonOption[]; educateurs: PersonOption[]; navette: MockNavette | null; navettes: MockNavette[];
    onTitreChange: (v: string) => void; onDescriptionChange: (v: string) => void; onLieuChange: (v: string) => void;
    onDateChange: (v: string) => void; onBudgetChange: (v: string) => void;
    onResidentsChange: (v: PersonOption[]) => void; onEducateursChange: (v: PersonOption[]) => void;
    onNavetteChange: (v: MockNavette | null) => void; onNouvelleNavette: () => void;
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="titre">Titre</Label>
                <Input id="titre" value={titre} onChange={(e) => onTitreChange(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={3} value={description} onChange={(e) => onDescriptionChange(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="lieu">Lieu</Label>
                    <Input id="lieu" value={lieu} onChange={(e) => onLieuChange(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" value={date} onChange={(e) => onDateChange(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="budget">Budget (€)</Label>
                <Input id="budget" type="number" value={budget} onChange={(e) => onBudgetChange(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <Label>Navette</Label>
                    <Button type="button" variant="ghost" size="sm" onClick={onNouvelleNavette}>
                        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                        Nouvelle navette
                    </Button>
                </div>
                <SearchSelect
                    options={navettes}
                    value={navette}
                    onValueChange={onNavetteChange}
                    getId={(n) => n.id}
                    getLabel={(n) => `${n.depart} -> ${n.arrivee}`}
                    placeholder="Aucune navette liée"
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Résidents</Label>
                <PersonCombobox options={RESIDENT_OPTIONS} value={residents} onValueChange={onResidentsChange} placeholder="Ajouter des résidents" />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Éducateurs</Label>
                <PersonCombobox options={EDUCATEUR_OPTIONS} value={educateurs} onValueChange={onEducateursChange} placeholder="Ajouter des éducateurs" />
            </div>
        </div>
    );
}

function ActivitesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activites, setActivites] = useState(ACTIVITES_INITIALES);
    const [page, setPage] = useState(1);

    const [dialogCreation, setDialogCreation] = useState(false);
    const [activiteEnEdition, setActiviteEnEdition] = useState<Activite | null>(null);

    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [lieu, setLieu] = useState("");
    const [date, setDate] = useState("");
    const [budget, setBudget] = useState("");
    const [residents, setResidents] = useState<PersonOption[]>([]);
    const [educateurs, setEducateurs] = useState<PersonOption[]>([]);
    const [navette, setNavette] = useState<MockNavette | null>(null);
    const [navettes, setNavettes] = useState<MockNavette[]>(MOCK_NAVETTES);
    const [dialogNavetteOuvert, setDialogNavetteOuvert] = useState(false);

    const { items, totalPages, currentPage } = paginate(activites, page, PAGE_SIZE);

    const stats = {
        total: activites.length,
        aVenir: activites.filter((a) => !estPasse(a.date)).length,
        budgetTotal: activites.reduce((s, a) => s + a.budget, 0),
    };

    function reinitialiserForm() {
        setTitre(""); setDescription(""); setLieu(""); setDate(""); setBudget(""); setResidents([]); setEducateurs([]); setNavette(null);
    }

    function ouvrirCreation() {
        reinitialiserForm();
        setDialogCreation(true);
    }

    function ouvrirEdition(activite: Activite) {
        setTitre(activite.titre);
        setDescription(activite.description);
        setLieu(activite.lieu);
        setDate(activite.date);
        setBudget(String(activite.budget));
        setResidents(mockResidents.filter((r) => activite.residentIds.includes(r.id)).map((r) => ({ id: r.id, nom: nomComplet(r) })));
        setEducateurs(mockEmployes.filter((e) => activite.educateurIds.includes(e.id)).map((e) => ({ id: e.id, nom: nomComplet(e) })));
        setNavette(navettes.find((n) => n.id === activite.navetteId) ?? null);
        setActiviteEnEdition(activite);
    }

    useEffect(() => {
        const idAModifier = searchParams.get("modifier");
        if (!idAModifier) return;
        const activite = activites.find((a) => a.id === idAModifier);
        if (activite) ouvrirEdition(activite);
        router.replace("/activites");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    // Bascule vers la modale Navette sans perdre le formulaire Activité en cours
    // (fermé, pas démonté -> son state survit) puis revient dessus à la création.
    function ouvrirNouvelleNavette() {
        setDialogCreation(false);
        setDialogNavetteOuvert(true);
    }

    function navetteCreee(nouvelle: MockNavette) {
        setNavettes((prev) => [nouvelle, ...prev]);
        setNavette(nouvelle);
        setDialogNavetteOuvert(false);
        if (activiteEnEdition) setActiviteEnEdition(activiteEnEdition);
        else setDialogCreation(true);
    }

    function creer() {
        if (!titre || !date) return;
        setActivites((prev) => [
            { id: String(prev.length + 1), titre, description, lieu, date, heure: "", budget: Number(budget) || 0, navetteId: navette?.id ?? null, residentIds: residents.map((r) => r.id), educateurIds: educateurs.map((e) => e.id) },
            ...prev,
        ]);
        setDialogCreation(false);
    }

    function enregistrerEdition() {
        if (!activiteEnEdition || !titre || !date) return;
        setActivites((prev) => prev.map((a) => a.id === activiteEnEdition.id
            ? { ...a, titre, description, lieu, date, budget: Number(budget) || 0, navetteId: navette?.id ?? null, residentIds: residents.map((r) => r.id), educateurIds: educateurs.map((e) => e.id) }
            : a));
        setActiviteEnEdition(null);
    }

    return (
        <>
            <PageHeader
                title="Activités"
                toolbar={
                    <>
                        <StatCardGroup>
                            <StatCard label="Activités" value={stats.total} />
                            <StatCard label="À venir" value={stats.aVenir} tone="success" />
                            <StatCard label="Budget engagé" value={`${stats.budgetTotal} €`} />
                        </StatCardGroup>
                        <div className="flex justify-end">
                            <Button onClick={ouvrirCreation}>
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                                Ajouter
                            </Button>
                        </div>
                    </>
                }
            />

            <div className="flex-1 overflow-auto px-6 pb-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead>Lieu</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Navette</TableHead>
                            <TableHead>Résidents</TableHead>
                            <TableHead>Éducateurs</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((activite) => {
                            const terminee = estPasse(activite.date);
                            const navetteLiee = navettes.find((n) => n.id === activite.navetteId);
                            return (
                                <TableRow key={activite.id} className="group cursor-pointer" onClick={() => router.push(`/activites/${activite.id}`)}>
                                    <TableCell className="font-medium">{activite.titre}</TableCell>
                                    <TableCell className="text-muted-foreground">{activite.lieu}</TableCell>
                                    <TableCell>{formatDateFr(activite.date)}</TableCell>
                                    <TableCell>
                                        {navetteLiee ? (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); router.push(`/navettes/${navetteLiee.id}`); }}
                                                className="underline decoration-dotted underline-offset-2 hover:decoration-solid"
                                            >
                                                {navetteLiee.depart} → {navetteLiee.arrivee}
                                            </button>
                                        ) : "-"}
                                    </TableCell>
                                    <TableCell>{activite.residentIds.length}</TableCell>
                                    <TableCell>{activite.educateurIds.length}</TableCell>
                                    <TableCell>{activite.budget} €</TableCell>
                                    <TableCell>
                                        <Badge variant={terminee ? "secondary" : "default"}>{terminee ? "Terminée" : "À venir"}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <RowActions
                                            onView={() => router.push(`/activites/${activite.id}`)}
                                            onEdit={() => ouvrirEdition(activite)}
                                            onDelete={() => setActivites((prev) => prev.filter((a) => a.id !== activite.id))}
                                            deleteBlocked={terminee}
                                            deleteBlockedReason="Une activité terminée ne peut pas être supprimée."
                                            entityLabel="cette activité"
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <TablePagination page={currentPage} totalPages={totalPages} basePath="/activites" />
            </div>

            <Dialog open={dialogCreation} onOpenChange={(o) => { setDialogCreation(o); if (!o) reinitialiserForm(); }}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Nouvelle activité</DialogTitle></DialogHeader>
                    <ActiviteForm
                        titre={titre} description={description} lieu={lieu} date={date} budget={budget} residents={residents} educateurs={educateurs} navette={navette} navettes={navettes}
                        onTitreChange={setTitre} onDescriptionChange={setDescription} onLieuChange={setLieu} onDateChange={setDate} onBudgetChange={setBudget}
                        onResidentsChange={setResidents} onEducateursChange={setEducateurs} onNavetteChange={setNavette} onNouvelleNavette={ouvrirNouvelleNavette}
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogCreation(false)}>Annuler</Button>
                        <Button onClick={creer}>Créer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={activiteEnEdition !== null} onOpenChange={(o) => !o && setActiviteEnEdition(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Modifier l&apos;activité</DialogTitle></DialogHeader>
                    <ActiviteForm
                        titre={titre} description={description} lieu={lieu} date={date} budget={budget} residents={residents} educateurs={educateurs} navette={navette} navettes={navettes}
                        onTitreChange={setTitre} onDescriptionChange={setDescription} onLieuChange={setLieu} onDateChange={setDate} onBudgetChange={setBudget}
                        onResidentsChange={setResidents} onEducateursChange={setEducateurs} onNavetteChange={setNavette} onNouvelleNavette={ouvrirNouvelleNavette}
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setActiviteEnEdition(null)}>Annuler</Button>
                        <Button onClick={enregistrerEdition}>Enregistrer</Button>
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

export default function Page() {
    return (
        <Suspense fallback={null}>
            <ActivitesContent />
        </Suspense>
    );
}
