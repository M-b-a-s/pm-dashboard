import { Sidebar } from "./sidebar"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 p-5  bg-muted/50 border-l border-border h-full overflow-hidden">
        {children}
      </main>
    </div>
  )
}
