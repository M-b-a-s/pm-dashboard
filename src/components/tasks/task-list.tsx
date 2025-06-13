'use client'

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

type Task = {
  id: string
  title: string
  completed: boolean
  project?: string
}

const mockTasks: Task[] = [
  { id: "1", title: "Send invoice to Figma", completed: false, project: "New UI" },
  { id: "2", title: "Fix mobile nav bug", completed: true, project: "Landing Page" },
  { id: "3", title: "Client feedback call", completed: false },
]

export function TaskList() {
  const [tasks, setTasks] = useState(mockTasks)

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">My Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="flex items-start gap-3">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <div className="flex flex-col text-sm">
              <span
                className={task.completed ? "line-through text-muted-foreground" : ""}
              >
                {task.title}
              </span>
              {task.project && (
                <Badge variant="secondary" className="mt-1 w-fit text-xs">
                  {task.project}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
