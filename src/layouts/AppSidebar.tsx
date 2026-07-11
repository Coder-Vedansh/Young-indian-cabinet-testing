"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Building2,
  Map,
  Video,
  MessageSquare,
  FileText,
  Vote,
  GraduationCap,
  Calendar,
  Award,
  BarChart,
  Settings,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Members", url: "/members", icon: Users },
  { title: "Committees", url: "/committees", icon: Building2 },
  { title: "State Chapters", url: "/state-chapters", icon: Map },
  { title: "Meetings", url: "/meetings", icon: Video },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Policy Lab", url: "/policy-lab", icon: FileText },
  { title: "Voting", url: "/voting", icon: Vote },
  { title: "Learning Hub", url: "/learning-hub", icon: GraduationCap },
  { title: "Events", url: "/events", icon: Calendar },
  { title: "Recognition", url: "/recognition", icon: Award },
  { title: "Analytics", url: "/analytics", icon: BarChart },
  { title: "Administration", url: "/admin", icon: Shield },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex items-center border-b px-6">
        <span className="font-bold text-lg text-primary truncate">YOUNG INDIAN CABINET</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname?.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    {/* @ts-expect-error SidebarMenuButton types missing asChild prop */}
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
