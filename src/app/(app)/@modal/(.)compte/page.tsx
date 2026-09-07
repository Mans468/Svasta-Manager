"use client";

import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function CompteModal() {
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
                    <DialogTitle>Compte</DialogTitle>
                </DialogHeader>

                {/* TODO: formulaire compte */}
            </DialogContent>
        </Dialog>
    );
}
