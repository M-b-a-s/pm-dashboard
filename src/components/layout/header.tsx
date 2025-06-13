import { Input } from "@/components/ui/input"
import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <header className="w-full flex items-center justify-between p-2 bg-background border-b border-border rounded-xl">
      {/* Search bar */}
      <div className="flex-1 max-w-md">
        <Input type="search" placeholder="Search..." className="w-full" />
      </div>
      {/* User profile image */}
      <div className="ml-4 flex items-center gap-4 ">
        <ModeToggle />  
        <img
          src="/profile-placeholder.png"
          alt="User profile"
          className="w-10 h-10 rounded-full object-cover border"
        />
        {/* You can add sign in/out logic or a dropdown here */}
      </div>
    </header>
  )
}