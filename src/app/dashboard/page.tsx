import { ProjectCard } from "@/components/cards/project-card";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarWidget } from "@/components/widgets/calendar";
import { MessagesWidget } from "@/components/widgets/messages";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="col-span-1 space-y-4">
              <ProjectCard
                title="Redesign Landing Page"
                client="Slack"
                dueDate="2025-06-25"
                progress={72}
                priority="HIGH"
                team={[{ name: "Ada", avatarUrl: "" }, { name: "Kunle" }]}
              />
              <ProjectCard
                title="New Dashboard UI"
                client="Figma"
                dueDate="2025-07-01"
                progress={45}
                priority="MEDIUM"
                team={[{ name: "Bola", avatarUrl: "" }, { name: "Ife" }]}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>{/* Project cards content */}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>📋 My Tasks</CardTitle>
        </CardHeader>
        <CardContent>{/* My tasks content */}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="col-span-1 space-y-4">
              <CalendarWidget />
              <MessagesWidget />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>{/* Calendar and messages content */}</CardContent>
      </Card>
    </div>
  );
}

export const metadata = {
  title: "Dashboard",
  description: "Your dashboard for managing projects, tasks, and more.",
};
