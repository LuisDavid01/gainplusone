import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Clock, Users, Play } from "lucide-react"

const routines = [
  {
    id: 1,
    name: "Rutina de Fuerza - Tren Superior",
    duration: "45 min",
    exercises: 8,
    difficulty: "Intermedio",
    lastCompleted: "Hace 2 días",
    category: "Fuerza",
  },
  {
    id: 2,
    name: "Cardio HIIT Intenso",
    duration: "30 min",
    exercises: 6,
    difficulty: "Avanzado",
    lastCompleted: "Ayer",
    category: "Cardio",
  },
  {
    id: 3,
    name: "Yoga y Flexibilidad",
    duration: "60 min",
    exercises: 12,
    difficulty: "Principiante",
    lastCompleted: "Hace 3 días",
    category: "Flexibilidad",
  },
]

const difficultyColors = {
  Principiante: "bg-green-100 text-green-800",
  Intermedio: "bg-yellow-100 text-yellow-800",
  Avanzado: "bg-red-100 text-red-800",
}

export function RecentRoutines() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-gray-900 ">Rutinas Recientes</CardTitle>
        <Button variant="outline" size="sm">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {routines.map((routine) => (
          <div
            key={routine.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-semibold text-gray-900">{routine.name}</h3>
                <Badge className={`text-xs ${difficultyColors[routine.difficulty as keyof typeof difficultyColors]}`}>
                  {routine.difficulty}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{routine.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{routine.exercises} ejercicios</span>
                </div>
                <span>•</span>
                <span>{routine.lastCompleted}</span>
              </div>
            </div>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
              <Play className="h-4 w-4 mr-1" />
              Iniciar
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}