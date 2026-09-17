"use client";

import { PersonLink } from "@/components/shared/person-link";
import { CopyableText } from "@/components/shared/copyable-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { estPasse, formatDateFr } from "@/lib/date-utils";
import { mockResidents, nomComplet, type MockMedecin } from "@/lib/mock-data";
import type { MockRdvMedical } from "@/lib/mock-rdv-medicaux";

interface MedecinVoirDialogProps {
    medecin: MockMedecin | null;
    rdvs: MockRdvMedical[];
    onClose: () => void;
    onCreerVisite: () => void;
}

export function MedecinVoirDialog({ medecin, rdvs, onClose, onCreerVisite }: MedecinVoirDialogProps) {
    const rdvsFuturs = medecin
        ? rdvs.filter((r) => r.medecinId === medecin.id && !estPasse(r.date)).sort((a, b) => a.date.localeCompare(b.date))
        : [];

    return (
        <Dialog open={medecin !== null} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{medecin && nomComplet(medecin)}</DialogTitle>
                </DialogHeader>

                {medecin && (
                    <div className="flex flex-col gap-4">
                        <Badge variant="secondary" className="w-fit">{medecin.specialisation}</Badge>

                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>call</span>
                                <CopyableText value={medecin.telephone} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>mail</span>
                                <CopyableText value={medecin.email} />
                            </div>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(medecin.adresseCabinet)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 underline decoration-dotted underline-offset-2 hover:decoration-solid"
                            >
                                <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>location_on</span>
                                {medecin.adresseCabinet}
                            </a>
                        </div>

                        <Separator />

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">Prochains rendez-vous</h3>
                                <Button size="sm" variant="outline" onClick={onCreerVisite}>
                                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                                    Visite groupée
                                </Button>
                            </div>
                            {rdvsFuturs.length === 0 && <p className="text-sm text-muted-foreground">Aucun rendez-vous à venir.</p>}
                            {rdvsFuturs.map((rdv) => {
                                const resident = mockResidents.find((r) => r.id === rdv.residentId);
                                return (
                                    <div key={rdv.id} className="flex items-center justify-between rounded-lg border p-2 text-sm">
                                        <div className="flex flex-col">
                                            {resident && <PersonLink id={resident.id} nom={nomComplet(resident)} type="resident" />}
                                            <span className="text-xs text-muted-foreground">{rdv.motif}</span>
                                        </div>
                                        <span className="text-muted-foreground">{formatDateFr(rdv.date)} · {rdv.heure}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
