"use client";

import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// TODO: remplacer par un vrai fetch une fois le backend branché
const residents = [
    {
        id: "1024",
        num: "01.02.06-331.36",
        nom: "Dupont",
        prenom: "Jean",
        naissance: "14/10/2002",
        statut: "22bis",
        pays: "Sénégal",
        caravane: "A17",
    },
    {
        id: "1025",
        num: "01.02.06-331.36",
        nom: "Dupont",
        prenom: "Jean",
        naissance: "14/10/2002",
        statut: "22bis",
        pays: "Sénégal",
        caravane: "A17",
    },
    {
        id: "1028",
        num: "01.02.06-331.36",
        nom: "Dupont",
        prenom: "Jean",
        naissance: "14/10/2002",
        statut: "Naturalisé",
        pays: "Sénégal",
        caravane: "A17",
    },
];

const styleParStatut: Record<string, string> = {
    "22bis": "bg-blue-100 text-blue-700 hover:bg-blue-100",
    Naturalisé: "bg-rose-100 text-rose-700 hover:bg-rose-100",
};

export default function Page() {
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="Résidents"
                toolbar={
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
                            <Button variant="outline">
                                <span
                                    className="material-symbols-rounded"
                                    style={{ fontSize: 16 }}
                                >
                                    tune
                                </span>
                                Filtres
                            </Button>
                            <Button>
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
                }
            />

            <div className="flex-1 overflow-auto px-6 pb-6">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-muted-foreground">
                            <th className="py-2 font-normal">Id</th>
                            <th className="py-2 font-normal">Num</th>
                            <th className="py-2 font-normal">Nom</th>
                            <th className="py-2 font-normal">Prénom</th>
                            <th className="py-2 font-normal">
                                Date de naissance
                            </th>
                            <th className="py-2 font-normal">Statut</th>
                            <th className="py-2 font-normal">
                                Pays d&apos;origine
                            </th>
                            <th className="py-2 font-normal">Caravane</th>
                            <th className="py-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {residents.map((resident) => (
                            <tr
                                key={resident.id}
                                className="group cursor-pointer border-t"
                                onClick={() =>
                                    router.push(`/residents/${resident.id}`)
                                }
                            >
                                <td className="py-3 text-muted-foreground">
                                    {resident.id}
                                </td>
                                <td className="py-3 text-muted-foreground">
                                    {resident.num}
                                </td>
                                <td className="py-3">{resident.nom}</td>
                                <td className="py-3">{resident.prenom}</td>
                                <td className="py-3">{resident.naissance}</td>
                                <td className="py-3">
                                    <Badge
                                        className={
                                            styleParStatut[resident.statut] ??
                                            ""
                                        }
                                        variant="secondary"
                                    >
                                        {resident.statut}
                                    </Badge>
                                </td>
                                <td className="py-3">{resident.pays}</td>
                                <td className="py-3">{resident.caravane}</td>
                                <td className="py-3">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100">
                                        <span
                                            className="material-symbols-rounded text-muted-foreground"
                                            style={{ fontSize: 18 }}
                                        >
                                            visibility
                                        </span>
                                        <span
                                            className="material-symbols-rounded text-muted-foreground"
                                            style={{ fontSize: 18 }}
                                        >
                                            edit
                                        </span>
                                        <span
                                            className="material-symbols-rounded text-muted-foreground"
                                            style={{ fontSize: 18 }}
                                        >
                                            more_vert
                                        </span>
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
