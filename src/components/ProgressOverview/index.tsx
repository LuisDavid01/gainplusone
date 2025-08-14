import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"

const goals = [
  {
    name: "Entrenamientos semanales",
    current: 4,
    target: 5,
    percentage: 80,
  },
  {
    name: "Minutos de ejercicio",
    current: 180,
    target: 300,
    percentage: 60,
  },
  {
    name: "Rutinas completadas",
    current: 2,
    target: 3,
    percentage: 67,
  },
]

export function ProgressOverview() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 ">Progreso Semanal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.name}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{goal.name}</span>
              <span className="text-sm text-gray-600">
                {goal.current}/{goal.target}
              </span>
            </div>
            <Progress value={goal.percentage} className="h-2" />
            <div className="text-xs text-gray-500 mt-1">{goal.percentage}% completado</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
