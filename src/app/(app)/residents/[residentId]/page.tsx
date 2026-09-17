import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { ResidentDetailContent } from "@/components/residents/resident-detail-content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mockResidents, nomComplet } from "@/lib/mock-data";

export default async function Page({
    params,
}: {
    params: Promise<{ residentId: string }>;
}) {
    const { residentId } = await params;
    const resident = mockResidents.find((r) => r.id === residentId);

    return (
        <>
            <PageHeader
                title={resident ? nomComplet(resident) : "Résident"}
                toolbar={
                    resident ? (
                        <div className="flex justify-end">
                            <Link
                                href={`/residents/${resident.id}/modifier`}
                                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                            >
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>edit</span>
                                Modifier
                            </Link>
                        </div>
                    ) : undefined
                }
            />
            <div className="max-w-2xl flex-1 overflow-auto px-6 pb-6">
                {resident ? (
                    <ResidentDetailContent resident={resident} />
                ) : (
                    <p className="text-sm text-muted-foreground">Résident introuvable ({residentId}).</p>
                )}
            </div>
        </>
    );
}
