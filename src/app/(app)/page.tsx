"use client";

import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef, useState } from "react";

import { AgendaFab } from "@/components/agenda/agenda-fab";
import {
    EventInfoDialog,
    type AgendaEventInfo,
} from "@/components/agenda/event-info-dialog";
import { PageHeader } from "@/components/layout/page-header";

type EvenementType = "activite" | "reunion" | "rendez-vous";

const couleurParType: Record<EvenementType, string> = {
    activite: "#dbeafe",
    reunion: "#fde8cf",
    "rendez-vous": "#d1fae5",
};

const evenements = [
    {
        id: "1",
        title: "Réunion",
        start: "2026-09-01T05:00:00",
        end: "2026-09-01T06:00:00",
        type: "reunion" as EvenementType,
        description: "Point quotidien de l'équipe éducative.",
        lieu: "Salle de réunion",
        participants: ["Jean Marc", "Sarah Marc"],
    },
    {
        id: "2",
        title: "Parc Astérix",
        start: "2026-09-01T06:00:00",
        end: "2026-09-01T10:00:00",
        type: "activite" as EvenementType,
        description: "Sortie encadrée au parc, transport en navette.",
        lieu: "Parc Astérix",
        participants: ["19 résidents", "4 éducateurs"],
    },
    {
        id: "3",
        title: "Réunion Administratif",
        start: "2026-09-02T06:00:00",
        end: "2026-09-02T07:00:00",
        type: "reunion" as EvenementType,
        description: "Point sur les dossiers administratifs en cours.",
        lieu: "Bureau du Directeur",
        participants: ["Dilan Smith"],
    },
    {
        id: "4",
        title: "Dr. Schmit",
        start: "2026-09-04T06:00:00",
        end: "2026-09-04T08:00:00",
        type: "rendez-vous" as EvenementType,
        description: "Consultation généraliste.",
        lieu: "Cabinet Dr. Schmit",
        participants: ["Jean Malik"],
    },
];

function formatDate(start: string, end: string) {
    const d = new Date(start);
    const dateStr = d.toLocaleDateString("fr-BE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    const heureDebut = d.toLocaleTimeString("fr-BE", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const heureFin = new Date(end).toLocaleTimeString("fr-BE", {
        hour: "2-digit",
        minute: "2-digit",
    });
    return `${dateStr} · ${heureDebut} - ${heureFin}`;
}

export default function Page() {
    const calendarRef = useRef<FullCalendar | null>(null);
    const [titre, setTitre] = useState("");
    const [evenementSelectionne, setEvenementSelectionne] =
        useState<AgendaEventInfo | null>(null);

    function naviguer(direction: "prev" | "next") {
        const api = calendarRef.current?.getApi();
        if (!api) return;
        if (direction === "prev") api.prev();
        else api.next();
    }

    return (
        <div className="relative flex flex-1 flex-col">
            <PageHeader
                title="Agenda"
                toolbar={
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => naviguer("prev")}
                            className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-muted"
                        >
                            <span
                                className="material-symbols-rounded"
                                style={{ fontSize: 18 }}
                            >
                                arrow_back
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => naviguer("next")}
                            className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-muted"
                        >
                            <span
                                className="material-symbols-rounded"
                                style={{ fontSize: 18 }}
                            >
                                arrow_forward
                            </span>
                        </button>
                        <span className="text-lg font-medium capitalize">{titre}</span>
                    </div>
                }
            />

            <div className="agenda-calendar flex-1 overflow-auto px-6 pb-6">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={false}
                    allDaySlot={false}
                    nowIndicator
                    height="100%"
                    events={evenements.map((e) => ({
                        id: e.id,
                        title: e.title,
                        start: e.start,
                        end: e.end,
                        backgroundColor: couleurParType[e.type],
                        borderColor: "transparent",
                        textColor: "#18181b",
                    }))}
                    eventClick={(info) => {
                        const evenement = evenements.find(
                            (e) => e.id === info.event.id,
                        );
                        if (!evenement) return;

                        setEvenementSelectionne({
                            titre: evenement.title,
                            description: evenement.description,
                            date: formatDate(evenement.start, evenement.end),
                            lieu: evenement.lieu,
                            participants: evenement.participants,
                        });
                    }}
                    datesSet={(arg) => setTitre(arg.view.title)}
                />
            </div>

            <EventInfoDialog
                event={evenementSelectionne}
                onOpenChange={(open) => !open && setEvenementSelectionne(null)}
            />

            <AgendaFab />
        </div>
    );
}
