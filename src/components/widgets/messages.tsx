import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: string
  from: string
  content: string
  avatarUrl?: string
}

const mockMessages: Message[] = [
  {
    id: "1",
    from: "Tolu",
    content: "Hey! Can we discuss the new feature this week?",
    avatarUrl: "/avatars/tolu.png",
  },
  {
    id: "2",
    from: "Uche",
    content: "Payment has been made, thanks!",
  },
  {
    id: "3",
    from: "Uch",
    content: "Payment has been made, thanks!",
  },
  // Add more messages here to test scrolling
]

export function MessagesWidget() {
  return (
    <Card className="w-full max-w-[300px] h-[200px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Messages</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4">
        {mockMessages.map((msg) => (
          <div key={msg.id} className="flex gap-3 items-start">
            <Avatar className="w-8 h-8">
              <AvatarImage src={msg.avatarUrl} />
              <AvatarFallback>{msg.from[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{msg.from}</p>
              <p className="text-muted-foreground text-xs">{msg.content}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
