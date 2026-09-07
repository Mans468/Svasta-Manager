export default async function Page({
    params,
}: {
    params: Promise<{ activiteId: string }>;
}) {
    const { activiteId } = await params;

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Activité {activiteId}</h1>
            {/* TODO: même contenu que la Sheet, en pleine page */}
        </div>
    );
}
