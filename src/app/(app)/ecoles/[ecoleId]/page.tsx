export default async function Page({
    params,
}: {
    params: Promise<{ ecoleId: string }>;
}) {
    const { ecoleId } = await params;

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">École {ecoleId}</h1>
            {/* TODO: même contenu que la Sheet, en pleine page */}
        </div>
    );
}
