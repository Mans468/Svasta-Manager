"use client";

import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ParametresForm() {
    const [modeSombre, setModeSombre] = useState(false);
    const [notifications, setNotifications] = useState(true);

    // Applique/retire simplement la classe "dark" sur <html> (pas de librairie de thème).
    useEffect(() => {
        document.documentElement.classList.toggle("dark", modeSombre);
    }, [modeSombre]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="mode-sombre">Mode sombre</Label>
                    <p className="text-xs text-muted-foreground">Bascule l&apos;interface en thème sombre.</p>
                </div>
                <Switch id="mode-sombre" checked={modeSombre} onCheckedChange={setModeSombre} />
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="notifications">Notifications</Label>
                    <p className="text-xs text-muted-foreground">Recevoir un email pour les nouveaux rendez-vous.</p>
                </div>
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <Label>Langue</Label>
                    <p className="text-xs text-muted-foreground">Seul le français est disponible pour l&apos;instant.</p>
                </div>
                <span className="text-sm text-muted-foreground">Français</span>
            </div>
        </div>
    );
}
