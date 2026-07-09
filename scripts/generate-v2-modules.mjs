import fs from 'fs';
import path from 'path';

// Helper to ensure directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Scaffold Chat (Communication) Module
ensureDir('src/features/chat/components');
fs.writeFileSync('src/features/chat/components/ChatLayout.tsx', `
"use client";
import React from 'react';
import { Hash, Volume2, Plus, Users, Search, Pin, MessageSquare, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function ChatLayout() {
  return (
    <div className="flex h-[calc(100vh-8rem)] w-full overflow-hidden rounded-xl border bg-background shadow-sm">
      {/* Server Sidebar */}
      <div className="w-16 flex flex-col items-center py-4 gap-4 bg-muted/50 border-r">
        <div className="w-12 h-12 rounded-[16px] bg-primary flex items-center justify-center text-primary-foreground font-bold cursor-pointer hover:rounded-xl transition-all">YA</div>
        <div className="w-8 h-[2px] bg-border rounded-full" />
        <div className="w-12 h-12 rounded-[24px] bg-muted-foreground/20 flex items-center justify-center cursor-pointer hover:rounded-xl hover:bg-primary hover:text-primary-foreground transition-all">
          <Plus />
        </div>
      </div>
      
      {/* Channels Sidebar */}
      <div className="w-64 flex flex-col bg-muted/20 border-r">
        <div className="h-14 border-b flex items-center px-4 font-bold shadow-sm">
          Youth Assembly Server
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="text-xs font-semibold text-muted-foreground px-2 py-2 mt-2 uppercase">Text Channels</div>
          {['announcements', 'general', 'policy-discussion', 'events-planning'].map(c => (
            <div key={c} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted/50 cursor-pointer text-sm text-foreground/80 hover:text-foreground">
              <Hash className="w-4 h-4 text-muted-foreground" /> {c}
            </div>
          ))}
          <div className="text-xs font-semibold text-muted-foreground px-2 py-2 mt-4 uppercase">Voice Channels</div>
          {['Lounge', 'Meeting Room 1'].map(c => (
            <div key={c} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted/50 cursor-pointer text-sm text-foreground/80 hover:text-foreground">
              <Volume2 className="w-4 h-4 text-muted-foreground" /> {c}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold">
            <Hash className="w-5 h-5 text-muted-foreground" /> general
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Hash className="w-5 h-5 cursor-pointer hover:text-foreground" />
            <Pin className="w-5 h-5 cursor-pointer hover:text-foreground" />
            <Users className="w-5 h-5 cursor-pointer hover:text-foreground" />
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-1.5" />
              <Input className="h-7 w-48 pl-8 text-xs bg-muted/50" placeholder="Search" />
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-end gap-4">
          <div className="text-center text-xs text-muted-foreground my-4">Welcome to the beginning of the #general channel.</div>
          {[1,2,3].map(i => (
            <div key={i} className="flex gap-4 group">
              <Avatar className="w-10 h-10"><AvatarFallback>U{i}</AvatarFallback></Avatar>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-sm">User {i}</span>
                  <span className="text-xs text-muted-foreground">Today at 10:24 AM</span>
                </div>
                <p className="text-sm">This is a highly scalable Discord-inspired UI for V2!</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 pt-0">
          <div className="relative">
            <Plus className="w-5 h-5 absolute left-3 top-2.5 text-muted-foreground" />
            <Input className="pl-10 h-10 bg-muted/30 border-muted-foreground/20 rounded-lg" placeholder="Message #general" />
          </div>
        </div>
      </div>
    </div>
  );
}
`);
fs.writeFileSync('src/app/(dashboard)/chat/page.tsx', `
import { ChatLayout } from "@/features/chat/components/ChatLayout";
export default function ChatPage() { return <ChatLayout />; }
`);

// Scaffold Policy Lab
ensureDir('src/features/policy/components');
fs.writeFileSync('src/features/policy/components/PolicyLabLayout.tsx', `
"use client";
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, MessageSquare, CheckCircle, Share2, MoreVertical } from 'lucide-react';

export function PolicyLabLayout() {
  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Editor Area */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="h-16 border-b flex items-center justify-between px-6 bg-muted/10">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-md"><FileText className="w-6 h-6" /></div>
            <div>
              <h2 className="font-bold text-lg leading-tight">National Tech Initiative Draft</h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="w-3 h-3" /> Saved to cloud 
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><MessageSquare className="w-4 h-4 mr-2" /> Comments</Button>
            <Button size="sm"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
            <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
          </div>
        </div>
        {/* Toolbar Placeholder */}
        <div className="h-10 border-b flex items-center px-6 gap-4 bg-muted/5 text-sm text-muted-foreground">
          <span className="font-bold text-foreground">Normal Text</span> |
          <span className="font-bold text-foreground">Inter</span> |
          <span>11</span> |
          <span className="font-bold">B</span> <span className="italic">I</span> <span className="underline">U</span>
        </div>
        {/* Document Body */}
        <div className="flex-1 overflow-y-auto p-12 bg-muted/5 flex justify-center">
          <div className="w-full max-w-3xl min-h-full bg-background border shadow-sm p-12 outline-none" contentEditable suppressContentEditableWarning>
            <h1 className="text-3xl font-bold mb-6">National Technology Initiative for Youth</h1>
            <p className="mb-4">This document outlines the proposed framework for integrating advanced technology education into the national curriculum, emphasizing AI, programming, and digital literacy.</p>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p>The Youth Assembly recognizes the critical need for...</p>
          </div>
        </div>
      </Card>
      
      {/* Right Sidebar - Version History / Reviews */}
      <div className="w-80 flex flex-col gap-4">
        <Card className="p-4 flex flex-col gap-4">
          <h3 className="font-semibold flex items-center gap-2"><Clock className="w-4 h-4" /> Version History</h3>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="flex gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium">Edited by Jane Doe</p>
                  <p className="text-xs text-muted-foreground">Today at {10-i}:00 AM</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4 flex flex-col gap-4 flex-1">
          <h3 className="font-semibold flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Active Discussions</h3>
          <div className="p-3 border rounded-lg bg-muted/20 text-sm">
            <p className="font-semibold mb-1">Section 1.2</p>
            <p className="text-muted-foreground mb-2">"Should we include quantum computing here?"</p>
            <Button variant="secondary" size="sm" className="w-full">Reply</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
`);
fs.writeFileSync('src/app/(dashboard)/policy-lab/page.tsx', `
import { PolicyLabLayout } from "@/features/policy/components/PolicyLabLayout";
export default function PolicyLabPage() { return <PolicyLabLayout />; }
`);

// Scaffold Meeting Center
ensureDir('src/features/meetings/components');
fs.writeFileSync('src/features/meetings/components/MeetingCenterLayout.tsx', `
"use client";
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Users, FileText, PlayCircle } from 'lucide-react';

export function MeetingCenterLayout() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Meeting Center</h2>
        <Button><Video className="w-4 h-4 mr-2" /> New Meeting</Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 flex items-center gap-6">
              <div className="w-48 h-32 bg-muted rounded-lg flex items-center justify-center border">
                <Video className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-destructive/10 text-destructive border-transparent">LIVE NOW</div>
                <h3 className="text-xl font-bold">National Executive Committee</h3>
                <p className="text-sm text-muted-foreground">Monthly sync for all state heads and executives.</p>
                <div className="flex items-center gap-4 text-sm font-medium mt-2">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 42</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 10:00 AM - 12:00 PM</span>
                </div>
              </div>
              <Button size="lg" className="rounded-full">Join</Button>
            </CardContent>
          </Card>
          
          <h3 className="text-xl font-bold mt-8">Upcoming Schedule</h3>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <Card key={i}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex flex-col items-center justify-center font-bold">
                      <span className="text-xs uppercase leading-none">Oct</span>
                      <span className="text-lg leading-none mt-1">{12+i}</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Regional Coordination Call {i}</h4>
                      <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Agenda</Button>
                    <Button variant="secondary" size="sm">RSVP</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <div className="p-4 border-b font-semibold flex items-center justify-between">
              Calendar <Calendar className="w-4 h-4" />
            </div>
            <div className="p-4 h-64 flex items-center justify-center bg-muted/10 text-muted-foreground">
              [Mini Calendar Component Placeholder]
            </div>
          </Card>
          <Card>
            <div className="p-4 border-b font-semibold flex items-center justify-between">
              Recent Recordings <PlayCircle className="w-4 h-4" />
            </div>
            <div className="p-4 space-y-4">
              {[1,2].map(i => (
                <div key={i} className="flex gap-3 items-center group cursor-pointer">
                  <div className="w-16 h-10 bg-muted rounded border flex items-center justify-center group-hover:border-primary transition-colors">
                    <PlayCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Monthly Sync Oct</p>
                    <p className="text-xs text-muted-foreground">1 hr 12 mins</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
`);
fs.writeFileSync('src/app/(dashboard)/meetings/page.tsx', `
import { MeetingCenterLayout } from "@/features/meetings/components/MeetingCenterLayout";
export default function MeetingsPage() { return <MeetingCenterLayout />; }
`);

console.log('Advanced modules scaffolded successfully.');
