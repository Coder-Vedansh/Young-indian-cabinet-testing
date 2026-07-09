import fs from 'fs';
import path from 'path';

const pages = [
  { path: 'src/app/(auth)/login/page.tsx', title: 'Login' },
  { path: 'src/app/(auth)/signup/page.tsx', title: 'Signup' },
  { path: 'src/app/(auth)/forgot-password/page.tsx', title: 'Forgot Password' },
  { path: 'src/app/(auth)/reset-password/page.tsx', title: 'Reset Password' },
  { path: 'src/app/(dashboard)/dashboard/page.tsx', title: 'Dashboard Overview' },
  { path: 'src/app/(dashboard)/members/page.tsx', title: 'Members Directory' },
  { path: 'src/app/(dashboard)/members/[id]/page.tsx', title: 'Member Profile' },
  { path: 'src/app/(dashboard)/committees/page.tsx', title: 'Committees' },
  { path: 'src/app/(dashboard)/state-chapters/page.tsx', title: 'State Chapters' },
  { path: 'src/app/(dashboard)/meetings/page.tsx', title: 'Meetings' },
  { path: 'src/app/(dashboard)/chat/page.tsx', title: 'Chat & Communication' },
  { path: 'src/app/(dashboard)/policy-lab/page.tsx', title: 'Policy Lab' },
  { path: 'src/app/(dashboard)/voting/page.tsx', title: 'Voting & Elections' },
  { path: 'src/app/(dashboard)/learning-hub/page.tsx', title: 'Learning Hub' },
  { path: 'src/app/(dashboard)/events/page.tsx', title: 'Events' },
  { path: 'src/app/(dashboard)/recognition/page.tsx', title: 'Recognition & Awards' },
  { path: 'src/app/(dashboard)/analytics/page.tsx', title: 'Analytics' },
  { path: 'src/app/(dashboard)/admin/page.tsx', title: 'Administration' },
  { path: 'src/app/(dashboard)/settings/page.tsx', title: 'Settings' },
];

pages.forEach((page) => {
  const content = `import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="w-full flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">${page.title}</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>${page.title} Module</CardTitle>
          <CardDescription>This is a placeholder for the ${page.title} module.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">The content for this module is currently under development.</p>
        </CardContent>
      </Card>
    </div>
  );
}
`;
  fs.writeFileSync(path.resolve(page.path), content);
});

console.log('Placeholders generated successfully.');
