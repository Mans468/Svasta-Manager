"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { FilterField, FiltersPopover } from "@/components/shared/filters-popover";
import { PersonLink } from "@/components/shared/person-link";
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
import { estPasse, formatDateFr } from "@/lib/date-utils";
import { mockResidents, nomComplet } from "@/lib/mock-data";

// TODO: remplacer par un vrai fetch une fois le backend branché
export interface Travail { id: string; titre: string; residentId: string; date: string; heure: string; montant: number; statut: string; }
export const TRAVAUX_INITIAUX: Travail[] = [
    { id: "1", titre: "Nettoyer Réfectoire", residentId: "1", date: "2026-09-20", heure: "14:00", montant: 40, statut: "À payer" },
    { id: "2", titre: "Jardinage", residentId: "4", date: "2026-06-15", heure: "11:00", montant: 50, statut: "Payé" },
    { id: "3", titre: "Préparer l'activité", residentId: "2", date: "2026-09-25", heure: "08:30", montant: 10, statut: "À payer" },
];

const FILTER_FIELDS: FilterField[] = [
    { key: "statut", label: "Statut de paiement", options: [{ value: "À payer", label: "À payer" }, { value: "Payé", label: "Payé" }] },
];

const PAGE_SIZE = 10;

export default function Page() {
    const router = useRouter();
    const [travaux, setTravaux] = useState(TRAVAUX_INITIAUX);
    const [filtres, setFiltres] = useState<Record<string, string>>({});
    const [page, setPage] = useState(1);
    const [dialogOuvert, setDialogOuvert] = useState(false);
    const [form, setForm] = useState({ titre: "", residentId: "", date: "", heure: "", montant: "" });

    const filtres_ = useMemo(() => travaux.filter((t) => !filtres.statut || t.statut === filtres.statut), [travaux, filtres]);
    const { items, totalPages, currentPage } = paginate(filtres_, page, PAGE_SIZE);

    const stats = {
        prevus: travaux.filter((t) => t.statut === "À payer").length,
        termines: travaux.filter((t) => t.statut === "Payé").length,
        budget: travaux.reduce((s, t) => s + t.montant, 0),
    };

    function reinitialiser() {
        setForm({ titre: "", residentId: "", date: "", heure: "", montant: "" });
    }

    function creer() {
        if (!form.titre || !form.residentId || !form.date) return;
        setTravaux((prev) => [
            { id: String(prev.length + 1), titre: form.titre, residentId: form.residentId, date: form.date, heure: form.heure, montant: Number(form.montant) || 0, statut: "À payer" },
            ...prev,
        ]);
        reinitialiser();
        setDialogOuvert(false);
    }

    return (
        <>
            <PageHeader
                title="Travaux rémunerés"
                toolbar={
                    <>
                        <StatCardGroup>
                            <StatCard label="Travaux à payer" value={stats.prevus} tone="warning" />
                            <StatCard label="Travaux payés" value={stats.termines} tone="success" />
                            <StatCard label="Budget total" value={`${stats.budget} €`} />
                        </StatCardGroup>

                        <div className="flex items-center justify-between gap-3">
                            <FiltersPopover fields={FILTER_FIELDS} values={filtres} onChange={(key, value) => { setFiltres((f) => ({ ...f, [key]: value })); setPage(1); }} onReset={() => setFiltres({})} />
                            <Button onClick={() => setDialogOuvert(true)}>
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
                            <TableHead>Résident</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Heure</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((travail) => {
                            const resident = mockResidents.find((r) => r.id === travail.residentId);
                            const termine = estPasse(travail.date);
                            return (
                                <TableRow key={travail.id} className="group cursor-pointer" onClick={() => router.push(`/travaux/${travail.id}`)}>
                                    <TableCell>{travail.titre}</TableCell>
                                    <TableCell>{resident && <PersonLink id={resident.id} nom={nomComplet(resident)} type="resident" />}</TableCell>
                                    <TableCell>{formatDateFr(travail.date)}</TableCell>
                                    <TableCell>{travail.heure || "-"}</TableCell>
                                    <TableCell>{travail.montant} €</TableCell>
                                    <TableCell>
                                        <Badge variant={travail.statut === "Payé" ? "secondary" : "destructive"}>{travail.statut}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <RowActions
                                            onView={() => router.push(`/travaux/${travail.id}`)}
                                            onEdit={() => router.push(`/travaux/${travail.id}`)}
                                            onDelete={() => setTravaux((prev) => prev.filter((t) => t.id !== travail.id))}
                                            deleteBlocked={termine}
                                            deleteBlockedReason="Un travail terminé ne peut pas être supprimé."
                                            entityLabel="ce travail"
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <TablePagination page={currentPage} totalPages={totalPages} basePath="/travaux" />
            </div>

            <Dialog open={dialogOuvert} onOpenChange={(o) => { setDialogOuvert(o); if (!o) reinitialiser(); }}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Nouveau travail rémunéré</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="titre">Titre</Label>
                            <Input id="titre" value={form.titre} onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Résident</Label>
                            <SearchSelect
                                options={mockResidents}
                                value={mockResidents.find((r) => r.id === form.residentId) ?? null}
                                onValueChange={(r) => setForm((f) => ({ ...f, residentId: r?.id ?? "" }))}
                                getId={(r) => r.id}
                                getLabel={(r) => nomComplet(r)}
                                placeholder="Rechercher un résident..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="heure">Heure</Label>
                                <Input id="heure" type="time" value={form.heure} onChange={(e) => setForm((f) => ({ ...f, heure: e.target.value }))} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="montant">Montant (€)</Label>
                            <Input id="montant" type="number" value={form.montant} onChange={(e) => setForm((f) => ({ ...f, montant: e.target.value }))} />
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
