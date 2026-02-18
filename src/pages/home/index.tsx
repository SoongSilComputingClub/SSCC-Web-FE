import IntroSection from './sections/introduce-section';
import ParallaxSection from './sections/scroll-section';
import ScrollSlideSection from './sections/slide-section';
import { WaveSection } from './sections/wave-section';
export default function HomePage() {
  return (
    <div>
      <WaveSection />
      <ScrollSlideSection />
      <ParallaxSection />
      <IntroSection />
    </div>
  );
}
