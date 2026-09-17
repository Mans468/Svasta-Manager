"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { CopyableText } from "@/components/shared/copyable-text";
import { PersonLink } from "@/components/shared/person-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { mockEcoles, mockResidents, nomComplet } from "@/lib/mock-data";

export default function EcoleSheet({
    params,
}: {
    params: Promise<{ ecoleId: string }>;
}) {
    const { ecoleId } = use(params);
    const router = useRouter();
    const ecole = mockEcoles.find((e) => e.id === ecoleId);
    const [nom, setNom] = useState(ecole?.nom ?? "");
    const [adresse, setAdresse] = useState(ecole?.adresse ?? "");

    const residentsInscrits = mockResidents.filter((r) => r.ecoleId === ecole?.id);

    return (
        <Sheet open onOpenChange={(open) => !open && router.back()}>
            <SheetContent side="right" className="w-full gap-6 sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>{ecole?.nom ?? "École"}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-4">
                    {ecole ? (
                        <>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="nom">Nom</Label>
                                <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="adresse">Adresse</Label>
                                <Input id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>call</span>
                                    <CopyableText value={ecole.telephone} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>mail</span>
                                    <CopyableText value={ecole.email} />
                                </div>
                            </div>

                            <Separator />

                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-medium">Résidents inscrits</h3>
                                {residentsInscrits.map((resident) => (
                                    <div key={resident.id} className="rounded-md border p-2 text-sm">
                                        <PersonLink id={resident.id} nom={nomComplet(resident)} type="resident" />
                                    </div>
                                ))}
                            </div>

                            <Button className="w-fit">Enregistrer</Button>
                        </>
                    ) : (
                        <p className="text-sm text-muted-foreground">École introuvable ({ecoleId}).</p>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
