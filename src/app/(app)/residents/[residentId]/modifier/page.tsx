"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { ResidentForm, type ResidentFormValues } from "@/components/residents/resident-form";
import { Button } from "@/components/ui/button";
import { mockCaravanes, mockEcoles, mockResidents, nomComplet } from "@/lib/mock-data";

function valeursDepuisResident(residentId: string): ResidentFormValues | null {
    const resident = mockResidents.find((r) => r.id === residentId);
    if (!resident) return null;
    return {
        nom: resident.nom,
        prenom: resident.prenom,
        dateNaissance: resident.dateNaissance,
        paysOrigine: resident.paysOrigine,
        langues: resident.langues,
        raisonRefuge: resident.raisonRefuge,
        statutProcedure: resident.statutProcedure,
        statutResidence: resident.statutResidence,
        caravane: mockCaravanes.find((c) => c.id === resident.caravaneId) ?? null,
        ecole: mockEcoles.find((e) => e.id === resident.ecoleId) ?? null,
        occupation: resident.occupation,
        email: resident.email,
        telephone: resident.telephone,
        numeroRegistre: resident.numeroRegistre,
    };
}

export default function Page({
    params,
}: {
    params: Promise<{ residentId: string }>;
}) {
    const { residentId } = use(params);
    const router = useRouter();
    const resident = mockResidents.find((r) => r.id === residentId);
    const [values, setValues] = useState<ResidentFormValues | null>(() => valeursDepuisResident(residentId));
    const [enregistre, setEnregistre] = useState(false);

    if (!resident || !values) {
        return (
            <>
                <PageHeader title="Résident introuvable" />
                <div className="px-6 pb-6 text-sm text-muted-foreground">
                    Aucun résident avec l&apos;id {residentId}.
                </div>
            </>
        );
    }

    function enregistrer() {
        // TODO: mutation Prisma une fois le backend branché
        setEnregistre(true);
        setTimeout(() => {
            setEnregistre(false);
            router.push(`/residents/${residentId}`);
        }, 600);
    }

    return (
        <>
            <PageHeader title={`Modifier ${nomComplet(resident)}`} />
            <div className="max-w-2xl flex-1 overflow-auto px-6 pb-6">
                <ResidentForm values={values} onChange={setValues} showNumeroRegistre />

                <div className="mt-6 flex gap-2">
                    <Button variant="outline" onClick={() => router.push(`/residents/${residentId}`)}>Annuler</Button>
                    <Button onClick={enregistrer}>{enregistre ? "Enregistré ✓" : "Enregistrer"}</Button>
                </div>
            </div>
        </>
    );
}
