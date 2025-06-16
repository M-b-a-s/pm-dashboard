'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTasks } from "@/hooks/useTasks" // <-- Move logic to a hook for purity

export function TaskList() {
  const {
    tasks,
    open,
    setOpen,
    newTaskTitle,
    setNewTaskTitle,
    newProject,
    setNewProject,
    handleCreateTask,
    toggleTask,
  } = useTasks() // <-- Custom hook handles all logic

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          My Tasks
          <span className="text-xs text-muted-foreground">({tasks.length})</span>
        </CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="space-y-1">
                <Label htmlFor="task">Task Title</Label>
                <Input
                  id="task"
                  placeholder="Enter task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="project">Project (optional)</Label>
                <Input
                  id="project"
                  placeholder="E.g. Redesign"
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateTask}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="space-y-4">
        {tasks.map((task, idx) => (
          <div key={task.id} className="flex items-start gap-3">
            <span className="text-xs text-muted-foreground mt-1">{idx + 1}.</span>
            <div className="flex flex-1 items-center gap-2">
              <span className={task.completed ? "line-through text-muted-foreground" : ""}>
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
