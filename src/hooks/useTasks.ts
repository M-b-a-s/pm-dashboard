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
    // Real-time sync
    const channel = supabase
      .channel("tasks-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload) => {
          setTasks((prev) => {
            if (payload.eventType === "INSERT" && payload.new) {
              return [payload.new as Task, ...prev]
            }
            if (payload.eventType === "UPDATE" && payload.new) {
              return prev.map((task) =>
                task.id === (payload.new as Task).id ? (payload.new as Task) : task
              )
            }
            if (payload.eventType === "DELETE" && payload.old) {
              return prev.filter((task) => task.id !== (payload.old as Task).id)
            }
            return prev
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Toggle task completion
  const toggleTask = async (id: string, completed: boolean) => {
    // Update local state immediately for responsiveness
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !completed } : task
      )
    )

    // Update in database
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id)

    if (error) {
      toast.error("Failed to update task: " + error.message)
      // Optionally, revert local state if error
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed } : task
        )
      )
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

  // Delete a task
  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id)
    if (error) {
      toast.error("Failed to delete task: " + error.message)
    } else {
      setTasks((prev) => prev.filter((task) => task.id !== id))
      toast.success("Task deleted")
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
    deleteTask,
  }
}