import BannerSection from './sections/banner-section';
import HistorySection from './sections/history-section';
import MemberSection from './sections/member-section';
import RecordSection from './sections/record-section';
import ValueSection from './sections/value-section';
export default function AboutPage() {
  return (
    <div>
      <BannerSection />
      <ValueSection />
      <HistorySection />
      <MemberSection />
      <RecordSection />
    </div>
  );
}
