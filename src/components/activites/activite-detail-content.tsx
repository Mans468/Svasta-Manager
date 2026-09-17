import { PersonLink } from "@/components/shared/person-link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { estPasse, formatDateFr } from "@/lib/date-utils";
import { mockEmployes, mockResidents, nomComplet } from "@/lib/mock-data";
import type { Activite } from "@/app/(app)/activites/page";

export function ActiviteDetailContent({ activite }: { activite: Activite }) {
    const residents = mockResidents.filter((r) => activite.residentIds.includes(r.id));
    const educateurs = mockEmployes.filter((e) => activite.educateurIds.includes(e.id));
    const terminee = estPasse(activite.date);

    return (
        <div className="flex flex-col gap-6">
            <Badge variant={terminee ? "secondary" : "default"} className="w-fit">{terminee ? "Terminée" : "À venir"}</Badge>

            <p className="text-sm text-muted-foreground">{activite.description || "Aucune description."}</p>

            <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>calendar_month</span>
                    {formatDateFr(activite.date)} {activite.heure}
                </div>
                {activite.lieu && (
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activite.lieu)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 underline decoration-dotted underline-offset-2 hover:decoration-solid"
                    >
                        <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>location_on</span>
                        {activite.lieu}
                    </a>
                )}
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>payments</span>
                    {activite.budget} €
                </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Résidents</h3>
                <div className="flex flex-wrap gap-2">
                    {residents.map((r) => (
                        <Badge key={r.id} variant="secondary"><PersonLink id={r.id} nom={nomComplet(r)} type="resident" /></Badge>
                    ))}
                    {residents.length === 0 && <span className="text-sm text-muted-foreground">Aucun</span>}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Éducateurs</h3>
                <div className="flex flex-wrap gap-2">
                    {educateurs.map((e) => (
                        <Badge key={e.id} variant="secondary"><PersonLink id={e.id} nom={nomComplet(e)} type="employe" /></Badge>
                    ))}
                    {educateurs.length === 0 && <span className="text-sm text-muted-foreground">Aucun</span>}
                </div>
            </div>
        </div>
    );
}
