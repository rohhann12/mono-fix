import { Button } from "@/components/ui/button"
import { Header } from "./header"
import { Play, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Volume2 className="w-4 h-4" />
              Audio Enhancement Technology
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Turn Mono Audio into
              <span className="text-primary block">Perfect Stereo</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Fix videos with audio coming from only one earphone. Our AI-powered tool duplicates and balances your
              audio to create immersive stereo sound.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Try It Free
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent">
              Watch Demo
            </Button>
          </div>

          {/* Audio Visualization */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <VolumeX className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Mono Audio</h3>
                  <p className="text-sm text-muted-foreground">Sound from one side only</p>
                </div>

                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <Volume2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Stereo Audio</h3>
                  <p className="text-sm text-muted-foreground">Balanced sound both sides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
