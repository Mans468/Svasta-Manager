"use client";

import { useRouter } from "next/navigation";

import { ParametresForm } from "@/components/account/parametres-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function ParametresModal() {
    const router = useRouter();

    return (
        <Dialog open onOpenChange={(open) => !open && router.back()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Paramètres</DialogTitle>
                </DialogHeader>
                <ParametresForm />
            </DialogContent>
        </Dialog>
    );
}
