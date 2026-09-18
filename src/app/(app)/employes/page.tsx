"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { EmployeModifierRoleDialog } from "@/components/employes/employe-modifier-role-dialog";
import { EmployeVoirDialog } from "@/components/employes/employe-voir-dialog";
import { FilterField, FiltersPopover } from "@/components/shared/filters-popover";
import { RowActions } from "@/components/shared/row-actions";
import { paginate, TablePagination } from "@/components/shared/table-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { mockEmployes, type MockEmploye } from "@/lib/mock-data";

const STYLE_ROLE: Record<string, string> = {
    Administrateur: "bg-rose-100 text-rose-700 hover:bg-rose-100",
    Éducateur: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    Infirmier: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    Assistant: "bg-violet-100 text-violet-700 hover:bg-violet-100",
};

const ROLES = ["Administrateur", "Éducateur", "Infirmier", "Assistant"] as const;

const FILTER_FIELDS: FilterField[] = [
    { key: "role", label: "Rôle", options: ROLES.map((r) => ({ value: r, label: r })) },
];

const PAGE_SIZE = 10;

export default function Page() {
    const [employes, setEmployes] = useState<MockEmploye[]>(mockEmployes);
    const [filtres, setFiltres] = useState<Record<string, string>>({});
    const [page, setPage] = useState(1);

    const [employeAVoir, setEmployeAVoir] = useState<MockEmploye | null>(null);
    const [employeARoler, setEmployeARoler] = useState<MockEmploye | null>(null);
    const [dialogAjout, setDialogAjout] = useState(false);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [rolesNouveaux, setRolesNouveaux] = useState<string[]>([]);

    const filtres_ = useMemo(() => employes.filter((e) => !filtres.role || e.roles.includes(filtres.role)), [employes, filtres]);
    const { items, totalPages, currentPage } = paginate(filtres_, page, PAGE_SIZE);

    function reinitialiserAjout() {
        setNom(""); setPrenom(""); setEmail(""); setRolesNouveaux([]);
    }

    function ajouter() {
        if (!nom || !prenom || !email) return;
        setEmployes((prev) => [
            ...prev,
            { id: String(prev.length + 1), nom, prenom, email, telephone: "", roles: rolesNouveaux },
        ]);
        // TODO: côté backend, créer aussi l'entrée whitelist (voir note plus bas)
        reinitialiserAjout();
        setDialogAjout(false);
    }

    return (
        <>
            <PageHeader
                title="Employés"
                toolbar={
                    <div className="flex items-center justify-between gap-3">
                        <div className="relative w-full max-w-sm">
                            <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ fontSize: 18 }}>search</span>
                            <Input placeholder="Rechercher..." className="pl-9" />
                        </div>
                        <div className="flex items-center gap-2">
                            <FiltersPopover fields={FILTER_FIELDS} values={filtres} onChange={(key, value) => { setFiltres((f) => ({ ...f, [key]: value })); setPage(1); }} onReset={() => setFiltres({})} />
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
                            <TableHead>Rôles</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((employe) => (
                            <TableRow key={employe.id} className="group cursor-pointer" onClick={() => setEmployeAVoir(employe)}>
                                <TableCell>{employe.nom}</TableCell>
                                <TableCell>{employe.prenom}</TableCell>
                                <TableCell className="flex flex-wrap gap-1">
                                    {employe.roles.map((role) => (<Badge key={role} variant="secondary" className={STYLE_ROLE[role] ?? ""}>{role}</Badge>))}
                                </TableCell>
                                <TableCell>{employe.email}</TableCell>
                                <TableCell>
                                    <RowActions
                                        onView={() => setEmployeAVoir(employe)}
                                        onEdit={() => setEmployeARoler(employe)}
                                        onDelete={() => setEmployes((prev) => prev.filter((e) => e.id !== employe.id))}
                                        entityLabel="cet employé"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination page={currentPage} totalPages={totalPages} basePath="/employes" />
            </div>

            <EmployeVoirDialog employe={employeAVoir} onClose={() => setEmployeAVoir(null)} />

            <EmployeModifierRoleDialog
                employe={employeARoler}
                onClose={() => setEmployeARoler(null)}
                onSave={(roles) => setEmployes((prev) => prev.map((e) => (e.id === employeARoler?.id ? { ...e, roles } : e)))}
            />

            <Dialog open={dialogAjout} onOpenChange={(o) => { setDialogAjout(o); if (!o) reinitialiserAjout(); }}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Nouvel employé</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="nom">Nom</Label>
                                <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="prenom">Prénom</Label>
                                <Input id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="prenom.nom@svasta.be" />
                            <p className="text-xs text-muted-foreground">
                                Cet email autorisera la création de compte de l&apos;employé (voir note whitelist).
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Rôles</Label>
                            {ROLES.map((role) => (
                                <div key={role} className="flex items-center gap-2">
                                    <Checkbox
                                        id={`nouveau-${role}`}
                                        checked={rolesNouveaux.includes(role)}
                                        onCheckedChange={(c) => setRolesNouveaux((prev) => (c ? [...prev, role] : prev.filter((r) => r !== role)))}
                                    />
                                    <Label htmlFor={`nouveau-${role}`} className="font-normal">{role}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogAjout(false)}>Annuler</Button>
                        <Button onClick={ajouter}>Créer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
