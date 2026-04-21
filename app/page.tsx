import { Hero } from '@/components/Hero';
import { StatsStrip } from '@/components/StatsStrip';
import { GraphSection } from '@/components/GraphSection';
import { SectionCards } from '@/components/SectionCards';

export default function HomePage() {
  return (
    <>
      <Hero />
      <GraphSection />
      <StatsStrip />
      <SectionCards />
    </>
  );
}
