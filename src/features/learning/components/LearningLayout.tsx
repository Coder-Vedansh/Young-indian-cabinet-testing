
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
            <div className={`h-32 w-full ${course.img} flex items-center justify-center`}>
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
