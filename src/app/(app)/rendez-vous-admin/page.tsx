"use client";

import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { PersonLink } from "@/components/shared/person-link";
import { RowActions } from "@/components/shared/row-actions";
import { SearchSelect } from "@/components/shared/search-select";
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
import { mockResidents, nomComplet } from "@/lib/mock-data";

// TODO: remplacer par un vrai fetch une fois le backend branché
const RDV_INITIAUX = [
    { id: "1", residentId: "1", categorie: "Avocat", date: "05/09/2026" },
    { id: "2", residentId: "2", categorie: "Tribunal", date: "10/09/2026" },
];

const PAGE_SIZE = 10;

export default function Page() {
    const [rdvs, setRdvs] = useState(RDV_INITIAUX);
    const [page, setPage] = useState(1);
    const [dialogOuvert, setDialogOuvert] = useState(false);
    const [form, setForm] = useState({ residentId: "", categorie: "", date: "", lieu: "" });

    const { items, totalPages, currentPage } = paginate(rdvs, page, PAGE_SIZE);

    function creer() {
        if (!form.residentId || !form.categorie || !form.date) return;
        setRdvs((prev) => [...prev, { id: String(prev.length + 1), residentId: form.residentId, categorie: form.categorie, date: form.date }]);
        setForm({ residentId: "", categorie: "", date: "", lieu: "" });
        setDialogOuvert(false);
    }

    return (
        <>
            <PageHeader
                title="Rendez-vous juridiques / administratifs"
                toolbar={
                    <div className="flex justify-end">
                        {/* Assistant */}
                        <Button onClick={() => setDialogOuvert(true)}>
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                            Ajouter
                        </Button>
                    </div>
                }
            />

            <div className="flex-1 overflow-auto px-6 pb-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Résident</TableHead>
                            <TableHead>Catégorie</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((rdv) => {
                            const resident = mockResidents.find((r) => r.id === rdv.residentId);
                            return (
                                <TableRow key={rdv.id} className="group">
                                    <TableCell>
                                        {resident && <PersonLink id={resident.id} nom={nomComplet(resident)} type="resident" />}
                                    </TableCell>
                                    <TableCell><Badge variant="secondary">{rdv.categorie}</Badge></TableCell>
                                    <TableCell>{rdv.date}</TableCell>
                                    <TableCell>
                                        <RowActions
                                            onDelete={() => setRdvs((prev) => prev.filter((r) => r.id !== rdv.id))}
                                            entityLabel="ce rendez-vous"
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <TablePagination page={currentPage} totalPages={totalPages} basePath="/rendez-vous-admin" />
            </div>

            <Dialog open={dialogOuvert} onOpenChange={setDialogOuvert}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nouveau rendez-vous</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
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
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="categorie">Catégorie</Label>
                            <Input id="categorie" value={form.categorie} onChange={(e) => setForm((f) => ({ ...f, categorie: e.target.value }))} placeholder="Avocat / Tribunal / Administratif / Autre" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="date">Date / heure</Label>
                            <Input id="date" type="datetime-local" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lieu">Lieu</Label>
                            <Input id="lieu" value={form.lieu} onChange={(e) => setForm((f) => ({ ...f, lieu: e.target.value }))} />
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
