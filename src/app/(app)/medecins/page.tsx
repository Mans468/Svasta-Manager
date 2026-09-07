"use client";

import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
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

// TODO: remplacer par un vrai fetch une fois le backend branché
const medecins = [
    { id: "1", nom: "Dupont", prenom: "Jean", specialisation: "Dentiste", telephone: "+32 470 12 34 56", email: "dupontjean@svasta.be", prochainRdv: "25/02/2026" },
    { id: "2", nom: "Dupont", prenom: "Jean", specialisation: "Orthodontiste", telephone: "+32 470 12 34 56", email: "dupontjean@svasta.be", prochainRdv: "Tous les lundis, mardis, jeudis" },
    { id: "3", nom: "Dupont", prenom: "Jean", specialisation: "Médecin généraliste", telephone: "+32 470 12 34 56", email: "dupontjean@svasta.be", prochainRdv: "-" },
];

export default function Page() {
    const [dialogOuvert, setDialogOuvert] = useState(false);

    return (
        <>
            <PageHeader
                title="Spécialistes"
                toolbar={
                    <div className="flex items-center justify-between gap-3">
                        <div className="relative w-full max-w-sm">
                            <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ fontSize: 18 }}>
                                search
                            </span>
                            <Input placeholder="Rechercher..." className="pl-9" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline">
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>tune</span>
                                Filtres
                            </Button>
                            {/* Infirmier uniquement */}
                            <Button onClick={() => setDialogOuvert(true)}>
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                                Ajouter
                            </Button>
                        </div>
                    </div>
                }
            />

            <div className="flex-1 overflow-auto px-6 pb-6">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-muted-foreground">
                            <th className="py-2 font-normal">Nom</th>
                            <th className="py-2 font-normal">Prénom</th>
                            <th className="py-2 font-normal">Spécialisation</th>
                            <th className="py-2 font-normal">Téléphone</th>
                            <th className="py-2 font-normal">Email</th>
                            <th className="py-2 font-normal">Prochains rendez-vous</th>
                            <th className="py-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {medecins.map((m) => (
                            <tr key={m.id} className="group border-t">
                                <td className="py-3">{m.nom}</td>
                                <td className="py-3">{m.prenom}</td>
                                <td className="py-3">{m.specialisation}</td>
                                <td className="py-3">{m.telephone}</td>
                                <td className="py-3">{m.email}</td>
                                <td className="py-3 underline">{m.prochainRdv}</td>
                                <td className="py-3">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100">
                                        <span className="material-symbols-rounded text-muted-foreground" style={{ fontSize: 18 }}>visibility</span>
                                        <span className="material-symbols-rounded text-muted-foreground" style={{ fontSize: 18 }}>edit</span>
                                        <span className="material-symbols-rounded text-muted-foreground" style={{ fontSize: 18 }}>more_vert</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={dialogOuvert} onOpenChange={setDialogOuvert}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un médecin</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="nom">Nom</Label>
                            <Input id="nom" placeholder="Dr. ..." />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="specialisation">Spécialisation</Label>
                            <Input id="specialisation" placeholder="Généraliste, dentiste..." />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="telephone">Téléphone</Label>
                            <Input id="telephone" placeholder="0X XX XX XX" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOuvert(false)}>Annuler</Button>
                        <Button onClick={() => setDialogOuvert(false)}>Ajouter</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
