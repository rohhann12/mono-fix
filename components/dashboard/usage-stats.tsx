import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import { FileAudio, Zap, Clock, CheckCircle } from "lucide-react"

export function UsageStats() {
  const stats = [
    {
      title: "Files Processed",
      value: "23",
      limit: "100",
      icon: <FileAudio className="w-5 h-5 text-primary" />,
      progress: 23,
    },
    {
      title: "API Calls",
      value: "156",
      limit: "1,000",
      icon: <Zap className="w-5 h-5 text-primary" />,
      progress: 15.6,
    },
    {
      title: "Processing Time",
      value: "2.3 min",
      limit: "∞",
      icon: <Clock className="w-5 h-5 text-primary" />,
      progress: null,
    },
    {
      title: "Success Rate",
      value: "98.7%",
      limit: "",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      progress: 98.7,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.value}
              {stat.limit && <span className="text-sm font-normal text-muted-foreground ml-1">/ {stat.limit}</span>}
            </div>
            {stat.progress !== null && <Progress value={stat.progress} className="mt-2" />}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
