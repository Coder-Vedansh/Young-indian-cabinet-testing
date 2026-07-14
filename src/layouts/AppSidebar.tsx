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
    <Sidebar className="glass-sidebar border-none">
      <SidebarHeader className="h-auto flex flex-col items-center justify-center border-b border-border/30 py-6 bg-transparent">
        {/* Placeholder for the circular seal logo. Please ensure logo.png is saved in the public/ folder. */}
        <div className="rounded-full bg-background/10 p-2 mb-3 border border-border/50 shadow-[0_0_15px_rgba(200,155,42,0.3)] transition-transform duration-500 hover:rotate-[360deg] hover:scale-110 hover:shadow-[0_0_25px_rgba(200,155,42,0.6)] cursor-pointer">
          <img src="/logo.png" alt="YIC Seal" className="w-16 h-16 object-contain rounded-full" />
        </div>
        <span className="font-bold text-sm tracking-widest uppercase text-sidebar-primary-foreground text-center neon-text-glow">Young India Cabinet</span>
      </SidebarHeader>
      <SidebarContent className="bg-transparent">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 uppercase tracking-wider text-xs font-semibold">Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname?.startsWith(item.url);
              return (
                <SidebarMenuItem key={item.title}>
                  {(function() {
                    const AnySidebarMenuButton = SidebarMenuButton as any;
                    return (
                      <AnySidebarMenuButton 
                        asChild 
                        isActive={isActive} 
                        tooltip={item.title}
                        className={`transition-all duration-300 hover:bg-sidebar-accent/50 ${isActive ? 'bg-sidebar-accent shadow-sm border-l-2 border-accent' : ''}`}
                      >
                        <Link href={item.url}>
                          <item.icon className="transition-transform group-hover:scale-110" />
                          <span className="font-medium tracking-wide">{item.title}</span>
                        </Link>
                      </AnySidebarMenuButton>
                    );
                  })()}
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
