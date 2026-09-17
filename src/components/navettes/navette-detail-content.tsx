import { PersonLink } from "@/components/shared/person-link";
import { Badge } from "@/components/ui/badge";
import type { MockNavette } from "@/lib/mock-navettes";
import { mockEmployes, mockResidents } from "@/lib/mock-data";

export function NavetteDetailContent({ navette }: { navette: MockNavette }) {
    const chauffeur = navette.chauffeurEmployeId
        ? mockEmployes.find((e) => e.id === navette.chauffeurEmployeId)
        : null;
    const passagers = mockResidents.filter((r) => navette.residentIds.includes(r.id));

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>location_on</span>
                    {navette.depart} → {navette.arrivee}
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>calendar_month</span>
                    {navette.date} · {navette.heureDepart}{navette.heureArrivee ? ` - ${navette.heureArrivee}` : ""}
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>directions_car</span>
                    {navette.vehicule || "Véhicule non renseigné"}
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant={navette.statut === "Prévue" ? "default" : "secondary"}>{navette.statut}</Badge>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Chauffeur</h3>
                {chauffeur ? (
                    <PersonLink id={chauffeur.id} nom={`${chauffeur.prenom} ${chauffeur.nom}`} type="employe" />
                ) : navette.chauffeurExterne ? (
                    <span className="text-sm">{navette.chauffeurExterne} (externe)</span>
                ) : (
                    <span className="text-sm text-muted-foreground">Non assigné</span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Passagers</h3>
                {passagers.length === 0 && <span className="text-sm text-muted-foreground">Aucun passager.</span>}
                <div className="flex flex-col gap-1">
                    {passagers.map((resident) => (
                        <div key={resident.id} className="rounded-md border p-2 text-sm">
                            <PersonLink id={resident.id} nom={`${resident.prenom} ${resident.nom}`} type="resident" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
