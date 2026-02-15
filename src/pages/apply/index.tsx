import { useApplyFormRead } from './hooks/use-apply-form-read';
import FAQSection from './sections/faq-section';
import HeroSection from './sections/hero-section';
import ScheduleSection from './sections/schedule-section';
import TargetSection from './sections/target-section';

export default function ApplyPage() {
  const { data: res, isLoading } = useApplyFormRead();

  const hasApplication = isLoading ? null : res?.success === true && res.data != null;

  return (
    <div>
      <HeroSection hasApplication={hasApplication} />
      <TargetSection />
      <ScheduleSection />
      <FAQSection />
    </div>
  );
}
