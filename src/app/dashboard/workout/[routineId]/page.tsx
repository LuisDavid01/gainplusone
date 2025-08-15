"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { CheckCircle } from "lucide-react"
import type { Exercise } from "../../routines/create/page"
import { WorkoutHeader } from "~/components/WorkoutHeader"
import { ExerciseTracker } from "~/components/ExerciseTracker"
import { DashboardHeader } from "~/components/DashboardHeader"


interface WorkoutSession {
  id: string
  routineName: string
  startTime: Date
  exercises: (Exercise & { completed: boolean; currentSet: number })[]
  isActive: boolean
  totalDuration: number
}

// Mock routine data
const mockRoutine = {
  id: "1",
  name: "Rutina de Fuerza - Tren Superior",
  exercises: [
    {
      id: "1",
      name: "Press de Banca",
      category: "Fuerza",
      muscleGroups: ["Pecho", "Tríceps"],
      equipment: "Barra",
      difficulty: "Intermedio" as const,
      instructions: "Acuéstate en el banco, agarra la barra...",
      sets: 4,
      reps: 8,
      weight: 60,
    },
    {
      id: "2",
      name: "Remo con Barra",
      category: "Fuerza",
      muscleGroups: ["Espalda", "Bíceps"],
      equipment: "Barra",
      difficulty: "Intermedio" as const,
      instructions: "Inclínate hacia adelante, mantén la espalda recta...",
      sets: 4,
      reps: 10,
      weight: 50,
    },
    {
      id: "3",
      name: "Press Militar",
      category: "Fuerza",
      muscleGroups: ["Hombros", "Tríceps"],
      equipment: "Barra",
      difficulty: "Avanzado" as const,
      instructions: "De pie, presiona la barra desde los hombros...",
      sets: 3,
      reps: 6,
      weight: 40,
    },
  ],
}

export default function WorkoutPage() {
  const params = useParams()
  const router = useRouter()
  const [workoutSession, setWorkoutSession] = useState<WorkoutSession | null>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    // Initialize workout session
    const session: WorkoutSession = {
      id: Date.now().toString(),
      routineName: mockRoutine.name,
      startTime: new Date(),
      exercises: mockRoutine.exercises.map((ex) => ({
        ...ex,
        completed: false,
        currentSet: 1,
      })),
      isActive: true,
      totalDuration: 0,
    }
    setWorkoutSession(session)
    setIsTimerRunning(true)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const completeExercise = (exerciseId: string) => {
    if (!workoutSession) return

    setWorkoutSession({
      ...workoutSession,
      exercises: workoutSession.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, completed: true } : ex)),
    })

    // Move to next exercise
    if (currentExerciseIndex < workoutSession.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    }
  }

  const finishWorkout = () => {
    if (!workoutSession) return

    const completedWorkout = {
      ...workoutSession,
      isActive: false,
      totalDuration: elapsedTime,
    }

    // Save workout to localStorage (in real app, save to database)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const savedWorkouts = JSON.parse(localStorage.getItem("wellnessfit_workouts") ?? "[]")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    savedWorkouts.push(completedWorkout)
    localStorage.setItem("wellnessfit_workouts", JSON.stringify(savedWorkouts))

    setIsTimerRunning(false)
    router.push("/workout/summary")
  }

  if (!workoutSession) {
    return <div>Cargando...</div>
  }

  const currentExercise = workoutSession.exercises[currentExerciseIndex]
  const completedExercises = workoutSession.exercises.filter((ex) => ex.completed).length
  const progress = (completedExercises / workoutSession.exercises.length) * 100

  return (
    <div className="min-h-screen">
      <DashboardHeader/>
      <WorkoutHeader
        routineName={workoutSession.routineName}
        elapsedTime={formatTime(elapsedTime)}
        isTimerRunning={isTimerRunning}
        onToggleTimer={() => setIsTimerRunning(!isTimerRunning)}
        onFinishWorkout={finishWorkout}
      />

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Progress */}
        <Card className=" shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold ">Progreso del Entrenamiento</h2>
              <span className="text-sm text-muted-foreground">
                {completedExercises} de {workoutSession.exercises.length} ejercicios
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Current Exercise */}
        {currentExercise && !currentExercise.completed && (
          <ExerciseTracker exercise={currentExercise} onComplete={() => completeExercise(currentExercise.id)} />
        )}

        {/* Exercise List */}
        <Card className=" shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold  mb-4">Lista de Ejercicios</h3>
            <div className="space-y-3">
              {workoutSession.exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className={`flex items-center justify-between  p-4 rounded-lg border ${
                    exercise.completed
                      ? " border-green-200"
                      : index === currentExerciseIndex
                        ? " border-orange-200"
                        : " border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        exercise.completed
                          ? "bg-green-600 "
                          : index === currentExerciseIndex
                            ? "bg-orange-600 "
                            : " text-muted-foreground"
                      }`}
                    >
                      {exercise.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium ">{exercise.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {exercise.sets} series × {exercise.reps} reps
                        {exercise.weight && exercise.weight > 0 && ` × ${exercise.weight}kg`}
                      </p>
                    </div>
                  </div>
                  {index === currentExerciseIndex && !exercise.completed && (
                    <Button
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700 "
                      onClick={() => completeExercise(exercise.id)}
                    >
                      Completar
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Finish Workout */}
        {completedExercises === workoutSession.exercises.length && (
          <Card className="bg-green-50 border-green-200 mt-6">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">¡Entrenamiento Completado!</h3>
              <p className="text-green-700 mb-4">Has completado todos los ejercicios en {formatTime(elapsedTime)}</p>
              <Button onClick={finishWorkout} className="bg-green-600 hover:bg-green-700 ">
                Finalizar y Guardar
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
