export interface Reunion {
    id: string;
    titre: string;
    type: "Quotidienne" | "Hebdomadaire" | "Spéciale";
    lieu: string;
    jour: string;
    heure: string;
    presenceObligatoire: boolean;
    residentConcerneId?: string;
}

// TODO: remplacer par un vrai fetch une fois le backend branché.
// Les réunions sont créées et consultées depuis l'agenda désormais - cette
// liste alimente uniquement la fiche détail ouverte depuis un événement agenda.
export const REUNIONS_INITIALES: Reunion[] = [
    { id: "1", titre: "Réunion quotidienne", type: "Quotidienne", lieu: "Salle de réunion", jour: "Aujourd'hui", heure: "9:00-10:00", presenceObligatoire: false },
    { id: "2", titre: "Suivi Jean Malik", type: "Spéciale", lieu: "Bureau du Directeur", jour: "Aujourd'hui", heure: "17:00-18:00", presenceObligatoire: false, residentConcerneId: "4" },
    { id: "3", titre: "Réunion quotidienne", type: "Quotidienne", lieu: "Salle de réunion", jour: "Demain", heure: "9:00-10:00", presenceObligatoire: false },
    { id: "4", titre: "Point équipe hebdomadaire", type: "Hebdomadaire", lieu: "Réfectoire", jour: "Demain", heure: "17:00-18:00", presenceObligatoire: true },
];
