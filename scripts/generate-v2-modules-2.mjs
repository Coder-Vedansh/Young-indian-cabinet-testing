import fs from 'fs';
import path from 'path';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Voting System
ensureDir('src/features/voting/components');
fs.writeFileSync('src/features/voting/components/VotingLayout.tsx', `
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
`);
fs.writeFileSync('src/app/(dashboard)/voting/page.tsx', `
import { VotingLayout } from "@/features/voting/components/VotingLayout";
export default function VotingPage() { return <VotingLayout />; }
`);

// Learning Hub
ensureDir('src/features/learning/components');
fs.writeFileSync('src/features/learning/components/LearningLayout.tsx', `
"use client";
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, PlayCircle, BookOpen, Trophy } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

export function LearningLayout() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Learning Hub</h2>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Trophy className="w-5 h-5 text-warning" /> 450 Points
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Public Speaking 101", category: "Communication", progress: 80, img: "bg-blue-100" },
          { title: "Policy Drafting Basics", category: "Governance", progress: 15, img: "bg-green-100" },
          { title: "Community Organizing", category: "Leadership", progress: 0, img: "bg-purple-100" },
        ].map((course, i) => (
          <Card key={i} className="overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow">
            <div className={\`h-32 w-full \${course.img} flex items-center justify-center\`}>
              <PlayCircle className="w-12 h-12 text-black/20" />
            </div>
            <CardContent className="p-4 flex-1">
              <div className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">{course.category}</div>
              <h3 className="font-bold text-lg leading-tight mb-4">{course.title}</h3>
              <div className="space-y-1 mt-auto">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-1.5" />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="secondary" className="w-full text-xs h-8">{course.progress > 0 ? 'Continue' : 'Start Course'}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
`);
fs.writeFileSync('src/app/(dashboard)/learning-hub/page.tsx', `
import { LearningLayout } from "@/features/learning/components/LearningLayout";
export default function LearningPage() { return <LearningLayout />; }
`);

console.log('Remaining advanced modules scaffolded successfully.');
