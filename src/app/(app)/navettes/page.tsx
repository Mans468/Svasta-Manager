"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { NavetteFormDialog } from "@/components/navettes/navette-form-dialog";
import { FilterField, FiltersPopover } from "@/components/shared/filters-popover";
import { RowActions } from "@/components/shared/row-actions";
import { paginate, TablePagination } from "@/components/shared/table-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MOCK_NAVETTES } from "@/lib/mock-navettes";

const FILTER_FIELDS: FilterField[] = [
    { key: "statut", label: "Statut", options: [{ value: "Prévue", label: "Prévue" }, { value: "Terminée", label: "Terminée" }] },
];

const PAGE_SIZE = 10;

export default function Page() {
    const router = useRouter();
    const [navettes, setNavettes] = useState(MOCK_NAVETTES);
    const [recherche, setRecherche] = useState("");
    const [filtres, setFiltres] = useState<Record<string, string>>({});
    const [page, setPage] = useState(1);
    const [dialogOuvert, setDialogOuvert] = useState(false);

    const filtrees = useMemo(() => {
        return navettes.filter((n) => {
            if (filtres.statut && n.statut !== filtres.statut) return false;
            if (recherche && !`${n.depart} ${n.arrivee}`.toLowerCase().includes(recherche.toLowerCase())) return false;
            return true;
        });
    }, [navettes, filtres, recherche]);

    const { items, totalPages, currentPage } = paginate(filtrees, page, PAGE_SIZE);

    return (
        <>
            <PageHeader
                title="Navettes"
                toolbar={
                    <div className="flex items-center justify-between gap-3">
                        <div className="relative w-full max-w-sm">
                            <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ fontSize: 18 }}>search</span>
                            <Input placeholder="Rechercher..." className="pl-9" value={recherche} onChange={(e) => { setRecherche(e.target.value); setPage(1); }} />
                        </div>
                        <div className="flex items-center gap-2">
                            <FiltersPopover fields={FILTER_FIELDS} values={filtres} onChange={(key, value) => { setFiltres((f) => ({ ...f, [key]: value })); setPage(1); }} onReset={() => setFiltres({})} />
                            <Button onClick={() => setDialogOuvert(true)}>
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                                Ajouter
                            </Button>
                        </div>
                    </div>
                }
            />

            <div className="flex-1 overflow-auto px-6 pb-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Départ</TableHead>
                            <TableHead>Arrivée</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Véhicule</TableHead>
                            <TableHead>Passagers</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((navette) => (
                            <TableRow key={navette.id} className="group cursor-pointer" onClick={() => router.push(`/navettes/${navette.id}`)}>
                                <TableCell>{navette.depart}</TableCell>
                                <TableCell>{navette.arrivee}</TableCell>
                                <TableCell>{navette.date} {navette.heureDepart}</TableCell>
                                <TableCell>{navette.vehicule || "-"}</TableCell>
                                <TableCell>{navette.residentIds.length}</TableCell>
                                <TableCell>
                                    <Badge variant={navette.statut === "Prévue" ? "default" : "secondary"}>{navette.statut}</Badge>
                                </TableCell>
                                <TableCell>
                                    <RowActions
                                        onView={() => router.push(`/navettes/${navette.id}`)}
                                        onEdit={() => router.push(`/navettes/${navette.id}`)}
                                        onDelete={() => setNavettes((prev) => prev.filter((n) => n.id !== navette.id))}
                                        deleteBlocked={navette.statut === "Terminée"}
                                        deleteBlockedReason="Une navette terminée ne peut pas être supprimée."
                                        entityLabel="cette navette"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination page={currentPage} totalPages={totalPages} basePath="/navettes" />
            </div>

            <NavetteFormDialog
                open={dialogOuvert}
                onClose={() => setDialogOuvert(false)}
                onCreate={(navette) => setNavettes((prev) => [navette, ...prev])}
            />
        </>
    );
}
