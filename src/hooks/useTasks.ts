import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

export type Task = {
  id: string
  title: string
  completed: boolean
  project?: string
}

export function useTasks() {
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

  return { tasks, toggleTask }
}