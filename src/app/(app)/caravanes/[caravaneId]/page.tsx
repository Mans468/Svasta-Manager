export default async function Page({
    params,
}: {
    params: Promise<{ caravaneId: string }>;
}) {
    const { caravaneId } = await params;

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Caravane {caravaneId}</h1>
            {/* TODO: même contenu que la Sheet, en pleine page */}
        </div>
    );
}
