import type { Block } from "@/lib/journal-blocks";

export function JournalBlockRenderer({ blocs }: { blocs: Block[] }) {
    return (
        <div className="flex flex-col gap-2">
            {blocs.map((bloc) => {
                if (!bloc.content.trim()) return null;
                if (bloc.type === "h1") {
                    return <h2 key={bloc.id} className="text-xl font-semibold">{bloc.content}</h2>;
                }
                if (bloc.type === "h2") {
                    return <h3 key={bloc.id} className="text-base font-medium">{bloc.content}</h3>;
                }
                return (
                    <p key={bloc.id} className="whitespace-pre-wrap text-sm text-muted-foreground">
                        {bloc.content}
                    </p>
                );
            })}
        </div>
    );
}
