-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('DIRECTEUR', 'EDUCATEUR', 'INFIRMIER', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "StatutResidence" AS ENUM ('PRESENT', 'PARTI');

-- CreateEnum
CREATE TYPE "StatutProcedure" AS ENUM ('EN_PROCEDURE', 'RECOURS_EN_COURS', 'PROTECTION_SUBSIDIAIRE', 'REFUGIE_RECONNU', 'STATUT_22BIS', 'SORTIE_NATURALISE', 'SORTIE_CHANGEMENT_CENTRE', 'SORTIE_REFUS');

-- CreateEnum
CREATE TYPE "StatutSocial" AS ENUM ('CELIBATAIRE', 'MARIE', 'DIVORCE', 'VEUF', 'SEPARE');

-- CreateEnum
CREATE TYPE "StatutProfessionnel" AS ENUM ('SANS_EMPLOI', 'EN_RECHERCHE_EMPLOI', 'EN_FORMATION', 'EMPLOYE', 'INDEPENDANT', 'BENEVOLE_CENTRE');

-- CreateEnum
CREATE TYPE "StatutCaravane" AS ENUM ('DISPONIBLE', 'NON_DISPONIBLE');

-- CreateEnum
CREATE TYPE "StatutProbleme" AS ENUM ('OUVERT', 'RESOLU');

-- CreateEnum
CREATE TYPE "StatutNavette" AS ENUM ('PREVUE', 'TERMINEE');

-- CreateEnum
CREATE TYPE "StatutActivite" AS ENUM ('CONFIRMEE', 'EN_ATTENTE', 'REFUSEE', 'TERMINEE');

-- CreateEnum
CREATE TYPE "StatutPaiement" AS ENUM ('A_PAYER', 'PAYE');

-- CreateEnum
CREATE TYPE "TypeReunion" AS ENUM ('QUOTIDIENNE', 'HEBDOMADAIRE', 'SPECIALE');

-- CreateEnum
CREATE TYPE "TypeRendezVousMedical" AS ENUM ('INDIVIDUEL', 'GROUPE');

-- CreateEnum
CREATE TYPE "CategorieRdvAdmin" AS ENUM ('AVOCAT', 'TRIBUNAL', 'ADMINISTRATIF', 'AUTRE');

-- CreateEnum
CREATE TYPE "TypeTicket" AS ENUM ('TRAIN', 'BUS');

-- CreateEnum
CREATE TYPE "StatutTicket" AS ENUM ('DISPONIBLE', 'ATTRIBUE');

-- CreateEnum
CREATE TYPE "StatutAbonnement" AS ENUM ('ACTIF', 'EXPIRE');

-- CreateTable
CREATE TABLE "employes" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "roles" "RoleType"[],
    "clerkId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "residents" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "photo" TEXT,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "numeroRegistre" TEXT NOT NULL,
    "dateInscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paysOrigine" TEXT NOT NULL,
    "languesParlees" TEXT[],
    "raisonRefuge" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "occupation" TEXT,
    "profession" TEXT,
    "statutSocial" "StatutSocial",
    "statutProfessionnel" "StatutProfessionnel",
    "statutResidence" "StatutResidence" NOT NULL DEFAULT 'PRESENT',
    "statutProcedure" "StatutProcedure" NOT NULL,
    "archive" BOOLEAN NOT NULL DEFAULT false,
    "dateDesinscription" TIMESTAMP(3),
    "caravaneId" TEXT,
    "ecoleId" TEXT,
    "inscritParId" TEXT,
    "desinscritParId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "residents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "residents_famille" (
    "id" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,
    "apparenteId" TEXT NOT NULL,
    "lienParente" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "residents_famille_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caravanes" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "capaciteMax" INTEGER NOT NULL,
    "statut" "StatutCaravane" NOT NULL DEFAULT 'DISPONIBLE',
    "raisonIndisponibilite" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "caravanes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caravanes_problemes" (
    "id" TEXT NOT NULL,
    "caravaneId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "statut" "StatutProbleme" NOT NULL DEFAULT 'OUVERT',
    "signaleParId" TEXT NOT NULL,
    "dateSignalement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resoluParId" TEXT,
    "dateResolution" TIMESTAMP(3),

    CONSTRAINT "caravanes_problemes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navettes" (
    "id" TEXT NOT NULL,
    "lieuDepart" TEXT NOT NULL,
    "lieuArrivee" TEXT NOT NULL,
    "dateDepart" TIMESTAMP(3) NOT NULL,
    "heureDepart" TEXT,
    "dateArrivee" TIMESTAMP(3),
    "heureArrivee" TEXT,
    "vehicule" TEXT,
    "motif" TEXT,
    "limitePersonnes" INTEGER,
    "statut" "StatutNavette" NOT NULL DEFAULT 'PREVUE',
    "chauffeurEmployeId" TEXT,
    "chauffeurExterne" TEXT,
    "creeParId" TEXT NOT NULL,
    "activiteId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "navettes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ecoles" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ecoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activites" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "lieu" TEXT,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3),
    "heureDebut" TEXT,
    "heureFin" TEXT,
    "budget" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "statut" "StatutActivite" NOT NULL DEFAULT 'CONFIRMEE',
    "creeParId" TEXT NOT NULL,
    "valideeParId" TEXT,
    "dateValidation" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travaux_remuneres" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "lieu" TEXT,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3),
    "heureDebut" TEXT,
    "heureFin" TEXT,
    "montant" DECIMAL(10,2) NOT NULL,
    "statutPaiement" "StatutPaiement" NOT NULL DEFAULT 'A_PAYER',
    "creeParId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travaux_remuneres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reunions" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "type" "TypeReunion" NOT NULL,
    "lieu" TEXT,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "heureDebut" TEXT,
    "heureFin" TEXT,
    "presenceObligatoire" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "residentConcerneId" TEXT,
    "creeParId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reunions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal_entrees" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "contenu" TEXT NOT NULL,
    "creeParId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "journal_entrees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medecins" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "specialisation" TEXT NOT NULL,
    "telephone" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medecins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rendez_vous_medicaux" (
    "id" TEXT NOT NULL,
    "type" "TypeRendezVousMedical" NOT NULL DEFAULT 'INDIVIDUEL',
    "date" TIMESTAMP(3) NOT NULL,
    "heure" TEXT,
    "motif" TEXT NOT NULL,
    "lieu" TEXT,
    "medecinId" TEXT NOT NULL,
    "creeParId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rendez_vous_medicaux_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rendez_vous_administratifs" (
    "id" TEXT NOT NULL,
    "categorie" "CategorieRdvAdmin" NOT NULL,
    "motifPersonnalise" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "heure" TEXT,
    "lieu" TEXT,
    "residentId" TEXT NOT NULL,
    "gereParId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rendez_vous_administratifs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets_transport" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "type" "TypeTicket" NOT NULL,
    "statut" "StatutTicket" NOT NULL DEFAULT 'DISPONIBLE',
    "raison" TEXT,
    "residentId" TEXT,
    "attribueParId" TEXT,
    "dateAttribution" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tickets_transport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "abonnements_transport" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateExpiration" TIMESTAMP(3) NOT NULL,
    "statut" "StatutAbonnement" NOT NULL DEFAULT 'ACTIF',
    "renouvellementAutomatique" BOOLEAN NOT NULL DEFAULT false,
    "residentId" TEXT NOT NULL,
    "creeParId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "abonnements_transport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entiteType" TEXT NOT NULL,
    "entiteId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "employeId" TEXT,
    "residentConcerneId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NavetteAccompagnateurs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_NavetteAccompagnateurs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ResidentToTravailRemunere" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ResidentToTravailRemunere_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CaravaneResponsables" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CaravaneResponsables_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_NavetteToResident" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_NavetteToResident_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ActiviteEducateurs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActiviteEducateurs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ActiviteToResident" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActiviteToResident_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_JournalEntreeToResident" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_JournalEntreeToResident_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RendezVousMedicalToResident" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RendezVousMedicalToResident_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "employes_email_key" ON "employes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employes_clerkId_key" ON "employes"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "residents_numeroRegistre_key" ON "residents"("numeroRegistre");

-- CreateIndex
CREATE UNIQUE INDEX "residents_famille_residentId_apparenteId_key" ON "residents_famille"("residentId", "apparenteId");

-- CreateIndex
CREATE UNIQUE INDEX "caravanes_nom_key" ON "caravanes"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_transport_reference_key" ON "tickets_transport"("reference");

-- CreateIndex
CREATE INDEX "_NavetteAccompagnateurs_B_index" ON "_NavetteAccompagnateurs"("B");

-- CreateIndex
CREATE INDEX "_ResidentToTravailRemunere_B_index" ON "_ResidentToTravailRemunere"("B");

-- CreateIndex
CREATE INDEX "_CaravaneResponsables_B_index" ON "_CaravaneResponsables"("B");

-- CreateIndex
CREATE INDEX "_NavetteToResident_B_index" ON "_NavetteToResident"("B");

-- CreateIndex
CREATE INDEX "_ActiviteEducateurs_B_index" ON "_ActiviteEducateurs"("B");

-- CreateIndex
CREATE INDEX "_ActiviteToResident_B_index" ON "_ActiviteToResident"("B");

-- CreateIndex
CREATE INDEX "_JournalEntreeToResident_B_index" ON "_JournalEntreeToResident"("B");

-- CreateIndex
CREATE INDEX "_RendezVousMedicalToResident_B_index" ON "_RendezVousMedicalToResident"("B");

-- AddForeignKey
ALTER TABLE "residents" ADD CONSTRAINT "residents_caravaneId_fkey" FOREIGN KEY ("caravaneId") REFERENCES "caravanes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "residents" ADD CONSTRAINT "residents_ecoleId_fkey" FOREIGN KEY ("ecoleId") REFERENCES "ecoles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "residents" ADD CONSTRAINT "residents_inscritParId_fkey" FOREIGN KEY ("inscritParId") REFERENCES "employes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "residents" ADD CONSTRAINT "residents_desinscritParId_fkey" FOREIGN KEY ("desinscritParId") REFERENCES "employes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "residents_famille" ADD CONSTRAINT "residents_famille_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "residents_famille" ADD CONSTRAINT "residents_famille_apparenteId_fkey" FOREIGN KEY ("apparenteId") REFERENCES "residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caravanes_problemes" ADD CONSTRAINT "caravanes_problemes_caravaneId_fkey" FOREIGN KEY ("caravaneId") REFERENCES "caravanes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caravanes_problemes" ADD CONSTRAINT "caravanes_problemes_signaleParId_fkey" FOREIGN KEY ("signaleParId") REFERENCES "employes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caravanes_problemes" ADD CONSTRAINT "caravanes_problemes_resoluParId_fkey" FOREIGN KEY ("resoluParId") REFERENCES "employes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "navettes" ADD CONSTRAINT "navettes_chauffeurEmployeId_fkey" FOREIGN KEY ("chauffeurEmployeId") REFERENCES "employes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "navettes" ADD CONSTRAINT "navettes_creeParId_fkey" FOREIGN KEY ("creeParId") REFERENCES "employes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "navettes" ADD CONSTRAINT "navettes_activiteId_fkey" FOREIGN KEY ("activiteId") REFERENCES "activites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites" ADD CONSTRAINT "activites_creeParId_fkey" FOREIGN KEY ("creeParId") REFERENCES "employes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites" ADD CONSTRAINT "activites_valideeParId_fkey" FOREIGN KEY ("valideeParId") REFERENCES "employes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travaux_remuneres" ADD CONSTRAINT "travaux_remuneres_creeParId_fkey" FOREIGN KEY ("creeParId") REFERENCES "employes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reunions" ADD CONSTRAINT "reunions_residentConcerneId_fkey" FOREIGN KEY ("residentConcerneId") REFERENCES "residents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reunions" ADD CONSTRAINT "reunions_creeParId_fkey" FOREIGN KEY ("creeParId") REFERENCES "employes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_entrees" ADD CONSTRAINT "journal_entrees_creeParId_fkey" FOREIGN KEY ("creeParId") REFERENCES "employes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous_medicaux" ADD CONSTRAINT "rendez_vous_medicaux_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "medecins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous_medicaux" ADD CONSTRAINT "rendez_vous_medicaux_creeParId_fkey" FOREIGN KEY ("creeParId") REFERENCES "employes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous_administratifs" ADD CONSTRAINT "rendez_vous_administratifs_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous_administratifs" ADD CONSTRAINT "rendez_vous_administratifs_gereParId_fkey" FOREIGN KEY ("gereParId") REFERENCES "employes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets_transport" ADD CONSTRAINT "tickets_transport_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "residents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets_transport" ADD CONSTRAINT "tickets_transport_attribueParId_fkey" FOREIGN KEY ("attribueParId") REFERENCES "employes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "abonnements_transport" ADD CONSTRAINT "abonnements_transport_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "abonnements_transport" ADD CONSTRAINT "abonnements_transport_creeParId_fkey" FOREIGN KEY ("creeParId") REFERENCES "employes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_employeId_fkey" FOREIGN KEY ("employeId") REFERENCES "employes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_residentConcerneId_fkey" FOREIGN KEY ("residentConcerneId") REFERENCES "residents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NavetteAccompagnateurs" ADD CONSTRAINT "_NavetteAccompagnateurs_A_fkey" FOREIGN KEY ("A") REFERENCES "employes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NavetteAccompagnateurs" ADD CONSTRAINT "_NavetteAccompagnateurs_B_fkey" FOREIGN KEY ("B") REFERENCES "navettes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResidentToTravailRemunere" ADD CONSTRAINT "_ResidentToTravailRemunere_A_fkey" FOREIGN KEY ("A") REFERENCES "residents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResidentToTravailRemunere" ADD CONSTRAINT "_ResidentToTravailRemunere_B_fkey" FOREIGN KEY ("B") REFERENCES "travaux_remuneres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaravaneResponsables" ADD CONSTRAINT "_CaravaneResponsables_A_fkey" FOREIGN KEY ("A") REFERENCES "caravanes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaravaneResponsables" ADD CONSTRAINT "_CaravaneResponsables_B_fkey" FOREIGN KEY ("B") REFERENCES "employes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NavetteToResident" ADD CONSTRAINT "_NavetteToResident_A_fkey" FOREIGN KEY ("A") REFERENCES "navettes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NavetteToResident" ADD CONSTRAINT "_NavetteToResident_B_fkey" FOREIGN KEY ("B") REFERENCES "residents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActiviteEducateurs" ADD CONSTRAINT "_ActiviteEducateurs_A_fkey" FOREIGN KEY ("A") REFERENCES "activites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActiviteEducateurs" ADD CONSTRAINT "_ActiviteEducateurs_B_fkey" FOREIGN KEY ("B") REFERENCES "employes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActiviteToResident" ADD CONSTRAINT "_ActiviteToResident_A_fkey" FOREIGN KEY ("A") REFERENCES "activites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActiviteToResident" ADD CONSTRAINT "_ActiviteToResident_B_fkey" FOREIGN KEY ("B") REFERENCES "residents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JournalEntreeToResident" ADD CONSTRAINT "_JournalEntreeToResident_A_fkey" FOREIGN KEY ("A") REFERENCES "journal_entrees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JournalEntreeToResident" ADD CONSTRAINT "_JournalEntreeToResident_B_fkey" FOREIGN KEY ("B") REFERENCES "residents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RendezVousMedicalToResident" ADD CONSTRAINT "_RendezVousMedicalToResident_A_fkey" FOREIGN KEY ("A") REFERENCES "rendez_vous_medicaux"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RendezVousMedicalToResident" ADD CONSTRAINT "_RendezVousMedicalToResident_B_fkey" FOREIGN KEY ("B") REFERENCES "residents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
