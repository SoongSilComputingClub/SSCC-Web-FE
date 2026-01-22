import FAQSection from './sections/faq-section';
import HeroSection from './sections/hero-section';
import ScheduleSection from './sections/schedule-section';
import TargetSection from './sections/target-section';

export default function ApplyPage() {
  return (
    <div>
      <HeroSection />
      <TargetSection />
      <ScheduleSection />
      <FAQSection />
    </div>
  );
}
