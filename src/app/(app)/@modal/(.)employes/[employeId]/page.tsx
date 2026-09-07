"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

const ROLES = ["Directeur", "Éducateur", "Infirmier", "Assistant"] as const;

export default function EmployeSheet({
    params,
}: {
    params: Promise<{ employeId: string }>;
}) {
    const { employeId } = use(params);
    const router = useRouter();
    // TODO: initialiser depuis les vraies données de l'employé
    const [rolesActifs, setRolesActifs] = useState<string[]>([]);

    function toggleRole(role: string) {
        setRolesActifs((current) =>
            current.includes(role)
                ? current.filter((r) => r !== role)
                : [...current, role],
        );
    }

    return (
        <Sheet
            open
            onOpenChange={(open) => {
                if (!open) router.back();
            }}
        >
            <SheetContent side="right" className="w-full gap-6 sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Employé {employeId}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-4">
                    <div className="flex flex-col gap-3">
                        <Label>Rôles (cumulables)</Label>
                        {ROLES.map((role) => (
                            <div key={role} className="flex items-center gap-2">
                                <Checkbox
                                    id={role}
                                    checked={rolesActifs.includes(role)}
                                    onCheckedChange={() => toggleRole(role)}
                                />
                                <Label htmlFor={role} className="font-normal">
                                    {role}
                                </Label>
                            </div>
                        ))}
                    </div>

                    <Button>Enregistrer</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
