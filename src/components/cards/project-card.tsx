import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays } from "lucide-react"

type ProjectCardProps = {
  title: string
  client: string
  dueDate: string
  progress: number
  priority: "HIGH" | "MEDIUM" | "LOW"
  team: { name: string; avatarUrl?: string }[]
}

export function ProjectCard({
  title,
  client,
  dueDate,
  progress,
  priority,
  team,
}: ProjectCardProps) {
  const badgeColor = {
    HIGH: "destructive",
    MEDIUM: "warning",
    LOW: "secondary",
  }[priority]

  return (
    <div className="bg-muted border rounded-2xl shadow-sm p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="font-semibold text-base">{title}</h3>
          <p className="text-xs text-muted-foreground">{client}</p>
        </div>
        <Badge variant={badgeColor as any}>{priority}</Badge>
      </div>

      <div className="space-y-2">
        <Progress value={progress} />
        <div className="text-xs text-muted-foreground">{progress}% completed</div>
      </div>

      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex -space-x-2">
          {team.map((member, index) => (
            <Avatar key={index} className="w-7 h-7 border">
              <AvatarImage src={member.avatarUrl} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
          ))}
        </div>

        <div className="flex items-center gap-1 text-xs">
          <CalendarDays className="w-4 h-4" />
          <span>{dueDate}</span>
        </div>
      </div>
    </div>
  )
}
