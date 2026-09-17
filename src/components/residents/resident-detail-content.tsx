import { PersonLink } from "@/components/shared/person-link";
import { BlurredText } from "@/components/shared/blurred-text";
import { CopyableText } from "@/components/shared/copyable-text";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { mockCaravanes, mockResidents, mockEcoles, nomComplet, type MockResident } from "@/lib/mock-data";

// TODO: remplacer par un vrai fetch une fois le backend branché
const RDV_PAR_RESIDENT: Record<string, { id: string; medecin: string; date: string; heure: string }[]> = {
    "4": [
        { id: "1", medecin: "Dr. Schmit", date: "28/01/2026", heure: "9:00" },
        { id: "2", medecin: "Dr. Carlson", date: "05/02/2026", heure: "11:00" },
    ],
};

const HISTORIQUE_PAR_RESIDENT: Record<string, { heure: string; texte: string; tag?: { nom: string; href: string } }[]> = {
    "4": [
        { heure: "12:12", texte: "John Doe a ajouté Jean Malik à l'activité", tag: { nom: "Parc Astérix", href: "/activites/1" } },
        { heure: "11:42", texte: "Sarah Malik a déplacé Jean Malik de la caravane A21 à A22" },
        { heure: "10:12", texte: "Jean Luc a mis à jour le rendez-vous avec", tag: { nom: "Dr. Schmit", href: "/rendez-vous/1" } },
    ],
};

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b py-2 text-sm">
            <span className="shrink-0 text-muted-foreground">{label}</span>
            <span className="text-right">{children}</span>
        </div>
    );
}

/** L'occupation détermine ce qu'on affiche dans l'onglet Profession : une école
 *  liée si "étudiant", sinon la profession en texte libre (ex. "EVS"). */
function estEtudiant(occupation: string) {
    return occupation.toLowerCase().includes("étudiant") || occupation.toLowerCase().includes("etudiant");
}

export function ResidentDetailContent({ resident }: { resident: MockResident }) {
    const caravane = mockCaravanes.find((c) => c.id === resident.caravaneId);
    const ecole = mockEcoles.find((e) => e.id === resident.ecoleId);
    const famille = mockResidents.filter((r) => resident.familleIds.includes(r.id));
    const rdvs = RDV_PAR_RESIDENT[resident.id] ?? [];
    const historique = HISTORIQUE_PAR_RESIDENT[resident.id] ?? [];

    return (
        <div className="flex flex-col gap-6">
            {/* Bloc identité */}
            <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{resident.statutProcedure}</Badge>
                    <Badge className={resident.statutResidence === "Présent" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-rose-100 text-rose-700 hover:bg-rose-100"}>
                        {resident.statutResidence}
                    </Badge>
                </div>
            </div>

            {/* Infos principales - une seule colonne, rien ne s'entremêle */}
            <div className="flex flex-col">
                <FieldRow label="Caravane">
                    {caravane ? (
                        <a href={`/caravanes/${caravane.id}`} className="underline decoration-dotted underline-offset-2 hover:decoration-solid">{caravane.nom}</a>
                    ) : "-"}
                </FieldRow>
                <FieldRow label="Numéro de registre">
                    <BlurredText value={resident.numeroRegistre} />
                </FieldRow>
                <FieldRow label="Date de naissance">{resident.dateNaissance}</FieldRow>
                <FieldRow label="Date d'inscription">{resident.dateInscription}</FieldRow>
                <FieldRow label="Pays d'origine">{resident.paysOrigine}</FieldRow>
                <FieldRow label="Langues">{resident.langues}</FieldRow>
                <FieldRow label="Raison du refuge">{resident.raisonRefuge}</FieldRow>
                <FieldRow label="Famille">
                    {famille.length > 0 ? (
                        <span className="flex flex-wrap justify-end gap-x-1">
                            {famille.map((f, i) => (
                                <span key={f.id}>
                                    <PersonLink id={f.id} nom={nomComplet(f)} type="resident" />
                                    {i < famille.length - 1 && ","}
                                </span>
                            ))}
                        </span>
                    ) : "-"}
                </FieldRow>
                <FieldRow label="Email"><CopyableText value={resident.email} /></FieldRow>
                <FieldRow label="Téléphone"><CopyableText value={resident.telephone} /></FieldRow>
            </div>

            <Separator />

            <Tabs defaultValue="rdv">
                <TabsList>
                    <TabsTrigger value="rdv">Rendez-vous</TabsTrigger>
                    <TabsTrigger value="abonnements">Abonnements</TabsTrigger>
                    <TabsTrigger value="profession">Profession</TabsTrigger>
                </TabsList>

                <TabsContent value="rdv" className="flex flex-col gap-2">
                    {rdvs.length === 0 && <p className="text-sm text-muted-foreground">Aucun rendez-vous à venir.</p>}
                    {rdvs.map((rdv) => (
                        <div key={rdv.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex flex-col">
                                <span className="font-medium">{rdv.medecin}</span>
                                <span className="text-sm text-muted-foreground">{rdv.date}</span>
                            </div>
                            <Badge variant="secondary">{rdv.heure}</Badge>
                        </div>
                    ))}
                </TabsContent>

                <TabsContent value="abonnements">
                    <p className="text-sm text-muted-foreground">Aucun abonnement actif.</p>
                </TabsContent>

                <TabsContent value="profession" className="flex flex-col gap-2">
                    {estEtudiant(resident.occupation) ? (
                        ecole ? (
                            <div className="flex items-center gap-2 text-sm">
                                <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>school</span>
                                <a href={`/ecoles/${ecole.id}`} className="underline decoration-dotted underline-offset-2 hover:decoration-solid">
                                    {ecole.nom}
                                </a>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Étudiant - aucune école enregistrée pour l&apos;instant.</p>
                        )
                    ) : (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>work</span>
                            {resident.occupation || "Aucune profession renseignée."}
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Historique</h3>
                {historique.length === 0 && <p className="text-sm text-muted-foreground">Aucun historique.</p>}
                {historique.map((entree, i) => (
                    <div key={i} className="flex gap-2 text-sm">
                        <span className="w-10 shrink-0 text-muted-foreground">{entree.heure}</span>
                        <span>
                            {entree.texte}{" "}
                            {entree.tag && (
                                <a href={entree.tag.href} className="font-medium underline decoration-dotted underline-offset-2 hover:decoration-solid">
                                    {entree.tag.nom}
                                </a>
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
