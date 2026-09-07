// Fallback : arrivée directe sur l'URL (lien partagé, F5) — pas de modale
// possible sans historique de navigation client, donc page complète.
export default async function Page({
    params,
}: {
    params: Promise<{ rdvId: string }>;
}) {
    const { rdvId } = await params;

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Rendez-vous {rdvId}</h1>
            {/* TODO: même contenu que la modale, en pleine page */}
        </div>
    );
}
