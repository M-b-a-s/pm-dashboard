'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useTasks } from "@/hooks/useTasks"

export function TaskList() {
  const { tasks, toggleTask } = useTasks()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          My Tasks
          <span className="text-xs text-muted-foreground">({tasks.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task, idx) => (
          <div key={task.id} className="flex items-start gap-3">
            <span className="text-xs text-muted-foreground mt-1">{idx + 1}.</span>
            <div className="flex flex-1 items-center gap-2">
              <span
                className={
                  "text-sm " +
                  (task.completed ? "line-through text-muted-foreground" : "")
                }
              >
                {task.title}
              </span>
              {task.project && (
                <Badge variant="secondary" className="ml-2 w-fit text-xs">
                  {task.project}
                </Badge>
              )}
            </div>
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id, task.completed)}
              className="ml-2 mt-1"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
