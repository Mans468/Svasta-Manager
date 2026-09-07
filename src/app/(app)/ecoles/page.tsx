"use client";

import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// TODO: remplacer par un vrai fetch une fois le backend branché
const ecoles = [
    { id: "1", nom: "Institut Saint-Michel Verviers", adresse: "Rue de l'école 46, 4800 Verviers", telephone: "+32 470 12 34 56", email: "info@saintmichelverviers.be", nbResidents: 103 },
    { id: "2", nom: "Athénée Royale Thil Lorrain", adresse: "Rue de l'école 46, 4800 Verviers", telephone: "+32 470 12 34 56", email: "info@atheneeroyalethillorrain.be", nbResidents: 21 },
    { id: "3", nom: "Athénée Royale Verdi", adresse: "Rue de l'école 46, 4800 Verviers", telephone: "+32 470 12 34 56", email: "info@atheneeroyaleverdi.be", nbResidents: 75 },
];

export default function Page() {
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="Écoles"
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
                            <Button>
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
                            <th className="py-2 font-normal">Adresse</th>
                            <th className="py-2 font-normal">Téléphone</th>
                            <th className="py-2 font-normal">Email</th>
                            <th className="py-2 font-normal">Nombre de résidents</th>
                            <th className="py-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {ecoles.map((ecole) => (
                            <tr
                                key={ecole.id}
                                className="group cursor-pointer border-t"
                                onClick={() => router.push(`/ecoles/${ecole.id}`)}
                            >
                                <td className="py-3">{ecole.nom}</td>
                                <td className="py-3 text-muted-foreground underline">{ecole.adresse}</td>
                                <td className="py-3 text-muted-foreground underline">{ecole.telephone}</td>
                                <td className="py-3 text-muted-foreground underline">{ecole.email}</td>
                                <td className="py-3 underline">{ecole.nbResidents}</td>
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
        </>
    );
}
