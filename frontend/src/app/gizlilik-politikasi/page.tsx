import type { Metadata } from "next";
import { Divider } from "@/components/ui/Divider";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Gizlilik Politikası",
    description:
      "Selviler Kuyumculuk gizlilik politikası — kişisel verilerinizin işlenmesi hakkında bilgilendirme.",
    path: "/gizlilik-politikasi",
  });
}

export default function PrivacyPolicyPage() {
  return (
    <article className="bg-ivory px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
            Yasal
          </p>
          <h1 className="font-serif text-4xl text-noir sm:text-5xl">
            Gizlilik Politikası
          </h1>
          <div className="mx-auto mt-6 max-w-xs">
            <Divider />
          </div>
          <p className="mt-4 text-xs text-charcoal/45">
            Taslak metin — yayına alınmadan önce hukuki gözden geçirme
            yapılmalıdır. Son güncelleme: {new Date().getFullYear()}
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-charcoal/75 sm:text-base">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">1. Giriş</h2>
            <p>
              {siteConfig.name} olarak web sitemizi ziyaret edenlerin ve
              iletişim formumuzu kullananların gizliliğine önem veriyoruz. Bu
              politika, hangi verileri neden topladığımızı ve nasıl
              koruduğumuzu açıklar.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">
              2. Toplanan veriler
            </h2>
            <p>
              İletişim formu aracılığıyla ad-soyad, e-posta, telefon ve mesaj
              içeriği gibi bilgileri gönüllü olarak paylaşabilirsiniz. Ayrıca
              sunucu logları kapsamında IP adresi ve tarayıcı bilgisi gibi
              teknik veriler işlenebilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">
              3. Verilerin kullanım amacı
            </h2>
            <p>
              Paylaştığınız bilgiler; taleplerinize yanıt vermek, randevu
              süreçlerini yürütmek ve yasal yükümlülüklerimizi yerine getirmek
              amacıyla kullanılır. Pazarlama amaçlı kullanım için ayrıca açık
              rıza alınır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">4. Saklama süresi</h2>
            <p>
              Kişisel veriler, işleme amacının gerektirdiği süre ve ilgili
              mevzuatta öngörülen zamanaşımı süreleriyle sınırlı olarak
              saklanır; süre sonunda silinir veya anonimleştirilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">5. Üçüncü taraflar</h2>
            <p>
              Faz 1&apos;de iletişim formu geçici olarak e-posta (mailto)
              üzerinden çalışır. Faz 2&apos;de kendi sunucumuz / form
              altyapımız kullanılacaktır. Hosting, analitik veya e-posta
              sağlayıcıları yalnızca hizmetin sunulması için gerekli ölçüde
              veri işleyebilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">6. Haklarınız</h2>
            <p>
              KVKK kapsamında verilerinize erişme, düzeltme, silme ve işlemenin
              kısıtlanmasını talep etme haklarına sahipsiniz. Başvurularınızı{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-gold-light underline-offset-2 hover:underline"
              >
                {siteConfig.contact.email}
              </a>{" "}
              adresine iletebilirsiniz. Ayrıntılar için{" "}
              <a
                href="/kvkk"
                className="text-gold-light underline-offset-2 hover:underline"
              >
                KVKK Aydınlatma Metni
              </a>
              &apos;ne bakınız.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">7. İletişim</h2>
            <p>
              Gizlilik ile ilgili sorularınız için: {siteConfig.contact.address}{" "}
              · {siteConfig.contact.phone} · {siteConfig.contact.email}
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
