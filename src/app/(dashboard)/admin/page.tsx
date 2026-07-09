import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="w-full flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Administration</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Administration Module</CardTitle>
          <CardDescription>This is a placeholder for the Administration module.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">The content for this module is currently under development.</p>
        </CardContent>
      </Card>
    </div>
  );
}
