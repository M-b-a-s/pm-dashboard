import { useData } from "./useData"
import { supabase } from "@/lib/supabase/client"

export type Task = {
  id: string
  title: string
  completed: boolean
  project?: string
}

export function useTasks() {
  const { data: tasks, loading, error, setData } = useData<Task>("tasks", { orderBy: "created_at", ascending: false })

  const toggleTask = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id)

    if (!error) {
      setData((prev: Task[]) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      )
    }
  }

  return { tasks, loading, error, toggleTask }
}