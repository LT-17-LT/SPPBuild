import Image from "next/image";
import { Reveal } from "./Reveal";

export type GalleryItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/**
 * GalleryMasonry - CSS-columns masonry of photos. Each tile fades in on
 * scroll. Mixed portrait/landscape ratios flow naturally without cropping,
 * which keeps the event photos honest (no forced square crops).
 */
export function GalleryMasonry({ items }: { items: GalleryItem[] }) {
  return (
    <div className="spp-masonry">
      {items.map((item, i) => (
        <Reveal
          key={item.src}
          delay={(i % 3) * 0.06}
          className="spp-masonry-item"
          style={{ marginBottom: "clamp(0.75rem, 1.6vw, 1.25rem)" }}
        >
          <Image
            src={item.src}
            width={item.width}
            height={item.height}
            alt={item.alt}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              borderRadius: 12,
              border: "1px solid var(--line)",
            }}
          />
        </Reveal>
      ))}
    </div>
  );
}
