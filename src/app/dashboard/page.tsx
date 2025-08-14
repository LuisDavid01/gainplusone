
import { DashboardHeader } from "~/components/DashboardHeader"
import { ProgressOverview } from "~/components/ProgressOverview"
import { QuickActions } from "~/components/QuickActions"
import { RecentRoutines } from "~/components/RecentRoutines"
import { StatsCards } from "~/components/StatCards"
import { currentUser } from "@clerk/nextjs/server"
export default async function DashboardPage() {
  const user = await currentUser()
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-gray-900 ">¡Hola, {user?.firstName}!</h1>
              <p className="text-sm text-gray-600">Listo para entrenar hoy</p>
            </div>
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Cards */}
          <StatsCards />

          {/* Main Content Grid */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Recent Routines */}
            <div className="lg:col-span-2">
              <RecentRoutines />
            </div>

            {/* Right Column - Quick Actions & Progress */}
            <div className="space-y-8">
              <QuickActions />
              <ProgressOverview />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}