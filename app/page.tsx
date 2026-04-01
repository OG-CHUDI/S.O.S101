import LandingHeader from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import { Features, HowItWorks, Footer } from '@/components/landing/sections';

export default function LandingPage() {
  return (
    <main>
      <LandingHeader />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
