"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { CopyableText } from "@/components/shared/copyable-text";
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
import { mockResidents, type MockResident } from "@/lib/mock-data";

interface LigneTransport {
    id: string;
    residentId: string;
    type: string;
    moyen: string;
    reference: string;
    montant: string;
    statut: string;
    expire?: string;
}

// TODO: remplacer par un vrai fetch une fois le backend branché
const LIGNES_INITIALES: LigneTransport[] = [
    { id: "1", residentId: "1", type: "Ticket", moyen: "Train", reference: "1647", montant: "-", statut: "Attribué" },
    { id: "2", residentId: "2", type: "Ticket", moyen: "Bus TEC", reference: "4895", montant: "-", statut: "Attribué" },
    { id: "3", residentId: "3", type: "Abonnement", moyen: "Bus TEC", reference: "-", montant: "12.00 €", statut: "Actif", expire: "17/08/2026" },
    { id: "4", residentId: "4", type: "Abonnement", moyen: "Train", reference: "-", montant: "28.12 €", statut: "Expiré", expire: "18/08/2025" },
];

const FILTER_FIELDS: FilterField[] = [
    { key: "type", label: "Type", options: [{ value: "Ticket", label: "Ticket" }, { value: "Abonnement", label: "Abonnement" }] },
    { key: "statut", label: "Statut", options: [{ value: "Actif", label: "Actif" }, { value: "Attribué", label: "Attribué" }, { value: "Expiré", label: "Expiré" }] },
];

const PAGE_SIZE = 10;

export default function Page() {
    const [lignes, setLignes] = useState<LigneTransport[]>(LIGNES_INITIALES);
    const [filtres, setFiltres] = useState<Record<string, string>>({});
    const [page, setPage] = useState(1);

    const [dialogOuvert, setDialogOuvert] = useState(false);
    const [ligneEnEdition, setLigneEnEdition] = useState<LigneTransport | null>(null);
    const [resident, setResident] = useState<MockResident | null>(null);
    const [reference, setReference] = useState("");
    const [montant, setMontant] = useState("");

    const filtrees = useMemo(() => {
        return lignes.filter((l) => {
            if (filtres.type && l.type !== filtres.type) return false;
            if (filtres.statut && l.statut !== filtres.statut) return false;
            return true;
        });
    }, [lignes, filtres]);

    const { items, totalPages, currentPage } = paginate(filtrees, page, PAGE_SIZE);

    function reinitialiser() {
        setResident(null);
        setReference("");
        setMontant("");
        setLigneEnEdition(null);
    }

    function ouvrirCreation() {
        reinitialiser();
        setDialogOuvert(true);
    }

    function ouvrirEdition(ligne: LigneTransport) {
        setResident(mockResidents.find((r) => r.id === ligne.residentId) ?? null);
        setReference(ligne.reference);
        setMontant(ligne.montant);
        setLigneEnEdition(ligne);
        setDialogOuvert(true);
    }

    function enregistrer() {
        if (!resident) return;
        if (ligneEnEdition) {
            setLignes((prev) => prev.map((l) => (l.id === ligneEnEdition.id ? { ...l, residentId: resident.id, reference, montant } : l)));
        } else {
            if (!reference) return;
            setLignes((prev) => [
                { id: String(prev.length + 1), residentId: resident.id, type: "Ticket", moyen: "Train", reference, montant: montant || "-", statut: "Attribué" },
                ...prev,
            ]);
        }
        setDialogOuvert(false);
        reinitialiser();
    }

    return (
        <>
            <PageHeader
                title="Transports en commun"
                toolbar={
                    <>
                        <StatCardGroup>
                            <StatCard label="Abonnements actifs" value={lignes.filter((l) => l.statut === "Actif").length} tone="success" />
                            <StatCard label="Abonnements expirés" value={lignes.filter((l) => l.statut === "Expiré").length} tone="danger" />
                            <StatCard label="Tickets de trains" value={lignes.filter((l) => l.moyen === "Train" && l.type === "Ticket").length} />
                            <StatCard label="Tickets de bus" value={lignes.filter((l) => l.moyen === "Bus TEC" && l.type === "Ticket").length} />
                        </StatCardGroup>

                        <div className="flex items-center justify-between gap-3">
                            <FiltersPopover fields={FILTER_FIELDS} values={filtres} onChange={(key, value) => { setFiltres((f) => ({ ...f, [key]: value })); setPage(1); }} onReset={() => setFiltres({})} />
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
                            <TableHead>Résident</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Moyen</TableHead>
                            <TableHead>Référence</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((ligne) => {
                            const r = mockResidents.find((res) => res.id === ligne.residentId);
                            return (
                                <TableRow key={ligne.id} className="group">
                                    <TableCell>{r && <PersonLink id={r.id} nom={`${r.prenom} ${r.nom}`} type="resident" />}</TableCell>
                                    <TableCell>{ligne.type}</TableCell>
                                    <TableCell>{ligne.moyen}</TableCell>
                                    <TableCell>{ligne.reference !== "-" ? <CopyableText value={ligne.reference} /> : "-"}</TableCell>
                                    <TableCell>{ligne.montant}</TableCell>
                                    <TableCell>
                                        <Badge variant={ligne.statut === "Expiré" ? "destructive" : "secondary"}>{ligne.statut}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <RowActions
                                            onEdit={() => ouvrirEdition(ligne)}
                                            onDelete={() => setLignes((prev) => prev.filter((l) => l.id !== ligne.id))}
                                            entityLabel="cette ligne"
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <TablePagination page={currentPage} totalPages={totalPages} basePath="/transports" />
            </div>

            <Dialog open={dialogOuvert} onOpenChange={(o) => { setDialogOuvert(o); if (!o) reinitialiser(); }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{ligneEnEdition ? "Modifier" : "Attribuer un ticket / abonnement"}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Résident</Label>
                            <SearchSelect options={mockResidents} value={resident} onValueChange={setResident} getId={(r) => r.id} getLabel={(r) => `${r.prenom} ${r.nom}`} placeholder="Rechercher un résident..." />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="reference">ID ticket / référence</Label>
                            <Input id="reference" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Ex. T-002" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="montant">Montant</Label>
                            <Input id="montant" value={montant} onChange={(e) => setMontant(e.target.value)} placeholder="Ex. 12.00 €" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOuvert(false)}>Annuler</Button>
                        <Button onClick={enregistrer}>{ligneEnEdition ? "Enregistrer" : "Attribuer"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
