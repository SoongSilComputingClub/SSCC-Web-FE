import FormCard from '../components/form-card';

export default function FormHeaderSection() {
  return (
    <section className="flex w-full items-center justify-center bg-bg-default px-6 pt-2 text-text-default">
      <FormCard className="mt-4 flex w-full items-center justify-center px-6 py-5">
        <h1 className="text-xl font-bold text-text-default sm:text-2xl">
          <span className="text-point">SSCC</span> 신입 부원 신청서
        </h1>
      </FormCard>
    </section>
  );
}
