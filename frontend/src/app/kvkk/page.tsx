import type { Metadata } from "next";
import { Divider } from "@/components/ui/Divider";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "KVKK Aydınlatma Metni",
    description:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Selviler Kuyumculuk aydınlatma metni.",
    path: "/kvkk",
  });
}

export default function KvkkPage() {
  return (
    <article className="bg-ivory px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
            Yasal
          </p>
          <h1 className="font-serif text-4xl text-noir sm:text-5xl">
            KVKK Aydınlatma Metni
          </h1>
          <div className="mx-auto mt-6 max-w-xs">
            <Divider />
          </div>
          <p className="mt-4 text-xs text-charcoal/45">
            6698 sayılı Kanun uyarınca taslak aydınlatma metni — yayına
            alınmadan önce hukuki gözden geçirme yapılmalıdır.
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-charcoal/75 sm:text-base">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">
              1. Veri sorumlusu
            </h2>
            <p>
              Kişisel verileriniz; veri sorumlusu sıfatıyla {siteConfig.name}{" "}
              ({siteConfig.contact.address}, {siteConfig.contact.email},{" "}
              {siteConfig.contact.phone}) tarafından işlenmektedir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">
              2. İşlenen kişisel veriler
            </h2>
            <p>
              Kimlik (ad-soyad), iletişim (e-posta, telefon), talep/mesaj
              içeriği ve işlem güvenliği kapsamında teknik log verileri
              işlenebilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">
              3. İşleme amaçları ve hukuki sebepler
            </h2>
            <p>
              Verileriniz; iletişim taleplerinin yanıtlanması, müşteri
              ilişkilerinin yürütülmesi, yasal yükümlülüklerin yerine
              getirilmesi ve bilgi güvenliğinin sağlanması amaçlarıyla; KVKK
              m.5/2 (c), (e) ve (f) bentleri ile açık rıza gereken hallerde
              m.5/1 kapsamında işlenir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">
              4. Aktarım
            </h2>
            <p>
              Kişisel verileriniz, yasal zorunluluklar ve hizmetin ifası için
              gerekli olduğu ölçüde yetkili kamu kurumları ile hizmet
              aldığımız iş ortaklarına (hosting, e-posta altyapısı vb.)
              aktarılabilir. Yurt dışı aktarım söz konusu olursa KVKK
              hükümlerine uygun hareket edilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">
              5. Toplama yöntemi
            </h2>
            <p>
              Veriler; web sitesi iletişim formu, telefon, e-posta, WhatsApp ve
              fiziki mağaza ziyaretleri yoluyla elektronik veya fiziki ortamda
              toplanabilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">
              6. İlgili kişi hakları
            </h2>
            <p>
              KVKK m.11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme,
              işlenmişse bilgi talep etme, amaca uygun kullanılıp
              kullanılmadığını öğrenme, yurt içi/yurt dışı aktarılan üçüncü
              kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini isteme,
              silinmesini/yok edilmesini isteme, otomatik sistemler ile analiz
              sonucu aleyhinize bir sonucun çıkmasına itiraz etme ve zararın
              giderilmesini talep etme haklarına sahipsiniz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-noir">7. Başvuru</h2>
            <p>
              Haklarınıza ilişkin taleplerinizi{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-gold-light underline-offset-2 hover:underline"
              >
                {siteConfig.contact.email}
              </a>{" "}
              adresine veya {siteConfig.contact.address} yazılı başvuru ile
              iletebilirsiniz. Başvurularınız KVKK ve ilgili tebliğlere uygun
              olarak en kısa sürede ve en geç 30 gün içinde sonuçlandırılır.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
