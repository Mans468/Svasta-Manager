"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Block, BlockType } from "@/lib/journal-blocks";
import { cn } from "@/lib/utils";

interface JournalBlockEditorProps {
    blocs: Block[];
    onChange: (blocs: Block[]) => void;
}

const TYPES: { value: BlockType; label: string }[] = [
    { value: "h1", label: "Titre" },
    { value: "h2", label: "Sous-titre" },
    { value: "text", label: "Texte" },
];

/**
 * Éditeur "Notion-lite" : une pile de blocs (titre / sous-titre / texte),
 * chacun modifiable et re-typable. Volontairement simple : pas de
 * réorganisation par glisser-déposer, pas de mise en forme dans le texte.
 */
export function JournalBlockEditor({ blocs, onChange }: JournalBlockEditorProps) {
    function mettreAJour(id: string, patch: Partial<Block>) {
        onChange(blocs.map((b) => (b.id === id ? { ...b, ...patch } : b)));
    }

    function supprimer(id: string) {
        onChange(blocs.filter((b) => b.id !== id));
    }

    function ajouterBloc() {
        onChange([...blocs, { id: crypto.randomUUID(), type: "text", content: "" }]);
    }

    return (
        <div className="flex flex-col gap-2">
            {blocs.map((bloc) => (
                <div key={bloc.id} className="group flex items-start gap-2">
                    <div className="flex shrink-0 gap-1 pt-1.5">
                        {TYPES.map((t) => (
                            <button
                                key={t.value}
                                type="button"
                                title={t.label}
                                onClick={() => mettreAJour(bloc.id, { type: t.value })}
                                className={cn(
                                    "rounded px-1.5 py-0.5 text-xs",
                                    bloc.type === t.value ? "bg-zinc-900 text-white" : "text-muted-foreground hover:bg-muted",
                                )}
                            >
                                {t.value === "h1" ? "H1" : t.value === "h2" ? "H2" : "T"}
                            </button>
                        ))}
                    </div>

                    {bloc.type === "text" ? (
                        <Textarea
                            value={bloc.content}
                            onChange={(e) => mettreAJour(bloc.id, { content: e.target.value })}
                            placeholder="Écris ton texte..."
                            rows={2}
                            className="flex-1 resize-none border-none px-0 shadow-none focus-visible:ring-0"
                        />
                    ) : (
                        <input
                            value={bloc.content}
                            onChange={(e) => mettreAJour(bloc.id, { content: e.target.value })}
                            placeholder={bloc.type === "h1" ? "Titre" : "Sous-titre"}
                            className={cn(
                                "flex-1 border-none bg-transparent outline-none placeholder:text-muted-foreground",
                                bloc.type === "h1" ? "text-xl font-semibold" : "text-base font-medium",
                            )}
                        />
                    )}

                    {blocs.length > 1 && (
                        <button
                            type="button"
                            onClick={() => supprimer(bloc.id)}
                            className="opacity-0 group-hover:opacity-100"
                            title="Supprimer ce bloc"
                        >
                            <span className="material-symbols-rounded text-muted-foreground" style={{ fontSize: 18 }}>
                                close
                            </span>
                        </button>
                    )}
                </div>
            ))}

            <Button variant="ghost" size="sm" className="w-fit" onClick={ajouterBloc}>
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                Ajouter un bloc
            </Button>
        </div>
    );
}
