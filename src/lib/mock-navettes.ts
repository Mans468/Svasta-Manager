export interface MockNavette {
    id: string;
    depart: string;
    arrivee: string;
    date: string;
    heureDepart: string;
    heureArrivee: string;
    vehicule: string;
    statut: "Prévue" | "Terminée";
    chauffeurEmployeId: string | null;
    chauffeurExterne: string | null;
    residentIds: string[];
}

// TODO: remplacer par un vrai fetch une fois le backend branché
export const MOCK_NAVETTES: MockNavette[] = [
    { id: "1", depart: "Centre Svasta", arrivee: "Parc Astérix", date: "25/11/2026", heureDepart: "13:55", heureArrivee: "14:30", vehicule: "BMW 330i", statut: "Prévue", chauffeurEmployeId: "3", chauffeurExterne: null, residentIds: ["1", "2", "3"] },
    { id: "2", depart: "Centre Svasta", arrivee: "Hôpital", date: "20/11/2026", heureDepart: "09:00", heureArrivee: "09:30", vehicule: "Renault Trafic", statut: "Terminée", chauffeurEmployeId: null, chauffeurExterne: "M. Petit", residentIds: ["4"] },
    { id: "3", depart: "Centre Svasta", arrivee: "Tribunal", date: "18/11/2026", heureDepart: "08:15", heureArrivee: "08:45", vehicule: "BMW 330i", statut: "Terminée", chauffeurEmployeId: "3", chauffeurExterne: null, residentIds: [] },
];
