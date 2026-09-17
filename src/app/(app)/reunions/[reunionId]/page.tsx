import { PageHeader } from "@/components/layout/page-header";
import { REUNIONS_INITIALES } from "@/lib/mock-reunions";
import { ReunionDetailContent } from "@/components/reunions/reunion-detail-content";

export default async function Page({
    params,
}: {
    params: Promise<{ reunionId: string }>;
}) {
    const { reunionId } = await params;
    const reunion = REUNIONS_INITIALES.find((r) => r.id === reunionId);

    return (
        <>
            <PageHeader title={reunion?.titre ?? "Réunion"} />
            <div className="max-w-lg flex-1 overflow-auto px-6 pb-6">
                {reunion ? (
                    <ReunionDetailContent reunion={reunion} />
                ) : (
                    <p className="text-sm text-muted-foreground">Réunion introuvable ({reunionId}).</p>
                )}
            </div>
        </>
    );
}
