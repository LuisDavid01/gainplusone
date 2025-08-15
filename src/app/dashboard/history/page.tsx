"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Dumbbell, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

interface WorkoutHistory {
  id: string
  routineName: string
  startTime: Date
  totalDuration: number
  exercises: any[]
  completedExercises: number
}

export default function WorkoutHistoryPage() {
  const [workouts, setWorkouts] = useState<WorkoutHistory[]>([])
  const router = useRouter()

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("wellnessfit_workouts") ?? "[]")
    setWorkouts(savedWorkouts.map((w: any) => ({ ...w, startTime: new Date(w.startTime) })))
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const totalWorkouts = workouts.length
  const totalTime = workouts.reduce((sum, workout) => sum + workout.totalDuration, 0)
  const avgDuration = totalWorkouts > 0 ? Math.round(totalTime / totalWorkouts / 60) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/dashboard")} className="text-gray-600">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver al Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-serif">Historial de Entrenamientos</h1>
                <p className="text-sm text-gray-600">Revisa tu progreso y entrenamientos anteriores</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Entrenamientos</p>
                  <p className="text-2xl font-bold text-gray-900 font-serif">{totalWorkouts}</p>
                </div>
                <Dumbbell className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tiempo Total</p>
                  <p className="text-2xl font-bold text-gray-900 font-serif">{Math.round(totalTime / 60)} min</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Duración Promedio</p>
                  <p className="text-2xl font-bold text-gray-900 font-serif">{avgDuration} min</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workout History */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 font-serif">Entrenamientos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            {workouts.length === 0 ? (
              <div className="text-center py-12">
                <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay entrenamientos registrados</h3>
                <p className="text-gray-600 mb-4">Comienza tu primer entrenamiento para ver tu historial aquí</p>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Ir al Dashboard
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {workouts
                  .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
                  .map((workout) => (
                    <div
                      key={workout.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Dumbbell className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{workout.routineName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(workout.startTime)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{formatTime(workout.totalDuration)}</span>
                            </div>
                            <span>{workout.exercises.length} ejercicios</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Completado
                        </Badge>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
