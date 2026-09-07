"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

export default function ResidentSheet({
    params,
}: {
    params: Promise<{ residentId: string }>;
}) {
    const { residentId } = use(params);
    const router = useRouter();

    return (
        <Sheet
            open
            onOpenChange={(open) => {
                if (!open) router.back();
            }}
        >
            <SheetContent side="right" className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Résident {residentId}</SheetTitle>
                </SheetHeader>

                {/* TODO: onglets Rendez-vous / Abonnements / Historique */}
            </SheetContent>
        </Sheet>
    );
}
