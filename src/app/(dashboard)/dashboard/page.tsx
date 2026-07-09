"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, FileText, Video, Users, Award, Shield, ArrowRight, Bell } from "lucide-react";
import { motion } from "framer-motion";

import { QRCodeCanvas } from "qrcode.react";

export default function DashboardPage() {
  // MVP Mock Data
  const memberData = {
    name: "Vedansh Singhal",
    membershipId: "YAM-2026-84912",
    state: "Delhi",
    role: "Delegate",
    status: "APPROVED"
  };

  return (
    <div className="w-full flex-1 flex flex-col gap-6 max-w-6xl mx-auto pb-10">
      
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background border shadow-sm relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Welcome back, {memberData.name} 👋</h2>
          <p className="text-muted-foreground max-w-2xl">
            Your application for the Youth Assembly has been approved. Please download your Digital ID Pass.
          </p>
          <div className="mt-4 flex gap-3">
            <Button>View Assembly Schedule</Button>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>
      </motion.div>

      {/* Digital ID Card (MVP Feature) */}
      {memberData.status === "APPROVED" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-2xl mx-auto"
        >
          <Card className="overflow-hidden border-2 border-primary/20 shadow-xl bg-gradient-to-br from-background to-muted/30">
            <div className="h-4 w-full bg-primary" />
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                <div className="flex items-center sm:items-start gap-6 flex-col sm:flex-row text-center sm:text-left">
                  <div className="h-28 w-28 rounded-xl bg-muted border-2 border-primary/20 overflow-hidden shrink-0 flex items-center justify-center text-muted-foreground">
                    [Photo]
                  </div>
                  <div className="space-y-1 mt-2">
                    <h3 className="text-3xl font-bold uppercase tracking-tight text-primary">{memberData.name}</h3>
                    <p className="font-mono text-lg font-semibold text-muted-foreground">{memberData.membershipId}</p>
                    <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                        {memberData.role}
                      </span>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
                        {memberData.state} Chapter
                      </span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 p-3 bg-white rounded-xl shadow-sm border">
                  <QRCodeCanvas 
                    value={`verify: ${memberData.membershipId}`} 
                    size={120}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                  />
                </div>
              </div>
            </CardContent>
            <div className="bg-muted px-6 py-3 border-t text-center sm:text-left flex justify-between items-center text-sm text-muted-foreground">
              <span>Valid for Youth Assembly 2026</span>
              <span className="font-mono">YOUNG INDIAN CABINET</span>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
        {[
          { title: "Volunteer Hours", value: "124 hrs", icon: Clock, desc: "+12 hrs this month" },
          { title: "Certificates", value: "5 Earned", icon: Award, desc: "Top 10% nationwide" },
          { title: "Active Committees", value: "3", icon: Users, desc: "National & State level" },
          { title: "Upcoming Events", value: "2", icon: CalendarDays, desc: "Next in 3 days" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Main Content Area */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          {/* Recent Announcements */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>Latest updates from headquarters</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "National Assembly Registration Open", date: "Today", tag: "Important" },
                { title: "New Policy Draft: Tech for Youth", date: "Yesterday", tag: "Policy Lab" },
                { title: "Monthly State Chapter Meeting Minutes", date: "3 days ago", tag: "Meeting" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border cursor-pointer">
                  <div className="p-2 bg-primary/10 rounded-full shrink-0">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <div className="text-xs px-2 py-1 bg-secondary rounded-md font-medium">
                    {item.tag}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { title: "Propose Policy", icon: FileText },
                  { title: "Start Meeting", icon: Video },
                  { title: "Vote Now", icon: Shield },
                  { title: "New Event", icon: CalendarDays },
                ].map((action, i) => (
                  <Button key={i} variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5">
                    <action.icon className="h-6 w-6 text-primary" />
                    <span className="text-xs font-medium">{action.title}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Area */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
          {/* Upcoming Meetings */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>Your schedule for the week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "State Chapter Weekly Sync", time: "10:00 AM - 11:00 AM", attendees: 45 },
                { title: "Policy Draft Review", time: "2:00 PM - 3:30 PM", attendees: 12 },
                { title: "National Committee", time: "Tomorrow, 4:00 PM", attendees: 120 },
              ].map((meeting, i) => (
                <div key={i} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary font-bold">
                    <span>12</span>
                    <span className="text-[10px] uppercase">Oct</span>
                  </div>
                  <div className="flex-1 space-y-1 overflow-hidden">
                    <p className="text-sm font-semibold truncate">{meeting.title}</p>
                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                      <Clock className="h-3 w-3" /> {meeting.time}
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="shrink-0 h-8 w-8">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="link" className="w-full mt-2 text-sm text-primary">
                View Full Calendar <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
