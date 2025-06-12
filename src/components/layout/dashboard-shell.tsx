import { Sidebar } from "./sidebar"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 md:p-10 bg-muted/50 border-l border-border">
        {children}
      </main>
    </div>
  )
}
