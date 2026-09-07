import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
            <span
                className="material-symbols-rounded text-muted-foreground"
                style={{ fontSize: 48 }}
            >
                search_off
            </span>

            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold">Page introuvable</h1>
                <p className="text-sm text-muted-foreground">
                    La page que tu cherches n&apos;existe pas ou a été déplacée.
                </p>
            </div>

            <Link
                href="/"
                className={cn(buttonVariants({ variant: "default" }))}
            >
                Retour à l&apos;accueil
            </Link>
        </div>
    );
}
