"use client";

import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { MedecinModifierDialog } from "@/components/medecins/medecin-modifier-dialog";
import { MedecinVoirDialog } from "@/components/medecins/medecin-voir-dialog";
import { VisiteGroupeeDialog } from "@/components/medecins/visite-groupee-dialog";
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
import { mockMedecins, type MockMedecin } from "@/lib/mock-data";
import { MOCK_RDV_MEDICAUX, type MockRdvMedical } from "@/lib/mock-rdv-medicaux";

const PAGE_SIZE = 10;

export default function Page() {
    const [medecins, setMedecins] = useState<MockMedecin[]>(mockMedecins);
    const [rdvs, setRdvs] = useState<MockRdvMedical[]>(MOCK_RDV_MEDICAUX);
    const [page, setPage] = useState(1);

    const [medecinAVoir, setMedecinAVoir] = useState<MockMedecin | null>(null);
    const [medecinAModifier, setMedecinAModifier] = useState<MockMedecin | null>(null);
    const [medecinPourVisite, setMedecinPourVisite] = useState<MockMedecin | null>(null);

    const [dialogAjout, setDialogAjout] = useState(false);
    const [form, setForm] = useState({ nom: "", prenom: "", specialisation: "", telephone: "", email: "", adresseCabinet: "" });

    const { items, totalPages, currentPage } = paginate(medecins, page, PAGE_SIZE);

    function ajouter() {
        if (!form.nom || !form.specialisation) return;
        setMedecins((prev) => [...prev, { id: String(prev.length + 1), ...form }]);
        setForm({ nom: "", prenom: "", specialisation: "", telephone: "", email: "", adresseCabinet: "" });
        setDialogAjout(false);
    }

    return (
        <>
            <PageHeader
                title="Spécialistes"
                toolbar={
                    <div className="flex items-center justify-between gap-3">
                        <div className="relative w-full max-w-sm">
                            <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ fontSize: 18 }}>search</span>
                            <Input placeholder="Rechercher..." className="pl-9" />
                        </div>
                        {/* Infirmier uniquement */}
                        <Button onClick={() => setDialogAjout(true)}>
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
                            <TableHead>Prénom</TableHead>
                            <TableHead>Spécialisation</TableHead>
                            <TableHead>Téléphone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((m) => (
                            <TableRow key={m.id} className="group cursor-pointer" onClick={() => setMedecinAVoir(m)}>
                                <TableCell>{m.nom}</TableCell>
                                <TableCell>{m.prenom}</TableCell>
                                <TableCell>{m.specialisation}</TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()}><CopyableText value={m.telephone} /></TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()}><CopyableText value={m.email} /></TableCell>
                                <TableCell>
                                    <RowActions
                                        onView={() => setMedecinAVoir(m)}
                                        onEdit={() => setMedecinAModifier(m)}
                                        onDelete={() => setMedecins((prev) => prev.filter((x) => x.id !== m.id))}
                                        entityLabel="ce médecin"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination page={currentPage} totalPages={totalPages} basePath="/medecins" />
            </div>

            <MedecinVoirDialog
                medecin={medecinAVoir}
                rdvs={rdvs}
                onClose={() => setMedecinAVoir(null)}
                onCreerVisite={() => { setMedecinPourVisite(medecinAVoir); setMedecinAVoir(null); }}
            />

            <MedecinModifierDialog
                medecin={medecinAModifier}
                onClose={() => setMedecinAModifier(null)}
                onSave={(maj) => setMedecins((prev) => prev.map((m) => (m.id === maj.id ? maj : m)))}
            />

            <VisiteGroupeeDialog
                medecin={medecinPourVisite}
                onClose={() => setMedecinPourVisite(null)}
                onCreate={(nouveaux) => setRdvs((prev) => [...prev, ...nouveaux])}
            />

            <Dialog open={dialogAjout} onOpenChange={setDialogAjout}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Ajouter un médecin</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="nom">Nom</Label>
                                <Input id="nom" value={form.nom} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="prenom">Prénom</Label>
                                <Input id="prenom" value={form.prenom} onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="specialisation">Spécialisation</Label>
                            <Input id="specialisation" value={form.specialisation} onChange={(e) => setForm((f) => ({ ...f, specialisation: e.target.value }))} placeholder="Généraliste, dentiste..." />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="telephone">Téléphone</Label>
                            <Input id="telephone" value={form.telephone} onChange={(e) => setForm((f) => ({ ...f, telephone: e.target.value }))} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="adresse">Adresse du cabinet</Label>
                            <Input id="adresse" value={form.adresseCabinet} onChange={(e) => setForm((f) => ({ ...f, adresseCabinet: e.target.value }))} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogAjout(false)}>Annuler</Button>
                        <Button onClick={ajouter}>Ajouter</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
