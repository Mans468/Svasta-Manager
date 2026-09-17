import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

export default async function AppLayout({
    children,
    modal,
}: {
    children: ReactNode;
    modal: ReactNode;
}) {
    // const { userId } = await auth();
    // if (!userId) redirect("/sign-in");

    return (
        <SidebarProvider className="bg-zinc-100 dark:bg-zinc-950">
            <AppSidebar variant="floating" />
            <SidebarInset>
                {children}
                {modal}
            </SidebarInset>
        </SidebarProvider>
    );
}
