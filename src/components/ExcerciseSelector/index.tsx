"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Label } from "~/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Search, Plus, Minus, Dumbbell } from "lucide-react"
import type { Exercise, RoutineData } from "~/app/dashboard/routines/create/page"


interface ExerciseSelectorProps {
  routineData: RoutineData
  setRoutineData: (data: RoutineData) => void
}

// Mock exercise library
const exerciseLibrary: Exercise[] = [
  {
    id: "1",
    name: "Press de Banca",
    category: "Fuerza",
    muscleGroups: ["Pecho", "Tríceps", "Hombros"],
    equipment: "Barra",
    difficulty: "Intermedio",
    instructions: "Acuéstate en el banco, agarra la barra con las manos separadas...",
  },
  {
    id: "2",
    name: "Sentadillas",
    category: "Fuerza",
    muscleGroups: ["Cuádriceps", "Glúteos", "Core"],
    equipment: "Peso corporal",
    difficulty: "Principiante",
    instructions: "De pie con los pies separados al ancho de los hombros...",
  },
  {
    id: "3",
    name: "Dominadas",
    category: "Fuerza",
    muscleGroups: ["Espalda", "Bíceps"],
    equipment: "Barra de dominadas",
    difficulty: "Avanzado",
    instructions: "Cuelga de la barra con las palmas hacia adelante...",
  },
  {
    id: "4",
    name: "Burpees",
    category: "Cardio",
    muscleGroups: ["Todo el cuerpo"],
    equipment: "Peso corporal",
    difficulty: "Intermedio",
    instructions: "Comienza de pie, baja a posición de plancha...",
  },
  {
    id: "5",
    name: "Plancha",
    category: "Core",
    muscleGroups: ["Core", "Hombros"],
    equipment: "Peso corporal",
    difficulty: "Principiante",
    instructions: "Mantén el cuerpo recto apoyado en antebrazos y pies...",
  },
]

const categories = ["Todos", "Fuerza", "Cardio", "Core", "Flexibilidad"]

export function ExerciseSelector({ routineData, setRoutineData }: ExerciseSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredExercises = exerciseLibrary.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || exercise.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addExercise = (exercise: Exercise) => {
    const exerciseWithDefaults = {
      ...exercise,
      sets: 3,
      reps: 10,
      weight: 0,
    }
    setRoutineData({
      ...routineData,
      exercises: [...routineData.exercises, exerciseWithDefaults],
    })
  }

  const removeExercise = (exerciseId: string) => {
    setRoutineData({
      ...routineData,
      exercises: routineData.exercises.filter((ex) => ex.id !== exerciseId),
    })
  }

  const updateExercise = (exerciseId: string, field: string, value: number) => {
    setRoutineData({
      ...routineData,
      exercises: routineData.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, [field]: value } : ex)),
    })
  }

  const isExerciseAdded = (exerciseId: string) => {
    return routineData.exercises.some((ex) => ex.id === exerciseId)
  }

  return (
    <div className="space-y-6">
      {/* Selected Exercises */}
      {routineData.exercises.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold  ">
              Ejercicios Seleccionados ({routineData.exercises.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {routineData.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-semibold ">{exercise.name}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Label className="text-xs text-muted-foreground">Series:</Label>
                      <Input
                        type="number"
                        value={exercise.sets ?? 3}
                        onChange={(e) => updateExercise(exercise.id, "sets", Number.parseInt(e.target.value))}
                        className="w-16 h-8 text-sm"
                        min="1"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label className="text-xs text-muted-foreground">Reps:</Label>
                      <Input
                        type="number"
                        value={exercise.reps ?? 10}
                        onChange={(e) => updateExercise(exercise.id, "reps", Number.parseInt(e.target.value))}
                        className="w-16 h-8 text-sm"
                        min="1"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label className="text-xs text-muted-foreground">Peso (kg):</Label>
                      <Input
                        type="number"
                        value={exercise.weight ?? 0}
                        onChange={(e) => updateExercise(exercise.id, "weight", Number.parseInt(e.target.value))}
                        className="w-20 h-8 text-sm"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeExercise(exercise.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Exercise Library */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold  ">Biblioteca de Ejercicios</CardTitle>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  h-4 w-4" />
              <Input
                placeholder="Buscar ejercicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={selectedCategory} className="mt-6">
              <div className="grid gap-4">
                {filteredExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg "
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Dumbbell className="h-5 w-5 text-orange-600" />
                        <h4 className="font-semibold ">{exercise.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Músculos: {exercise.muscleGroups.join(", ")}</span>
                        <span>•</span>
                        <span>Equipo: {exercise.equipment}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => addExercise(exercise)}
                      disabled={isExerciseAdded(exercise.id)}
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      {isExerciseAdded(exercise.id) ? "Agregado" : <Plus className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
