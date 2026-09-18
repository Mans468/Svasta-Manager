"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { CopyableText } from "@/components/shared/copyable-text";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { mockEmployes, nomComplet } from "@/lib/mock-data";

const ROLES = ["Administrateur", "Éducateur", "Infirmier", "Assistant"] as const;

export default function EmployeSheet({
    params,
}: {
    params: Promise<{ employeId: string }>;
}) {
    const { employeId } = use(params);
    const router = useRouter();
    const employe = mockEmployes.find((e) => e.id === employeId);
    const [rolesActifs, setRolesActifs] = useState<string[]>(employe?.roles ?? []);

    function toggleRole(role: string) {
        setRolesActifs((current) =>
            current.includes(role) ? current.filter((r) => r !== role) : [...current, role],
        );
    }

    return (
        <Sheet open onOpenChange={(open) => !open && router.back()}>
            <SheetContent side="right" className="w-full gap-6 sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>{employe ? nomComplet(employe) : "Employé"}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-4">
                    {employe ? (
                        <>
                            <div className="flex flex-col gap-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>mail</span>
                                    <CopyableText value={employe.email} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>call</span>
                                    <CopyableText value={employe.telephone} />
                                </div>
                            </div>

                            <Separator />

                            <div className="flex flex-col gap-3">
                                {/* Administrateur uniquement */}
                                <Label>Rôles (cumulables)</Label>
                                {ROLES.map((role) => (
                                    <div key={role} className="flex items-center gap-2">
                                        <Checkbox id={role} checked={rolesActifs.includes(role)} onCheckedChange={() => toggleRole(role)} />
                                        <Label htmlFor={role} className="font-normal">{role}</Label>
                                    </div>
                                ))}
                            </div>

                            <Button className="w-fit">Enregistrer</Button>
                        </>
                    ) : (
                        <p className="text-sm text-muted-foreground">Employé introuvable ({employeId}).</p>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
