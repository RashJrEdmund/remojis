import { Craft } from './components/craft'
import { FinalCta } from './components/final-cta'
import { Hero } from './components/hero'
import { HowItWorks } from './components/how-it-works'
import { InstallGuide } from './components/install-guide'
import { SiteFooter } from './components/site-footer'

export function App() {
  return (
    <div id="top" className="site-shell">
      <div aria-hidden="true" className="grain" />
      <Hero />
      <HowItWorks />
      <Craft />
      <InstallGuide />
      <FinalCta />
      <SiteFooter />
    </div>
  )
}
