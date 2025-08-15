"use client"

import { useState } from "react"



import { Button } from "~/components/ui/button"
import { Progress } from "~/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { RoutineBasics } from "~/components/RoutineBasics"
import { ExerciseSelector } from "~/components/ExcerciseSelector"
import { RoutineReview } from "~/components/RoutineReview"
import { DashboardHeader } from "~/components/DashboardHeader"

const steps = [
  { id: 1, name: "Información Básica", component: RoutineBasics },
  { id: 2, name: "Seleccionar Ejercicios", component: ExerciseSelector },
  { id: 3, name: "Revisar y Guardar", component: RoutineReview },
]

export interface Exercise {
  id: string
  name: string
  category: string
  muscleGroups: string[]
  equipment: string
  difficulty: "Principiante" | "Intermedio" | "Avanzado"
  instructions: string
  sets?: number
  reps?: number
  weight?: number
  duration?: number
}

export interface RoutineData {
  name: string
  description: string
  goal: string
  difficulty: "Principiante" | "Intermedio" | "Avanzado"
  duration: number
  exercises: Exercise[]
}


export default function CreateRoutine(){
   const [currentStep, setCurrentStep] = useState(1)
  const [routineData, setRoutineData] = useState<RoutineData>({
    name: "",
    description: "",
    goal: "",
    difficulty: "Principiante",
    duration: 30,
    exercises: [],
  })
  const router = useRouter()

  const currentStepData = steps.find((step) => step.id === currentStep)
  const CurrentComponent = currentStepData?.component

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    // Save routine logic here
    console.log("Saving routine:", routineData)
    router.push("/dashboard")
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader/>
      {/* Header */}
      <div className=" shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/dashboard")} className="text-muted-foreground">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver al Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-text-primary ">Crear Nueva Rutina</h1>
                <p className="text-sm text-muted-foreground">
                  Paso {currentStep} de {steps.length}: {currentStepData?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {CurrentComponent && <CurrentComponent routineData={routineData} setRoutineData={setRoutineData} />}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          {currentStep === steps.length ? (
            <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700 text-white">
              Guardar Rutina
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-orange-600 hover:bg-orange-700 text-white flex items-center">
              Siguiente
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}