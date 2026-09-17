/** Utilitaires date partagés - les dates métier sont stockées en ISO (YYYY-MM-DD). */

export function estPasse(dateISO: string): boolean {
    return new Date(dateISO) < new Date(new Date().toDateString());
}

export function formatDateFr(dateISO: string): string {
    return new Date(dateISO).toLocaleDateString("fr-BE", { day: "2-digit", month: "long", year: "numeric" });
}

export function heuresDepuis(dateISO: string): number {
    return (Date.now() - new Date(dateISO).getTime()) / (1000 * 60 * 60);
}
