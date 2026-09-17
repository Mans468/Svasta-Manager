import { cn } from "@/lib/utils";

export interface StatCardProps {
    label: string;
    value: string | number;
    tone?: "default" | "success" | "warning" | "danger";
    /** Contenu optionnel affiché à droite (ex: bouton, icône) */
    action?: React.ReactNode;
}

const TONE_STYLES: Record<NonNullable<StatCardProps["tone"]>, string> = {
    default: "border bg-background text-foreground",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-rose-50 text-rose-700",
};

/**
 * Carte de statistique réutilisée sur Transports, Activités, Travaux, etc.
 * (ex. "Abonnements actifs - 127").
 */
export function StatCard({ label, value, tone = "default", action }: StatCardProps) {
    return (
        <div className={cn("flex items-center justify-between rounded-xl p-4", TONE_STYLES[tone])}>
            <div>
                <span className="text-sm">{label}</span>
                <p className="text-2xl font-semibold">{value}</p>
            </div>
            {action}
        </div>
    );
}

export function StatCardGroup({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{children}</div>
    );
}
