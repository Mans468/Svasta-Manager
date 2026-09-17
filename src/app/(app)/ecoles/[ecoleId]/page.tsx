import { PageHeader } from "@/components/layout/page-header";
import { CopyableText } from "@/components/shared/copyable-text";
import { PersonLink } from "@/components/shared/person-link";
import { mockEcoles, mockResidents, nomComplet } from "@/lib/mock-data";

export default async function Page({
    params,
}: {
    params: Promise<{ ecoleId: string }>;
}) {
    const { ecoleId } = await params;
    const ecole = mockEcoles.find((e) => e.id === ecoleId);
    const residentsInscrits = mockResidents.filter((r) => r.ecoleId === ecole?.id);

    return (
        <>
            <PageHeader title={ecole?.nom ?? "École"} />
            <div className="max-w-lg flex-1 overflow-auto px-6 pb-6">
                {ecole ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>location_on</span>
                                <CopyableText value={ecole.adresse} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>call</span>
                                <CopyableText value={ecole.telephone} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>mail</span>
                                <CopyableText value={ecole.email} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-medium">Résidents inscrits</h3>
                            {residentsInscrits.map((resident) => (
                                <div key={resident.id} className="rounded-md border p-2 text-sm">
                                    <PersonLink id={resident.id} nom={nomComplet(resident)} type="resident" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">École introuvable ({ecoleId}).</p>
                )}
            </div>
        </>
    );
}
