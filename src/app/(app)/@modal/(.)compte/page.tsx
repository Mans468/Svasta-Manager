"use client";

import { useRouter } from "next/navigation";

import { CompteForm } from "@/components/account/compte-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function CompteModal() {
    const router = useRouter();

    return (
        <Dialog open onOpenChange={(open) => !open && router.back()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Compte</DialogTitle>
                </DialogHeader>
                <CompteForm />
            </DialogContent>
        </Dialog>
    );
}
