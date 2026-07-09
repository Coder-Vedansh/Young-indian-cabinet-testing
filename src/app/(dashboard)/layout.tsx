import { DashboardLayout } from "@/layouts/DashboardLayout";
import { RoleGuard } from "@/layouts/guards/RoleGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </RoleGuard>
  );
}
