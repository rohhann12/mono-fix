import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Fix Your Audio?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of content creators who have enhanced their audio with StereoFix. Start your free trial
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent">
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
