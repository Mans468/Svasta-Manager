export type EvenementType = "activite" | "reunion" | "rendez-vous" | "autre";

export interface CalendarEvent {
    id: string;
    type: EvenementType;
    titre: string;
    description?: string;
    start: string; // ISO
    end: string; // ISO
    lieu?: string;
    medecinId?: string;
    navetteId?: string;
    residentIds: string[];
    employeIds: string[];
}

export const COULEUR_PAR_TYPE: Record<EvenementType, string> = {
    activite: "#dbeafe",
    reunion: "#fde8cf",
    "rendez-vous": "#d1fae5",
    autre: "#e4e4e7",
};

export const LABEL_PAR_TYPE: Record<EvenementType, string> = {
    activite: "Activité",
    reunion: "Réunion",
    "rendez-vous": "Rendez-vous médical",
    autre: "Autre",
};

/** Route de la fiche détail associée - absente pour "autre" (événement propre à l'agenda, sans fiche). */
export const ROUTE_PAR_TYPE: Partial<Record<EvenementType, string>> = {
    activite: "/activites",
    reunion: "/reunions",
    "rendez-vous": "/rendez-vous",
};
