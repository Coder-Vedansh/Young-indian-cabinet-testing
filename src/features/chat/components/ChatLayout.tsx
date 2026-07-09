
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
          YOUNG INDIAN CABINET Server
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
