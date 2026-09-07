"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function RendezVousModal({
    params,
}: {
    params: Promise<{ rdvId: string }>;
}) {
    const { rdvId } = use(params);
    const router = useRouter();

    return (
        <Dialog
            open
            onOpenChange={(open) => {
                if (!open) router.back();
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rendez-vous {rdvId}</DialogTitle>
                </DialogHeader>

                {/* TODO: détail du rendez-vous (résident/ID, date, médecin, motif...) */}
            </DialogContent>
        </Dialog>
    );
}
