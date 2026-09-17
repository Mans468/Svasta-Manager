import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
            <span
                className="material-symbols-rounded text-muted-foreground"
                style={{ fontSize: 48 }}
            >
                search_off
            </span>

            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold">Page introuvable</h1>
                <p className="text-sm text-muted-foreground">
                    Cette page n&apos;existe pas - vérifie l&apos;URL ou repars de
                    l&apos;agenda.
                </p>
            </div>

            <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
                Retour à l&apos;agenda
            </Link>
        </div>
    );
}
