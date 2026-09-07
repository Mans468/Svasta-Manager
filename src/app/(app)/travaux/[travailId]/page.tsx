export default async function Page({
    params,
}: {
    params: Promise<{ travailId: string }>;
}) {
    const { travailId } = await params;

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Travail {travailId}</h1>
            {/* TODO: même contenu que la Sheet, en pleine page */}
        </div>
    );
}
