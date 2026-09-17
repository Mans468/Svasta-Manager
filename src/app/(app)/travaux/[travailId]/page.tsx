import { formatDateFr } from "@/lib/date-utils";
import { PageHeader } from "@/components/layout/page-header";
import { TRAVAUX_INITIAUX } from "@/app/(app)/travaux/page";
import { PersonLink } from "@/components/shared/person-link";
import { Badge } from "@/components/ui/badge";
import { mockResidents, nomComplet } from "@/lib/mock-data";

export default async function Page({
    params,
}: {
    params: Promise<{ travailId: string }>;
}) {
    const { travailId } = await params;
    const travail = TRAVAUX_INITIAUX.find((t) => t.id === travailId);
    const resident = travail ? mockResidents.find((r) => r.id === travail.residentId) : null;

    return (
        <>
            <PageHeader title={travail?.titre ?? "Travail"} />
            <div className="max-w-lg flex-1 overflow-auto px-6 pb-6">
                {travail ? (
                    <div className="flex flex-col gap-4">
                        <Badge variant={travail.statut === "Payé" ? "secondary" : "destructive"} className="w-fit">{travail.statut}</Badge>
                        <div className="flex flex-col gap-1 text-sm">
                            <span className="text-muted-foreground">Résident</span>
                            {resident && <PersonLink id={resident.id} nom={nomComplet(resident)} type="resident" />}
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            <span className="text-muted-foreground">Date</span>
                            {formatDateFr(travail.date)} {travail.heure && `· ${travail.heure}`}
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            <span className="text-muted-foreground">Montant</span>
                            {travail.montant} €
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Travail introuvable ({travailId}).</p>
                )}
            </div>
        </>
    );
}
