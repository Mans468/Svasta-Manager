import type { CalendarEvent } from "./types";

// TODO: remplacer par un vrai fetch agrégé (Activite + Reunion + RendezVousMedical)
// une fois le backend branché.
//
// Convention d'id : "<type>-<id de l'entité>" pour rester unique dans le calendrier
// tout en pouvant retrouver la fiche source (voir lib/agenda/utils.ts). Les ids
// d'entité correspondent volontairement à ceux des pages /activites, /reunions,
// /rendez-vous pour que "Voir plus" pointe au bon endroit.
export const MOCK_EVENTS: CalendarEvent[] = [
    {
        id: "reunion-1",
        type: "reunion",
        titre: "Réunion quotidienne",
        description: "Point quotidien de l'équipe éducative.",
        start: "2026-09-14T09:00:00",
        end: "2026-09-14T10:00:00",
        lieu: "Salle de réunion",
        residentIds: [],
        employeIds: ["3", "4"],
    },
    {
        id: "activite-1",
        type: "activite",
        titre: "Parc Astérix",
        description: "Sortie encadrée au parc, transport en navette.",
        start: "2026-09-14T13:55:00",
        end: "2026-09-14T18:30:00",
        lieu: "Parc Astérix, Plailly",
        residentIds: ["1", "2", "3"],
        employeIds: ["3", "4"],
    },
    {
        id: "reunion-3",
        type: "reunion",
        titre: "Réunion administrative",
        description: "Point sur les dossiers administratifs en cours.",
        start: "2026-09-15T09:00:00",
        end: "2026-09-15T10:00:00",
        lieu: "Bureau du Directeur",
        residentIds: [],
        employeIds: ["2"],
    },
    {
        id: "rendez-vous-1",
        type: "rendez-vous",
        titre: "Dr. Schmit",
        description: "Consultation généraliste.",
        start: "2026-09-17T10:00:00",
        end: "2026-09-17T10:30:00",
        lieu: "Cabinet Dr. Schmit, Verviers",
        medecinId: "3",
        residentIds: ["4"],
        employeIds: [],
    },
];
