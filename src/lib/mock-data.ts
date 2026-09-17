// TODO: remplacer entièrement par des requêtes Prisma une fois le backend branché.
// Centralisé ici pour que TOUTES les pages référencent les mêmes ids/personnes -
// c'est ce qui permet aux liens croisés (résident cliqué depuis une caravane, une
// activité, l'audit...) de tous pointer vers la même fiche.

export interface MockResident {
    id: string;
    nom: string;
    prenom: string;
    numeroRegistre: string;
    dateNaissance: string;
    dateInscription: string;
    paysOrigine: string;
    langues: string;
    raisonRefuge: string;
    statutProcedure: string;
    statutResidence: "Présent" | "Parti";
    caravaneId: string | null;
    ecoleId: string | null;
    familleIds: string[];
    email: string;
    telephone: string;
    occupation: string;
}

export const mockResidents: MockResident[] = [
    {
        id: "1", nom: "Diallo", prenom: "Awa", numeroRegistre: "01.02.06-331.11",
        dateNaissance: "14 octobre 2002", dateInscription: "24 février 2025",
        paysOrigine: "Sénégal", langues: "Wolof, Français", raisonRefuge: "Persécution politique",
        statutProcedure: "22bis", statutResidence: "Présent", caravaneId: "1", ecoleId: "1",
        familleIds: [], email: "awa.diallo@mail.com", telephone: "+32 470 11 22 33", occupation: "Étudiante",
    },
    {
        id: "2", nom: "Nazari", prenom: "Reza", numeroRegistre: "01.02.06-331.12",
        dateNaissance: "02 mars 1998", dateInscription: "10 janvier 2025",
        paysOrigine: "Iran", langues: "Farsi, Anglais", raisonRefuge: "Persécution religieuse",
        statutProcedure: "En procédure (annexe 26)", statutResidence: "Présent", caravaneId: "1", ecoleId: null,
        familleIds: [], email: "reza.nazari@mail.com", telephone: "+32 470 22 33 44", occupation: "Sans profession déclarée",
    },
    {
        id: "3", nom: "Haile", prenom: "Sara", numeroRegistre: "01.02.06-331.13",
        dateNaissance: "21 juillet 2001", dateInscription: "05 mars 2025",
        paysOrigine: "Érythrée", langues: "Tigrinya, Anglais", raisonRefuge: "Service militaire forcé",
        statutProcedure: "Recours en cours", statutResidence: "Présent", caravaneId: "2", ecoleId: "2",
        familleIds: [], email: "sara.haile@mail.com", telephone: "+32 470 33 44 55", occupation: "En formation",
    },
    {
        id: "4", nom: "Malik", prenom: "Jean", numeroRegistre: "01.02.06-331.14",
        dateNaissance: "16 janvier 2005", dateInscription: "24 février 2025",
        paysOrigine: "Russie", langues: "Russe, Français", raisonRefuge: "Guerre",
        statutProcedure: "En attente", statutResidence: "Présent", caravaneId: "2", ecoleId: null,
        familleIds: ["5", "6"], email: "marcmalik@gmail.com", telephone: "+32 470 12 34 56", occupation: "Étudiant",
    },
    { id: "5", nom: "Malik", prenom: "Sarah", numeroRegistre: "01.02.06-331.15", dateNaissance: "03 mai 1978", dateInscription: "24 février 2025", paysOrigine: "Russie", langues: "Russe", raisonRefuge: "Guerre", statutProcedure: "En attente", statutResidence: "Présent", caravaneId: "2", ecoleId: null, familleIds: ["4", "6"], email: "sarah.malik@mail.com", telephone: "+32 470 44 55 66", occupation: "Sans profession déclarée" },
    { id: "6", nom: "Malik", prenom: "Marc", numeroRegistre: "01.02.06-331.16", dateNaissance: "12 septembre 1975", dateInscription: "24 février 2025", paysOrigine: "Russie", langues: "Russe", raisonRefuge: "Guerre", statutProcedure: "En attente", statutResidence: "Présent", caravaneId: "2", ecoleId: null, familleIds: ["4", "5"], email: "marc.malik@mail.com", telephone: "+32 470 55 66 77", occupation: "Bénévole au centre" },
];

export interface MockEmploye {
    id: string;
    nom: string;
    prenom: string;
    roles: string[];
    email: string;
    telephone: string;
}

export const mockEmployes: MockEmploye[] = [
    { id: "1", nom: "Dupont", prenom: "Jean", roles: ["Directeur"], email: "dupontjean@svasta.be", telephone: "+32 470 12 34 56" },
    { id: "2", nom: "Smith", prenom: "Dilan", roles: ["Directeur"], email: "dilansmith@svasta.be", telephone: "+32 470 12 34 57" },
    { id: "3", nom: "Marc", prenom: "Jean", roles: ["Éducateur"], email: "jeanmarc@svasta.be", telephone: "+32 470 12 34 58" },
    { id: "4", nom: "Marc", prenom: "Sarah", roles: ["Éducateur", "Infirmier"], email: "sarahmarc@svasta.be", telephone: "+32 470 12 34 59" },
    { id: "5", nom: "Petit", prenom: "Lucie", roles: ["Assistant"], email: "luciepetit@svasta.be", telephone: "+32 470 12 34 60" },
];

export interface MockMedecin {
    id: string;
    nom: string;
    prenom: string;
    specialisation: string;
    telephone: string;
    email: string;
    adresseCabinet: string;
}

export const mockMedecins: MockMedecin[] = [
    { id: "1", nom: "Lambert", prenom: "Sophie", specialisation: "Dentiste", telephone: "+32 87 11 22 33", email: "s.lambert@dentiste.be", adresseCabinet: "Rue de la Dent 4, 4800 Verviers" },
    { id: "2", nom: "Vermeulen", prenom: "Tom", specialisation: "Kinésithérapeute", telephone: "+32 87 22 33 44", email: "t.vermeulen@kine.be", adresseCabinet: "Avenue du Sport 12, 4800 Verviers" },
    { id: "3", nom: "Schmit", prenom: "Anne", specialisation: "Médecin généraliste", telephone: "+32 87 33 44 55", email: "a.schmit@medecin.be", adresseCabinet: "Place de la Santé 1, 4800 Verviers" },
    { id: "4", nom: "Carlson", prenom: "Erik", specialisation: "Orthodontiste", telephone: "+32 87 44 55 66", email: "e.carlson@ortho.be", adresseCabinet: "Rue du Sourire 8, 4800 Verviers" },
];

export interface MockCaravane {
    id: string;
    nom: string;
    capaciteMax: number;
    statut: "Disponible" | "Non-disponible";
    raisonIndisponibilite?: string;
    responsableIds: string[];
}

export const mockCaravanes: MockCaravane[] = [
    { id: "1", nom: "A01", capaciteMax: 5, statut: "Disponible", responsableIds: ["3"] },
    { id: "2", nom: "A02", capaciteMax: 5, statut: "Disponible", responsableIds: ["3", "4"] },
    { id: "3", nom: "A03", capaciteMax: 4, statut: "Disponible", responsableIds: ["4"] },
    { id: "4", nom: "A04", capaciteMax: 5, statut: "Non-disponible", raisonIndisponibilite: "Travaux de rénovation", responsableIds: [] },
];

export interface MockEcole {
    id: string;
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
}

export const mockEcoles: MockEcole[] = [
    { id: "1", nom: "Institut Saint-Michel Verviers", adresse: "Rue de l'école 46, 4800 Verviers", telephone: "+32 87 12 34 56", email: "info@saintmichelverviers.be" },
    { id: "2", nom: "Athénée Royale Thil Lorrain", adresse: "Rue Thil Lorrain 12, 4800 Verviers", telephone: "+32 87 23 45 67", email: "info@atheneeroyalethillorrain.be" },
    { id: "3", nom: "Athénée Royale Verdi", adresse: "Rue Verdi 8, 4800 Verviers", telephone: "+32 87 34 56 78", email: "info@atheneeroyaleverdi.be" },
];

export function nomComplet(p: { nom: string; prenom: string }) {
    return `${p.prenom} ${p.nom}`;
}
