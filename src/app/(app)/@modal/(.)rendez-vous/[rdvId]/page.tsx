"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import { PersonLink } from "@/components/shared/person-link";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { formatDateFr } from "@/lib/date-utils";
import { mockMedecins, mockResidents, nomComplet } from "@/lib/mock-data";
import { MOCK_RDV_MEDICAUX } from "@/lib/mock-rdv-medicaux";

export default function RendezVousModal({
    params,
}: {
    params: Promise<{ rdvId: string }>;
}) {
    const { rdvId } = use(params);
    const router = useRouter();
    const rdv = MOCK_RDV_MEDICAUX.find((r) => r.id === rdvId);
    const medecin = rdv ? mockMedecins.find((m) => m.id === rdv.medecinId) : null;
    const resident = rdv ? mockResidents.find((r) => r.id === rdv.residentId) : null;
    const autresRdvMemeVisite = rdv?.visiteGroupeeId
        ? MOCK_RDV_MEDICAUX.filter((r) => r.visiteGroupeeId === rdv.visiteGroupeeId && r.id !== rdv.id)
        : [];

    return (
        <Dialog open onOpenChange={(open) => !open && router.back()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{rdv?.motif ?? "Rendez-vous"}</DialogTitle>
                </DialogHeader>

                {rdv ? (
                    <div className="flex flex-col gap-3 text-sm">
                        {rdv.visiteGroupeeId && <Badge variant="secondary" className="w-fit">Visite groupée</Badge>}

                        <div className="flex items-center gap-2">
                            <span className="material-symbols-rounded shrink-0 text-muted-foreground" style={{ fontSize: 18 }}>calendar_month</span>
                            {formatDateFr(rdv.date)} · {rdv.heure}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-rounded shrink-0 text-muted-foreground" style={{ fontSize: 18 }}>location_on</span>
                            {rdv.lieu}
                        </div>
                        {medecin && (
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-rounded shrink-0 text-muted-foreground" style={{ fontSize: 18 }}>stethoscope</span>
                                {nomComplet(medecin)} - {medecin.specialisation}
                            </div>
                        )}
                        {resident && (
                            <div className="flex items-center gap-2">
                                {/* TODO RBAC : Infirmier voit le nom, les autres rôles doivent voir l'ID uniquement (secret médical, 4.11) */}
                                <span className="material-symbols-rounded shrink-0 text-muted-foreground" style={{ fontSize: 18 }}>person</span>
                                <PersonLink id={resident.id} nom={nomComplet(resident)} type="resident" />
                            </div>
                        )}

                        {autresRdvMemeVisite.length > 0 && (
                            <div className="mt-2 flex flex-col gap-1 border-t pt-2">
                                <span className="text-xs font-medium text-muted-foreground">Autres résidents de cette visite</span>
                                {autresRdvMemeVisite.map((r) => {
                                    const autreResident = mockResidents.find((res) => res.id === r.residentId);
                                    return (
                                        <div key={r.id} className="flex items-center justify-between text-sm">
                                            {autreResident && <PersonLink id={autreResident.id} nom={nomComplet(autreResident)} type="resident" />}
                                            <span className="text-muted-foreground">{r.heure}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Rendez-vous introuvable ({rdvId}).</p>
                )}
            </DialogContent>
        </Dialog>
    );
}
