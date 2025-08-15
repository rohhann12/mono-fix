import { Card, CardContent } from "@/components/ui/card"
import { Zap, Shield, Clock, Headphones, Upload, Download } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "AI-Powered Processing",
      description: "Advanced algorithms analyze and duplicate mono audio to create natural stereo sound",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Lightning Fast",
      description: "Process your audio files in seconds, not minutes. Get results instantly",
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary" />,
      title: "Perfect Balance",
      description: "Automatically balances audio levels for optimal listening experience",
    },
    {
      icon: <Upload className="w-8 h-8 text-primary" />,
      title: "Multiple Formats",
      description: "Support for MP4, AVI, MOV, MP3, WAV and more audio/video formats",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure & Private",
      description: "Your files are processed securely and deleted after 24 hours",
    },
    {
      icon: <Download className="w-8 h-8 text-primary" />,
      title: "High Quality Output",
      description: "Maintain original quality while enhancing audio to stereo",
    },
  ]

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose StereoFix?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional-grade audio enhancement that transforms your mono audio into immersive stereo experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
