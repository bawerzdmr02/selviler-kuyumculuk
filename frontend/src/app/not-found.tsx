import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] max-w-full flex-col items-center justify-center overflow-x-hidden bg-ivory px-4 py-16 text-center sm:min-h-[70vh] sm:py-24">
      <p className="font-serif text-5xl tracking-[0.12em] text-muted sm:text-7xl md:text-8xl">
        404
      </p>
      <h1 className="mt-4 font-serif text-xl text-noir sm:mt-6 sm:text-2xl md:text-3xl">
        Sayfa bulunamadı
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal/65">
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.{" "}
        {siteConfig.name} vitrinine geri dönebilirsiniz.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Ana Sayfa</ButtonLink>
        <ButtonLink href="/koleksiyonlar" variant="outline">
          Koleksiyonlar
        </ButtonLink>
      </div>
    </div>
  );
}
