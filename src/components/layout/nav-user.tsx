"use client";

import Link from "next/link";
import type { StaticImageData } from "next/image";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

interface NavUserProps {
    user: {
        name: string;
        email: string;
        avatar: string | StaticImageData;
    };
}

function getInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export function NavUser({ user }: NavUserProps) {
    const { isMobile } = useSidebar();
    const [confirmationOuverte, setConfirmationOuverte] = useState(false);
    const avatarSrc = typeof user.avatar === "string" ? user.avatar : user.avatar.src;

    function seDeconnecter() {
        // TODO: Clerk -> useClerk().signOut()
        setConfirmationOuverte(false);
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <SidebarMenuButton
                                size="lg"
                                className="flex w-full items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            />
                        }
                    >
                        <Avatar className="h-8 w-8 shrink-0 rounded-lg">
                            <AvatarImage src={avatarSrc} alt={user.name} />
                            <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{user.name}</span>
                            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                        </div>
                        <span className="material-symbols-rounded ml-auto shrink-0 leading-none" style={{ fontSize: 18 }}>
                            unfold_more
                        </span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 shrink-0 rounded-lg">
                                        <AvatarImage src={avatarSrc} alt={user.name} />
                                        <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium text-accent-foreground">{user.name}</span>
                                        <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem className="flex items-center gap-2" render={<Link href="/compte" />}>
                                <span className="material-symbols-rounded shrink-0 leading-none" style={{ fontSize: 18 }}>person</span>
                                Compte
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2" render={<Link href="/parametres" />}>
                                <span className="material-symbols-rounded shrink-0 leading-none" style={{ fontSize: 18 }}>settings</span>
                                Paramètres
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                variant="destructive"
                                className="flex items-center gap-2"
                                onSelect={() => setConfirmationOuverte(true)}
                            >
                                <span className="material-symbols-rounded shrink-0 leading-none" style={{ fontSize: 18 }}>logout</span>
                                Se déconnecter
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>

            <AlertDialog open={confirmationOuverte} onOpenChange={setConfirmationOuverte}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Se déconnecter ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tu devras te reconnecter pour accéder à nouveau à Svasta Manager.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={seDeconnecter}>Se déconnecter</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </SidebarMenu>
    );
}
