import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-100 p-6 dark:bg-zinc-950">
            <span className="text-xl font-semibold tracking-tight">Svasta Manager</span>
            {children}
        </div>
    );
}
