
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
