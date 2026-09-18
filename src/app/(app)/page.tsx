"use client";

import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useRef, useState } from "react";

import { AgendaFab } from "@/components/agenda/agenda-fab";
import { CreateEventDialog } from "@/components/agenda/create-event-dialog";
import { EventInfoDialog } from "@/components/agenda/event-info-dialog";
import { PageHeader } from "@/components/layout/page-header";
import { NavetteFormDialog } from "@/components/navettes/navette-form-dialog";
import { SearchSelect } from "@/components/shared/search-select";
import { COULEUR_PAR_TYPE, type CalendarEvent, type EvenementType } from "@/lib/agenda/types";
import { MOCK_EVENTS } from "@/lib/agenda/mock-events";
import { mockEmployes, mockMedecins, mockResidents, nomComplet } from "@/lib/mock-data";
import { MOCK_NAVETTES } from "@/lib/mock-navettes";

interface OptionFiltre {
    id: string;
    type: "resident" | "employe" | "medecin";
    nom: string;
}

const OPTIONS_FILTRE: OptionFiltre[] = [
    ...mockResidents.map((r) => ({ id: r.id, type: "resident" as const, nom: `${nomComplet(r)} (résident)` })),
    ...mockEmployes.map((e) => ({ id: e.id, type: "employe" as const, nom: `${nomComplet(e)} (employé)` })),
    ...mockMedecins.map((m) => ({ id: m.id, type: "medecin" as const, nom: `${nomComplet(m)} (médecin)` })),
];

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 640px)");
        setIsMobile(mq.matches);
        const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", listener);
        return () => mq.removeEventListener("change", listener);
    }, []);
    return isMobile;
}

export default function Page() {
    const calendarRef = useRef<FullCalendar | null>(null);
    const isMobile = useIsMobile();
    const [titre, setTitre] = useState("");
    const [evenements, setEvenements] = useState<CalendarEvent[]>(MOCK_EVENTS);
    const [evenementSelectionne, setEvenementSelectionne] = useState<CalendarEvent | null>(null);
    const [typeEnCreation, setTypeEnCreation] = useState<EvenementType | null>(null);
    const [evenementEnEdition, setEvenementEnEdition] = useState<CalendarEvent | null>(null);
    const [filtre, setFiltre] = useState<OptionFiltre | null>(null);
    const [navettes, setNavettes] = useState(MOCK_NAVETTES);
    const [dialogNavetteOuvert, setDialogNavetteOuvert] = useState(false);

    // La vue change avec la taille d'écran (semaine illisible sur mobile) : on
    // pilote l'API FullCalendar directement plutôt que de démonter/remonter le composant.
    useEffect(() => {
        const api = calendarRef.current?.getApi();
        if (!api) return;
        api.changeView(isMobile ? "timeGridDay" : "timeGridWeek");
    }, [isMobile]);

    function naviguer(direction: "prev" | "next") {
        calendarRef.current?.getApi()?.[direction === "prev" ? "prev" : "next"]();
    }

    const evenementsFiltres = filtre
        ? evenements.filter((e) => {
              if (filtre.type === "resident") return e.residentIds.includes(filtre.id);
              if (filtre.type === "employe") return e.employeIds.includes(filtre.id);
              return e.medecinId === filtre.id;
          })
        : evenements;

    function ouvrirCreation(type: EvenementType | "navette") {
        if (type === "navette") {
            setDialogNavetteOuvert(true);
            return;
        }
        setTypeEnCreation(type);
    }

    function sauvegarderEvenement(evenement: CalendarEvent) {
        setEvenements((prev) => {
            const existe = prev.some((e) => e.id === evenement.id);
            return existe ? prev.map((e) => (e.id === evenement.id ? evenement : e)) : [...prev, evenement];
        });
    }

    return (
        <div className="relative flex flex-1 flex-col">
            <PageHeader
                title="Agenda"
                toolbar={
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <button type="button" onClick={() => naviguer("prev")} className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-muted">
                                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_back</span>
                            </button>
                            <button type="button" onClick={() => naviguer("next")} className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-muted">
                                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_forward</span>
                            </button>
                            <span className="text-base font-medium capitalize sm:text-lg">{titre}</span>
                        </div>

                        <div className="w-full sm:w-64">
                            <SearchSelect
                                options={OPTIONS_FILTRE}
                                value={filtre}
                                onValueChange={setFiltre}
                                getId={(o) => `${o.type}:${o.id}`}
                                getLabel={(o) => o.nom}
                                placeholder="Tout le monde"
                            />
                        </div>
                    </div>
                }
            />

            <div className="agenda-calendar flex-1 overflow-auto px-3 pb-6 sm:px-6">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView={isMobile ? "timeGridDay" : "timeGridWeek"}
                    headerToolbar={false}
                    allDaySlot={false}
                    nowIndicator
                    height="100%"
                    locale="fr"
                    slotDuration={isMobile ? "01:00:00" : "00:30:00"}
                    slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
                    eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
                    events={evenementsFiltres.map((e) => ({
                        id: e.id,
                        title: e.titre,
                        start: e.start,
                        end: e.end,
                        backgroundColor: COULEUR_PAR_TYPE[e.type],
                        borderColor: "transparent",
                        textColor: "#18181b",
                    }))}
                    eventClick={(info) => {
                        const evenement = evenements.find((e) => e.id === info.event.id);
                        if (evenement) setEvenementSelectionne(evenement);
                    }}
                    datesSet={(arg) => setTitre(arg.view.title)}
                />
            </div>

            <EventInfoDialog
                event={evenementSelectionne}
                onOpenChange={(o) => !o && setEvenementSelectionne(null)}
                onModifier={(evenement) => {
                    setEvenementSelectionne(null);
                    setEvenementEnEdition(evenement);
                }}
            />

            <CreateEventDialog
                type={evenementEnEdition?.type ?? typeEnCreation}
                evenementExistant={evenementEnEdition}
                onClose={() => { setTypeEnCreation(null); setEvenementEnEdition(null); }}
                onCreate={sauvegarderEvenement}
            />

            <AgendaFab onSelect={ouvrirCreation} />

            <NavetteFormDialog
                open={dialogNavetteOuvert}
                onClose={() => setDialogNavetteOuvert(false)}
                onCreate={(navette) => setNavettes((prev) => [navette, ...prev])}
            />
        </div>
    );
}
