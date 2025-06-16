import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { toast } from "sonner"

export type Task = {
  id: string
  title: string
  completed: boolean
  project?: string
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [open, setOpen] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newProject, setNewProject] = useState("")

  // Fetch tasks
  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) {
      toast.error("Error fetching tasks: " + error.message)
    } else {
      setTasks(data)
    }
  }

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Toggle task completion
  const toggleTask = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id)

    if (error) {
      toast.error("Failed to update task: " + error.message)
    } else {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      )
      toast.success("Task updated")
    }
  }

  // Create a new task
  const handleCreateTask = async () => {
    if (!newTaskTitle.trim()) {
      toast.error("Task title cannot be empty")
      return
    }

    const { error } = await supabase.from("tasks").insert({
      title: newTaskTitle,
      project: newProject || null,
    })

    if (error) {
      toast.error("Failed to create task: " + error.message)
    } else {
      toast.success("Task created")
      setNewTaskTitle("")
      setNewProject("")
      setOpen(false)
      fetchTasks()
    }
  }

  return {
    tasks,
    open,
    setOpen,
    newTaskTitle,
    setNewTaskTitle,
    newProject,
    setNewProject,
    handleCreateTask,
    toggleTask,
    fetchTasks,
  }
}