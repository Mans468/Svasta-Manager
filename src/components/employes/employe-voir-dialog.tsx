"use client";

import { CopyableText } from "@/components/shared/copyable-text";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { nomComplet, type MockEmploye } from "@/lib/mock-data";

export function EmployeVoirDialog({ employe, onClose }: { employe: MockEmploye | null; onClose: () => void }) {
    return (
        <Dialog open={employe !== null} onOpenChange={(o) => !o && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{employe && nomComplet(employe)}</DialogTitle>
                </DialogHeader>
                {employe && (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-1">
                            {employe.roles.map((role) => (<Badge key={role} variant="secondary">{role}</Badge>))}
                        </div>
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>mail</span>
                                <CopyableText value={employe.email} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>call</span>
                                <CopyableText value={employe.telephone} />
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
