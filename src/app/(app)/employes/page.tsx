"use client";

import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// TODO: remplacer par un vrai fetch une fois le backend branché
const employes = [
    {
        id: "1",
        nom: "Dupont",
        prenom: "Jean",
        role: "Directeur",
        telephone: "+32 470 12 34 56",
        email: "dupontjean@svasta.be",
    },
    {
        id: "2",
        nom: "Dupont",
        prenom: "Jean",
        role: "Éducateur",
        telephone: "+32 470 12 34 56",
        email: "dupontjean@svasta.be",
    },
    {
        id: "3",
        nom: "Dupont",
        prenom: "Jean",
        role: "Éducateur",
        telephone: "+32 470 12 34 56",
        email: "dupontjean@svasta.be",
    },
];

const styleParRole: Record<string, string> = {
    Directeur: "bg-rose-100 text-rose-700 hover:bg-rose-100",
    Éducateur: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    Infirmier: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    Assistant: "bg-violet-100 text-violet-700 hover:bg-violet-100",
};

export default function Page() {
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="Employés"
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
                            <th className="py-2 font-normal">Nom</th>
                            <th className="py-2 font-normal">Prénom</th>
                            <th className="py-2 font-normal">Rôle</th>
                            <th className="py-2 font-normal">Téléphone</th>
                            <th className="py-2 font-normal">Email</th>
                            <th className="py-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {employes.map((employe) => (
                            <tr
                                key={employe.id}
                                className="group cursor-pointer border-t"
                                onClick={() =>
                                    router.push(`/employes/${employe.id}`)
                                }
                            >
                                <td className="py-3">{employe.nom}</td>
                                <td className="py-3">{employe.prenom}</td>
                                <td className="py-3">
                                    <Badge
                                        variant="secondary"
                                        className={
                                            styleParRole[employe.role] ?? ""
                                        }
                                    >
                                        {employe.role}
                                    </Badge>
                                </td>
                                <td className="py-3">{employe.telephone}</td>
                                <td className="py-3">{employe.email}</td>
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
