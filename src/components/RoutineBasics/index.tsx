"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Slider } from "~/components/ui/slider"
import type { RoutineData } from "~/app/dashboard/routines/create/page" 

interface RoutineBasicsProps {
  routineData: RoutineData
  setRoutineData: (data: RoutineData) => void
}

const goals = [
  "Pérdida de peso",
  "Ganancia muscular",
  "Fuerza",
  "Resistencia",
  "Flexibilidad",
  "Acondicionamiento general",
]

export function RoutineBasics({ routineData, setRoutineData }: RoutineBasicsProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData = (field: keyof RoutineData, value: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    setRoutineData({ ...routineData, [field]: value })
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 ">Información Básica</CardTitle>
        <p className="text-gray-600">Define los detalles principales de tu rutina</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Routine Name */}
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nombre de la rutina *
          </Label>
          <Input
            id="name"
            value={routineData.name}
            onChange={(e) => updateData("name", e.target.value)}
            placeholder="Ej: Rutina de Fuerza - Tren Superior"
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Descripción
          </Label>
          <Textarea
            id="description"
            value={routineData.description}
            onChange={(e) => updateData("description", e.target.value)}
            placeholder="Describe el objetivo y características de tu rutina..."
            className="mt-1"
            rows={3}
          />
        </div>

        {/* Goal */}
        <div>
          <Label className="text-sm font-medium text-gray-700">Objetivo principal *</Label>
          <Select value={routineData.goal} onValueChange={(value) => updateData("goal", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecciona tu objetivo" />
            </SelectTrigger>
            <SelectContent>
              {goals.map((goal) => (
                <SelectItem key={goal} value={goal}>
                  {goal}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty */}
        <div>
          <Label className="text-sm font-medium text-gray-700">Nivel de dificultad *</Label>
          <Select
            value={routineData.difficulty}
            onValueChange={(value: "Principiante" | "Intermedio" | "Avanzado") => updateData("difficulty", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Principiante">Principiante</SelectItem>
              <SelectItem value="Intermedio">Intermedio</SelectItem>
              <SelectItem value="Avanzado">Avanzado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Duration */}
        <div>
          <Label className="text-sm font-medium text-gray-700">Duración estimada: {routineData.duration} minutos</Label>
          <div className="mt-2">
            <Slider
              value={[routineData.duration]}
              onValueChange={(value) => updateData("duration", value[0])}
              max={120}
              min={15}
              step={15}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>15 min</span>
              <span>60 min</span>
              <span>120 min</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}