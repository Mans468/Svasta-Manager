import { PageHeader } from "@/components/layout/page-header";
import { PersonLink } from "@/components/shared/person-link";
import { Badge } from "@/components/ui/badge";
import { mockCaravanes, mockEmployes, mockResidents, nomComplet } from "@/lib/mock-data";

export default async function Page({
    params,
}: {
    params: Promise<{ caravaneId: string }>;
}) {
    const { caravaneId } = await params;
    const caravane = mockCaravanes.find((c) => c.id === caravaneId);
    const residents = mockResidents.filter((r) => r.caravaneId === caravaneId);
    const responsables = mockEmployes.filter((e) => caravane?.responsableIds.includes(e.id));

    return (
        <>
            <PageHeader title={caravane ? `Caravane ${caravane.nom}` : "Caravane"} />
            <div className="max-w-lg flex-1 overflow-auto px-6 pb-6">
                {caravane ? (
                    <div className="flex flex-col gap-6">
                        <Badge variant={caravane.statut === "Disponible" ? "default" : "destructive"} className="w-fit">
                            {caravane.statut}{caravane.raisonIndisponibilite ? ` - ${caravane.raisonIndisponibilite}` : ""}
                        </Badge>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-medium">Résidents ({residents.length}/{caravane.capaciteMax})</h3>
                            {residents.map((r) => (
                                <div key={r.id} className="rounded-md border p-2 text-sm">
                                    <PersonLink id={r.id} nom={nomComplet(r)} type="resident" />
                                </div>
                            ))}
                            {residents.length === 0 && <span className="text-sm text-muted-foreground">Aucun résident.</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-medium">Éducateurs responsables</h3>
                            <div className="flex flex-wrap gap-2">
                                {responsables.map((r) => (
                                    <Badge key={r.id} variant="secondary"><PersonLink id={r.id} nom={nomComplet(r)} type="employe" /></Badge>
                                ))}
                                {responsables.length === 0 && <span className="text-sm text-muted-foreground">Aucun responsable.</span>}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Caravane introuvable ({caravaneId}).</p>
                )}
            </div>
        </>
    );
}
