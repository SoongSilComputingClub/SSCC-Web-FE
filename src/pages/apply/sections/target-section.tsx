import SectionHeader from '../components/section-header';
import targetPassion from '@/assets/images/apply/target-passion.png';
import targetCoding from '@/assets/images/apply/target-coding.png';
import targetChallenge from '@/assets/images/apply/target-challenge.png';

export default function TargetSection() {
  return (
    <section className="w-full bg-bg-default px-6 py-16 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col items-center text-center gap-12">
        {/* Header */}
        <SectionHeader label="TARGET" title="모집 타겟" />

        {/* Targets */}
        <div className="w-full flex flex-col items-center gap-16">
          <div className="flex flex-col items-center text-center gap-6">
            <img
              src={targetPassion}
              alt="배움에 열정이 넘치는 학생"
              className="w-full max-w-[320px] h-auto select-none"
              draggable={false}
            />
            <p className="text-sm text-text-default">배움에 열정이 넘치는 숭실대학교 학생</p>
          </div>

          <div className="flex flex-col items-center text-center gap-6">
            <img
              src={targetCoding}
              alt="코딩에 관심 있는 학생"
              className="w-full max-w-[360px] h-auto select-none"
              draggable={false}
            />
            <p className="text-sm text-text-default">코딩에 관심 있는 숭실대학교 학생</p>
          </div>

          <div className="flex flex-col items-center text-center gap-6">
            <img
              src={targetChallenge}
              alt="도전을 두려워 않는 학생"
              className="w-full max-w-[360px] h-auto select-none"
              draggable={false}
            />
            <p className="text-sm text-text-default">도전을 두려워 않는 숭실대학교 학생</p>
          </div>
        </div>
      </div>
    </section>
  );
}
