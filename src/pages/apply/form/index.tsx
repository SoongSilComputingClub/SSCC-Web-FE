import FormHeaderSection from "./sections/form-header";
import ConsentSection from "./sections/consent-section";
import BasicInfo from "./sections/basic-info-section";
import SubmitSection from "./sections/submit-section";

export default function ApplyPage() {
  return (
    <div className="mx-auto w-full max-w-[560px] flex flex-col gap-6 bg-bg-default">
      <FormHeaderSection />
      <ConsentSection />
      <BasicInfo />
      <SubmitSection />
    </div>
  );
}
