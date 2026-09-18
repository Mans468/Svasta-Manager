"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { mockEcoles, mockResidents } from "@/lib/mock-data";
import { CopyableText } from "@/components/shared/copyable-text";
import { RowActions } from "@/components/shared/row-actions";
import { paginate, TablePagination } from "@/components/shared/table-pagination";
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

const PAGE_SIZE = 10;

export default function Page() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [ecoles, setEcoles] = useState(mockEcoles);
    const { items, totalPages, currentPage } = paginate(ecoles, page, PAGE_SIZE);

    const [dialogOuvert, setDialogOuvert] = useState(false);
    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");

    function reinitialiser() {
        setNom(""); setAdresse(""); setTelephone(""); setEmail("");
    }

    function ajouter() {
        if (!nom) return;
        setEcoles((prev) => [...prev, { id: String(prev.length + 1), nom, adresse, telephone, email }]);
        reinitialiser();
        setDialogOuvert(false);
    }

    return (
        <>
            <PageHeader
                title="Écoles"
                toolbar={
                    <div className="flex items-center justify-between gap-3">
                        <div className="relative w-full max-w-sm">
                            <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ fontSize: 18 }}>search</span>
                            <Input placeholder="Rechercher..." className="pl-9" />
                        </div>
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
                            <TableHead>Nom</TableHead>
                            <TableHead>Adresse</TableHead>
                            <TableHead>Téléphone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Résidents inscrits</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((ecole) => (
                            <TableRow key={ecole.id} className="group cursor-pointer" onClick={() => router.push(`/ecoles/${ecole.id}`)}>
                                <TableCell className="font-medium">{ecole.nom}</TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()} className="text-muted-foreground">
                                    <CopyableText value={ecole.adresse} />
                                </TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <CopyableText value={ecole.telephone} />
                                </TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <CopyableText value={ecole.email} />
                                </TableCell>
                                <TableCell>{mockResidents.filter((r) => r.ecoleId === ecole.id).length}</TableCell>
                                <TableCell>
                                    <RowActions
                                        onView={() => router.push(`/ecoles/${ecole.id}`)}
                                        onEdit={() => router.push(`/ecoles/${ecole.id}`)}
                                        onDelete={() => setEcoles((prev) => prev.filter((e) => e.id !== ecole.id))}
                                        entityLabel="cette école"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination page={currentPage} totalPages={totalPages} basePath="/ecoles" />
            </div>

            <Dialog open={dialogOuvert} onOpenChange={(o) => { setDialogOuvert(o); if (!o) reinitialiser(); }}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Nouvelle école</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="nom">Nom</Label>
                            <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="adresse">Adresse</Label>
                            <Input id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="telephone">Téléphone</Label>
                            <Input id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOuvert(false)}>Annuler</Button>
                        <Button onClick={ajouter}>Créer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
