import FormCard from "../components/form-card"

export default function FormHeaderSection() {
  return (
    <section className="w-full flex items-center justify-center px-6 pt-10 bg-bg-default text-text-default">
      <FormCard className="mt-4 max-w-5xl mx-auto flex items-center justify-center px-6 py-5">
        <h1 className="text-2xl sm:text-2xl font-bold text-text-default">
          <span className="text-point">SSCC</span> 신입 부원 신청서
        </h1>
      </FormCard>
    </section>
  )
}
