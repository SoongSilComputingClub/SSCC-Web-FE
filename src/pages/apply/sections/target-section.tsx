import targetChallenge from '@/assets/images/apply/target-challenge.png';
import targetCoding from '@/assets/images/apply/target-coding.png';
import targetPassion from '@/assets/images/apply/target-passion.png';

import SectionHeader from '../components/section-header';

export default function TargetSection() {
  return (
    <section className="flex w-full justify-center bg-bg-default px-6 py-16">
      <div className="flex w-full max-w-5xl flex-col items-center gap-12 text-center">
        {/* Header */}
        <SectionHeader label="TARGET" title="모집 타겟" />

        {/* Targets */}
        <div className="flex w-full flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-6 text-center">
            <img
              src={targetPassion}
              alt="IT 프로젝트에 관심 있는 숭실대학교 학생"
              className="h-auto w-full max-w-[320px] select-none"
              draggable={false}
            />
            <p className="text-sm text-text-default">IT 프로젝트에 관심 있는 숭실대학교 학생</p>
          </div>

          <div className="flex flex-col items-center gap-6 text-center">
            <img
              src={targetCoding}
              alt="코딩에 관심 있는 학생"
              className="h-auto w-full max-w-[360px] select-none"
              draggable={false}
            />
            <p className="text-sm text-text-default">코딩에 관심 있는 숭실대학교 학생</p>
          </div>

          <div className="flex flex-col items-center gap-6 text-center">
            <img
              src={targetChallenge}
              alt="도전을 두려워 않는 학생"
              className="h-auto w-full max-w-[360px] select-none"
              draggable={false}
            />
            <p className="text-sm text-text-default">도전을 두려워 않는 숭실대학교 학생</p>
          </div>
        </div>
      </div>
    </section>
  );
}
