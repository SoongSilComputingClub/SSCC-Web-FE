import { useRef, useState } from "react";

import FormHeaderSection from "./sections/form-header";
import ConsentSection from "./sections/consent-section";
import BasicInfo from "./sections/basic-info-section";
import SubmitSection from "./sections/submit-section";

export default function ApplyPage() {
  const [consented, setConsented] = useState(false);
  const consentRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = () => {
  if (!consented) {
    consentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    return;
  }

    // TODO: 실제 제출 로직 연결
  };

  return (
    <div className="mx-auto w-full max-w-[560px] flex flex-col gap-6 bg-bg-default">
      <FormHeaderSection />
      <div ref={consentRef}>
        <ConsentSection onConsentChange={setConsented} />
      </div>
      <BasicInfo />
      <SubmitSection disabled={!consented} onSubmit={handleSubmit} />
    </div>
  );
}
