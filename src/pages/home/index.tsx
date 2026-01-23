import IntroSection from './sections/introduce-section';
import ParallaxSection from './sections/scroll-section';
import SubSection from './sections/semititle-section';
import ScrollSlideSection from './sections/slide-section';
import WaveSection from './sections/wave-section';
export default function HomePage() {
  return (
    <div>
      <WaveSection />
      <SubSection />
      <ScrollSlideSection />
      <ParallaxSection />
      <IntroSection />
    </div>
  );
}
