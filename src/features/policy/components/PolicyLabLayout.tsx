
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
            <p>The YOUNG INDIAN CABINET recognizes the critical need for...</p>
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
