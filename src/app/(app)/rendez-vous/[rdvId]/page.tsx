import { PageHeader } from "@/components/layout/page-header";
import { PersonLink } from "@/components/shared/person-link";
import { Badge } from "@/components/ui/badge";
import { formatDateFr } from "@/lib/date-utils";
import { mockMedecins, mockResidents, nomComplet } from "@/lib/mock-data";
import { MOCK_RDV_MEDICAUX } from "@/lib/mock-rdv-medicaux";

export default async function Page({
    params,
}: {
    params: Promise<{ rdvId: string }>;
}) {
    const { rdvId } = await params;
    const rdv = MOCK_RDV_MEDICAUX.find((r) => r.id === rdvId);
    const medecin = rdv ? mockMedecins.find((m) => m.id === rdv.medecinId) : null;
    const resident = rdv ? mockResidents.find((r) => r.id === rdv.residentId) : null;

    return (
        <>
            <PageHeader title={rdv?.motif ?? "Rendez-vous"} />
            <div className="max-w-lg flex-1 overflow-auto px-6 pb-6">
                {rdv ? (
                    <div className="flex flex-col gap-3 text-sm">
                        {rdv.visiteGroupeeId && <Badge variant="secondary" className="w-fit">Visite groupée</Badge>}
                        <div>{formatDateFr(rdv.date)} · {rdv.heure}</div>
                        <div>{rdv.lieu}</div>
                        {medecin && <div>{nomComplet(medecin)} - {medecin.specialisation}</div>}
                        {resident && <PersonLink id={resident.id} nom={nomComplet(resident)} type="resident" />}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Rendez-vous introuvable ({rdvId}).</p>
                )}
            </div>
        </>
    );
}
