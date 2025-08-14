"use client"

import { Button } from "~/components/ui/button"
import { ArrowLeft, Play, Pause, Square } from "lucide-react"
import { useRouter } from "next/navigation"

interface WorkoutHeaderProps {
  routineName: string
  elapsedTime: string
  isTimerRunning: boolean
  onToggleTimer: () => void
  onFinishWorkout: () => void
}

export function WorkoutHeader({
  routineName,
  elapsedTime,
  isTimerRunning,
  onToggleTimer,
  onFinishWorkout,
}: WorkoutHeaderProps) {
  const router = useRouter()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push("/dashboard")} className="text-gray-600">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Salir
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 font-serif">{routineName}</h1>
              <p className="text-sm text-gray-600">Entrenamiento en progreso</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 font-mono">{elapsedTime}</div>
              <div className="text-xs text-gray-600">Tiempo transcurrido</div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={onToggleTimer} className="bg-transparent">
                {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onFinishWorkout}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                <Square className="h-4 w-4 mr-1" />
                Finalizar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
