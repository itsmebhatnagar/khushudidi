import { useEffect, useState } from "react";

const IMAGE_EXTS = ["jpg", "jpeg", "png", "webp", "avif", "gif"];
const VIDEO_EXTS = ["mp4", "webm", "mov", "m4v"];

type Found = { kind: "image" | "video"; src: string };

const KNOWN_MEDIA: Record<string, Found> = {
  "khushu/1": { kind: "image", src: "/fragments/khushu/1.jpg" },
  "khushu/2": { kind: "video", src: "/fragments/khushu/2.mp4" },
  "khushu/3": { kind: "image", src: "/fragments/khushu/3.jpg" },
  "khushu/4": { kind: "video", src: "/fragments/khushu/4.mp4" },
};

function getInitialMedia(folder: string, slot: number): Found | null {
  const key = `${folder}/${slot}`;
  return KNOWN_MEDIA[key] ?? null;
}

/**
 * Looks for a user-dropped file in /public/fragments/<folder> named after the
 * slot (e.g. 1.jpg, 2.mp4, 3.webm, 4.png). Falls back to the bundled placeholder.
 */
export function FragmentMedia({
  slot,
  folder,
  fallback,
  alt,
  className,
}: {
  slot: number;
  folder: string;
  fallback: string;
  alt: string;
  className?: string;
}) {
  const [found, setFound] = useState<Found | null>(() => getInitialMedia(folder, slot));

  useEffect(() => {
    let cancelled = false;

    const base = `/fragments/${folder}/${slot}`;
    const candidates: Found[] = [
      ...VIDEO_EXTS.map((ext) => ({ kind: "video" as const, src: `${base}.${ext}` })),
      ...IMAGE_EXTS.map((ext) => ({ kind: "image" as const, src: `${base}.${ext}` })),
    ];

    (async () => {
      const results = await Promise.all(
        candidates.map(async (candidate) => {
          try {
            const res = await fetch(candidate.src, { method: "HEAD" });
            const type = res.headers.get("content-type") ?? "";
            if (res.ok && !type.includes("text/html")) {
              return candidate;
            }
          } catch {
            return null;
          }
          return null;
        })
      );
      const match = results.find((r): r is Found => r !== null);
      if (match && !cancelled) {
        setFound(match);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slot, folder]);

  const slotClasses =
    slot === 1
      ? "object-top"
      : "group-hover:scale-[1.03]";

  const shared = `aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out ${slotClasses}${
    className ? ` ${className}` : ""
  }`;

  if (found?.kind === "video") {
    return (
      <video
        src={found.src}
        className={shared} 
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    );
  }

  return (
    <img
      src={found?.src ?? fallback}
      alt={alt}
      loading="lazy"
      width={1024}
      height={768}
      className={shared}
    />
  );
}
