"use client";

import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// TODO: remplacer par les vraies infos (Clerk + Employe) une fois branché
const COMPTE_INITIAL = {
    nom: "Dilan Smith",
    email: "dilan.smith@svasta.be",
    telephone: "+32 470 12 34 56",
    roles: ["Administrateur"],
};

export function CompteForm() {
    const [form, setForm] = useState(COMPTE_INITIAL);
    const [enregistre, setEnregistre] = useState(false);

    function enregistrer() {
        // TODO: mutation Prisma
        setEnregistre(true);
        setTimeout(() => setEnregistre(false), 1500);
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                    <AvatarFallback className="text-lg">
                        {form.nom.split(" ").map((p) => p[0]).join("")}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-wrap gap-1">
                    {form.roles.map((role) => (
                        <Badge key={role} variant="secondary">{role}</Badge>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" value={form.nom} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={form.email} disabled />
                <p className="text-xs text-muted-foreground">Géré via l&apos;authentification, non modifiable ici.</p>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" value={form.telephone} onChange={(e) => setForm((f) => ({ ...f, telephone: e.target.value }))} />
            </div>

            <Button onClick={enregistrer} className="w-fit">
                {enregistre ? "Enregistré ✓" : "Enregistrer"}
            </Button>
        </div>
    );
}
