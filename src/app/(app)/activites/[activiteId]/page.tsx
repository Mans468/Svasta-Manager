import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { ACTIVITES_INITIALES } from "@/app/(app)/activites/page";
import { ActiviteDetailContent } from "@/components/activites/activite-detail-content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function Page({
    params,
}: {
    params: Promise<{ activiteId: string }>;
}) {
    const { activiteId } = await params;
    const activite = ACTIVITES_INITIALES.find((a) => a.id === activiteId);

    return (
        <>
            <PageHeader
                title={activite?.titre ?? "Activité"}
                toolbar={
                    activite ? (
                        <div className="flex justify-end">
                            <Link href={`/activites?modifier=${activite.id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>edit</span>
                                Modifier
                            </Link>
                        </div>
                    ) : undefined
                }
            />
            <div className="max-w-lg flex-1 overflow-auto px-6 pb-6">
                {activite ? (
                    <ActiviteDetailContent activite={activite} />
                ) : (
                    <p className="text-sm text-muted-foreground">Activité introuvable ({activiteId}).</p>
                )}
            </div>
        </>
    );
}
