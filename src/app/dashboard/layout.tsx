import { ThemeProvider } from "@/components/theme-provider";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DashboardShell>{children}</DashboardShell>
    </ThemeProvider>
  );
}
export const metadata = {
  title: "Dashboard",
  description: "Your dashboard for managing projects, tasks, and more.",
};
