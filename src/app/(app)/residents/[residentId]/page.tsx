"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// TODO: remplacer par un vrai fetch
const resident = {
    nom: "Jean Malik",
    statut: "En attente",
    presence: "Présent",
    caravane: "A21",
    numero: "01.02.06-331.11",
    naissance: "16 Janvier 2005",
    inscription: "24 Février 2025",
    pays: "Russie",
    langues: "Russe, Français",
    raisonRefuge: "Guerre",
    famille: "Sarah Malik, Marc Malik",
    email: "marcmalik@gmail.com",
    telephone: "+32 470 12 34 56",
    occupation: "Étudiant",
};

const rendezVous = [
    { id: "1", medecin: "Dr. Schmit", date: "28/01/2026", heure: "9:00" },
    { id: "2", medecin: "Dr. Carlson", date: "05/02/2026", heure: "11:00" },
];

const historique = [
    {
        heure: "12:12",
        texte: "John Doe a ajouté Jean Malik à l'activité",
        tag: "Parc Astérix",
    },
    {
        heure: "11:42",
        texte: "Sarah Malik a déplacé Jean Malik de la caravane A21 à A22",
    },
    {
        heure: "10:12",
        texte: "Jean Luc a mis à jour le rendez-vous",
        tag: "Dr. Schmit",
    },
];

export default function ResidentDialog({
    params,
}: {
    params: Promise<{ residentId: string }>;
}) {
    const { residentId } = use(params);
    const router = useRouter();

    return (
        <Dialog
            open
            onOpenChange={(open) => {
                if (!open) router.back();
            }}
        >
            <DialogContent className="max-w-3xl gap-0 p-0">
                <DialogHeader className="flex-row items-center justify-between border-b p-4">
                    <DialogTitle className="text-base font-medium text-muted-foreground">
                        Résident
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-8 p-6">
                    {/* Colonne gauche : infos */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-semibold">
                            {resident.nom}
                        </h2>

                        <FieldRow label="Status">
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                                {resident.statut}
                            </Badge>
                        </FieldRow>
                        <FieldRow label="Toujours au centre">
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                                {resident.presence}
                            </Badge>
                        </FieldRow>
                        <FieldRow label="Caravane">
                            <span className="underline">
                                {resident.caravane}
                            </span>
                        </FieldRow>
                        <FieldRow label="Numéro de registre">
                            {resident.numero}
                        </FieldRow>
                        <FieldRow label="Date de naissance">
                            {resident.naissance}
                        </FieldRow>
                        <FieldRow label="Date d'inscription">
                            {resident.inscription}
                        </FieldRow>
                        <FieldRow label="Pays d'origine">
                            {resident.pays}
                        </FieldRow>
                        <FieldRow label="Langues">{resident.langues}</FieldRow>
                        <FieldRow label="Raison du refuge">
                            {resident.raisonRefuge}
                        </FieldRow>
                        <FieldRow label="Famille">
                            <span className="underline">
                                {resident.famille}
                            </span>
                        </FieldRow>
                        <FieldRow label="Email">
                            <span className="underline">{resident.email}</span>
                        </FieldRow>
                        <FieldRow label="Téléphone">
                            <span className="underline">
                                {resident.telephone}
                            </span>
                        </FieldRow>
                        <FieldRow label="Occupation">
                            <span className="underline">
                                {resident.occupation}
                            </span>
                        </FieldRow>
                    </div>

                    {/* Colonne droite : RDV/Abonnements + Historique */}
                    <div className="flex flex-col gap-4">
                        <Tabs defaultValue="rdv">
                            <TabsList>
                                <TabsTrigger value="rdv">
                                    Rendez-vous
                                </TabsTrigger>
                                <TabsTrigger value="abonnements">
                                    Abonnements
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="rdv"
                                className="flex flex-col gap-2"
                            >
                                {rendezVous.map((rdv) => (
                                    <div
                                        key={rdv.id}
                                        className="flex items-center justify-between rounded-lg border p-3"
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {rdv.medecin}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {rdv.date}
                                            </span>
                                        </div>
                                        <Badge variant="secondary">
                                            {rdv.heure}
                                        </Badge>
                                    </div>
                                ))}
                            </TabsContent>
                            <TabsContent value="abonnements">
                                <p className="text-sm text-muted-foreground">
                                    Aucun abonnement actif.
                                </p>
                            </TabsContent>
                        </Tabs>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-medium">Historique</h3>
                            <p className="text-xs text-muted-foreground">
                                Aujourd&apos;hui
                            </p>
                            {historique.map((entree, i) => (
                                <div key={i} className="flex gap-2 text-sm">
                                    <span className="w-10 shrink-0 text-muted-foreground">
                                        {entree.heure}
                                    </span>
                                    <span>
                                        {entree.texte}{" "}
                                        {entree.tag && (
                                            <Badge
                                                variant="secondary"
                                                className="ml-1"
                                            >
                                                {entree.tag}
                                            </Badge>
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function FieldRow({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between border-b py-1.5 text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span>{children}</span>
        </div>
    );
}
