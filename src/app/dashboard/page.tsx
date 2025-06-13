import { ProjectCard } from "@/components/cards/project-card";
import { Header } from "@/components/layout/header";
import { TaskList } from "@/components/tasks/task-list";
import { CalendarWidget } from "@/components/widgets/calendar";
import { MessagesWidget } from "@/components/widgets/messages";

export default function DashboardPage() {
  return (
    <main className="w-full h-full min-h-screen overflow-hidden">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full w-full items-stretch">
        <div className="col-span-1 space-y-4 h-full flex flex-col">
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
        <div className="h-full flex flex-col">
          <TaskList />
        </div>
        <div className="col-span-1 h-full flex flex-col gap-4">
          <div className="flex-1 min-h-0">
            <CalendarWidget />
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            <MessagesWidget />
          </div>
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Dashboard",
  description: "Your dashboard for managing projects, tasks, and more.",
};
