import { HeroSection } from "../components/hero-section"
import { DashboardPreview } from "../components/dashboard-preview"
import { CTASection } from "../components/cta-section"
import { FooterSection } from "../components/footer-section"
import { AnimatedSection } from "../components/animated-section"
import { FeaturesSection } from "../components/features-section"
import { HowItWorksSection } from "../components/how-it-works-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-0">
      <div className="relative z-10">
        <main className="max-w-[1320px] mx-auto relative">
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <div className="flex flex-1 items-center justify-center">
            <AnimatedSection>
              <DashboardPreview />
            </AnimatedSection>
          </div>
        </main>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <CTASection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <FooterSection />
        </AnimatedSection>
      </div>
    </div>
  )
}
