'use client'

import Link from "next/link"
import { Home, Users, Network, Grip } from "lucide-react"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export default function Sidebar() {
  const pathname = usePathname()

  const navItem = (path: string) =>
    clsx(
      "p-3 rounded-md flex justify-center transition-colors",
      "text-[#3C3C3C] hover:bg-[#F7F7F7] hover:text-[#343330]",
      pathname === path && "bg-[#F7F7F7] text-[#343330]"
    )

  return (
    <aside className="w-20 h-screen flex flex-col hidden md:flex">
      <div className="w-full bg-[#101010] text-gray-100 py-8 flex justify-center">
        <Grip size={20} />
      </div>
      <div className="flex-1 bg-white pt-6">
        <nav className="flex flex-col gap-4 px-4" aria-label="Main Navigation">
          <Link href="/" className={navItem("/")}>
            <Home size={20} />
          </Link>
          <Link href="/people" className={navItem("/people")}>
            <Users size={20} />
          </Link>
          <Link href="/org-chart" className={navItem("/org-chart")}>
            <Network size={20} />
          </Link>
        </nav>
      </div>
    </aside>
  )
}