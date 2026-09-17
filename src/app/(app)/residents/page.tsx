"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { FilterField, FiltersPopover } from "@/components/shared/filters-popover";
import { RowActions } from "@/components/shared/row-actions";
import { ResidentForm, valeursResidentVides, type ResidentFormValues } from "@/components/residents/resident-form";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
import { mockCaravanes, mockResidents } from "@/lib/mock-data";

const STYLE_STATUT: Record<string, string> = {
    "22bis": "bg-blue-100 text-blue-700 hover:bg-blue-100",
    Naturalisé: "bg-rose-100 text-rose-700 hover:bg-rose-100",
};

const FILTER_FIELDS: FilterField[] = [
    {
        key: "statut",
        label: "Statut",
        options: Array.from(new Set(mockResidents.map((r) => r.statutProcedure))).map((s) => ({ value: s, label: s })),
    },
];

const PAGE_SIZE = 10;

export default function Page() {
    const router = useRouter();
    const [recherche, setRecherche] = useState("");
    const [filtres, setFiltres] = useState<Record<string, string>>({});
    const [page, setPage] = useState(1);
    const [residents, setResidents] = useState(mockResidents);
    const [dialogAjout, setDialogAjout] = useState(false);
    const [nouveauResident, setNouveauResident] = useState<ResidentFormValues>(valeursResidentVides());

    const filtres_ = useMemo(() => {
        return residents.filter((r) => {
            if (filtres.statut && r.statutProcedure !== filtres.statut) return false;
            if (recherche && !`${r.nom} ${r.prenom}`.toLowerCase().includes(recherche.toLowerCase())) return false;
            return true;
        });
    }, [residents, recherche, filtres]);

    const { items, totalPages, currentPage } = paginate(filtres_, page, PAGE_SIZE);

    function ajouterResident() {
        if (!nouveauResident.nom || !nouveauResident.prenom) return;
        setResidents((prev) => [
            {
                id: String(prev.length + 1),
                nom: nouveauResident.nom,
                prenom: nouveauResident.prenom,
                numeroRegistre: nouveauResident.numeroRegistre || "-",
                dateNaissance: nouveauResident.dateNaissance || "-",
                dateInscription: new Date().toLocaleDateString("fr-BE"),
                paysOrigine: nouveauResident.paysOrigine,
                langues: nouveauResident.langues,
                raisonRefuge: nouveauResident.raisonRefuge,
                statutProcedure: nouveauResident.statutProcedure,
                statutResidence: nouveauResident.statutResidence,
                caravaneId: nouveauResident.caravane?.id ?? null,
                ecoleId: nouveauResident.ecole?.id ?? null,
                familleIds: [],
                email: nouveauResident.email,
                telephone: nouveauResident.telephone,
                occupation: nouveauResident.occupation,
            },
            ...prev,
        ]);
        setNouveauResident(valeursResidentVides());
        setDialogAjout(false);
    }

    return (
        <>
            <PageHeader
                title="Résidents"
                toolbar={
                    <div className="flex items-center justify-between gap-3">
                        <div className="relative w-full max-w-sm">
                            <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ fontSize: 18 }}>search</span>
                            <Input placeholder="Rechercher..." className="pl-9" value={recherche} onChange={(e) => { setRecherche(e.target.value); setPage(1); }} />
                        </div>
                        <div className="flex items-center gap-2">
                            <FiltersPopover
                                fields={FILTER_FIELDS}
                                values={filtres}
                                onChange={(key, value) => { setFiltres((f) => ({ ...f, [key]: value })); setPage(1); }}
                                onReset={() => setFiltres({})}
                            />
                            <Button onClick={() => setDialogAjout(true)}>
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
                            <TableHead>Nom</TableHead>
                            <TableHead>Prénom</TableHead>
                            <TableHead>Date de naissance</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Pays d&apos;origine</TableHead>
                            <TableHead>Caravane</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((resident) => {
                            const caravane = mockCaravanes.find((c) => c.id === resident.caravaneId);
                            return (
                                <TableRow key={resident.id} className="group cursor-pointer" onClick={() => router.push(`/residents/${resident.id}`)}>
                                    <TableCell>{resident.nom}</TableCell>
                                    <TableCell>{resident.prenom}</TableCell>
                                    <TableCell>{resident.dateNaissance}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={STYLE_STATUT[resident.statutProcedure] ?? ""}>{resident.statutProcedure}</Badge>
                                    </TableCell>
                                    <TableCell>{resident.paysOrigine}</TableCell>
                                    <TableCell>{caravane?.nom ?? "-"}</TableCell>
                                    <TableCell>
                                        <RowActions
                                            onView={() => router.push(`/residents/${resident.id}`)}
                                            onEdit={() => router.push(`/residents/${resident.id}/modifier`)}
                                            onDelete={() => {}}
                                            deleteBlocked
                                            deleteBlockedReason="Une fiche résident ne peut jamais être supprimée (archivage uniquement)."
                                            entityLabel="ce résident"
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <TablePagination page={currentPage} totalPages={totalPages} basePath="/residents" />
            </div>

            <Dialog open={dialogAjout} onOpenChange={(o) => { setDialogAjout(o); if (!o) setNouveauResident(valeursResidentVides()); }}>
                <DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Nouveau résident</DialogTitle>
                    </DialogHeader>
                    <ResidentForm values={nouveauResident} onChange={setNouveauResident} />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogAjout(false)}>Annuler</Button>
                        <Button onClick={ajouterResident}>Créer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
