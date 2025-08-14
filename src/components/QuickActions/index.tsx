import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Plus, Play, BarChart3, Calendar } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Crear Rutina",
    description: "Diseña una nueva rutina personalizada",
    icon: Plus,
    color: "bg-orange-600 hover:bg-orange-700",
    href: "/dashboard/routines/create",
  },
  {
    title: "Entrenar Ahora",
    description: "Comienza un entrenamiento rápido",
    icon: Play,
    color: "bg-green-600 hover:bg-green-700",
    href: "/dashboard/workout/quick",
  },
  {
    title: "Ver Progreso",
    description: "Analiza tu rendimiento",
    icon: BarChart3,
    color: "bg-blue-600 hover:bg-blue-700",
    href: "/dashboard/progress",
  },
  {
    title: "Planificar",
    description: "Organiza tus entrenamientos",
    icon: Calendar,
    color: "bg-purple-600 hover:bg-purple-700",
    href: "/dashboard/schedule",
  },
]

export function QuickActions() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 ">Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            className="w-full justify-start h-auto p-4 hover:bg-gray-50 bg-transparent"
            asChild
          >
            <Link href={action.href}>
              <div className={`p-2 rounded-md ${action.color} mr-3`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">{action.title}</div>
                <div className="text-sm text-gray-600">{action.description}</div>
              </div>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
