"use client";

import { useRouter } from "next/navigation";

import { PersonLink } from "@/components/shared/person-link";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { mockEmployes, mockMedecins, mockResidents, nomComplet } from "@/lib/mock-data";
import { MOCK_NAVETTES } from "@/lib/mock-navettes";
import { lienDetailEvenement } from "@/lib/agenda/utils";
import type { CalendarEvent } from "@/lib/agenda/types";

interface EventInfoDialogProps {
    event: CalendarEvent | null;
    onOpenChange: (open: boolean) => void;
    onModifier: (event: CalendarEvent) => void;
}

function formatPeriode(start: string, end: string) {
    const d = new Date(start);
    const date = d.toLocaleDateString("fr-BE", { day: "2-digit", month: "long", year: "numeric" });
    const debut = d.toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" });
    const fin = new Date(end).toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" });
    return `${date} · ${debut} - ${fin}`;
}

// Vue rapide d'un événement cliqué sur l'agenda.
export function EventInfoDialog({ event, onOpenChange, onModifier }: EventInfoDialogProps) {
    const router = useRouter();
    const lienDetail = event ? lienDetailEvenement(event) : null;

    const residents = event ? mockResidents.filter((r) => event.residentIds.includes(r.id)) : [];
    const employes = event ? mockEmployes.filter((e) => event.employeIds.includes(e.id)) : [];
    const medecin = event?.medecinId ? mockMedecins.find((m) => m.id === event.medecinId) : null;
    const navette = event?.navetteId ? MOCK_NAVETTES.find((n) => n.id === event.navetteId) : null;

    return (
        <Dialog open={event !== null} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{event?.titre}</DialogTitle>
                </DialogHeader>

                {event && (
                    <div className="flex flex-col gap-3 text-sm">
                        {event.description && (
                            <p className="text-muted-foreground">{event.description}</p>
                        )}

                        <div className="flex items-start gap-2">
                            <span className="material-symbols-rounded shrink-0 text-muted-foreground" style={{ fontSize: 18 }}>
                                calendar_month
                            </span>
                            <span>{formatPeriode(event.start, event.end)}</span>
                        </div>

                        {medecin && (
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-rounded shrink-0 text-muted-foreground" style={{ fontSize: 18 }}>
                                    stethoscope
                                </span>
                                <span>{nomComplet(medecin)} - {medecin.specialisation}</span>
                            </div>
                        )}

                        {event.lieu && (
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.lieu)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-2 underline decoration-dotted underline-offset-2 hover:decoration-solid"
                            >
                                <span className="material-symbols-rounded shrink-0 text-muted-foreground" style={{ fontSize: 18 }}>
                                    location_on
                                </span>
                                {event.lieu}
                            </a>
                        )}

                        {navette && (
                            <button
                                onClick={() => router.push(`/navettes/${navette.id}`)}
                                className="flex items-start gap-2 text-left underline decoration-dotted underline-offset-2 hover:decoration-solid"
                            >
                                <span className="material-symbols-rounded shrink-0 text-muted-foreground" style={{ fontSize: 18 }}>
                                    airport_shuttle
                                </span>
                                {navette.depart} → {navette.arrivee}
                            </button>
                        )}

                        {(residents.length > 0 || employes.length > 0) && (
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-rounded shrink-0 text-muted-foreground" style={{ fontSize: 18 }}>
                                    groups
                                </span>
                                <span className="flex flex-wrap gap-x-1">
                                    {residents.map((r, i) => (
                                        <span key={r.id}>
                                            <PersonLink id={r.id} nom={nomComplet(r)} type="resident" />
                                            {(i < residents.length - 1 || employes.length > 0) && ", "}
                                        </span>
                                    ))}
                                    {employes.map((e, i) => (
                                        <span key={e.id}>
                                            <PersonLink id={e.id} nom={nomComplet(e)} type="employe" />
                                            {i < employes.length - 1 && ", "}
                                        </span>
                                    ))}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                <DialogFooter>
                    {lienDetail && (
                        <Button variant="outline" onClick={() => router.push(lienDetail)}>
                            Voir plus
                        </Button>
                    )}
                    {event && (
                        <Button onClick={() => onModifier(event)}>
                            Modifier
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
