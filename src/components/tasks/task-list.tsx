'use client'

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase/client"

type Task = {
  id: string
  title: string
  completed: boolean
  project?: string
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false })
      if (error) {
        console.error("Error fetching tasks:", error.message)
      } else {
        setTasks(data)
      }
    }

    fetchTasks()
  }, [])

  const toggleTask = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id)

    if (!error) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      )
    }
  }

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
