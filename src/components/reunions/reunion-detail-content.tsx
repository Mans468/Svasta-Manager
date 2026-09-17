import { PersonLink } from "@/components/shared/person-link";
import { Badge } from "@/components/ui/badge";
import { mockResidents, nomComplet } from "@/lib/mock-data";
import type { Reunion } from "@/lib/mock-reunions";

const TYPE_STYLE: Record<Reunion["type"], string> = {
    Quotidienne: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    Hebdomadaire: "bg-violet-100 text-violet-700 hover:bg-violet-100",
    Spéciale: "bg-amber-100 text-amber-700 hover:bg-amber-100",
};

export function ReunionDetailContent({ reunion }: { reunion: Reunion }) {
    const residentConcerne = mockResidents.find((r) => r.id === reunion.residentConcerneId);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
                <Badge className={TYPE_STYLE[reunion.type]}>{reunion.type}</Badge>
                {reunion.presenceObligatoire && (
                    <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">
                        <span className="material-symbols-rounded" style={{ fontSize: 14 }}>warning</span>
                        Présence obligatoire
                    </Badge>
                )}
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>calendar_month</span>
                    {reunion.jour} · {reunion.heure || "Heure à définir"}
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>location_on</span>
                    {reunion.lieu}
                </div>
                {residentConcerne && (
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-rounded shrink-0" style={{ fontSize: 18 }}>person</span>
                        Concerne <PersonLink id={residentConcerne.id} nom={nomComplet(residentConcerne)} type="resident" />
                    </div>
                )}
            </div>
        </div>
    );
}
