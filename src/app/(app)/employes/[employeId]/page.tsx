import { PageHeader } from "@/components/layout/page-header";
import { CopyableText } from "@/components/shared/copyable-text";
import { Badge } from "@/components/ui/badge";
import { mockEmployes, nomComplet } from "@/lib/mock-data";

export default async function Page({
    params,
}: {
    params: Promise<{ employeId: string }>;
}) {
    const { employeId } = await params;
    const employe = mockEmployes.find((e) => e.id === employeId);

    return (
        <>
            <PageHeader title={employe ? nomComplet(employe) : "Employé"} />
            <div className="max-w-lg flex-1 overflow-auto px-6 pb-6">
                {employe ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-1">
                            {employe.roles.map((role) => (<Badge key={role} variant="secondary">{role}</Badge>))}
                        </div>
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>mail</span>
                                <CopyableText value={employe.email} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>call</span>
                                <CopyableText value={employe.telephone} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Employé introuvable ({employeId}).</p>
                )}
            </div>
        </>
    );
}
