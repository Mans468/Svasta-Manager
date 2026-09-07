"use client";

import { useRouter, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export interface NavItem {
    title: string;
    icon: string;
    url: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export function NavMain({ group }: { group: NavGroup }) {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarMenu>
                {group.items.map((item) => {
                    const isActive = pathname === item.url;

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                isActive={isActive}
                                tooltip={item.title}
                                onClick={() => router.push(item.url)}
                                className={cn(
                                    "flex w-full cursor-pointer items-center gap-2",
                                    isActive &&
                                        "bg-primary text-primary-foreground",
                                )}
                            >
                                <span
                                    className={cn(
                                        "material-symbols-rounded shrink-0 leading-none",
                                        isActive && "material-symbols-filled",
                                    )}
                                    style={{ fontSize: 20 }}
                                >
                                    {item.icon}
                                </span>
                                <span className="truncate">{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
