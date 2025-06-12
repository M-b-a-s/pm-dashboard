import { DashboardShell } from "@/components/layout/dashboard-shell"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>
}
export const metadata = {
  title: "Dashboard",
  description: "Your dashboard for managing projects, tasks, and more.",
}