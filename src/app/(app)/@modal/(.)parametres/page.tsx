"use client";

import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function ParametresModal() {
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
                    <DialogTitle>Paramètres</DialogTitle>
                </DialogHeader>

                {/* TODO: formulaire paramètres */}
            </DialogContent>
        </Dialog>
    );
}
