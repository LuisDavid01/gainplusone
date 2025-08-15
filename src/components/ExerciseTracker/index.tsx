"use client"

import { useState, type ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Badge } from "~/components/ui/badge"
import { CheckCircle, Plus, Minus } from "lucide-react"
import type { Exercise } from "~/app/dashboard/routines/create/page"


interface ExerciseTrackerProps {
  exercise: Exercise & { currentSet: number }
  onComplete: () => void
}

interface SetData {
  reps: number
  weight: number
  completed: boolean
}

export function ExerciseTracker({ exercise, onComplete }: ExerciseTrackerProps) {
  const [sets, setSets] = useState<SetData[]>(
    Array.from({ length: exercise.sets || 3 }, () => ({
      reps: exercise.reps || 10,
      weight: exercise.weight || 0,
      completed: false,
    })),
  )
  const [currentSetIndex, setCurrentSetIndex] = useState(0)

  const updateSet = (index: number, field: keyof SetData, value: number | boolean) => {
    setSets(sets.map((set, i) => (i === index ? { ...set, [field]: value } : set)))
  }

  const completeSet = (index: number) => {
    updateSet(index, "completed", true)
    if (index < sets.length - 1) {
      setCurrentSetIndex(index + 1)
    }
  }

  const completedSets = sets.filter((set) => set.completed).length
  const allSetsCompleted = completedSets === sets.length

  return (
    <Card className=" shadow-sm mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold  font-serif">{exercise.name}</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary">{exercise.difficulty}</Badge>
              <span className="text-sm text-muted-foreground">{exercise.muscleGroups.join(", ")}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">
              {completedSets}/{sets.length}
            </div>
            <div className="text-sm text-muted-foreground">Series completadas</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Instructions */}
        <div className="p-4  rounded-lg">
          <p className="text-sm text-muted-foreground">{exercise.instructions}</p>
        </div>

        {/* Sets Tracking */}
        <div className="space-y-3">
          {sets.map((set, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                set.completed
                  ? " border-green-200"
                  : index === currentSetIndex
                    ? " border-orange-200"
                    : " border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    set.completed
                      ? "bg-green-600 text-white"
                      : index === currentSetIndex
                        ? "bg-orange-600 text-white"
                        : "bg-gray-300 text-black"
                  }`}
                >
                  {set.completed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className="font-medium ">Serie {index + 1}</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Reps:</span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSet(index, "reps", Math.max(1, set.reps - 1))}
                      disabled={set.completed}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Input
                      type="number"
                      value={set.reps}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSet(index, "reps", Number.parseInt(e.target.value) || 0)}
                      disabled={set.completed}
                      className="w-16 h-8 text-center text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSet(index, "reps", set.reps + 1)}
                      disabled={set.completed}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Peso:</span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSet(index, "weight", Math.max(0, set.weight - 2.5))}
                      disabled={set.completed}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Input
                      type="number"
                      value={set.weight}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSet(index, "weight", Number.parseFloat(e.target.value) || 0)}
                      disabled={set.completed}
                      className="w-20 h-8 text-center text-sm"
                      step="2.5"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSet(index, "weight", set.weight + 2.5)}
                      disabled={set.completed}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">kg</span>
                </div>

                {!set.completed && index === currentSetIndex && (
                  <Button
                    onClick={() => completeSet(index)}
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Completar Serie
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Complete Exercise */}
        {allSetsCompleted && (
          <div className="text-center pt-4">
            <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="h-4 w-4 mr-2" />
              Completar Ejercicio
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
