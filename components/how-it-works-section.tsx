import { Card, CardContent } from "@/components/ui/card"
import { Upload, Settings, Download } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: <Upload className="w-12 h-12 text-primary" />,
      title: "Upload Your File",
      description: "Drag and drop your video or audio file with mono audio issue",
    },
    {
      icon: <Settings className="w-12 h-12 text-primary" />,
      title: "AI Processing",
      description: "Our AI analyzes and duplicates the mono channel to create balanced stereo",
    },
    {
      icon: <Download className="w-12 h-12 text-primary" />,
      title: "Download Result",
      description: "Get your enhanced file with perfect stereo audio in seconds",
    },
  ]

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your mono audio to stereo in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-8">
                  <div className="mb-6 flex justify-center">{step.icon}</div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
