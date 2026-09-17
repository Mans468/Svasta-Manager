import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
    page: number;
    totalPages: number;
    /** Chemin de la page courante, ex. "/residents" */
    basePath: string;
}

/** Pagination "?page=" simple, cohérente sur toutes les listes. */
export function TablePagination({ page, totalPages, basePath }: TablePaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between pt-4">
            <PageLink page={page - 1} basePath={basePath} disabled={page <= 1}>
                Précédent
            </PageLink>

            <span className="text-sm text-muted-foreground">
                Page {page} / {totalPages}
            </span>

            <PageLink page={page + 1} basePath={basePath} disabled={page >= totalPages}>
                Suivant
            </PageLink>
        </div>
    );
}

function PageLink({
    page,
    basePath,
    disabled,
    children,
}: {
    page: number;
    basePath: string;
    disabled: boolean;
    children: React.ReactNode;
}) {
    if (disabled) {
        return (
            <span className={cn(buttonVariants({ variant: "outline" }), "pointer-events-none opacity-50")}>
                {children}
            </span>
        );
    }

    return (
        <Link href={`${basePath}?page=${page}`} className={cn(buttonVariants({ variant: "outline" }))}>
            {children}
        </Link>
    );
}

/** Découpe un tableau selon la page courante (helper pour Server Components). */
export function paginate<T>(items: T[], page: number, pageSize = 10) {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const slice = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    return { items: slice, totalPages, currentPage };
}
