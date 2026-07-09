
"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Vote, CheckCircle2, AlertCircle, BarChart3 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

export function VotingLayout() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Voting System</h2>
        <Button variant="outline"><BarChart3 className="w-4 h-4 mr-2" /> View Analytics</Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-primary/50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-destructive"></span> Active Poll: Digital Literacy Fund
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">Should we allocate 15% of the annual budget to the new rural digital literacy program?</p>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start h-12 text-left hover:border-primary">
                <CheckCircle2 className="mr-4 w-5 h-5 text-muted-foreground" /> Yes, allocate funds
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 text-left hover:border-primary">
                <AlertCircle className="mr-4 w-5 h-5 text-muted-foreground" /> No, keep reserve
              </Button>
            </div>
            <Button className="w-full">Cast Vote Securely</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Results: Committee Elections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Candidate A</span>
                <span>65% (120 votes)</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Candidate B</span>
                <span>35% (65 votes)</span>
              </div>
              <Progress value={35} className="h-2 bg-muted/50" />
            </div>
            <div className="p-3 bg-muted/20 rounded-md text-xs text-center text-muted-foreground">
              Verified on Blockchain Network
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
