'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { Home, Folder, CheckSquare, CalendarDays, Clock, BarChart2, Settings } from "lucide-react"

const navItems = [
	{ label: "Dashboard", href: "/dashboard", icon: Home },
	{ label: "Projects", href: "/projects", icon: Folder },
	{ label: "My Tasks", href: "/tasks", icon: CheckSquare },
	{ label: "Calendar", href: "/calendar", icon: CalendarDays },
	{ label: "Time Mgt", href: "/time", icon: Clock },
	{ label: "Reports", href: "/reports", icon: BarChart2 },
	{ label: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
	const pathname = usePathname()

	return (
		<aside className="w-[240px] h-screen border-r bg-background p-4 pr-0 flex flex-col gap-4">
			<div className="font-bold text-xl mb-6">Dashboard</div>
			<nav className="space-y-2">
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={clsx(
							"flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition p-2 hover:bg-muted border-r-4 border-transparent hover:border-primary",
							pathname === item.href && "active"
						)}
					>
						<item.icon className="w-5 h-5" />
						{item.label}
					</Link>
				))}
			</nav>
		</aside>
	)
}
