
import { Activity, Calendar, Target, TrendingUp } from "lucide-react"
import { Card, CardContent } from "../ui/card"

const stats = [
  {
    name: "Entrenamientos completados",
    value: "12",
    change: "+2 esta semana",
    icon: Activity,
    color: "text-orange-600",
  },
  {
    name: "Racha actual",
    value: "5 días",
    change: "¡Sigue así!",
    icon: Calendar,
    color: "text-green-600",
  },
  {
    name: "Rutinas creadas",
    value: "3",
    change: "1 nueva",
    icon: Target,
    color: "text-blue-600",
  },
  {
    name: "Progreso semanal",
    value: "85%",
    change: "+15% vs semana pasada",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.name} className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 ">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}