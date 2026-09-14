import Image from "next/image";
import { Camera } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Divider } from "@/components/ui/Divider";

const SOCIAL_IMAGES = [
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
];

export function SocialFeed() {
  return (
    <section className="bg-ivory px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
            Sosyal
          </p>
          <h2 className="font-serif text-3xl text-noir">Instagram&apos;da Biz</h2>
          <div className="mt-6 w-full max-w-xs">
            <Divider />
          </div>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-charcoal/75 transition-colors hover:text-gold"
          >
            <Camera size={16} aria-hidden className="text-gold" />
            @selvilerkuyumculuk
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {SOCIAL_IMAGES.map((src, index) => (
            <li
              key={src}
              className="relative aspect-square overflow-hidden border border-gold/20"
            >
              <Image
                src={src}
                alt={`Sosyal medya görseli ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
