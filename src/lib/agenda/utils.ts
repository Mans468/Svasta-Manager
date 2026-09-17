import { ROUTE_PAR_TYPE, type CalendarEvent } from "./types";

/** Lien vers la fiche détail source de l'événement (null pour "autre", qui n'a pas de fiche). */
export function lienDetailEvenement(event: Pick<CalendarEvent, "id" | "type">): string | null {
    const route = ROUTE_PAR_TYPE[event.type];
    if (!route) return null;
    const entiteId = event.id.replace(`${event.type}-`, "");
    return `${route}/${entiteId}`;
}
