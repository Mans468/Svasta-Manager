import type { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex w-full flex-1 flex-col gap-4 bg-white px-4 py-4 dark:bg-black">
            {children}
        </main>
    );
}
