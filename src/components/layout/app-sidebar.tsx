import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";

import avatar from "@/assets/images/avatar.png";
import logo from "@/assets/images/logo.svg"
import { NavMain, type NavGroup } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import Image from "next/image";

const data = {
    user: {
        name: "John Doe",
        email: "johndoe@svasta.be",
        avatar: avatar,
    },
    navMain: [
        {
            title: "Centre",
            items: [
                { title: "Agenda", icon: "calendar_month", url: "/" },
                { title: "Résidents", icon: "groups", url: "/residents" },
                { title: "Caravanes", icon: "cottage", url: "/caravanes" },
                {
                    title: "Navettes",
                    icon: "airport_shuttle",
                    url: "/navettes",
                },
                {
                    title: "Transports en commun",
                    icon: "directions_subway",
                    url: "/transports",
                },
                { title: "Écoles", icon: "school", url: "/ecoles" },
            ],
        },
        {
            title: "Événements",
            items: [
                { title: "Activités", icon: "family_link", url: "/activites" },
                { title: "Réunions", icon: "co_present", url: "/reunions" },
                { title: "Journal", icon: "book_ribbon", url: "/journal" },
                {
                    title: "Travaux rémunérés",
                    icon: "work_history",
                    url: "/travaux",
                },
            ],
        },
        {
            title: "Médical",
            items: [
                { title: "Médecins", icon: "cardiology", url: "/medecins" },
            ],
        },
        {
            title: "Administration",
            items: [
                { title: "Employés", icon: "badge", url: "/employes" },
                { title: "Audit", icon: "search_activity", url: "/audit" },
            ],
        },
    ] satisfies NavGroup[],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="px-2 py-1.5 flex flex-row gap-2 items-center">
                    <Image src={logo} alt="Svasta Logo" width={28}/>
                    <span className="text-base font-medium tracking-tight">
                        Svasta Manager
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                {data.navMain.map((group) => (
                    <NavMain key={group.title} group={group} />
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
