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
const stats = {
    abonnementsActifs: 127,
    abonnementsExpires: 79,
    ticketsTrain: 12,
    ticketsBus: 27,
};

const lignes = [
    { id: "1", resident: "Jean Marc", type: "Ticket aller-retour", moyen: "Train", detail: "2 Tickets", ref: "1647, 4895" },
    { id: "2", date: "17 Août 2026", type: "Ticket aller", moyen: "Train", detail: "12 Tickets", montant: "28.12 €", expire: "18/08/2026" },
    { id: "3", date: "17 Août 2026", type: "Ticket aller", moyen: "Bus TEC", detail: "8 Tickets", montant: "18.78 €", expire: "17/08/2026" },
];

export default function Page() {
    const [dialogOuvert, setDialogOuvert] = useState(false);

    return (
        <>
            <PageHeader
                title="Transports en commun"
                toolbar={
                    <>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="rounded-xl bg-emerald-50 px-5 py-3">
                                <span className="text-sm text-emerald-700">
                                    Abonnements actifs
                                </span>
                                <p className="text-2xl font-semibold text-emerald-700">
                                    {stats.abonnementsActifs}
                                </p>
                            </div>
                            <div className="rounded-xl bg-rose-50 px-5 py-3">
                                <span className="text-sm text-rose-700">
                                    Abonnements expirés
                                </span>
                                <p className="text-2xl font-semibold text-rose-700">
                                    {stats.abonnementsExpires}
                                </p>
                            </div>
                            <div className="rounded-xl border px-5 py-3">
                                <span className="text-sm text-muted-foreground">
                                    Tickets de trains
                                </span>
                                <p className="text-2xl font-semibold">
                                    {stats.ticketsTrain}
                                </p>
                            </div>
                            <div className="rounded-xl border px-5 py-3">
                                <span className="text-sm text-muted-foreground">
                                    Tickets de bus
                                </span>
                                <p className="text-2xl font-semibold">
                                    {stats.ticketsBus}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                            <div className="relative w-full max-w-sm">
                                <span
                                    className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    style={{ fontSize: 18 }}
                                >
                                    search
                                </span>
                                <Input
                                    placeholder="Rechercher..."
                                    className="pl-9"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="secondary">Payés</Button>
                                <Button variant="ghost">Expirés</Button>
                                <Button variant="ghost">Voir tout</Button>
                                <Button variant="outline">
                                    <span
                                        className="material-symbols-rounded"
                                        style={{ fontSize: 16 }}
                                    >
                                        tune
                                    </span>
                                    Filtres
                                </Button>
                                <Button onClick={() => setDialogOuvert(true)}>
                                    <span
                                        className="material-symbols-rounded"
                                        style={{ fontSize: 16 }}
                                    >
                                        add
                                    </span>
                                    Ajouter
                                </Button>
                            </div>
                        </div>
                    </>
                }
            />

            <div className="flex-1 overflow-auto px-6 pb-6">
                <div className="flex flex-col">
                    {lignes.map((ligne, i) => (
                        <div
                            key={ligne.id}
                            className={`flex items-center justify-between py-4 text-sm ${i > 0 ? "border-t" : ""}`}
                        >
                            <div className="flex flex-col gap-1">
                                {ligne.resident && (
                                    <span className="font-medium">
                                        {ligne.resident}
                                    </span>
                                )}
                                {ligne.date && <span>{ligne.date}</span>}
                                {ligne.expire && (
                                    <span className="text-muted-foreground">
                                        Jusqu&apos;au {ligne.expire}
                                    </span>
                                )}
                            </div>
                            <span>{ligne.type}</span>
                            <span className="text-muted-foreground">
                                {ligne.moyen}
                            </span>
                            <span>{ligne.detail}</span>
                            {ligne.montant && <span>{ligne.montant}</span>}
                            {ligne.ref && (
                                <span className="text-muted-foreground">
                                    {ligne.ref}
                                </span>
                            )}
                            <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white"
                            >
                                <span
                                    className="material-symbols-rounded"
                                    style={{ fontSize: 18 }}
                                >
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={dialogOuvert} onOpenChange={setDialogOuvert}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Attribuer un ticket / abonnement
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="resident">Résident</Label>
                            <Input
                                id="resident"
                                placeholder="Rechercher un résident"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="idTicket">
                                ID ticket (ou expiration si abonnement)
                            </Label>
                            <Input id="idTicket" placeholder="Ex. T-002" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="raison">Raison</Label>
                            <Input
                                id="raison"
                                placeholder="Raison de l'attribution"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDialogOuvert(false)}
                        >
                            Annuler
                        </Button>
                        <Button onClick={() => setDialogOuvert(false)}>
                            Attribuer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
