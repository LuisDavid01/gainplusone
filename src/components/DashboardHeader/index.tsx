



import { UserButton } from "@clerk/nextjs"

import { Bell, Settings, LogOut, Dumbbell } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import ThemeToggle from "../ThemeToogle"


export  function  DashboardHeader() {
   

 

  return (
    <header className="bg-background shadow-sm border-b border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Welcome */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
               <Link href={"/"} className="inline-flex items-center space-x-2">
                <Dumbbell className="h-8 w-8 text-primary flex-shrink-0" />
                <span className="font-bold text-lg md:text-2xl ">GainOne+</span>
                </Link>
            </div>
            
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="">
              <Bell className="h-5 w-5" />
            </Button>
            <UserButton/>
            <ThemeToggle/>
          </div>
        </div>
      </div>
    </header>
  )
}