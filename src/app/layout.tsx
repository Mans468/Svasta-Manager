import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Svasta Manager",
    description: "Outil de gestion pour centre d'accueil de demandeurs de protection internationale",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="fr"
            className={cn(
                "h-full",
                "antialiased",
                geistSans.variable,
                geistMono.variable,
                "font-sans",
                inter.variable,
            )}
        >
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0"
                />
            </head>
            <body className="min-h-full flex flex-col">
                <ClerkProvider
                    appearance={{
                        theme: shadcn,
                        variables: {
                            colorPrimary: "#161616",
                            fontFamily: "var(--font-sans)",
                            borderRadius: "0.5rem",
                        },
                    }}
                >
                    <TooltipProvider>{children}</TooltipProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
