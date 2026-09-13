import Link from "next/link";
import { Divider } from "@/components/ui/Divider";

export function BrandStoryTeaser() {
  return (
    <section className="border-y border-gold/15 bg-charcoal px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
          Marka hikayesi
        </p>
        <h2 className="font-serif text-3xl text-ivory sm:text-4xl">
          Ustalık, güven ve zarafet
        </h2>
        <div className="mx-auto mt-6 max-w-xs">
          <Divider />
        </div>
        <p className="mt-8 text-sm leading-relaxed text-ivory/75 sm:text-base">
          Selviler Kuyumculuk; nesiller boyu biriken ustalık bilgisini modern
          çizgilerle buluşturur. Her parça, seçilmiş malzemeler ve titiz
          işçilikle atölyemizde hayat bulur.
        </p>
        <Link
          href="/hakkimizda"
          className="mt-8 inline-block text-xs uppercase tracking-[0.24em] text-gold-light transition-colors hover:text-gold"
        >
          Hikayemizi okuyun →
        </Link>
      </div>
    </section>
  );
}
