"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Search, Eye, MoreHorizontal, Filter } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Application {
  id: string;
  applicationNo: string;
  fullName: string;
  state: string;
  status: string;
  createdAt: string;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // In a real scenario, this fetches from /api/applications with credentials
  useEffect(() => {
    // Mocking the fetch for demonstration since backend is not connected yet in this exact session
    setApplications([
      { id: "1", applicationNo: "YA-2026-14920", fullName: "Vedansh Singhal", state: "Delhi", status: "PENDING", createdAt: "2026-07-08T10:00:00Z" },
      { id: "2", applicationNo: "YA-2026-88123", fullName: "Rahul Kumar", state: "Maharashtra", status: "APPROVED", createdAt: "2026-07-07T12:30:00Z" },
      { id: "3", applicationNo: "YA-2026-33912", fullName: "Priya Sharma", state: "Karnataka", status: "PENDING", createdAt: "2026-07-08T14:15:00Z" },
    ]);
    setLoading(false);
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    // For MVP frontend demo, update locally
    setApplications(apps => apps.map(app => app.id === id ? { ...app, status: newStatus } : app));
    // Real API call:
    // await fetch(`http://localhost:4000/api/applications/${id}/status`, { method: "PATCH", body: JSON.stringify({ status: newStatus }) })
  };

  const filteredApps = applications.filter(app => 
    app.fullName.toLowerCase().includes(search.toLowerCase()) || 
    app.applicationNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Application Management</h2>
      </div>
      
      <div className="flex items-center justify-between mb-4 mt-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applicants..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Review and approve new member registrations for the Youth Assembly.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">App No.</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Applicant Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">State</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date Submitted</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium">{app.applicationNo}</td>
                    <td className="p-4 align-middle">{app.fullName}</td>
                    <td className="p-4 align-middle">{app.state}</td>
                    <td className="p-4 align-middle">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 align-middle">
                      <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        app.status === 'APPROVED' ? 'bg-green-100 text-green-800 border-green-200' :
                        app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {app.status}
                      </div>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View Full Application</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {app.status === 'PENDING' && (
                            <>
                              <DropdownMenuItem className="text-green-600" onClick={() => handleStatusChange(app.id, 'APPROVED')}>
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Approve & Assign ID
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => handleStatusChange(app.id, 'REJECTED')}>
                                <XCircle className="mr-2 h-4 w-4" /> Reject
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
