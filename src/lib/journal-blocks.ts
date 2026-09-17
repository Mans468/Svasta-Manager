// Format très simple pour le contenu d'une note de journal : une liste de
// blocs (titre H1/H2 ou texte), sérialisés en JSON dans le champ `contenu`
// (String @db.Text) du modèle Prisma JournalEntree — pas besoin de migration,
// pas de librairie d'édition riche, juste un tableau de blocs.

export type BlockType = "h1" | "h2" | "text";

export interface Block {
    id: string;
    type: BlockType;
    content: string;
}

export function blocsParDefaut(): Block[] {
    return [
        { id: crypto.randomUUID(), type: "h1", content: "" },
        { id: crypto.randomUUID(), type: "text", content: "" },
    ];
}

export function serialiserBlocs(blocs: Block[]): string {
    return JSON.stringify(blocs);
}

export function parserBlocs(contenu: string): Block[] {
    try {
        const parsed = JSON.parse(contenu);
        if (Array.isArray(parsed)) return parsed;
    } catch {
        // contenu ancien format (texte brut) -> on le transforme en un seul bloc
    }
    return [{ id: crypto.randomUUID(), type: "text", content: contenu }];
}

/** Titre (1er bloc h1/h2) + aperçu (1er bloc text), pour la carte résumé. */
export function apercuBlocs(blocs: Block[]) {
    const titre = blocs.find((b) => b.type === "h1" || b.type === "h2");
    const texte = blocs.find((b) => b.type === "text" && b.content.trim());
    return {
        titre: titre?.content || "Sans titre",
        extrait: texte?.content ?? "",
    };
}
