"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { nomComplet, type MockEmploye } from "@/lib/mock-data";

const ROLES = ["Administrateur", "Éducateur", "Infirmier", "Assistant"] as const;

interface EmployeModifierRoleDialogProps {
    employe: MockEmploye | null;
    onClose: () => void;
    onSave: (roles: string[]) => void;
}

/** Modale focalisée : uniquement l'attribution des rôles (Administrateur uniquement). */
export function EmployeModifierRoleDialog({ employe, onClose, onSave }: EmployeModifierRoleDialogProps) {
    const [roles, setRoles] = useState<string[]>([]);

    useEffect(() => {
        if (employe) setRoles(employe.roles);
    }, [employe]);

    function toggle(role: string) {
        setRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]));
    }

    return (
        <Dialog open={employe !== null} onOpenChange={(o) => !o && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modifier le rôle - {employe && nomComplet(employe)}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <Label>Rôles (cumulables)</Label>
                    {ROLES.map((role) => (
                        <div key={role} className="flex items-center gap-2">
                            <Checkbox id={`role-${role}`} checked={roles.includes(role)} onCheckedChange={() => toggle(role)} />
                            <Label htmlFor={`role-${role}`} className="font-normal">{role}</Label>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button onClick={() => { onSave(roles); onClose(); }}>Enregistrer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
