export interface MockRdvMedical {
    id: string;
    medecinId: string;
    motif: string;
    date: string; // ISO
    heure: string;
    lieu: string;
    residentId: string;
    /** Regroupe les RDV créés ensemble lors d'une "visite groupée" (ex. arrivée du kiné). */
    visiteGroupeeId?: string;
}

// TODO: fetch réel une fois le backend branché
// TODO RBAC secret médical (cahier des charges 4.11) : nom vs ID selon le rôle, à filtrer côté serveur
export const MOCK_RDV_MEDICAUX: MockRdvMedical[] = [
    { id: "1", medecinId: "3", motif: "Consultation généraliste", date: "2026-09-24", heure: "10:00", lieu: "Cabinet Dr. Schmit, Verviers", residentId: "4" },
    { id: "2", medecinId: "2", motif: "Arrivée groupée kiné", date: "2026-09-25", heure: "09:00", lieu: "Centre Svasta, salle de soins", residentId: "1", visiteGroupeeId: "v1" },
    { id: "3", medecinId: "2", motif: "Arrivée groupée kiné", date: "2026-09-25", heure: "09:30", lieu: "Centre Svasta, salle de soins", residentId: "3", visiteGroupeeId: "v1" },
];
