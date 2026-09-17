import { PageHeader } from "@/components/layout/page-header";
import { NavetteDetailContent } from "@/components/navettes/navette-detail-content";
import { MOCK_NAVETTES } from "@/lib/mock-navettes";

export default async function Page({
    params,
}: {
    params: Promise<{ navetteId: string }>;
}) {
    const { navetteId } = await params;
    const navette = MOCK_NAVETTES.find((n) => n.id === navetteId);

    return (
        <>
            <PageHeader title={navette ? `${navette.depart} → ${navette.arrivee}` : "Navette"} />
            <div className="max-w-lg flex-1 overflow-auto px-6 pb-6">
                {navette ? (
                    <NavetteDetailContent navette={navette} />
                ) : (
                    <p className="text-sm text-muted-foreground">Navette introuvable ({navetteId}).</p>
                )}
            </div>
        </>
    );
}
