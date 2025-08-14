import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"
import { Clock, Target, Dumbbell, BarChart3 } from "lucide-react"
import type { RoutineData } from "~/app/dashboard/routines/create/page"


interface RoutineReviewProps {
  routineData: RoutineData
  setRoutineData: (data: RoutineData) => void
}

export function RoutineReview({ routineData }: RoutineReviewProps) {
  const totalExercises = routineData.exercises.length
  const totalSets = routineData.exercises.reduce((sum, exercise) => sum + (exercise.sets ?? 0), 0)

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 ">Revisar Rutina</CardTitle>
        <p className="text-gray-600">Verifica todos los detalles antes de guardar tu rutina</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información General</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Target className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Nombre</p>
                <p className="font-medium">{routineData.name ?? "Sin nombre"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Objetivo</p>
                <p className="font-medium">{routineData.goal ?? "No especificado"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Duración</p>
                <p className="font-medium">{routineData.duration} minutos</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Dumbbell className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Dificultad</p>
                <Badge variant="secondary">{routineData.difficulty}</Badge>
              </div>
            </div>
          </div>
          {routineData.description && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Descripción</p>
              <p className="text-gray-900">{routineData.description}</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Exercise Summary */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumen de Ejercicios ({totalExercises} ejercicios, {totalSets} series totales)
          </h3>
          <div className="space-y-3">
            {routineData.exercises.map((exercise, index) => (
              <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-orange-600 text-white rounded-full text-sm font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{exercise.name}</p>
                    <p className="text-sm text-gray-600">
                      {exercise.muscleGroups.join(", ")} • {exercise.equipment}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {exercise.sets} x {exercise.reps}
                  </p>
                  {exercise.weight && exercise.weight > 0 && (
                    <p className="text-sm text-gray-600">{exercise.weight} kg</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {routineData.exercises.length === 0 && (
          <div className="text-center py-8">
            <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No has agregado ejercicios a tu rutina</p>
            <p className="text-sm text-gray-500">Vuelve al paso anterior para agregar ejercicios</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
